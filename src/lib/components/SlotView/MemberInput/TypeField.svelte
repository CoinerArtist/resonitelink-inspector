<script lang="ts">
    import type {Member, TypeField} from "@coin/resonitelink-ts"
    const { data, changeField }: { data: TypeField, changeField: (data: Member) => void } = $props()

    const localData = $derived({...data})
    let value = $derived(localData.type || "")
    let isNull = $derived(localData.type === null)

    function onchange(){
        localData.type = isNull ? null : value
        changeField(localData)
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

<input type="text" placeholder={isNull ? "null" : ""} {onfocus} bind:value={value} {onchange}> 
<button {onclick}><div id="null">∅</div></button>