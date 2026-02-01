<script lang="ts">
  import "./app.css"
  import Settings from "./lib/components/Settings.svelte";
  import TreeView from "./lib/components/TreeView/TreeView.svelte";
  import SlotView from "./lib/components/SlotView/SlotView.svelte";
</script>

<style>
  #inspector{
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
    <div style="height: 100%;"><TreeView /></div>
    <div style="height: 100%;"><SlotView /></div>
  </div>
</div>