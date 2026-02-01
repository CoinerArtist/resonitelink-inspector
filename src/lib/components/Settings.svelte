<script lang="ts">
    import { link, shared } from "../shared.svelte";
    import CheckBox from "./CheckBox.svelte";

    let url = $state(localStorage.getItem("ResoniteLinkUrl") || "ws://localhost:PORT")
    function saveUrl(){ localStorage.setItem("ResoniteLinkUrl", url) }

    shared.resoniteLinkMode = JSON.parse(localStorage.getItem("ResoniteLinkMode") || "false")
    function saveMode(){ localStorage.setItem("ResoniteLinkMode", JSON.stringify(shared.resoniteLinkMode)) }

    let errorMessage = $state("")

    function connect(){
        link.connect(url).catch(() => {
            errorMessage = `Failed to connect to "${url}".`
            setTimeout(() => errorMessage = "", 2000)
        })
    }

</script>

<style>
    #errorMessage{
        color: var(--heroRed);
    }
    
    div{
        display: flex;
        align-items: center;
        gap: 0.3em;
        margin: 8px;
    }

    #version{
        flex-grow: 1;
        text-align: right;
    }

    input{
        width: 20em;
    }

    a{
        margin-right: 1em;
        color: var(--heroCyan);
    }
</style>

<div>
    <span><input placeholder="url" onkeyup={saveUrl} bind:value={url}></span>
    <button onclick={connect}>Connect</button>
    <span id="errorMessage">{errorMessage}</span>
    <span><CheckBox bind:checked={shared.resoniteLinkMode} onclick={saveMode}/> ResoniteLink Info</span>
    <span id="version"><a href="https://github.com/CoinerArtist/resonitelink-inspector">README.md</a> v0.0.1</span>
</div>