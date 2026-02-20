<script lang="ts">
    import {getPrimitiveType, getTsTypeFromResoniteType, type Field} from "@coin/resonitelink-ts"
    import FieldInput from "../FieldInput.svelte";
    import CheckBox from "$components/CheckBox.svelte";
    import { enumDefinitions } from "$model";
    const { data, changeField }: { data: Field, changeField: (data: Field) => void } = $props()

    const localData = $derived({...data})

    const newData = $derived({
        $type: getPrimitiveType(data.$type),
        id: data.id,
        value: data.value === null ? getDefaultValue() : data.value,
        enumType: data.$type === "enum?" ? data.enumType : undefined
    })
    
    let isNotNull = $derived(data.value !== null)

    function onchange(data: Field){
        localData.value = isNotNull ? data.value : null
        changeField(localData)
    }

    function getDefaultValue(): Field["value"] {
        if(localData.$type === "enum?"){
            return (enumDefinitions.get(localData.enumType) || [""])[0]
        }

        switch(getTsTypeFromResoniteType(getPrimitiveType(localData.$type))){
            case "number": return 0
            case "boolean": return false
            case "string": return ""

            case "boolean2": return {x: false, y: false}
            case "boolean3": return {x: false, y: false, z: false}
            case "boolean4": return {x: false, y: false, z: false, w: false}

            case "number2": return {x: 0, y: 0}
            case "number3": return {x: 0, y: 0, z: 0}
            case "number4": return {x: 0, y: 0, z: 0, w: 0}

            case "number2x2": return {
                m00: 0, m01: 0,
                m10: 0, m11: 0
            }
            case "number3x3": return {
                m00: 0, m01: 0, m02: 0,
                m10: 0, m11: 0, m12: 0,
                m20: 0, m21: 0, m22: 0
            }
            case "number4x4": return {
                m00: 0, m01: 0, m02: 0, m03: 0,
                m10: 0, m11: 0, m12: 0, m13: 0,
                m20: 0, m21: 0, m22: 0, m23: 0,
                m30: 0, m31: 0, m32: 0, m33: 0
            }

            case "Rect": return {position: {x: 0, y: 0}, size: {x: 0, y: 0}}
            case "BoundingBox": return {min: {x: 0, y: 0, z: 0}, max: {x: 0, y: 0, z: 0}}

            default: return {} as Field["value"]
        }
    }

    function defaultchange(){
        localData.value = isNotNull ? getDefaultValue() : null
        newData.value = getDefaultValue()
        changeField(localData)
    }
</script>

<style>
    #null{
        padding-right: 1em;
        width: max-content;
    }
    #content{
        flex-grow: 1;
        display: flex;
        gap: 0.3em;
    }
</style>

<span id="null"><CheckBox bind:checked={isNotNull} onclick={defaultchange}/>?</span>
<span id="content" style={isNotNull ? "" : "filter: opacity(50%); pointer-events: none;"}><FieldInput data={newData as Field} changeField={onchange}/></span>