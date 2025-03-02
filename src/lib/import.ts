import { DATA_ORDER, useDataStore } from '@/stores/dataStore'
import { useDistributionStore } from '@/stores/distributionStore'
import { useDistributionViewStore } from '@/stores/ditributionViewStore'

//FUNDAMENTAL FUNCTIONS

/**
 * Imports musicians from a JSON object.
 *
 * The JSON object should contain an array of arrays, each containing the UUID, surname and name for a musician.
 * The musicians are then added to the state.
 *
 * @param json - The JSON object containing the musicians.
 */
export async function importMusiciansJson(json: any) {
    const data = useDataStore()

    if (!json) return

    //Flush data
    data.flushMusicians()

    json.forEach((musician: unknown[]) => {
        if (
            musician.length === 3 &&
            typeof musician[0] === 'string' &&
            typeof musician[1] === 'string' &&
            typeof musician[2] === 'string'
        ) {
            const [uuid, surname, name] = musician as [string, string, string]
            if (name != '' && surname != '' && uuid != '') {
                data.addMusician(name, surname, uuid)
            } else {
                console.log(
                    `Musician data not correct, will not add: ${JSON.stringify(musician)} 😢`
                )
            }
        } else {
            console.log(`Musician data not correct, will not add: ${JSON.stringify(musician)} 😢`)
        }
    })

    console.log(`✅ Tracks imported successfully! 🎉`)
}

/**
 * Imports tracks from a JSON object.
 *
 * The JSON object should contain an array of arrays, each containing the UUID,
 * name, and maximum number of musicians for a track. The tracks are then added
 * to the state after flushing existing track data.
 *
 * @param json - The JSON object containing the tracks to import.
 */

export async function importTracksJson(json: any) {
    const data = useDataStore()

    if (!json) return

    //Flush data
    data.flushTracks()

    json.forEach((track: unknown[]) => {
        if (
            track.length === 3 &&
            typeof track[0] === 'string' &&
            typeof track[1] === 'string' &&
            typeof track[2] === 'number'
        ) {
            const [uuid, name, maxMusicians] = track as [string, string, number]
            if (name != '' && maxMusicians > 0 && uuid != '') {
                data.addTrack(name, maxMusicians, uuid)
            } else {
                console.log(`Track data not correct, will not add: ${JSON.stringify(track)} 😢`)
            }
        } else {
            console.log(`Track data not correct, will not add: ${JSON.stringify(track)} 😢`)
        }
    })
    console.log(`✅ Tracks imported successfully! 🎉`)
}

/**
 * Imports musician selections from a JSON object.
 *
 * The JSON object should contain an array of arrays, each containing the UUID of a musician followed by the UUIDs of the tracks they have selected.
 * The selections are then set in the state after flushing existing selection data.
 *
 * @param json - The JSON object containing the selections to import.
 */
export async function importSelectionsJson(json: any) {
    const data = useDataStore()

    if (!json) return

    data.flushAllSelections()

    json.forEach((selections: unknown[]) => {
        if (
            Array.isArray(selections) &&
            selections.length > 1 &&
            selections.every((element) => typeof element === 'string')
        ) {
            const [musicianUUID, ...tracksUUID] = selections as string[]
            if (tracksUUID.every((uuid) => uuid != '')) {
                //Check if every track exists in the list
                const validTracksUUID = tracksUUID
                    .filter((uuid) => data.tracks.some((track) => track.uuid === uuid))
                    .sort((uuidA, uuidB) => {
                        const trackA = data.tracks.find((track) => track.uuid === uuidA)
                        const trackB = data.tracks.find((track) => track.uuid === uuidB)
                        if (trackA && trackB) {
                            return trackA.name.localeCompare(trackB.name)
                        } else {
                            return 0
                        }
                    })

                data.setMusicianSelections(musicianUUID, validTracksUUID)
            } else {
                console.log(
                    `🎵 Selections data not correct or empty, will not add: ${JSON.stringify(selections)} 😢`
                )
            }
        } else {
            console.log(
                `🎵 Selections data not correct or empty, will not add: ${JSON.stringify(selections)} 😢`
            )
        }
    })
    console.log(`✅ Selections imported successfully! 🎉`)
}

/**
 * Imports a distribution of tracks and musicians from a JSON object.
 *
 * This asynchronous function processes a JSON object representing a distribution.
 * Each element in the JSON array should be an array containing a track UUID,
 * an array of assigned musician UUIDs, and an array of rejected musician UUIDs.
 * The function flushes existing distribution data, imports the new distribution,
 * and updates the distribution state accordingly. It also recalculates similarities
 * and orders musician names alphabetically within each track.
 *
 * @param json - The JSON object containing the distribution data to import. It should
 *               be an array of arrays, with each inner array containing a track UUID,
 *               an array of assigned musician UUIDs, and an array of rejected musician UUIDs.
 */

export async function importDistributionJson(json: any) {
    const distribution = useDistributionStore()
    const distributionView = useDistributionViewStore()
    const data = useDataStore()

    if (!json) return

    distributionView.generationTime = 0

    distribution.flush()
    distribution.initStats(data.getMusicians(DATA_ORDER.NAME_ALPHABETIC))

    if (Array.isArray(json) && json.length > 0) {
        //Import every track of the distribution
        json.forEach((dist: any) => {
            if (
                dist.length === 3 &&
                typeof dist[0] === 'string' &&
                Array.isArray(dist[1]) &&
                dist[1].every((item) => typeof item === 'string') &&
                Array.isArray(dist[2]) &&
                dist[2].every((item) => typeof item === 'string')
            ) {
                const [trackUUID, assigned, rejected] = dist as [string, string[], string[]]

                if (trackUUID != '') {
                    distribution.distribution.push({
                        trackUUID,
                        assignedMusiciansUUID: assigned.filter((uuid) => uuid != ''),
                        rejectedMusiciansUUID: rejected.filter((uuid) => uuid != '')
                    })
                }
            }
        })

        //Add similarities and order musicians alphabetically by name
        console.log(`📦 Recalculating similarities...`)
        await distribution.recalcEverySimilarities()
        console.log(`📦 Recalculating statistics...`)
        await distribution.recalcEveryStats()
        console.log(`📦 Ordering musicians alphabetically...`)
        await distribution.orderEveryMusicianNameAlphabetically()

        //Flush changes
        distribution.flushChanges()

        console.log(`✅ Distribution imported successfully! 🎉`)
    }
}

