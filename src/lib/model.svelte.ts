import { link } from "$shared";
import type { Component, Slot, SlotData } from "@coin/resonitelink-ts";
import { SvelteMap } from "svelte/reactivity"

export const slots: SvelteMap<string, Slot|null> = new SvelteMap()
export const components: SvelteMap<string, Component> = new SvelteMap()

export function updateSlot(id: string){
    return link.getSlot(id)
    .then(x => {
        slots.set(id, x.data)
        return x.data
    })
    .catch(() => {
        slots.set(id, null)
        return null
    })
}

export async function updateSlots(ids: string[]){
    const res = await link.dataModelOperationBatch(ids.map(id => {
        return {
            $type: "getSlot",
            slotId: id
        }
    }))
    const responses = res.responses as SlotData[]

    for(let i=0; i<ids.length; i++){
        if(responses[i].success){
            slots.set(ids[i], responses[i].data)
        } else {
            slots.delete(ids[i])
        }
    }
}

export function updateComponent(id: string){
    return link.getComponent(id)
    .then(x => {
        components.set(id, x.data)
        return x.data
    })
    .catch(() => {
        components.delete(id)
        return null
    })
}