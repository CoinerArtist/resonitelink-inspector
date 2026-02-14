<script lang="ts">
    import type {Field, FieldGeneric} from "@coin/resonitelink-ts"
    const { data, changeField }: { data: FieldGeneric<string, string|null>, changeField: (data: Field) => void } = $props()

    const localData = $derived({...data})
    let value = $derived(localData.value || "")
    let isNull = $derived(localData.value === null)

    function onchange(){
        localData.value = isNull ? null : value
        changeField(localData as Field)
    }

    function onclick(){
        isNull = true
        onchange()
    }

    function onfocus(){
        isNull = false
    }
</script>

<style>
    button{
        width: 2.1em;
        height: 2.1em;
    }
    #null{
        transform: scale(1.5) translateY(-0.09em);
    }
</style>

<input type="text" placeholder={isNull ? "null" : ""} {onfocus} bind:value={value} {onchange}> <button {onclick}><div id="null">∅</div></button>