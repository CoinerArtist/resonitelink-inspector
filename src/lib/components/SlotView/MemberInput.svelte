<script lang="ts">
    import type { Member } from "@coin/resonitelink-ts";
    import FieldInput from "./FieldInput.svelte";
    import { shared } from "../../shared.svelte";
    import Reference from "./Reference.svelte";
    const { name, displayName = "", data, changeField, update }: { name: string, displayName?: string, data: Member, changeField: (name: string, data: Member) => void, update: () => void } = $props()

    function change(dat: Member){
        changeField(name, dat)
    }

    function onclick(){
        if(shared.resoniteLinkMode) console.log(`${name}(${data.id})`, data)
        update()
    }
</script>

<style>
    #outer{
        display: grid;
        grid-template-columns: 1fr 3fr;
        margin: round(0.3em, 1px);
        gap: 0.3em;
        font-size: 1.2em;
    }

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

<div id="outer">
    <span id="title" {onclick}>{displayName || name}{#if shared.resoniteLinkMode}<span id="info">({data.id})</span>{/if}:</span>
    <span id="field">
        {#if data.$type === "empty"}
            <span class="type">&lt;empty element&gt;</span>
        {:else if data.$type === "reference"}
            <Reference {data} changeField={change} />
        {:else if data.$type === "list"}
            <span class="type">&lt;List (Count: {data.elements.length})&gt;</span>
        {:else if data.$type === "syncObject"}
            <span class="type">&lt;Object&gt;</span>
        {:else}
            <FieldInput {data} changeField={change}/>
        {/if}
    </span>
</div>