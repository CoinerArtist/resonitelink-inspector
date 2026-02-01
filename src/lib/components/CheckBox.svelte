<script lang="ts">
    let { checked=$bindable(false), onclick=()=>{} }: { checked?: boolean, onclick?: () => void } = $props()

    function click(){
        checked = !checked
        onclick()
    }
</script>

<style>
    button{
        background-color: var(--mid);
        color: var(--light);
        border: none;
        width: 2em;
        height: 2em;
        border-radius: 0.5em;
    }
    button:hover{
        background-color: var(--midHover);
    }
    button:active{
        background-color: var(--midActive);
    }

    span{
        font-size: 1.4em;
    }
</style>

<button onclick={click}><span style="visibility:{checked ? "visible" : "hidden"};">✔</span></button>