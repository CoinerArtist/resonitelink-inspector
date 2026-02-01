<script lang="ts">
    import type { Member } from "@coin/resonitelink-ts";
    import { link, shared } from "../../shared.svelte";
    import MemberInput from "./MemberInput.svelte";
    import SlotComponent from "./SlotComponent.svelte";
    import { tryUpdate } from "../../util";
    import { onDestroy, onMount } from "svelte";

    let {data: slot} = $derived((shared.selectedSlot === "" ? {data: null} : await link.getSlot(shared.selectedSlot)))

    async function changeField(name: string, data: Member){
        await link.updateSlot({
            id: shared.selectedSlot,
            [name]: data
        })
        slot = (await link.getSlot(shared.selectedSlot)).data
    }

    async function changeFieldDisplay(name: string, data: Member){
        await changeField(name, data)
        tryUpdate(shared.selectedSlot)
    }

    async function changeFieldParent(name: string, data: Member){
        const parentId = slot!.parent.targetId
        await changeField(name, data)
        if(parentId) tryUpdate(parentId)
        if(slot!.parent.targetId) tryUpdate(slot!.parent.targetId)
        console.log(parentId)
    }

    async function update(){
        slot = (await link.getSlot(shared.selectedSlot)).data
    }

    onMount(() => {
        shared.componentUpdate = update
    })
    onDestroy(() => {
        shared.componentUpdate = () => {}
    })
</script>

<style>
    #outer{
        background-color: var(--dark);
        border-radius: 0.5em;
        padding: 0.5em;
        height: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
    }

    #info{
        color: var(--heroGreen)
    }
     
    #title{
        font-size: 1.8em;
        margin-bottom: 0.1em;
    }

    #content{
        height: 100%;
        overflow-y: scroll;
        overflow-x: hidden;
        scrollbar-width: thin;
    }
</style>

<div id="outer">
    <div id="title">Slot: {slot ? slot.name.value : ""} {#if slot && shared.resoniteLinkMode}<span id="info">({shared.selectedSlot})</span>{/if}</div>
    <div id="content">
        {#if slot}
            <MemberInput displayName="Name" name="name" data={{...slot.name, $type: "string"}} changeField={changeFieldDisplay} {update}/>
            <MemberInput displayName="Parent" name="parent" data={{...slot.parent, $type: "reference"}} changeField={changeFieldParent} {update}/>
            <MemberInput displayName="Tag" name="tag" data={{...slot.tag, $type: "string"}} {changeField} {update}/>
            <MemberInput displayName="Active" name="isActive" data={{...slot.isActive, $type: "bool"}} changeField={changeFieldDisplay} {update}/>
            <MemberInput displayName="Persistent" name="isPersistent" data={{...slot.isPersistent, $type: "bool"}} changeField={changeFieldDisplay} {update}/>
            <MemberInput displayName="Position" name="position" data={{...slot.position, $type: "float3"}} {changeField} {update}/>
            <MemberInput displayName="Rotation" name="rotation" data={{...slot.rotation, $type: "floatQ"}} {changeField} {update}/>
            <MemberInput displayName="Scale" name="scale" data={{...slot.scale, $type: "float3"}} {changeField} {update}/>
            <MemberInput displayName="OrderOffset" name="orderOffset" data={{...slot.orderOffset, $type: "long"}} {changeField} {update}/>
    
            {#each (slot.components || []) as component (component.id)}
                <SlotComponent componentId={component.id} />
            {/each}
        {/if}
    </div>
</div>