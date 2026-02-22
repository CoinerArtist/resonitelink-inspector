<script lang="ts">
    import type {Field, FieldGeneric, number4x4} from "@coin/resonitelink-ts"
    const { data, changeField }: { data: FieldGeneric<string, number4x4>, changeField: (data: Field) => void } = $props()

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
    <div><input type="number" step="any" bind:value={localData.value.m00} {onchange}> <input type="number" step="any" bind:value={localData.value.m01} {onchange}> <input type="number" step="any" bind:value={localData.value.m02} {onchange}> <input type="number" step="any" bind:value={localData.value.m03} {onchange}></div>
    <div><input type="number" step="any" bind:value={localData.value.m10} {onchange}> <input type="number" step="any" bind:value={localData.value.m11} {onchange}> <input type="number" step="any" bind:value={localData.value.m12} {onchange}> <input type="number" step="any" bind:value={localData.value.m13} {onchange}></div>
    <div><input type="number" step="any" bind:value={localData.value.m20} {onchange}> <input type="number" step="any" bind:value={localData.value.m21} {onchange}> <input type="number" step="any" bind:value={localData.value.m22} {onchange}> <input type="number" step="any" bind:value={localData.value.m23} {onchange}></div>
    <div><input type="number" step="any" bind:value={localData.value.m30} {onchange}> <input type="number" step="any" bind:value={localData.value.m31} {onchange}> <input type="number" step="any" bind:value={localData.value.m32} {onchange}> <input type="number" step="any" bind:value={localData.value.m33} {onchange}></div>
</div>

