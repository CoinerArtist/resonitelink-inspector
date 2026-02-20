<script lang="ts">
    import type {Field, FieldGeneric, Rect} from "@coin/resonitelink-ts"
    const { data, changeField }: { data: FieldGeneric<string, Rect>, changeField: (data: Field) => void } = $props()

    const localData = $derived({...data})

    function onchange(){
        changeField(localData as Field)
    }
</script>

x <input type="number" bind:value={localData.value.position.x} {onchange}>
y <input type="number" bind:value={localData.value.position.y} {onchange}>
x <input type="number" bind:value={localData.value.size.x} {onchange}>
y <input type="number" bind:value={localData.value.size.y} {onchange}>
