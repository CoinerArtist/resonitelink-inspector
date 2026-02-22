<script lang="ts">
    import { link, shared } from "$shared";
    import CheckBox from "$components/CheckBox.svelte";

    let url = $state(localStorage.getItem("ResoniteLinkUrl") || "ws://localhost:PORT")
    function saveUrl(){ localStorage.setItem("ResoniteLinkUrl", url) }

    shared.resoniteLinkMode = JSON.parse(localStorage.getItem("ResoniteLinkMode") || "false")
    function saveMode(){ localStorage.setItem("ResoniteLinkMode", JSON.stringify(shared.resoniteLinkMode)) }

    function connect(){
        link.connect(url).catch(() => {
            shared.sendNotification(`Failed to connect to "${url}"`)
        })
    }

</script>

<style>    
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

    #readme{
        margin-right: 1em;
        color: var(--heroCyan);
    }

    #changelog{
        color: var(--light);
        text-decoration: none;
    }
    #changelog:hover{
        text-decoration: underline;
    }
</style>

<div>
    <span><input placeholder="url" onkeyup={saveUrl} bind:value={url}></span>
    <button onclick={connect}>Connect</button>
    <span><CheckBox bind:checked={shared.resoniteLinkMode} onclick={saveMode}/> ResoniteLink Info</span>
    <span id="version">
        <a id="readme" href="https://github.com/CoinerArtist/resonitelink-inspector">README.md</a>
        <a id="changelog" href="https://github.com/CoinerArtist/resonitelink-inspector/blob/main/changelog.md">v0.0.6</a>
    </span>
</div>