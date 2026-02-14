<script lang="ts">
    import type {Field, FieldGeneric} from "@coin/resonitelink-ts"
    import CheckBox from "$lib/components/CheckBox.svelte";
    const { data, changeField }: { data: FieldGeneric<string, boolean>, changeField: (data: Field) => void } = $props()

    const localData = $derived({...data})

    function onchange(){
        changeField(localData as Field)
    }
</script>

<CheckBox bind:checked={localData.value} onclick={onchange}/>