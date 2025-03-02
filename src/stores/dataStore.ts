import { defineStore } from 'pinia'
import { v7 as uuidV7 } from 'uuid'
import { shuffle } from 'lodash'
import { importAllFile, importMusiciansFile, importTracksFile } from '@/lib/import'
import { Router, useRouter } from 'vue-router'
import { exportAllFile, exportMusiciansFile, exportTracksFile } from '@/lib/export'
import { useDistributionStore } from './distributionStore'

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useDataStore = defineStore('data', {
    state: () =>
        <{ musicians: Musician[]; tracks: Track[]; _router: Router }>{
            musicians: [],
            tracks: [],
            _router: useRouter()
        },
    actions: {
        /**
         * Retrieves a track from the state by its UUID.
         *
         * @param uuid - The unique identifier of the track to find.
         * @returns The track with the specified UUID, or undefined if not found.
         */
        getTrack(uuid: string): Track | undefined {
            const track = this.tracks.find((track) => track.uuid === uuid)

            if (!track) {
                console.log(`❌ Searching track: ${uuid} not found 😢`)
            }

            return track
        },

        /**
         * Retrieves the tracks in the state, sorted by name if data_order is set to "alphabetic", or in the original order if set to "normal".
         *
         * @param data_order - The order in which to retrieve the tracks. Can be either "alphabetic" or "normal".
         * @returns The tracks in the specified order, or the original order if data_order is not "alphabetic".
         */
        getTracks(dataOrder: 'alphabetic' | 'normal' | 'shuffled'): Track[] {
            if (dataOrder === 'alphabetic') {
                return this.tracks.sort((a, b) => a.name.localeCompare(b.name))
            } else if (dataOrder === 'shuffled') {
                return shuffle(this.tracks)
            } else {
                return this.tracks
            }
        },

        /**
         * Adds a track to the state.
         *
         * @param name - The name of the track to add.
         * @param maxMusicians - The number of musicians for the track to add.
         * @returns The newly added track.
         */
        addTrack(name: string, maxMusicians: number, uuid: string | null = null): Track {
            const track: Track = {
                name,
                maxMusicians,
                uuid: uuid || uuidV7()
            }

            this.tracks.push(track)

            //Register the change
            const distribution = useDistributionStore()
            if(distribution.distribution.length > 0) {
                distribution.registerChange('add', track.uuid, 'track')
            }

            return track
        },

        /**
         * Removes a track from the state by its UUID.
         *
         * @param uuid - The unique identifier of the track to delete.
         */
        deleteTrack(uuid: string) {
            console.log(`🚫 Removing track with UUID: ${uuid}...`)
            this.tracks = this.tracks.filter((tracks) => tracks.uuid != uuid)

            //Register the change
            const distribution = useDistributionStore()
            if(distribution.distribution.length > 0) {
                distribution.registerChange('remove', uuid, 'track')
            }
        },

        /**
         * Updates a track in the state by its UUID.
         *
         * @param track - The track to update.
         * @throws {Error} If the track is not found in the state.
         */
        updateTrack(track: Track) {
            const trackIndex = this.tracks.findIndex((entry) => entry.uuid === track.uuid)

            const distribution = useDistributionStore()
            if (trackIndex !== -1) {
                console.log(`🔄 Updating track: ${track.name} (UUID: ${track.uuid})...`)
                this.tracks[trackIndex] = track

                //Register the change 
                if(distribution.distribution.length > 0) {
                    distribution.registerChange('edit', track.uuid, 'track')
                }
            } else if (track.name != '' && track.maxMusicians > 0 && track.uuid != '') {
                console.log(`Musician with UUID ${track.uuid} not found, creating new... 😢`)
                this.addTrack(track.name, track.maxMusicians, track.uuid)

                //Register the change
                if(distribution.distribution.length > 0) {
                    distribution.registerChange('add', track.uuid, 'track')
                }
            } else {
                throw new Error(
                    `Musician with UUID ${track.uuid} data not correct, cannot update. 😢`
                )
            }
        },

        /**
         * Resets the state of the tracks.
         *
         * Warning: all unsaved changes will be lost. 😱
         */
        flushTracks() {
            console.log(`💥 Resetting tracks state...`)
            this.tracks = []

            //Register the change
            const distribution = useDistributionStore()
            if(distribution.distribution.length > 0) {
                distribution.flushChanges('track')
            }
        },

        /**
         * Opens a file selection dialog to import tracks from a MELT2 file.
         * The file is expected to contain an array of arrays, each containing the UUID, name and number of musicians for a track.
         * The tracks are then added to the state.
         */
        importTracks: async () => await importTracksFile(),

        /**
         * Exports the current tracks to a MELT2 file.
         *
         * The tracks are serialized into a JSON array where each element is an array
         * containing the track's UUID, name, and maximum number of musicians.
         * The user is prompted to save this JSON data to a file with the .melt2 extension.
         */
        exportTracks: async () => await exportTracksFile(),

        /**
         * Retrieves a musician from the state by its UUID.
         *
         * @param uuid - The unique identifier of the musician to find.
         * @returns The musician with the specified UUID, or undefined if not found.
         */
        getMusician(uuid: string): Musician | undefined {
            const musician = this.musicians.find((musician) => musician.uuid === uuid)
            if (!musician) {
                console.log(`❌ Searching musician: ${uuid} not found 😢`)
            }
            return musician
        },

        /**
         * Retrieves the musicians in the state, sorted by name if data_order is set to "name", surname if set to "surname", or in the original order if set to "normal".
         *
         * @param data_order - The order in which to retrieve the musicians. Can be either "name", "surname", or "normal".
         * @returns The musicians in the specified order, or the original order if data_order is not "name" or "surname".
         */
        getMusicians(
            dataOrder: 'nameAlphabetic' | 'surnameAlphabetic' | 'normal' | 'shuffled'
        ): Musician[] {
            if (dataOrder == 'nameAlphabetic') {
                const sortedMusicians = this.musicians.sort((a, b) => a.name.localeCompare(b.name))

                return sortedMusicians
            } else if (dataOrder == 'surnameAlphabetic') {
                const sortedMusicians = this.musicians.sort((a, b) =>
                    a.surname.localeCompare(b.surname)
                )

                return sortedMusicians
            } else if (dataOrder === 'shuffled') {
                return shuffle(this.musicians)
            } else {
                return this.musicians
            }
        },

        /**
         * Adds a musician to the state.
         *
         * @param name - The name of the musician to add.
         * @param surname - The surname of the musician to add.
         * @returns The added musician.
         */
        addMusician(name: string, surname: string, uuid: string | null = null): Musician {
            const musician: Musician = {
                name,
                surname,
                selectedTracks: [],
                uuid: uuid || uuidV7()
            }

            this.musicians.push(musician)
            
            //Register the change
            const distribution = useDistributionStore()
            if(distribution.distribution.length > 0) {
                distribution.registerChange('add', musician.uuid, 'musician')
            }

            return musician
        },

        /**
         * Removes a musician from the state by its UUID.
         *
         * @param uuid - The unique identifier of the musician to delete.
         */
        deleteMusician(uuid: string) {
            console.log(`🚫 Removing musician with UUID: ${uuid}...`)
            this.musicians = this.musicians.filter((musician) => musician.uuid != uuid)
            
            //Register the change
            const distribution = useDistributionStore()
            if(distribution.distribution.length > 0) {
                distribution.registerChange('remove', uuid, 'musician')
            }
        },

        /**
         * Updates a musician in the state by its UUID.
         *
         * @param musician - The musician to update.
         * @throws {Error} If the musician is not found in the state.
         */
        updateMusician(musician: Musician) {
            const musicianIndex = this.musicians.findIndex((entry) => entry.uuid === musician.uuid)

            /* //Register the change
            const distribution = useDistributionStore() */
            if (musicianIndex !== -1) {
                this.musicians[musicianIndex] = musician

                /* //Register the change
                if(distribution.distribution.length > 0) {
                    distribution.registerChange('edit', musician.uuid, 'musician')
                } */
            } else if (musician.name != '' && musician.surname != '' && musician.uuid != '') {
                console.log(`Musician with UUID ${musician.uuid} not found, creating new... 😢`)
                this.addMusician(musician.name, musician.surname, musician.uuid)
                
                /* //Register the change
                if(distribution.distribution.length > 0) {
                    distribution.registerChange('add', musician.uuid, 'musician')
                } */
            } else {
                throw new Error(
                    `Musician with UUID ${musician.uuid} data not correct, cannot update. 😢`
                )
            }
        },

        /**
         * Resets the state of the musicians.
         *
         * Warning: all unsaved changes will be lost. 😱
         */
        flushMusicians() {
            console.log(`💥 Resetting musicians state...`)
            this.musicians = []

            //Register the change
            const distribution = useDistributionStore()
            if(distribution.distribution.length > 0) {
                distribution.flushChanges('musician')
            }
        },

        /**
         * Opens a file selection dialog to import musicians from a MELM2 file.
         * The file is expected to contain an array of arrays, each containing the UUID, surname and name for a musician.
         * The musicians are then added to the state.
         */
        importMusicians: async () => await importMusiciansFile(),

        /**
         * Exports the current musicians to a MELM2 file.
         *
         * The musicians are serialized into a JSON array where each element is an array
         * containing the musician's UUID, surname, and name.
         * The user is prompted to save this JSON data to a file with the .melm2 extension.
         */
        exportMusicians: async () => await exportMusiciansFile(),

        /**
         * Retrieves the track selections of a musician by their UUID.
         *
         * @param musicianUUID - The unique identifier of the musician whose selections are to be retrieved.
         * @returns An array of objects, each containing a track and a boolean indicating whether the track is selected by the musician.
         *          Returns undefined if the musician is not found.
         */
        getMusicianSelections(musicianUUID: string): Array<{ track: Track; selected: boolean }> {
            const musician = this.getMusician(musicianUUID)

            if (!musician) {
                console.log(`❌ Retrieving musician selections : ${musicianUUID} not found. 😢`)
                return []
            }

            const selections: Array<{ track: Track; selected: boolean }> = []

            this.tracks.forEach((track) => {
                selections.push({
                    track,
                    selected: musician.selectedTracks.includes(track.uuid)
                })
            })

            return selections
        },

        /**
         * Updates the track selections for a musician identified by their UUID.
         *
         * @param musicianUUID - The unique identifier of the musician whose selections are to be updated.
         * @param selections - An array of objects, each containing a track and a boolean indicating whether the track is selected by the musician.
         */
        updateMusicianSelections(
            musicianUUID: string,
            selections: Array<{ track: Track; selected: boolean }>
        ) {
            const musician = this.getMusician(musicianUUID)

            if (!musician) return

            console.log(`🎶 Updating the selections of the musician with UUID ${musicianUUID}...`)

            const newSelectedTracks: string[] = []

            selections.forEach((selection) => {
                if (selection.selected) {
                    newSelectedTracks.push(selection.track.uuid)
                }
            })

            musician.selectedTracks = newSelectedTracks

            this.updateMusician(musician)

            
            //Register the change
            const distribution = useDistributionStore()
            if(distribution.distribution.length > 0) {
                distribution.registerChange('edit', musician.uuid, 'selections')
            }
        },

        /**
         * Sets the track selections for a musician identified by their UUID.
         *
         * @param uuid - The unique identifier of the musician whose selections are to be set.
         * @param selections - An array of track UUIDs, indicating the tracks that should be selected by the musician.
         */
        setMusicianSelections(uuid: string, selections: string[]) {
            const musician = this.getMusician(uuid)

            if (musician) {
                musician.selectedTracks = selections
                this.updateMusician(musician)
                
                //Register the change
                const distribution = useDistributionStore()
                if(distribution.distribution.length > 0) {
                    distribution.registerChange('edit', uuid, 'selections')
                }
            }
        },

        /**
         * Resets the track selections for a musician identified by their UUID, effectively deselecting all tracks.
         *
         * @param uuid - The unique identifier of the musician whose selections are to be reset.
         */
        flushMusicianSelections(uuid: string) {
            const musician = this.getMusician(uuid)

            if (musician) {
                musician.selectedTracks = []
                this.updateMusician(musician)
            }

            //Register the change
            const distribution = useDistributionStore()
            if(distribution.distribution.length > 0) {
                distribution.registerChange('edit', uuid, 'selections')
            }
        },

        /**
         * Removes all selections from all musicians.
         * Equivalent to calling flushMusicianSelections for each musician in the state.
         */
        flushAllSelections() {
            this.musicians.forEach((musician) => {
                this.flushMusicianSelections(musician.uuid)
            })

            //Register the change
            const distribution = useDistributionStore()
            if(distribution.distribution.length > 0) {
                distribution.flushChanges('selections')
            }
        },

        /**
         * Opens a file selection dialog to import all data from a MELT2 file.
         * The file is expected to contain an object with three properties: musicians, tracks and selectedTracks.
         * The musicians property is an array of arrays, each containing the UUID, name and surname of a musician.
         * The tracks property is an array of arrays, each containing the UUID, name and number of musicians for a track.
         * The selectedTracks property is an array of arrays, each containing the UUID of a musician and the UUIDs of the tracks they selected.
         * The musicians, tracks and selections are then added to the state.
         */
        async importAll() {
            try {
                await importAllFile()
                if (this.musicians.length > 0 && this.tracks.length > 0) this._router.push('/selections')
            } catch (error) {
                console.log(`❌ Error importing all data: ${error} 😢`)
            }
        },
        /**
         * Exports all data to a MELS2 file.
         *
         * All musicians, tracks, and selected tracks are serialized into a JSON object.
         * - The `musicians` property is an array of arrays, each containing the musician's UUID, name, and surname.
         * - The `tracks` property is an array of arrays, each containing the track's UUID, name, and maximum number of musicians.
         * - The `selectedTracks` property is an array of arrays, where each sub-array contains a musician's UUID followed by UUIDs of the tracks they have selected.
         * The user is prompted to save this JSON data to a file with the .mels2 extension.
         */
        exportAll: async () => exportAllFile(),

        /**
         * Retrieves the musicians in the state, sorted by the number of selected tracks in descending order.
         * The returned array contains arrays of length 3, where the first element is the musician's name, the second element is the musician's surname, and the third element is the number of selected tracks.
         * @returns An array of arrays, where each sub-array contains a musician's name, surname, and number of selected tracks.
         */
        getRepartitionByMusicians(): [string, string, number][] {
            const musicians: [string, string, number][] = this.musicians.map((musician) => [
                musician.name,
                musician.surname,
                musician.selectedTracks.length
            ])
            return musicians.sort((a, b) => b[2] - a[2])
        },

        /**
         * Retrieves the tracks in the state, sorted by the number of musicians who have selected them in descending order.
         * The returned array contains arrays of length 2, where the first element is the track's name and the second element is the number of musicians who have selected the track.
         * @returns An array of arrays, where each sub-array contains a track's name, the number of initial musicians and the number of musicians who have selected it.
         */
        getRepartitionByTracks(): [string, number, number][] {
            const tracks: [string, number, number][] = this.tracks.map((track) => [
                track.name,
                this.getTrackSelectors(track.uuid).length,
                track.maxMusicians
            ])

            return tracks.sort((a, b) => b[1] - a[1])
        },

        /**
         * Retrieves the UUIDs of the musicians who have selected a track with the given UUID.
         * @param uuid - The UUID of the track.
         * @returns An array of UUIDs of the musicians who have selected the track.
         */
        getTrackSelectors(uuid: string): string[] {
            return this.musicians
                .filter((musician) => musician.selectedTracks.includes(uuid))
                .map((musician) => musician.uuid)
        },

        /**
         * Returns true if there are any selections in the state, false otherwise.
         * A selection is a musician having selected at least one track.
         * @returns Whether there are any selections in the state.
         */
        isThereSelections(): boolean {
            return this.musicians.some((musician) => musician.selectedTracks.length > 0)
        }
    }
})

export const DATA_ORDER = Object.freeze({
    ALPHABETIC: 'alphabetic',
    NORMAL: 'normal',
    NAME_ALPHABETIC: 'nameAlphabetic',
    SURNAME_ALPHABETIC: 'surnameAlphabetic',
    SHUFFLED: 'shuffled'
} as const)
