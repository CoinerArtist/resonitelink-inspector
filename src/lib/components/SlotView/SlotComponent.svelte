<script lang="ts">
    import type { Member } from "@coin/resonitelink-ts";
    import { link, shared } from "$shared";
    import MemberInput from "./MemberInput/MemberInput.svelte";
    import { shortenType } from "$util";
    import { componentDefinitions, components, exploreType, updateComponent } from "$model";
    let { componentId, unfolded = true }: { componentId: string, unfolded?: boolean } = $props()

    async function fold(){
        if(!unfolded){
            await updateComponent(componentId)
        }
        unfolded = !unfolded
    }

    // svelte-ignore state_referenced_locally
    await updateComponent(componentId)
    let component = $derived(components.get(componentId))
    let componentDef = $derived(component ? componentDefinitions.get(component.componentType) : undefined)

    // svelte-ignore state_referenced_locally
    if(component){
        exploreType(component.componentType)
    }



    async function onclick(){
        await updateComponent(componentId)
        if(shared.resoniteLinkMode && component) console.log(`${shortenType(component.componentType)}(${componentId})`, component)
    }

    function changeField(name: string|number, data: Member){
        link.updateComponent({
            id: componentId,
            members: {
                [name]: data
            }
        }).finally(async () => {
            updateComponent(componentId)
        })
    }

    async function update(){
        await updateComponent(componentId)
    }
</script>

<style>
    #title{
        grid-column: 1 / 3;
        /* margin-top: 0.5em; */

        display: flex;
        gap: round(0.3em, 1px);
        align-items: stretch;
    }

    #name{
        color: var(--heroYellow);
        text-align: center;
        background-color: var(--mid);
        border-radius: 0.4em;
        font-size: 1.25em;
        flex-grow: 1;
    }
    #name:hover{
        background-color: var(--midHover);
    }
    #name:active{
        background-color: var(--midActive);
    }

    button{
        aspect-ratio: 1/1;
        height: 100%;
        border: none;
    }

    #info{
        color: var(--heroGreen)
    }

    .spacer{
        grid-column: 1 / 3;
        height: 0.3em;
    }
</style>

{#if component}
    <div id="title">
        <div>
            <button onclick={fold}><div style="transform: scale(1.4);">{unfolded ? "⯆" : "⯈"}</div></button> <span style="visibility:hidden">x</span>
        </div>
        <div id="name" {onclick}>
            {componentDef ? componentDef.type.name : shortenType(component.componentType)}
            {#if shared.resoniteLinkMode}<span id="info">({component.id})</span>{/if}
        </div>
    </div>

    
    {#if unfolded}
        {#each Object.entries(component.members || {}) as [k,v] (v.id)}
            <MemberInput name={k} data={v} {changeField} {update}/>
        {/each}
        <div class="spacer"></div>
    {/if}
{/if}