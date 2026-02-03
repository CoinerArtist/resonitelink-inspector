<script lang="ts">
    import {getPrimitiveType, getTsTypeFromResoniteType, type Field, type number2} from "@coin/resonitelink-ts"
    import FieldInput from "../FieldInput.svelte";
    import CheckBox from "../../CheckBox.svelte";
    const { data, changeField }: { data: Field, changeField: (data: Field) => void } = $props()

    const localData = $derived({...data})

    const newData = $derived({
        $type: getPrimitiveType(data.$type),
        id: data.id,
        value: data.value === null ? getDefaultValue() : data.value 
    })
    
    let isNotNull = $derived(data.value !== null)

    function onchange(data: Field){
        localData.value = isNotNull ? data.value : null
        changeField(localData)
    }

    function getDefaultValue(): Field["value"] {
        switch(getTsTypeFromResoniteType(getPrimitiveType(localData.$type))){
            case "number": return 0
            case "boolean": return false
            case "string": return ""

            case "boolean2":
            case "boolean3":
            case "boolean4": return {x: false, y: false, z: false, w: false}

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
<span id="content" style={isNotNull ? "" : "filter: opacity(50%);"}><FieldInput data={newData as Field} changeField={onchange}/></span>