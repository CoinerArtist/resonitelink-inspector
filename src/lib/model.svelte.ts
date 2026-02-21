import { link } from "$shared";
import type { Component, ComponentDefinition, MemberDefinition, Slot, SlotData, TypeReference } from "@coin/resonitelink-ts";
import { SvelteMap } from "svelte/reactivity"

// --- //

export const slots = new SvelteMap<string, Slot|null>()

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

// --- //

export const components = new SvelteMap<string, Component>()

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

// --- //

export function makeGenericType(name: string){
    return name.replace(/<.+>$/, "<>")
}

// --- //

export const componentDefinitions = new SvelteMap<string, ComponentDefinition>()

export async function updateComponentDefinition(componentType: string){
    if(!componentDefinitions.has(componentType)){
        const res = await link.getComponentDefinition(componentType, true)
        componentDefinitions.set(componentType, res.definition)
    }
}

// --- //

export const enumDefinitions = new SvelteMap<string, string[]>()
const seen = new Set<string>()

export async function exploreType(typeName: string){
    if(!seen.has(typeName)){
        seen.add(typeName)

        const typeDef = (await link.getTypeDefinition(typeName)).definition

        const references: TypeReference[] = []
        references.push(...(typeDef.genericArguments || []))

        function exploreMember(v: MemberDefinition){
            if(v.$type === "field" || v.$type === "array"){
                references.push(v.valueType)
            } else if(v.$type === "list"){
                exploreMember(v.elementDefinition)
            } else if(v.$type === "syncObject"){
                references.push(v.type)
            }
        }


        if(typeDef.isComponent){
            const genericTypeName = makeGenericType(typeName)
            await updateComponentDefinition(genericTypeName)
            const componentDef = componentDefinitions.get(genericTypeName)!
            
            for(const v of Object.values(componentDef.members)){
                exploreMember(v)
            }
        } else if(typeDef.isEnum){
            if(!enumDefinitions.has(typeDef.name)){
                const enumDef = (await link.getEnumDefinition(typeDef.fullTypeName)).definition
                enumDefinitions.set(typeDef.name, Object.keys(enumDef.values))
            }
        }

        const flattenedRef: TypeReference[] = []
        while(references.length){
            const v = references.pop()!

            if(!v.isGenericParameter){
                flattenedRef.push(v)
                references.push(...(v.genericArguments || []))
            }
        }

        for(const v of flattenedRef){
            exploreType(v.type)
        }
    }
}