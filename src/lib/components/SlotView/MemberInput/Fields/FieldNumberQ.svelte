<script lang="ts">
    import type {Field, FieldGeneric, numberQ} from "@coin/resonitelink-ts"
    import { roundTo } from "$lib/util";
    const { data, changeField }: { data: FieldGeneric<string, numberQ>, changeField: (data: Field) => void } = $props()

    const localData = $derived({...data})
    const q = $derived(data.value)

    // Euler YXZ
    // taken from https://stackoverflow.com/a/27496984
    const r11 = $derived(2*(q.x*q.z + q.w*q.y))
    const r12 = $derived(q.w*q.w - q.x*q.x - q.y*q.y + q.z*q.z)
    const r21 = $derived(-2*(q.y*q.z - q.w*q.x))
    const r31 = $derived(2*(q.x*q.y + q.w*q.z))
    const r32 = $derived(q.w*q.w - q.x*q.x + q.y*q.y - q.z*q.z)

    let x = $derived(roundTo(Math.asin(r21)*180/Math.PI, 1000))
    let y = $derived(roundTo(Math.atan2(r11, r12)*180/Math.PI, 1000))
    let z = $derived(roundTo(Math.atan2(r31, r32)*180/Math.PI, 1000))

    function onchange(){
        // taken from https://github.com/mrdoob/three.js/blob/master/src/math/Quaternion.js
        const c1 = Math.cos(x*Math.PI/360)
        const c2 = Math.cos(y*Math.PI/360)
        const c3 = Math.cos(z*Math.PI/360)
        const s1 = Math.sin(x*Math.PI/360)
        const s2 = Math.sin(y*Math.PI/360)
        const s3 = Math.sin(z*Math.PI/360)
    
        localData.value = {
            x: s1 * c2 * c3 + c1 * s2 * s3,
            y: c1 * s2 * c3 - s1 * c2 * s3,
            z: c1 * c2 * s3 - s1 * s2 * c3,
            w: c1 * c2 * c3 + s1 * s2 * s3
        }

        changeField(localData as Field)
    }
</script>

x <input type="number" bind:value={x} {onchange}>
y <input type="number" bind:value={y} {onchange}>
z <input type="number" bind:value={z} {onchange}>