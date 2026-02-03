<script lang="ts">
    import type { Member } from "@coin/resonitelink-ts";
    import FieldInput from "./FieldInput.svelte";
    import { shared } from "../../shared.svelte";
    import Reference from "./Reference.svelte";
    import SyncList from "./SyncList.svelte";
    import SyncObject from "./SyncObject.svelte";
    const { name, displayName = "", data, changeField, update }: { name: string|number, displayName?: string, data: Member, changeField: (name: string|number, data: Member) => void, update: () => void } = $props()

    function change(dat: Member){
        changeField(name, dat)
    }

    function onclick(){
        if(shared.resoniteLinkMode) console.log(`${name}(${data.id})`, data)
        update()
    }
</script>

<style>
    #field{
        display: flex;
        gap: 0.3em;
    }

    #info{
        color: var(--heroGreen);
        -webkit-user-select:text; user-select:text;
    }

    .type{
        font-size: 0.8em;
    }

    #title, #field{
        vertical-align: middle;
    }
    #title{
        -webkit-user-select:none; user-select:none;
    }
    #title:hover{
        color: var(--heroYellow);
    }
    #title:active{
        color: var(--heroPurple);
    }
</style>

{#if data.$type === "list"}
    <span style="grid-column: 1 / 3; text-align: center;" id="title" {onclick}>{displayName || name} {#if shared.resoniteLinkMode}<span id="info">({data.id})</span>{/if} (list):</span>
    <span style="grid-column: 1 / 3;">
        <SyncList {data} changeField={change} {update}/>
    </span>
{:else}
    <span id="title" {onclick}>{displayName || name}{#if shared.resoniteLinkMode}<span id="info">({data.id})</span>{/if}:</span>
    <span id="field">
        {#if data.$type === "empty"}
            <span class="type">&lt;empty element&gt;</span>
        {:else if data.$type === "reference"}
            <Reference {data} changeField={change} />
        {:else if data.$type === "syncObject"}
            <SyncObject {data} changeField={change} {update}/>
        {:else}
            <FieldInput {data} changeField={change}/>
        {/if}
    </span>
{/if}