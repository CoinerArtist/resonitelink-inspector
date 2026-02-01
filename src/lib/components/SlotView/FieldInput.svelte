<script lang="ts">
    import { getTsTypeFromResoniteType, isNullableType } from "@coin/resonitelink-ts";
    import type {color, colorX, Field, FieldGeneric, Member, number2, number3, number4, numberQ} from "@coin/resonitelink-ts"
    import FieldNumber from "./Fields/FieldNumber.svelte";
    import FieldNumber3 from "./Fields/FieldNumber3.svelte";
    import FieldNumber2 from "./Fields/FieldNumber2.svelte";
    import FieldBoolean from "./Fields/FieldBoolean.svelte";
    import FieldEnum from "./Fields/FieldEnum.svelte";
    import FieldNumber4 from "./Fields/FieldNumber4.svelte";
    import FieldStringNullable from "./Fields/FieldStringNullable.svelte";
    import FieldString from "./Fields/FieldString.svelte";
    import FieldNullable from "./Fields/FieldNullable.svelte";
    import FieldNumberQ from "./Fields/FieldNumberQ.svelte";
    import FieldColor from "./Fields/FieldColor.svelte";
    import FieldColorX from "./Fields/FieldColorX.svelte";
    const { data, changeField }: { data: Field, changeField: (data: Field) => void } = $props()

    const tsType = $derived(getTsTypeFromResoniteType(data.$type))
</script>

<style>
    .type{
        font-size: 0.8em;
    }
</style>

{#if isNullableType(data.$type)}
    <FieldNullable {data} {changeField}/>
{:else if data.$type === "enum"}
    <FieldEnum data={data as FieldGeneric<"enum", string> & { enumType: string }} {changeField}/>
{:else if tsType === "boolean"}
    <FieldBoolean data={data as FieldGeneric<string, boolean>} {changeField}/>
{:else if tsType === "number"}
     <FieldNumber data={data as FieldGeneric<string, number>} {changeField}/>
{:else if tsType === "number2"}
    <FieldNumber2 data={data as FieldGeneric<string, number2>} {changeField}/>
{:else if tsType === "number3"}
    <FieldNumber3 data={data as FieldGeneric<string, number3>} {changeField}/>
{:else if tsType === "number4"}
    <FieldNumber4 data={data as FieldGeneric<string, number4>} {changeField}/>
{:else if tsType === "numberQ"}
    <FieldNumberQ data={data as FieldGeneric<string, numberQ>} {changeField}/>
{:else if tsType === "color"}
    <FieldColor data={data as FieldGeneric<string, color>} {changeField}/>
{:else if tsType === "colorX"}
    <FieldColorX data={data as FieldGeneric<string, colorX>} {changeField}/>
{:else if tsType === "string | null"}
    <FieldStringNullable data={data as FieldGeneric<string, string|null>} {changeField}/>
{:else if tsType === "string"}
    <FieldString data={data as FieldGeneric<string, string>} {changeField}/>
{:else}
    <span class="type">{tsType}</span>
{/if}
