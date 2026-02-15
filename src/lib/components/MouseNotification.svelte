<script lang="ts">
    import { shared } from "$shared";

    let mouseX = $state(0)
    let mouseY = $state(0)

    document.addEventListener("pointermove", event => {
        mouseX = event.clientX
        mouseY = event.clientY
    })

    let text = $state("")
    let scale = $state(0)
    let color = $state("var(--heroRed)")
    let timeout = -1

    let div: HTMLDivElement

    function sendNotification(txt: string, cssColor="var(--heroRed)"){
        text = txt 
        color = cssColor
        if(scale === 1){
            div.classList.add("notransition")
            scale = 0
            setTimeout(() => {
                div.classList.remove("notransition")
                scale = 1
            }, 50)
        } else {
            scale = 1
        }

        clearTimeout(timeout)
        timeout = setTimeout(() => {
            scale = 0
        }, 5000)
    }

    shared.sendNotification = sendNotification
</script>

<style>
    div{
        position: fixed;
        padding: 0.3em;
        font-size: 1.3em;
        
        background-color: var(--dark);
        border: solid 3px;
        border-radius: 0.5em;

        transition: transform 0.3s;
        transform-origin: top right;
    }

    .notransition{
        transition: none !important;
    }
</style>

{#if false}
    <div class="notransition"></div>
{/if}

<div bind:this={div} style="border-color: {color}; top: {mouseY}px; right: calc(100vw - {mouseX}px + round(0.3em, 1px)); transform: scale({scale});">
    {text}
</div>