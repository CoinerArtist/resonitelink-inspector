<script lang="ts">
    import type {BoundingBox, Field, FieldGeneric} from "@coin/resonitelink-ts"
    const { data, changeField }: { data: FieldGeneric<string, BoundingBox>, changeField: (data: Field) => void } = $props()

    const localData = $derived({...data})

    function onchange(){
        changeField(localData as Field)
    }
</script>

x <input type="number" step="any" bind:value={localData.value.min.x} {onchange}>
y <input type="number" step="any" bind:value={localData.value.min.y} {onchange}>
z <input type="number" step="any" bind:value={localData.value.min.z} {onchange}>
x <input type="number" step="any" bind:value={localData.value.max.x} {onchange}>
y <input type="number" step="any" bind:value={localData.value.max.y} {onchange}>
z <input type="number" step="any" bind:value={localData.value.max.z} {onchange}>
