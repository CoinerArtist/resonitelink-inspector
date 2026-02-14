<script lang="ts">
    import type {Field, FieldGeneric, color} from "@coin/resonitelink-ts"
    const { data, changeField }: { data: FieldGeneric<string, color>, changeField: (data: Field) => void } = $props()

    const localData = $derived({...data})

    function onchange(){
        changeField(localData as Field)
    }
</script>

<style>
    #outer{
        flex-grow: 1;
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
    #transparentbg{
        background-image: url("$lib/assets/empty.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        image-rendering: pixelated;
        display: flex;
    }
    #transparent{
        flex-grow: 1;
    }
</style>

R <input type="number" bind:value={localData.value.r} {onchange}>
G <input type="number" bind:value={localData.value.g} {onchange}>
B <input type="number" bind:value={localData.value.b} {onchange}>
A <input type="number" bind:value={localData.value.a} {onchange}>
<span id="outer">
    <span style="background-color: rgb({localData.value.r*100}% {localData.value.g*100}% {localData.value.b*100}%)"></span>
    <span id="transparentbg">
        <span id="transparent" style="background-color: rgb({localData.value.r*100}% {localData.value.g*100}% {localData.value.b*100}% / {localData.value.a*100}%)"></span>
    </span>
</span>