<script lang="ts">
    import type { Member } from "@coin/resonitelink-ts";
    import { link, shared } from "$shared";
    import MemberInput from "./MemberInput/MemberInput.svelte";
    import { shortenType } from "$util";
    import { componentDefinitions, components, exploreType, updateComponent } from "$model";
    const { componentId }: { componentId: string } = $props()

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
        color: var(--heroYellow);
        text-align: center;
        background-color: var(--mid);
        border-radius: 0.4em;
        font-size: 1.25em;

        grid-column: 1 / 3;
        margin-top: 0.5em;
    }
    #title:hover{
        background-color: var(--midHover);
    }
    #title:active{
        background-color: var(--midActive);
    }

    #info{
        color: var(--heroGreen)
    }
</style>

{#if component}
    <div id="title" {onclick}>
        {componentDef ? componentDef.type.name : shortenType(component.componentType)}
        {#if shared.resoniteLinkMode}<span id="info">({component.id})</span>{/if}
    </div>

    {#each Object.entries(component.members || {}) as [k,v] (v.id)}
        <MemberInput name={k} data={v} {changeField} {update}/>
    {/each}
{/if}