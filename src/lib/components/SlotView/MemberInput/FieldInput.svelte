<script lang="ts">
    import { getTsTypeFromResoniteType, isNullableType } from "@coin/resonitelink-ts";
    import type {boolean2, boolean3, boolean4, color, colorX, Field, FieldGeneric, number2, number2x2, number3, number3x3, number4, number4x4, numberQ, rect} from "@coin/resonitelink-ts"
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
    import FieldBoolean2 from "./Fields/FieldBoolean2.svelte";
    import FieldBoolean3 from "./Fields/FieldBoolean3.svelte";
    import FieldBoolean4 from "./Fields/FieldBoolean4.svelte";
    import FieldNumber2x2 from "./Fields/FieldNumber2x2.svelte";
    import FieldNumber3x3 from "./Fields/FieldNumber3x3.svelte";
    import FieldNumber4x4 from "./Fields/FieldNumber4x4.svelte";
    import FieldRect from "./Fields/FieldRect.svelte";
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
{:else if tsType === "boolean2"}
    <FieldBoolean2 data={data as FieldGeneric<string, boolean2>} {changeField}/>
{:else if tsType === "number3"}
    <FieldNumber3 data={data as FieldGeneric<string, number3>} {changeField}/>
{:else if tsType === "boolean3"}
    <FieldBoolean3 data={data as FieldGeneric<string, boolean3>} {changeField}/>
{:else if tsType === "number4"}
    <FieldNumber4 data={data as FieldGeneric<string, number4>} {changeField}/>
{:else if tsType === "boolean4"}
    <FieldBoolean4 data={data as FieldGeneric<string, boolean4>} {changeField}/>
{:else if tsType === "numberQ"}
    <FieldNumberQ data={data as FieldGeneric<string, numberQ>} {changeField}/>
{:else if tsType === "number2x2"}
    <FieldNumber2x2 data={data as FieldGeneric<string, number2x2>} {changeField}/>
{:else if tsType === "number3x3"}
    <FieldNumber3x3 data={data as FieldGeneric<string, number3x3>} {changeField}/>
{:else if tsType === "number4x4"}
    <FieldNumber4x4 data={data as FieldGeneric<string, number4x4>} {changeField}/>
{:else if tsType === "color"}
    <FieldColor data={data as FieldGeneric<string, color>} {changeField}/>
{:else if tsType === "colorX"}
    <FieldColorX data={data as FieldGeneric<string, colorX>} {changeField}/>
{:else if tsType === "string | null"}
    <FieldStringNullable data={data as FieldGeneric<string, string|null>} {changeField}/>
{:else if tsType === "string"}
    <FieldString data={data as FieldGeneric<string, string>} {changeField}/>
{:else if tsType === "rect"}
    <FieldRect data={data as FieldGeneric<string, rect>} {changeField}/>
{:else}
    <span class="type">{tsType}</span>
{/if}
