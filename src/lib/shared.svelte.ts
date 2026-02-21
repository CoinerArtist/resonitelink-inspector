import { ResoniteLinkClient } from "@coin/resonitelink-ts";

export const shared = $state({
    linkOpen: false,
    resoniteLinkMode: false,

    rootSlotId: "Root",
    selectedSlot: null as string|null,

    sendNotification: (() => {}) as (text: string, cssColor?: string) => void
})

export const link = new ResoniteLinkClient()

link.addEventListener("open", async () => {
        await link.requestSessionData()
        shared.linkOpen = true
    }
)
link.addEventListener("close", () => {
    shared.linkOpen = false
    shared.selectedSlot = ""
})
