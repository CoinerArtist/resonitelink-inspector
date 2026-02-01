import { shared } from "./shared.svelte"

export function shortenType(type: string){
    return type
    .replaceAll("[FrooxEngine]FrooxEngine.UIX.", "")
    .replaceAll("[FrooxEngine]FrooxEngine.", "")
    .replaceAll("[Elements.Core]Elements.Core.", "")
    .replaceAll("[Elements.Assets]Elements.Assets.", "")
}

export function tryUpdate(slotId: string){
    if(shared.slotUpdate.has(slotId)) shared.slotUpdate.get(slotId)!()
}

export function roundTo(n: number, m: number){
    return Math.round(n*m)/m
}
export function floorTo(n: number, m: number){
    return Math.floor(n*m)/m
}