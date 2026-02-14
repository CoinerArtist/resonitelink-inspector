<script lang="ts">
    import type {Member, SyncObject} from "@coin/resonitelink-ts"
    import MemberInput from "./MemberInput.svelte";
    const { data, changeField, update }: { data: SyncObject, changeField: (data: SyncObject) => void, update: () => void } = $props()

    const localData = $derived({...data})

    function change(name: string|number, data: Member){
        localData.members[name] = data
        changeField(localData)
    }
</script>

<style>
    #outer{
        display: grid;
        gap: round(0.3em, 1px);
        grid-template-columns: 1fr 4fr;
        width: 100%;
        
        border-left: round(0.3em, 1px) solid black;
        padding-left: round(0.3em, 1px);
    }
</style>

<div id="outer">
    {#each Object.entries(data.members) as [k, elememt] (elememt.id)}
        <MemberInput name={k} data={elememt} changeField={change} {update}/>
    {/each}
</div>