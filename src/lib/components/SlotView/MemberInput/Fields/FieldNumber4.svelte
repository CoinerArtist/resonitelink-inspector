<script lang="ts">
    import type {Field, FieldGeneric, number4} from "@coin/resonitelink-ts"
    const { data, changeField }: { data: FieldGeneric<string, number4>, changeField: (data: Field) => void } = $props()

    const localData = $derived({...data})

    function onchange(){
        changeField(localData as Field)
    }
</script>

x <input type="number" step="any" bind:value={localData.value.x} {onchange}>
y <input type="number" step="any" bind:value={localData.value.y} {onchange}>
z <input type="number" step="any" bind:value={localData.value.z} {onchange}>
w <input type="number" step="any" bind:value={localData.value.w} {onchange}>
