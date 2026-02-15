<script lang="ts">
    import { shared } from "$lib/shared.svelte";
    import TreeElement from "./TreeElement.svelte";
    import type { Slot } from "@coin/resonitelink-ts";
    import { slots, updateSlot } from "$model";
    let { slotId = $bindable("Root") }: { slotId?: string } = $props()

    import imgObjectRoot from "$assets/icon/Color_ObjectRoot.svg"
    import imgRootUp from "$assets/icon/Color_RootUp.svg"

    let slot: Slot|undefined|null = $derived(slots.get(slotId))
    let name = $derived(slot ? slot.name.value : "")
    
    $effect(() => {
        if(shared.linkOpen){
            updateSlot(slotId)
        }
    })

    $effect(() => {
        if(slot === null){
            if(shared.selectedSlot !== slotId) shared.sendNotification("Couldn't get inspector root slot. Resetting to world Root...")    // If this is called by two different effects at the same time, it somehow causes a loop
            slotId = "Root"
        }
    })

    function todo(){
        shared.sendNotification("This doesn't do anything (yet)")
    }

    function rootUp(){
        if(slot && slot.parent.targetId !== null){
            slotId = slot.parent.targetId
        }
    }
</script>

<style>
    #outer{
        background-color: var(--darkCyan);
        border-radius: 0.5em;
        padding: 0 0.3em;
        height: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
    }

    #info{
        color: var(--heroGreen)
    }

    #topbar{
        display: flex;
        gap: round(0.3em, 1px);
    }
    #title{
        font-size: 1.8em;
        margin-bottom: 0.1em;
        flex-grow: 1;
        text-align: center;
    }
    #topbar>button>img{
        height: 100%;
    }

    #content{
        height: 100%;
        overflow-y: scroll;
        overflow-x: hidden;
        scrollbar-width: thin;

        margin: 0.5em 0;
    }

    button{
        border-top: 0px;
        border-bottom: 0px;
    }
</style>

<div id="outer">
    <div id="topbar">
        <div id="title">Root: {name} {#if shared.resoniteLinkMode}<span id="info">({slotId})</span>{/if}</div>
        <button onclick={todo}><img src={imgObjectRoot} title="Object Root"></button>
        <button onclick={rootUp}><img src={imgRootUp} title="Root Up"></button>
    </div>

    <div id="content">
        {#if shared.linkOpen && slot}
            <TreeElement {slotId} unfolded={true}/>
        {/if}
    </div>
</div>