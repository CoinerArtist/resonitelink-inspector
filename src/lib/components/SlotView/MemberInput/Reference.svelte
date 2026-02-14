<script lang="ts">
    import type {Member, Reference} from "@coin/resonitelink-ts"
    import { shortenType } from "$lib/util";
    const { data, changeField }: { data: Reference, changeField: (data: Member) => void } = $props()

    const localData = $derived({...data})
    let value = $derived(localData.targetId || "")
    let isNull = $derived(localData.targetId === null)

    function onchange(){
        localData.targetId = isNull ? null : value
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

    input{
        background-color: var(--mid);
    }
    input:hover{
        background-color: var(--midHover);
    }
    input:active{
        background-color: var(--midActive);
    }

    .type{
        font-size: 0.8em;
    }
</style>

<input type="text" placeholder={isNull ? "null" : ""} {onfocus} bind:value={value} {onchange}> 
<button {onclick}><div id="null">∅</div></button> 
<span class="type">({shortenType(localData.targetType)})</span>