import { ResoniteLinkClient } from "@coin/resonitelink-ts";

export const shared = $state({
    linkOpen: false,
    resoniteLinkMode: false,

    selectedSlot: "",
    slotUpdate: new Map<string, () => void>(),

    componentUpdate: () => {}
})

export const link = new ResoniteLinkClient()

link.addEventListener("open", () => shared.linkOpen = true)
link.addEventListener("close", () => {
    shared.linkOpen = false
    shared.selectedSlot = ""
})
