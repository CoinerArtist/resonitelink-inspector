<script lang="ts">
    import type {color, colorX, Field, FieldGeneric} from "@coin/resonitelink-ts"
    import FieldColor from "./FieldColor.svelte";
    const { data, changeField }: { data: FieldGeneric<string, colorX>, changeField: (data: Field) => void } = $props()

    let localData = $derived({...data})

    function onchange(data: Field){
        const value = data.value as color
        localData.value.r = value.r
        localData.value.g = value.g
        localData.value.b = value.b
        localData.value.a = value.a
        changeField(localData as Field)
    }
</script>

<style>
    #outer{
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        gap: 0.3em
    }
    #color, #enum{
        display: flex; 
        gap: 0.3em;
        flex-grow: 1;
    }
    #profile{
        display: flex;
        gap: 1em;
    }
</style>

<div id="outer">
    <div id="color">
        <FieldColor data={data as FieldGeneric<string, color>} changeField={onchange}/>
    </div>
    <div id="profile">
        Profile 
        <span id="enum">
            <select bind:value={localData.value.profile} onchange={() => changeField(localData as Field)}>
                <option value="Linear">Linear</option>
                <option value="sRGB">sRGB</option>
                <option value="sRGBAlpha">sRGBAlpha</option>
            </select>
        </span>
    </div>
</div>