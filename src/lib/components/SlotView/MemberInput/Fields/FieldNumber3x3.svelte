<script lang="ts">
    import type {Field, FieldGeneric, number3x3} from "@coin/resonitelink-ts"
    const { data, changeField }: { data: FieldGeneric<string, number3x3>, changeField: (data: Field) => void } = $props()

    const localData = $derived({...data})

    function onchange(){
        changeField(localData as Field)
    }
</script>

<style>
    #outer{
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        gap: 0.3em;
    }
    #outer>div{
        display: flex;
        gap: 0.3em;
    }
</style>

<div id="outer">
    <div><input type="number" step="any" bind:value={localData.value.m00} {onchange}> <input type="number" step="any" bind:value={localData.value.m01} {onchange}> <input type="number" step="any" bind:value={localData.value.m02} {onchange}></div>
    <div><input type="number" step="any" bind:value={localData.value.m10} {onchange}> <input type="number" step="any" bind:value={localData.value.m11} {onchange}> <input type="number" step="any" bind:value={localData.value.m12} {onchange}></div>
    <div><input type="number" step="any" bind:value={localData.value.m20} {onchange}> <input type="number" step="any" bind:value={localData.value.m21} {onchange}> <input type="number" step="any" bind:value={localData.value.m22} {onchange}></div>
</div>

