<script lang="ts">
    import { enumDefinitions } from "$model";
    import type {Field, FieldGeneric} from "@coin/resonitelink-ts"
    const { data, changeField }: { data: FieldGeneric<"enum", string> & { enumType: string }, changeField: (data: Field) => void } = $props()

    const localData = $derived({...data})
    const enumValues = $derived(enumDefinitions.get(data.enumType))

    function onchange(){
        changeField(localData as Field)
    }
</script>

<style>
    .type{
        font-size: 0.8em;
    }
</style>

{#if enumValues}
    <select bind:value={localData.value} {onchange}>
        {#each enumValues as v}
            <option value={v}>{v}</option>
        {/each}
    </select>
{:else}
    <input class="unknownEnum" type="text" bind:value={localData.value} {onchange}> <span class="type">({data.enumType})</span>
{/if}

