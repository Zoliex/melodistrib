import { useDataStore } from '@/stores/dataStore'
import { useDistributionStore } from '@/stores/distributionStore'

/**
 * Exports the current musicians to a JSON string.
 *
 * The musicians are serialized into a JSON array where each element is an array
 * containing the musician's UUID, surname, and name.
 *
 * @returns A promise that resolves to the JSON string representation of the musicians.
 */
export async function exportMusiciansJson(): Promise<any> {
    const data = useDataStore()

    return data.musicians.map((musician) => [musician.uuid, musician.surname, musician.name])
}

/**
 * Exports the current tracks to a JSON string.
 *
 * The tracks are serialized into a JSON array where each element is an array
 * containing the track's UUID, name, and maximum number of musicians.
 *
 * @returns A promise that resolves to the JSON string representation of the tracks.
 */
export async function exportTracksJson(): Promise<any> {
    const data = useDataStore()

    return data.tracks.map((track) => [track.uuid, track.name, track.maxMusicians])
}

/**
 * Exports the current track selections to a JSON string.
 *
 * The selections are serialized into a JSON array where each element is an array
 * containing the UUID of a musician followed by the UUIDs of the tracks they have
 * selected.
 *
 * @returns A promise that resolves to the JSON string representation of the selections.
 */
export async function exportSelectionsJson(): Promise<any> {
    const data = useDataStore()

    return data.musicians.map((musician) => [musician.uuid, ...musician.selectedTracks])
}

/**
 * Exports the current distribution to a JSON string.
 *
 * The distribution is serialized into a JSON array where each element is an array
 * containing the UUID of a track, an array of UUIDs of musicians assigned to that track,
 * and an array of UUIDs of musicians rejected from that track.
 *
 * @returns A promise that resolves to the JSON string representation of the distribution.
 */
export async function exportDistributionJson(): Promise<any> {
    const distribution = useDistributionStore()

    return distribution.distribution.map((track) => [track.trackUUID, track.assignedMusiciansUUID, track.rejectedMusiciansUUID])
}

/**
 * Exports the current musicians to a MELM2 file.
 *
 * This function first converts the current musicians into a JSON string using
 * `exportMusiciansJson`. It then prompts the user to save this JSON data to a file
 * with the .melm2 extension via the Electron IPC renderer.
 */
export async function exportMusiciansFile() {
    console.log(`💾 Exporting musicians to MELM2 file...`)

    const json = await exportMusiciansJson()

    if (window.ipcRenderer) {
        window.ipcRenderer.send(
            'save-file',
            'Enregistrer un fichier de musiciens',
            JSON.stringify(json),
            [{ name: 'Fichier musiciens', extensions: ['melm2'] }]
        )
    }

    console.log(`✅ Musicians exported successfully! 🎉`)
}

/**
 * Exports the current tracks to a MELT2 file.
 *
 * This function first converts the current tracks into a JSON string using
 * `exportTracksJson`. It then prompts the user to save this JSON data to a file
 * with the .melt2 extension via the Electron IPC renderer.
 */
export async function exportTracksFile() {
    console.log(`💾 Exporting tracks to MELT2 file...`)

    const json = await exportTracksJson()

    if (window.ipcRenderer) {
        window.ipcRenderer.send(
            'save-file',
            'Enregistrer un fichier de morceaux',
            JSON.stringify(json),
            [{ name: 'Fichier morceaux', extensions: ['melt2'] }]
        )
    }

    console.log(`✅ Tracks exported successfully! 🎉`)
}

/**
 * Exports all data to a MELS2 file.
 *
 * This function first converts the current musicians, tracks and selections into a
 * JSON object using `exportMusiciansJson`, `exportTracksJson` and
 * `exportSelectionsJson` respectively. It then prompts the user to save this JSON
 * data to a file with the .mels2 extension via the Electron IPC renderer.
 */
export async function exportAllFile() {
    console.log(`💾 Exporting all data to MELS2 file...`)

    const json = {
        musicians: await exportMusiciansJson(),
        tracks: await exportTracksJson(),
        selectedTracks: await exportSelectionsJson()
    }

    if (window.ipcRenderer) {
        window.ipcRenderer.send(
            'save-file',
            'Enregistrer un fichier de sélections',
            JSON.stringify(json),
            [{ name: 'Fichier sélections', extensions: ['mels2'] }]
        )
    }

    console.log(`✅ All data exported successfully! 🎉`)
}

/**
 * Exports the current distribution to a MELD2 file.
 *
 * This function first converts the current distribution into a JSON string using
 * `exportDistributionJson`. It then prompts the user to save this JSON data to a file
 * with the .meld2 extension via the Electron IPC renderer.
 */
export async function exportDistributionFile() {
    console.log(`💾 Exporting distribution to MELD2 file...`)

    const json = {
        musicians: await exportMusiciansJson(),
        tracks: await exportTracksJson(),
        selectedTracks: await exportSelectionsJson(),
        distribution: await exportDistributionJson()
    }

    if (window.ipcRenderer) {
        window.ipcRenderer.send(
            'save-file',
            'Enregistrer un fichier de distribution',
            JSON.stringify(json),
            [{ name: 'Fichier distribution', extensions: ['meld2'] }]
        )
    }

    console.log(`✅ Distribution exported successfully! 🎉`)
}

export async function exportToWord() {
    console.log(`💾 Exporting distribution to Word file...`)
    const data = useDataStore()
    const distribution = useDistributionStore()
    if(window.ipcRenderer) {
        if (data.tracks.length == 0 || data.musicians.length == 0 || distribution.distribution.length == 0) return
        //Recalc similarities and stats to ensure they are up to date
        await distribution.recalcEverySimilarities()
        await distribution.recalcEveryStats()

        const clonedData = JSON.parse(JSON.stringify({
                tracks: data.tracks,
                musicians: data.musicians,
                distribution: distribution.distribution,
                stats: distribution.stats
        }))

        window.ipcRenderer.send('export-word', clonedData)
    }
    
    console.log(`✅ Distribution exported successfully! 🎉`)
}