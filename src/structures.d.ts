interface Musician {
    name: string
    surname: string
    uuid: string
    selectedTracks: string[]
}

interface Track {
    uuid: string
    name: string
    maxMusicians: number
}

interface DistributionItem {
    trackUUID: string
    assignedMusiciansUUID: string[]
    rejectedMusiciansUUID: string[]
    musiciansInCommonWithNextTrack?: string[]
}

interface StatsMusicianItem {
    uuid: string
    totalAssignedTracks: number
    totalSelectedTracks: number
}

interface Stats {
    musicians: StatsMusicianItem[]
    distribution: { meanAssigned: number; meanSelected: number; meanRatio: number }
}
