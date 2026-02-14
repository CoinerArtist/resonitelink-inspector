<script lang="ts">
    import { link, shared } from "$lib/shared.svelte";
    import TreeElement from "./TreeElement.svelte";
    const { slotId = "Root" }: { slotId?: string} = $props()

    let name = $state("")
    
    $effect(() => {
        if(shared.linkOpen){
            link.getSlot(slotId).then(x => {
                name = x.data.name.value || ""
            })
        } else {
            name = ""
        }
    })

</script>

<style>
    #outer{
        background-color: var(--darkCyan);
        border-radius: 0.5em;
        padding: 0.5em;
        height: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
    }

    #info{
        color: var(--heroGreen)
    }

    #title{
        font-size: 1.8em;
        margin-bottom: 0.1em;
    }

    #content{
        height: 100%;
        overflow-y: scroll;
        overflow-x: hidden;
        scrollbar-width: thin;
    }
</style>

<div id="outer">
    <div id="title">Root: {name} {#if shared.resoniteLinkMode}<span id="info">({slotId})</span>{/if}</div>
    <div id="content">
        {#if shared.linkOpen}
            <TreeElement {slotId} unfolded={true}/>
        {/if}
    </div>
</div>