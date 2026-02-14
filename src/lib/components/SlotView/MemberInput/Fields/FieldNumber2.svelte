<script lang="ts">
    import type {Field, FieldGeneric, number2} from "@coin/resonitelink-ts"
    const { data, changeField }: { data: FieldGeneric<string, number2>, changeField: (data: Field) => void } = $props()

    const localData = $derived({...data})

    function onchange(){
        changeField(localData as Field)
    }
</script>

x <input type="number" bind:value={localData.value.x} {onchange}>
y <input type="number" bind:value={localData.value.y} {onchange}>
