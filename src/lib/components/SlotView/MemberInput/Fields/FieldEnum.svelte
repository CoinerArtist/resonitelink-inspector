<script lang="ts">
    import type {Field, FieldGeneric} from "@coin/resonitelink-ts"
    const { data, changeField }: { data: FieldGeneric<"enum", string> & { enumType: string }, changeField: (data: Field) => void } = $props()

    const localData = $derived({...data})

    function onchange(){
        changeField(localData as Field)
    }
</script>

<style>
    .type{
        font-size: 0.8em;
    }
</style>

<input class="unknownEnum" type="text" bind:value={localData.value} {onchange}> <span class="type">({data.enumType})</span>
