<script lang="ts">
    import type { Member, Slot } from "@coin/resonitelink-ts";
    import { link, shared } from "$shared";
    import MemberInput from "./MemberInput/MemberInput.svelte";
    import SlotComponent from "./SlotComponent.svelte";
    let { slotId = $bindable(null) }: { slotId?: string|null} = $props()

    import imgDestroy from "$assets/icon/Color_Destroy.svg"
    import imgDestroyPreservingAssets from "$assets/icon/Color_DestroyPreservingAssets.svg"
    import imgInsertParent from "$assets/icon/Color_InsertParent.svg"
    import imgAddChild from "$assets/icon/Color_AddChild.svg"
    import imgDuplicate from "$assets/icon/Color_Duplicate.svg"
    import imgSetRoot from "$assets/icon/Color_SetRoot.svg"
    import { slots, updateSlot, updateSlots } from "$model";

    let slot: Slot|undefined|null = $derived(slotId === null ? undefined : slots.get(slotId))

    $effect(() => {
        if(shared.linkOpen && slotId){
            updateSlot(slotId)
        }
    })

    $effect(() => {
        if(slot === null){
            shared.sendNotification("Couldn't get selected slot.")
            slotId = null
        }
    })

    function update(){
        if(slot){
            updateSlot(slot.id)
        }
    }

    async function changeField(name: string|number, data: Member){
        if(slot){
            await link.updateSlot({
                id: slot.id,
                [name]: data
            })
            updateSlot(slot.id)
        }
    }

    async function changeFieldDisplay(name: string|number, data: Member){
        if(slot){
            await changeField(name, data)
            updateSlot(slot.id)
        }
    }

    async function changeFieldParent(name: string|number, data: Member){
        if(slot){
            const parentId = slot!.parent.targetId
            await changeField(name, data)
            if(parentId){
                updateSlot(parentId)
            }
            if(slot!.parent.targetId){
                updateSlot(slot!.parent.targetId)
            }
        }
    }

    function todo(){
        shared.sendNotification("This doesn't do anything (yet)")
    }

    function destroy(){
        if(slot && slot.parent.targetId){
            const parent = slot.parent.targetId
            link.removeSlot(slot.id).then(() => {
                slotId = null
                updateSlot(parent)
            }).catch(e => {
                shared.sendNotification("Failed to destroy.")
                console.error(e)
            })
        }
    }

    function insertParent(){
        if(slot && slot.parent.targetId){
            const parent = slot.parent.targetId
            const newParent = link.getUniqueId()
            link.batch()
            .addSlot({
                id: newParent,
                parent: {targetId: parent},
                name: {value: `${slot.name.value} - Parent`},
                tag: {value: slot.tag.value},
                position: {value: slot.position.value},
                rotation: {value: slot.rotation.value},
                scale: {value: slot.scale.value},
            })
            .updateSlot({
                id: slot.id,
                parent: {targetId: newParent},
                position: {value: {x: 0, y: 0, z: 0}},
                rotation: {value: {x: 0, y: 0, z: 0, w: 1}},
                scale: {value: {x: 1, y: 1, z: 1}}
            })
            .send()
            .then(() => {
                updateSlots([slot.id, parent])
            }).catch(e => {
                shared.sendNotification("Failed to insert parent.")
                console.error(e)
            })
        }
    }

    async function addChild(){
        if(slot){
            const id = slot.id
            await link.addSlot({
                parent: {targetId: slot.id},
                name: {value: `${slot.name.value} - Child`},
                tag: {value: slot.tag.value},
            })
            updateSlot(id)
        }
    }

    function setRoot(){
        if(slot){
            shared.rootSlotId = slot.id
        }
    }

    async function resetPosition(){
        if(slot){
            await link.updateSlot({
                id: slot.id,
                position: {value: {x: 0, y: 0, z: 0}}
            })
            updateSlot(slot.id)
        }
    }
    async function resetRotation(){
        if(slot){
            await link.updateSlot({
                id: slot.id,
                rotation: {value: {x: 0, y: 0, z: 0, w: 1}}
            })
            updateSlot(slot.id)
        }
    }
    async function resetScale(){
        if(slot){
            await link.updateSlot({
                id: slot.id,
                scale: {value: {x: 1, y: 1, z: 1}}
            })
            updateSlot(slot.id)
        }
    }

    async function parentUnderRoot(){
        if(slot && slot.parent.targetId){
            const parent = slot.parent.targetId

            await link.updateSlot({
                id: slot.id,
                parent: {targetId: "Root"}
            })

            updateSlots([slot.id, "Root", parent])
        }
    }
</script>

<style>
    #outer{
        background-color: var(--dark);
        border-radius: 0.5em;
        padding: 0 0.3em;
        height: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
    }

    #info{
        color: var(--heroGreen)
    }
     
    #content{
        height: 100%;
        overflow-y: scroll;
        overflow-x: hidden;
        scrollbar-width: thin;

        display: grid;
        grid-template-columns: 1fr 3fr;
        padding: round(0.3em, 1px);
        gap: round(0.3em, 1px);
        font-size: 1.2em;
        align-items: center;
        align-content: flex-start;

        margin: 0.5em 0;
    }

    #topbar{
        display: flex;
        gap: round(0.3em, 1px);
    }
    #title{
        font-size: 1.8em;
        margin-bottom: 0.1em;
        flex-grow: 1;
        text-align: center;
    }
    #topbar>button>img{
        height: 100%;
    }

    button{
        border-top: 0px;
        border-bottom: 0px;
        height: 100%;
        font-size: 0.9em;
        border-radius: 0.4em;
    }

    #basis {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        text-align: center;
    }

    .wide{
        grid-column: 1 / 3;
    }
    .center{
        text-align: center;
    }


</style>

<div id="outer">
    <div id="topbar">
        <div id="title">Slot: {slot ? slot.name.value : ""} {#if slot && shared.resoniteLinkMode}<span id="info">({slot.id})</span>{/if}</div>
        <button onclick={destroy}><img src={imgDestroy} title="Destroy"></button>
        <button onclick={todo}><img src={imgDestroyPreservingAssets} title="Destroy Preserving Assets"></button>
        <button onclick={insertParent}><img src={imgInsertParent} title="Insert Parent"></button>
        <button onclick={addChild}><img src={imgAddChild} title="Add Child"></button>
        <button onclick={todo}><img src={imgDuplicate} title="Duplicate"></button>
        <button onclick={setRoot}><img src={imgSetRoot} title="Set Root"></button>
    </div>

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

            <div id="basis" class="wide">
                <div style="color: #f00">X: +Right -Left</div>
                <div style="color: #0f0">Y: +Up -Down</div>
                <div style="color: #00f">Z: +Forward -Backward</div>
            </div>

            <div class="center">Reset:</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: round(0.3em, 1px)">
                <button onclick={resetPosition}>Position</button>
                <button onclick={resetRotation}>Rotation</button>
                <button onclick={resetScale}>Scale</button>
            </div>

            <button class="wide" onclick={todo}>Create Pivot At Center</button>

            <div class="wide" style="display: grid; grid-template-columns: 1fr 1fr; gap: round(0.3em, 1px)">
                <button onclick={todo}>Jump To</button>
                <button onclick={todo}>Bring To</button>
            </div>

            <div class="center">Parent Under:</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: round(0.3em, 1px)">
                <button onclick={todo}>Local User Space</button>
                <button onclick={parentUnderRoot}>World Root</button>
            </div>
    
            {#each (slot.components || []) as component (component.id)}
                <SlotComponent componentId={component.id} />
            {/each}
        {/if}
    </div>
</div>