//USABLE FUNCTIONS
/**
 * Opens a file selection dialog to import musicians from a MELM2 file.
 * The file is expected to contain an array of arrays, each containing the UUID, surname and name for a musician.
 * The musicians are then added to the state.
 */
export async function importMusiciansFile() {
    if (window.ipcRenderer) {
        console.log(`📂 Opening file dialog to import musicians...`)
        const response = await window.ipcRenderer.invoke(
            'open-file',
            'Ouvrir un fichier de musiciens',
            [{ name: 'Fichier musiciens', extensions: ['melm2'] }]
        )

        if (response) {
            await importMusiciansJson(JSON.parse(response))
        } else {
            console.log(`❌ No file selected. 😢`)
        }
    }
}

/**
 * Opens a file selection dialog to import tracks from a MELT2 file.
 * The file is expected to contain an array of arrays, each containing the UUID, name,
 * and number of musicians for a track. The tracks are then added to the state.
 */

export async function importTracksFile() {
    if (window.ipcRenderer) {
        console.log(`📂 Opening file dialog to import tracks...`)
        const response = await window.ipcRenderer.invoke(
            'open-file',
            'Ouvrir un fichier de morceaux',
            [{ name: 'Fichier morceaux', extensions: ['melt2'] }]
        )

        if (response) {
            await importTracksJson(JSON.parse(response))
        } else {
            console.log(`❌ No file selected. 😢`)
        }
    }
}

/**
 * Opens a file selection dialog to import all data from a MELS2 file and updates the data store.
 *
 * This function opens a file dialog for the user to select a MELS2 file, which is expected to contain
 * a JSON object with `musicians`, `tracks`, and `selectedTracks` properties. Each property is an array
 * of arrays:
 * - `musicians`: Each sub-array contains a musician's UUID, surname, and name.
 * - `tracks`: Each sub-array contains a track's UUID, name, and the maximum number of musicians.
 * - `selectedTracks`: Each sub-array contains a musician's UUID followed by track UUIDs they have selected.
 *
 * The imported data is processed and added to the data store. If the file is successfully imported,
 * the view is redirected to the selections page.
 */

export async function importAllFile() {
    if (window.ipcRenderer) {
        console.log(`📂 Opening file dialog to import all data...`)
        const response = await window.ipcRenderer.invoke(
            'open-file',
            'Ouvrir un fichier de sélections',
            [{ name: 'Fichier sélections', extensions: ['mels2'] }]
        )

        if (response) {
            const data = JSON.parse(response)

            console.log(data)

            if (data.musicians && Array.isArray(data.musicians)) {
                console.log(`🎶 Importing musicians data...`)
                await importMusiciansJson(data.musicians)
            }

            if (data.tracks && Array.isArray(data.tracks)) {
                console.log(`🎼 Importing tracks data...`)
                await importTracksJson(data.tracks)
            }

            if (data.selectedTracks && Array.isArray(data.selectedTracks)) {
                console.log(`🎹 Importing selections data...`)
                await importSelectionsJson(data.selectedTracks)
            }
        } else {
            console.log(`❌ No file selected. 😢`)
        }
    }
}

/**
 * Opens a file dialog to import distribution data from a MELD2 file.
 *
 * This function uses the Electron IPC renderer to prompt the user to select a
 * distribution file with the .meld2 extension. Upon a successful selection, it
 * parses the JSON content of the file and imports the musicians, tracks, selected
 * tracks, and distribution data into the application state.
 *
 * The JSON object within the file should have the following structure:
 * - `musicians`: An array of arrays, each containing a musician's UUID, surname, and name.
 * - `tracks`: An array of arrays, each containing a track's UUID, name, and the maximum number of musicians.
 * - `selectedTracks`: An array of arrays, each containing a musician's UUID followed by the UUIDs of the tracks they have selected.
 * - `distribution`: An array representing the distribution data.
 *
 * The imported data is processed and added to the data store.
 * If no file is selected, an error message is logged.
 */

export async function importDistributionFile() {
    if (window.ipcRenderer) {
        console.log(`📂 Opening file dialog to import distribution...`)
        const response = await window.ipcRenderer.invoke(
            'open-file',
            'Ouvrir un fichier de distribution',
            [{ name: 'Fichier distribution', extensions: ['meld2'] }]
        )

        if (response) {
            const data = JSON.parse(response)

            if (data.musicians && Array.isArray(data.musicians)) {
                console.log(`🎶 Importing musicians data...`)
                await importMusiciansJson(data.musicians)
            }

            if (data.tracks && Array.isArray(data.tracks)) {
                console.log(`🎼 Importing tracks data...`)
                await importTracksJson(data.tracks)
            }

            if (data.selectedTracks && Array.isArray(data.selectedTracks)) {
                console.log(`🎹 Importing selections data...`)
                await importSelectionsJson(data.selectedTracks)
            }

            if (data.distribution && Array.isArray(data.distribution)) {
                console.log(`🎹 Importing selections data...`)
                await importDistributionJson(data.distribution)
            }
        } else {
            console.log(`❌ No file selected. 😢`)
        }
    }
}
