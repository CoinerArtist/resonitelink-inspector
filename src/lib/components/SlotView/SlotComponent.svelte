<script lang="ts">
    import type { Member } from "@coin/resonitelink-ts";
    import { link, shared } from "$shared";
    import MemberInput from "./MemberInput/MemberInput.svelte";
    import { shortenType } from "$util";
    const { componentId }: { componentId: string } = $props()

    async function onclick(){
        component = (await link.getComponent(componentId)).data
        if(shared.resoniteLinkMode) console.log(`${shortenType(component.componentType)}(${componentId})`, component)
    }

    function changeField(name: string|number, data: Member){
        link.updateComponent({
            id: componentId,
            members: {
                [name]: data
            }
        }).finally(async () => {
            component = (await link.getComponent(componentId)).data
        })
    }

    async function update(){
        component = (await link.getComponent(componentId)).data
    }

    let {data: component} = $derived(await link.getComponent(componentId))
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

<div id="title" {onclick}>
    {shortenType(component.componentType)}
    {#if shared.resoniteLinkMode}<span id="info">({component.id})</span>{/if}
</div>

{#each Object.entries(component.members || {}) as [k,v] (v.id)}
    <MemberInput name={k} data={v} {changeField} {update}/>
{/each}