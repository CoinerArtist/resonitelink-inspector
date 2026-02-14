<script lang="ts">
    import type {Field, FieldGeneric} from "@coin/resonitelink-ts"
    const { data, changeField }: { data: FieldGeneric<string, string>, changeField: (data: Field) => void } = $props()

    const localData = $derived({...data})

    function onchange(){
        changeField(localData as Field)
    }
</script>

<input type="text" bind:value={localData.value} {onchange}>