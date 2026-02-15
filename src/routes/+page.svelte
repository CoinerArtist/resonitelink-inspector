<script lang="ts">
    import "../app.css"
    import { shared } from "$shared";
    import Settings from "$components/Settings.svelte";
    import TreeView from "$components/TreeView/TreeView.svelte";
    import SlotView from "$components/SlotView/SlotView.svelte";
    import MouseNotification from "$components/MouseNotification.svelte";
</script>

<style>
    #inspector {
        display: grid;
        grid-template-columns: 2fr 3fr;
        grid-template-rows: 100%;
        height: 100vh;
        padding: 8px;
        box-sizing: border-box;
    }
</style>


<div id="outer">
    <Settings />
    <div id="inspector">
        <div style="height: 100%;"><TreeView slotId={shared.rootSlotId}/></div>
        <div style="height: 100%;"><SlotView /></div>
    </div>
    
    <MouseNotification />
</div>