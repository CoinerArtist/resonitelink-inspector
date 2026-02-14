<script lang="ts">
    import type {boolean2, Field, FieldGeneric} from "@coin/resonitelink-ts"
    import CheckBox from "$lib/components/CheckBox.svelte";
    const { data, changeField }: { data: FieldGeneric<string, boolean2>, changeField: (data: Field) => void } = $props()

    const localData = $derived({...data})

    function onchange(){
        changeField(localData as Field)
    }
</script>

x <CheckBox bind:checked={localData.value.x} onclick={onchange}/>
y <CheckBox bind:checked={localData.value.y} onclick={onchange}/>