import { defineStore } from 'pinia'
import { DATA_ORDER, useDataStore } from './dataStore'
import { importDistributionFile } from '@/lib/import'
import { Router, useRouter } from 'vue-router'
import { exportDistributionFile } from '@/lib/export'

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useDistributionStore = defineStore('distribution', {
    state: () =>
        <
            {
                distribution: DistributionItem[]
                stats: Stats
                _router: Router
                changesSinceLastGeneration: Array<{
                    type: 'add' | 'remove' | 'edit'
                    uuid: string
                    dataType: 'musician' | 'track' | 'selections'
                }>
            }
        >{
            distribution: [],
            stats: {
                musicians: [],
                distribution: {
                    meanAssigned: 0,
                    meanSelected: 0,
                    meanRatio: 0
                }
            },
            _router: useRouter(),
            changesSinceLastGeneration: []
        },
    actions: {
        /**
         * Registers a change in the distribution data that has not been saved yet.
         *
         * This function takes three arguments: the type of change (add, remove, or
         * edit), the UUID of the data item that was changed, and the type of data
         * that was changed (musician, track, or selections). This information is
         * stored in the `changesSinceLastGeneration` array, which can be used to
         * determine whether the distribution data has changed since the last time
         * it was generated.
         *
         * @param type - The type of change (add, remove, or edit).
         * @param uuid - The UUID of the data item that was changed.
         * @param dataType - The type of data that was changed (musician, track, or
         *     selections).
         */
        registerChange(
            type: 'add' | 'remove' | 'edit',
            uuid: string,
            dataType: 'musician' | 'track' | 'selections'
        ) {
            const existingChange = this.changesSinceLastGeneration.find(
                (change) => change.uuid === uuid && change.type === type && change.dataType === dataType
            )
            if (!existingChange) {
                this.changesSinceLastGeneration.push({ type, uuid, dataType })
            }
        },
        /**
         * Clears the record of changes since the last distribution generation.
         *
         * This function resets the `changesSinceLastGeneration` array, effectively
         * removing all tracked changes related to additions, removals, or edits
         * of musicians, tracks, or selections. This can be useful when changes
         * are no longer needed or after they have been processed.
         */

        flushChanges(type: 'musician' | 'track' | 'selections' | 'all' = 'all') {
            if (type === 'all') {
                this.changesSinceLastGeneration = []
            } else {
                this.changesSinceLastGeneration = this.changesSinceLastGeneration.filter(
                    (change) => change.dataType !== type
                )
            }
        },
        /**
         * Clears the distribution data and resets all statistical metrics.
         *
         * This function empties the distribution array and resets the statistics
         * for mean assigned, mean selected, and mean ratio to zero. It also clears
         * the stats for musicians. This operation is irreversible and any unsaved
         * distribution data will be lost.
         */
        flush() {
            console.log(`🗑️ Flushing distribution and stats...`)

            this.distribution = []
            this.stats.distribution = {
                meanAssigned: 0,
                meanSelected: 0,
                meanRatio: 0
            }
            this.stats.musicians = []
        },

        /**
         * Initializes the distribution dataset by populating the distribution array
         * with tracks and the statistical dataset with musicians.
         *
         * This function populates the distribution array with tracks by creating a
         * new DistributionItem for each track. It also initializes the statistical
         * dataset with musicians by creating a new StatsMusicianItem for each
         * musician. The assigned and selected tracks for each musician are
         * initialized to zero and the length of the selected tracks array,
         * respectively. This operation is irreversible and any unsaved distribution
         * data will be lost.
         *
         * @param tracks - The array of tracks to populate the distribution array with.
         * @param musicians - The array of musicians to populate the statistical dataset with.
         */
        async initDataset(tracks: Track[]) {
            tracks.forEach((track) => {
                this.distribution.push({
                    trackUUID: track.uuid,
                    assignedMusiciansUUID: [],
                    rejectedMusiciansUUID: []
                })
            })
        },

        async initStats(musicians: Musician[]) {
            musicians.forEach((musician) => {
                this.stats.musicians.push({
                    uuid: musician.uuid,
                    totalAssignedTracks: 0,
                    totalSelectedTracks: musician.selectedTracks.length
                })
            })
        },

        /**
         * Adds a musician to a track in the distribution dataset and updates the musician's statistics.
         *
         * This function locates the track in the distribution dataset using the provided track UUID.
         * If the track is found, it adds the musician identified by the musician UUID to the track's
         * list of assigned musicians. Additionally, it updates the musician's statistics to reflect
         * the increased number of assigned tracks. If the `recalculateSimilarities` flag is true,
         * the function updates the similarities between this track and the next one in the distribution.
         *
         * @param trackUUID - The unique identifier of the track to which the musician will be added.
         * @param musicianUUID - The unique identifier of the musician to be added to the track.
         * @param recalculateSimilarities - A boolean indicating whether to recalculate similarities
         *                                  with the next track. Defaults to true.
         */
        addToDistribution(
            trackUUID: string,
            musicianUUID: string,
            recalculateSimilarities: boolean = true
        ) {
            const data = useDataStore()
            const track = this.distribution.find((track) => track.trackUUID == trackUUID)
            if (track && !track.assignedMusiciansUUID.includes(musicianUUID)) {
                //Update musician stats
                const musician = this.stats.musicians.find(
                    (musician) => musician.uuid == musicianUUID
                )
                if (musician) {
                    musician.totalAssignedTracks++

                    //Add the musician to the track
                    track.assignedMusiciansUUID.push(musicianUUID)

                    //Remove from rejected musicians if present
                    track.rejectedMusiciansUUID = track.rejectedMusiciansUUID.filter(
                        (rejectedMusicianUUID) => rejectedMusicianUUID != musicianUUID
                    )

                    //Order rejected and assigned musicians by alphabetical order (name)
                    track.rejectedMusiciansUUID.sort((a, b) => {
                        const nameA = data.getMusician(a)?.name || ''
                        const nameB = data.getMusician(b)?.name || ''
                        return nameA.localeCompare(nameB)
                    })
                    track.assignedMusiciansUUID.sort((a, b) => {
                        const nameA = data.getMusician(a)?.name || ''
                        const nameB = data.getMusician(b)?.name || ''
                        return nameA.localeCompare(nameB)
                    })
                } else {
                    console.log(`🚫 Could not find musician with UUID: ${musicianUUID}`)
                }

                if (recalculateSimilarities) {
                    const trackIndex = this.distribution.findIndex(
                        (track) => track.trackUUID == trackUUID
                    )
                    //Check if track exists and is not the last track, then update similarities
                    if (trackIndex != -1 || trackIndex != this.distribution.length - 1) {
                        this.distribution[trackIndex].musiciansInCommonWithNextTrack =
                            this.findSimilarities(
                                trackUUID,
                                this.distribution[trackIndex + 1].trackUUID
                            )
                    }
                }
            } else {
                console.log(
                    `🚫 Could not find track with UUID: ${trackUUID}, or musician is already included in this track`
                )
            }
        },

        removeFromDistribution(
            trackUUID: string,
            musicianUUID: string,
            recalculateSimilarities: boolean = true
        ) {
            const data = useDataStore()
            const track = this.distribution.find((track) => track.trackUUID == trackUUID)
            if (track) {
                console.log(
                    `🚫 Removing musician with UUID: ${musicianUUID} from track ${trackUUID}...`
                )

                //Update musician stats
                const musician = this.stats.musicians.find(
                    (musician) => musician.uuid == musicianUUID
                )
                if (musician) {
                    musician.totalAssignedTracks--

                    //Remove the musician from the track
                    track.assignedMusiciansUUID = track.assignedMusiciansUUID.filter(
                        (uuid) => uuid != musicianUUID
                    )

                    //Add it to rejected musicians if musician had intially selected the track only
                    if (data.getMusician(musicianUUID)?.selectedTracks.includes(trackUUID)) {
                        track.rejectedMusiciansUUID.push(musicianUUID)

                        //Order rejected musicians by alphabetical order (name)
                        track.rejectedMusiciansUUID.sort((a, b) => {
                            const nameA = data.getMusician(a)?.name || ''
                            const nameB = data.getMusician(b)?.name || ''
                            return nameA.localeCompare(nameB)
                        })
                    }
                } else {
                    console.log(`🚫 Could not find musician with UUID: ${musicianUUID}`)
                }

                if (recalculateSimilarities) {
                    const trackIndex = this.distribution.findIndex(
                        (track) => track.trackUUID == trackUUID
                    )
                    //Check if track exists and is not the last track, then update similarities
                    if (trackIndex != -1 || trackIndex != this.distribution.length - 1) {
                        this.distribution[trackIndex].musiciansInCommonWithNextTrack =
                            this.findSimilarities(
                                trackUUID,
                                this.distribution[trackIndex + 1].trackUUID
                            )
                    }
                }
            } else {
                console.log(`🚫 Could not find track with UUID: ${trackUUID}`)
            }
        },

        /**
         * Distributes musicians across tracks based on the provided options.
         *
         * This asynchronous function orchestrates the distribution of musicians to tracks
         * by following a series of steps, including flushing previous data, ordering tracks,
         * assigning forced attributions, and distributing musicians. It calculates and updates
         * distribution statistics and sorts the tracks before concluding.
         *
         * @param options - Optional parameters to customize the distribution:
         *  - `firstTrackUUID`: The UUID of the track to be placed first in the ordered list.
         *  - `shuffleTracks`: A boolean indicating whether the tracks should be shuffled.
         *  - `forceAttribution`: An array of objects specifying which musicians must be assigned to which tracks.
         *
         * @returns A promise that resolves to the time taken in seconds to complete the distribution process.
         */
        async distribute(options?: {
            firstTrackUUID?: string
            shuffleTracks?: boolean
            forceAttribution?: Array<{ musicianUUID: string; trackUUID: string }>
        }): Promise<number> {
            const data = useDataStore()
            //Save date to know how much time it took to generate the distribution
            const start = performance.now()

            //STEP1: Flush previous data and reset changes detection
            this.flush()
            this.flushChanges()

            //STEP2: Get the tracks in correct order
            console.log(
                `📦 Getting tracks in order: ${options?.shuffleTracks ? 'SHUFFLED' : 'ALPHABETIC'} ...`
            )
            var tracks: Track[]
            if (options?.shuffleTracks) {
                tracks = data.getTracks(DATA_ORDER.SHUFFLED)
            } else {
                tracks = data.getTracks(DATA_ORDER.ALPHABETIC)
            }

            //STEP3: Get the first track and put it at the begin of the list if specified in options
            console.log(`📦 Setting first track: ${options?.firstTrackUUID || ''} ...`)
            if (options?.firstTrackUUID) {
                const firstTrack = tracks.find((track) => track.uuid == options.firstTrackUUID)
                if (firstTrack) {
                    tracks.splice(tracks.indexOf(firstTrack), 1)
                    tracks.unshift(firstTrack)
                }
            }

            //STEP4: Create each track and musicians state array
            console.log(`📦 Creating data structures...`)
            await this.initDataset(tracks)
            await this.initStats(data.getMusicians(DATA_ORDER.NAME_ALPHABETIC))

            //STEP5: Assigned forced attributions
            console.log(`📦 Assigning forced attributions...`)
            if (options?.forceAttribution) {
                options.forceAttribution.forEach((force) => {
                    this.addToDistribution(force.trackUUID, force.musicianUUID, false)
                })
            }

            //STEP6: Distribute the musicians to the tracks
            console.log(`📦 Distributing musicians...`)
            tracks.forEach((track) => {
                //Get already assigned musicians
                const trackDistribution: string[] =
                    this.getTrack(track.uuid)?.assignedMusiciansUUID || []
                //Get the uuid of musicians who have selected the track and are not already assigned
                const musicians = data
                    .getTrackSelectors(track.uuid)
                    .filter((musician) => !trackDistribution.includes(musician))

                // Order musicians by number of already attributed tracks (ascending order)
                musicians.sort((a, b) => {
                    const musicianA = this.stats.musicians.find((musician) => musician.uuid == a)
                    const musicianB = this.stats.musicians.find((musician) => musician.uuid === b)
                    const musicianASelectedTracks = musicianA
                        ? data.getMusician(musicianA.uuid)?.selectedTracks.length || 0
                        : 0
                    const musicianBSelectedTracks = musicianB
                        ? data.getMusician(musicianB.uuid)?.selectedTracks.length || 0
                        : 0
                    return (
                        (musicianA?.totalAssignedTracks || 0) +
                        musicianASelectedTracks -
                        (musicianB?.totalAssignedTracks || 0) -
                        musicianBSelectedTracks
                    )
                })

                //Add musicians to track until maxMusicians is reached
                var i = 0
                while (trackDistribution.length < track.maxMusicians && i < musicians.length) {
                    //Add the musician to the current track distribution
                    trackDistribution.push(musicians[i])

                    //Update stats for the added musician
                    const stat = this.stats.musicians.find((stat) => stat.uuid == musicians[i])
                    if (stat) {
                        stat.totalAssignedTracks++
                    }

                    //Increment counter
                    i++
                }

                //Update the track distribution stats
                const trackItem = this.getTrack(track.uuid)
                if (trackItem) {
                    trackItem.assignedMusiciansUUID = trackDistribution.sort((a, b) => {
                        const musicianA = data.getMusician(a)
                        const musicianB = data.getMusician(b)
                        return musicianA && musicianB
                            ? musicianA.name.localeCompare(musicianB.name)
                            : 0
                    })
                    trackItem.rejectedMusiciansUUID = data
                        .getTrackSelectors(track.uuid)
                        .filter((musician) => !trackDistribution.includes(musician))
                        .sort((a, b) => {
                            const musicianA = data.getMusician(a)
                            const musicianB = data.getMusician(b)
                            return musicianA && musicianB
                                ? musicianA.name.localeCompare(musicianB.name)
                                : 0
                        })
                }
            })

            //STEP7: Update stats
            console.log(`📦 Updating stats...`)
            //Get only active musicians who have selected at least one track and have at least one assigned track
            this.stats.distribution.meanAssigned =
                this.stats.musicians.reduce((acc, cur) => acc + cur.totalAssignedTracks, 0) /
                this.stats.musicians.filter(
                    (stat) => stat.totalAssignedTracks > 0 && stat.totalSelectedTracks > 0
                ).length
            this.stats.distribution.meanSelected =
                this.stats.musicians.reduce((acc, cur) => acc + cur.totalSelectedTracks, 0) /
                this.stats.musicians.filter(
                    (stat) => stat.totalAssignedTracks > 0 && stat.totalSelectedTracks > 0
                ).length
            this.stats.distribution.meanRatio =
                this.stats.distribution.meanAssigned / this.stats.distribution.meanSelected

            //Sort the tracks
            console.log(`📦 Sorting tracks...`)
            await this.sortTracks()

            console.log(`✅ Distribution completed!`)
            const end = performance.now()

            return (end - start) / 1000
        },

        /**
         * Retrieves a distribution item from the state by its track UUID.
         *
         * @param uuid - The unique identifier of the track to find.
         * @returns The distribution item with the specified track UUID, or undefined if not found.
         */
        getTrack(uuid: string): DistributionItem | undefined {
            return this.distribution.find((dist) => dist.trackUUID == uuid)
        },

        /**
         * Finds the musicians that are assigned to both tracks identified by the given UUIDs.
         *
         * @param trackAUUID - The UUID of the first track to compare.
         * @param trackBUUID - The UUID of the second track to compare.
         * @returns An array of musician UUIDs that are assigned to both tracks, or undefined if either track is not found.
         */
        findSimilarities(trackAUUID: string, trackBUUID: string): string[] | [] {
            const trackA = this.getTrack(trackAUUID)
            const trackB = this.getTrack(trackBUUID)

            if (!trackA) {
                console.log(`❌ Track ${trackAUUID} not found.`)
                return []
            }

            if (!trackB) {
                console.log(`❌ Track ${trackBUUID} not found.`)
                return []
            }

            const similarities = trackA.assignedMusiciansUUID.filter((musicianUUID) => {
                return trackB.assignedMusiciansUUID.includes(musicianUUID)
            })

            return similarities
        },
        /**
         * Sorts the tracks in the distribution by the number of musicians they have in common with the previous track.
         * This is done in a greedy manner, selecting the track that has the most musicians in common with the previous track and adding it to the new distribution.
         * The process is repeated until all tracks have been added to the new distribution.
         * The distribution is then updated with the new sorted list.
         */
        async sortTracks() {
            if (this.distribution.length === 0) return

            console.log(`✨ Sorting tracks by musician similarities...`)

            // Copy all tracks except the first one
            const distributionTracks: DistributionItem[] = [...this.distribution].slice(1)
            //Create a new distribution list with the first track at the beginning
            const newDistribution: DistributionItem[] = [this.distribution[0]]

            let i = 0
            while (distributionTracks.length > 0) {
                console.log(`▶️ Sorting track ${i + 1} of ${this.distribution.length - 1}`)
                const currentTrack = newDistribution[i]

                let mostSimilarTrackIndex = -1
                let mostSimilarTrack: DistributionItem | null = null
                let musiciansInCommon: string[] = []

                // Find the most similar track
                for (let j = 0; j < distributionTracks.length; j++) {
                    const track = distributionTracks[j]
                    const currentMusiciansInCommon =
                        this.findSimilarities(
                            track.trackUUID || '',
                            currentTrack.trackUUID || ''
                        ) || []

                    if (currentMusiciansInCommon.length >= musiciansInCommon.length) {
                        mostSimilarTrack = track
                        mostSimilarTrackIndex = j
                        musiciansInCommon = currentMusiciansInCommon
                    }
                }

                // Ensure we found a valid track
                if (mostSimilarTrack && mostSimilarTrackIndex !== -1) {
                    console.log(
                        `🔀 Most similar track is ${mostSimilarTrack.trackUUID} with ${musiciansInCommon.length} common musicians`
                    )

                    // Add the musicians in common to the current track
                    currentTrack.musiciansInCommonWithNextTrack = musiciansInCommon

                    // Remove the most similar track from the list
                    distributionTracks.splice(mostSimilarTrackIndex, 1)

                    // Add to new distribution
                    newDistribution.push(mostSimilarTrack)
                } else {
                    console.warn(`No similar track found for ${currentTrack.trackUUID}`)
                }

                i++
            }

            // Update the sorted distribution
            this.distribution = newDistribution
        },

        /**
         * Imports a distribution file and navigates to the distribution page.
         *
         * This asynchronous function attempts to import a distribution file using the
         * `importDistributionFile` method. Upon successful import, it redirects the user
         * to the '/distribution' route. If an error occurs during the import process,
         * it logs the error to the console.
         */
        async importDistribution() {
            const data = useDataStore()
            try {
                await importDistributionFile()
                if (
                    this.distribution.length > 0 &&
                    data.musicians.length > 0 &&
                    data.tracks.length > 0
                )
                    this._router.push('/distribution')
            } catch (error) {
                console.log(`❌ Error importing distribution: ${error} 😢`)
            }
        },

        /**
         * Exports the current distribution to a MELD2 file.
         *
         * This function first converts the current distribution into a JSON string using
         * `exportDistributionJson`. It then prompts the user to save this JSON data to a file
         * with the .meld2 extension via the Electron IPC renderer.
         */
        exportDistribution: async () => await exportDistributionFile(),

        /**
         * Recalculates all similarities between adjacent tracks in the distribution.
         * This is used after the distribution has been modified/imported to ensure that all similarities are up to date.
         */
        async recalcEverySimilarities() {
            for (let i = 0; i < this.distribution.length - 1; i++) {
                const trackAUUID = this.distribution[i].trackUUID || ''
                const trackBUUID = this.distribution[i + 1].trackUUID || ''
                this.distribution[i].musiciansInCommonWithNextTrack = this.findSimilarities(
                    trackAUUID,
                    trackBUUID
                )
            }
        },

        /**
         * Recalculates the distribution statistics, including the mean number of assigned
         * and selected tracks per musician, and the mean ratio of assigned to selected
         * tracks. This is used after modifying the distribution to ensure that all
         * statistics are up to date.
         */
        async recalcEveryStats() {
            const data = useDataStore()

            this.stats.musicians.forEach((stat) => {
                stat.totalAssignedTracks = this.distribution.filter((track) =>
                    track.assignedMusiciansUUID.includes(stat.uuid)
                ).length
                stat.totalSelectedTracks =
                    data.musicians.find((musician) => musician.uuid === stat.uuid)?.selectedTracks
                        .length || 0
            })

            //Get only active musicians who have selected at least one track and have at least one assigned track
            this.stats.distribution.meanAssigned =
                this.stats.musicians.reduce((acc, cur) => acc + cur.totalAssignedTracks, 0) /
                this.stats.musicians.filter(
                    (stat) => stat.totalAssignedTracks > 0 && stat.totalSelectedTracks > 0
                ).length
            this.stats.distribution.meanSelected =
                this.stats.musicians.reduce((acc, cur) => acc + cur.totalSelectedTracks, 0) /
                this.stats.musicians.filter(
                    (stat) => stat.totalAssignedTracks > 0 && stat.totalSelectedTracks > 0
                ).length
            this.stats.distribution.meanRatio =
                this.stats.distribution.meanAssigned / this.stats.distribution.meanSelected
        },

        /**
         * Asynchronously orders the musician names alphabetically within each track.
         *
         * This function iterates over each track in the distribution, sorting both
         * the assigned and rejected musicians by their names in alphabetical order.
         * It ensures that the musician lists within each track are consistently
         * ordered, which can be useful for display or processing purposes.
         */

        async orderEveryMusicianNameAlphabetically() {
            const data = useDataStore()
            //Order for every track, assigned musicians and rejected musicians alphabetically by name
            this.distribution.forEach((track) => {
                track.rejectedMusiciansUUID.sort((a, b) => {
                    const nameA = data.getMusician(a)?.name || ''
                    const nameB = data.getMusician(b)?.name || ''
                    return nameA.localeCompare(nameB)
                })
                track.assignedMusiciansUUID.sort((a, b) => {
                    const nameA = data.getMusician(a)?.name || ''
                    const nameB = data.getMusician(b)?.name || ''
                    return nameA.localeCompare(nameB)
                })
            })
        },

        /**
         * Creates a temporary copy of the distribution.
         *
         * This function takes the current distribution and creates a new, shallow copy
         * of the distribution. The returned distribution is identical to the current
         * distribution, but exists as a separate object. This can be useful when
         * trying to modify the distribution temporarily without affecting the original
         * data.
         *
         * @returns A temporary copy of the distribution.
         */
        getTempDistribution(): DistributionItem[] {
            return this.distribution.map((dist) => {
                return {
                    trackUUID: dist.trackUUID,
                    assignedMusiciansUUID: dist.assignedMusiciansUUID,
                    rejectedMusiciansUUID: dist.rejectedMusiciansUUID
                }
            })
        },

        /**
         * Sets the distribution to the given value and recalculates the statistics and similarities.
         *
         * This function replaces the current distribution with the given distribution and then
         * calls the {@link recalcEverySimilarities} and {@link recalcEveryStats} functions to update
         * the similarities and statistics.
         *
         * @param distribution - The new distribution to set.
         */
        setDistribution(distribution: DistributionItem[]) {
            this.distribution = distribution
            this.recalcEverySimilarities()
            this.recalcEveryStats()
        }
    }
})

//TODO : CHECK FOR DATA CHANGES !!! (Save last modification date and compare it with the new one)
