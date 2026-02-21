<script lang="ts">
    import "../app.css"
    import { shared } from "$shared";
    import Settings from "$components/Settings.svelte";
    import TreeView from "$components/TreeView/TreeView.svelte";
    import SlotView from "$components/SlotView/SlotView.svelte";
    import MouseNotification from "$components/MouseNotification.svelte";
</script>

<style>
    #outer{
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    #inspector {
        display: grid;
        grid-template-columns: 2fr 3fr;
        grid-template-rows: 100%;
        padding: 8px;
        box-sizing: border-box;
        flex-grow: 1;
        min-height: 0;
    }
</style>


<div id="outer">
    <Settings />
    <div id="inspector">
        <div style="height: 100%;"><TreeView bind:slotId={shared.rootSlotId}/></div>
        <div style="height: 100%;"><SlotView bind:slotId={shared.selectedSlot} /></div>
    </div>
    
    <MouseNotification />
</div>