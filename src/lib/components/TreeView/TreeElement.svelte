<script lang="ts">
    import { link, shared } from "$shared";
    import CheckBox from "$components/CheckBox.svelte";
    import TreeElement from "./TreeElement.svelte"
    import { slots, updateSlot } from "$model";
    import type { Slot } from "@coin/resonitelink-ts";
    let { slotId, unfolded = false, persistent = true, active = true }: { slotId: string, unfolded?: boolean, persistent?: boolean, active?: boolean } = $props()

    // svelte-ignore state_referenced_locally
    await updateSlot(slotId)
    let slot: Slot = $derived(slots.get(slotId)!)

    async function fold(){
        await updateSlot(slotId)
        if((slot.children || []).length > 0){
            unfolded = !unfolded
        } else {
            unfolded = false
        }
    }

    let lastClick = 0
    async function onclick(){
        const now = Date.now()
        if(now - lastClick > 500){
            lastClick = now
            await updateSlot(slotId)
            if(shared.resoniteLinkMode) console.log(`${slot.name.value} (${slotId})`, slot)
        } else {
            lastClick = 0
            shared.selectedSlot = slotId
        }
    }

    function onclickCheckbox(){
        link.updateSlot({
            id: slotId,
            isActive: slot.isActive
        }).finally(async () => {
            await updateSlot(slotId)
        })
    }

    const color = $derived(shared.selectedSlot == slotId ? "--heroYellow" : (persistent ? (slot.isPersistent.value ? "--light" : "--heroOrange") : "--midOrange"))
    const opacity = $derived(slot.isActive.value ? (active ? "1" : "0.7") : "0.5")
</script>

<style>
    #outer{
        display: flex;
        align-items: center;
        gap: 0.2em;
        font-size: 1.5em;
    }

    #name{
        vertical-align: middle;
        color: var(--currentColor);
        -webkit-user-select:none; user-select:none;
        flex-grow: 1;
    }
    #name:hover{
        color: var(--heroYellow);
    }
    #name:active{
        color: var(--heroPurple);
    }

    #info{
        color: var(--heroGreen);
        -webkit-user-select:text; user-select:text;
    }

    #children{
        margin-left: 1em;
    }

    #check{
        transform: scale(1.05);
    }

    button{
        width: 2.1em;
        height: 2.1em;
        border: none;
    }
</style>

{#if slot}
<div>
    <div id="outer">
        <button onclick={fold}><div style="transform: {slot.children?.length ? "scale(1.4)" : "scale(2.3) translateY(-0.05em)"};">{slot.children?.length ? (unfolded ? "⯆" : "⯈") : "⏺"}</div></button>
        <span id="name" style="--currentColor: var({color}); opacity: {opacity};" {onclick}>{slot.name.value} {#if shared.resoniteLinkMode}<span id="info">({slotId})</span>{/if}</span>
        <span id="check"><CheckBox bind:checked={slot.isActive.value} onclick={onclickCheckbox}/></span>
    </div>

    {#if unfolded}
        <div id="children">
            {#each slot.children || [] as child (child.id)}
                <TreeElement slotId={child.id} persistent={persistent && slot.isPersistent.value} active={active && slot.isActive.value}/>
            {/each}
        </div>
    {/if}
</div>
{/if}