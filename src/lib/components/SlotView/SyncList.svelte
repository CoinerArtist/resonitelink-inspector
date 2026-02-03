<script lang="ts">
    import type {Member, SyncList} from "@coin/resonitelink-ts"
    import MemberInput from "./MemberInput.svelte";
    const { data, changeField, update }: { data: SyncList, changeField: (data: SyncList) => void, update: () => void } = $props()

    const localData = $derived({...data})

    function change(name: string|number, data: Member){
        localData.elements[name as number] = data
        changeField(localData)
    }
</script>

<style>
    #outer{
        display: grid;
        gap: round(0.3em, 1px);
        grid-template-columns: 1fr 10fr;
        align-items: center;
    }
</style>

<div id="outer">
    {#each data.elements.entries() as [k, elememt] (elememt.id)}
        <MemberInput name={k} data={elememt} changeField={change} {update}/>
    {/each}
</div>