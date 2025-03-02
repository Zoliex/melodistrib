<script setup lang="ts">
import { useDataStore, DATA_ORDER } from '@/stores/dataStore'
import { useUIStore } from '@/stores/uiStore'
import { Download, Search, Save, ChartPie, Trash, Upload } from 'lucide-vue-next'
import { ref, watch } from 'vue'
import NavigationBar from '@/components/NavigationBar.vue'
import { useDistributionStore } from '@/stores/distributionStore'

const data = useDataStore()
const ui = useUIStore()
const distribution = useDistributionStore()

const showEdit = ref<boolean>(false)
const musicianEdit = ref<Musician>()
const musicianSelectionsEdit = ref<Array<{ track: Track; selected: boolean }>>([])

const searchQuery = ref<string>('')

const showRepartition = ref<boolean>(false)
const showRepartitionPage = ref<number>(0)

const showReset = ref<boolean>(false)

watch([showEdit], ([showEditValue]) => {
    if (showEditValue) {
        ui.disableScroll()
    } else {
        ui.enableScroll()
    }
})

//Functions to adit the selections of a musician
function edit(musician: Musician) {
    musicianSelectionsEdit.value = data.getMusicianSelections(musician.uuid)
    musicianEdit.value = musician
    showEdit.value = true
}

function saveEdit() {
    data.updateMusicianSelections(musicianEdit.value?.uuid || '', musicianSelectionsEdit.value)
    showEdit.value = false
}

function confirmReset() {
    showReset.value = false
    data.flushAllSelections()
}

function searchMusicians(musicians: Musician[], query: string) {
    return musicians.filter(
        (elmt) =>
            elmt.name.toLowerCase().includes(query.toLowerCase()) ||
            elmt.surname.toLowerCase().includes(query.toLowerCase())
    )
}
</script>

<template>
    <!-- Navigation bar -->
    <NavigationBar :condition-previous="true" :condition-next="data.isThereSelections()" />

    <!-- Musicians header + Add element button -->
    <div class="flex justify-between items-center">
        <div class="flex flex-col justify-between">
            <h3>Cliquez sur un musicien</h3>
            <h6>
                {{
                    data.musicians.length > 0
                        ? `Il y a ${data.musicians.length} musicien${data.musicians.length == 1 ? '' : 's'}`
                        : "Il n'y a aucun musicien"
                }}
            </h6>
        </div>

        <button class="btn-primary btn-icon" @click="showRepartition = true">
            <ChartPie :size="20" /> Voir la répartition
        </button>
    </div>

    <!-- Import buttons + search bar -->
    <div class="mt-4 flex gap-6 justify-between w-full">
        <div class="flex gap-2">
            <button class="btn-secondary btn-icon" @click="data.exportAll()" :disabled="!data.isThereSelections()">
                <Download :size="20" /> Exporter sélections
            </button>
            <button class="btn-secondary btn-icon" @click="data.importAll()">
                <Upload :size="20" /> Importer sélections
            </button>
        </div>

        <div class="max-w-md w-full relative">
            <input class="!pr-8" type="text" placeholder="Chercher un musicien" v-model="searchQuery" />
            <div class="absolute h-full top-0 right-0 inline-flex items-center pr-2">
                <Search :size="20" />
            </div>
        </div>
    </div>


    <div class="flex gap-2 mt-2">
        <button class="btn-secondary btn-icon" @click="distribution.importDistribution()">
            <Save :size="20" /> Importer l'enchaînement
        </button>
        <button class="btn-destructive btn-icon" @click="showReset = true">
            <Trash :size="20" /> Tout remettre à zéro
        </button>
    </div>

    <!-- Data table with musicians and selections -->
    <table class="mt-4">
        <thead>
            <tr>
                <td>Nom</td>
                <td>Prénom</td>
                <td>Morceaux sélectionnés</td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(musician, index) in searchMusicians(
                data.getMusicians(DATA_ORDER.NAME_ALPHABETIC),
                searchQuery
            )" :key="index" @click="edit(musician)">
                <td>{{ musician.name }}</td>
                <td>{{ musician.surname }}</td>
                <td>
                    <ul class="list-disc ml-5">
                        <li v-for="trackUUID in musician.selectedTracks">
                            {{ data.getTrack(trackUUID)?.name }}
                        </li>
                    </ul>
                    <p v-show="musician.selectedTracks.length == 0">Aucun morceau séléctionné</p>
                </td>
            </tr>
        </tbody>
    </table>

    <div v-show="showEdit"
        class="fixed top-0 left-0 h-full w-full flex items-center justify-center px-20 py-10 bg-zinc-800/50">
        <div class="w-full max-w-2xl bg-white p-4 rounded-md border border-zinc-300 max-h-full flex flex-col">
            <h4 class="text-center mb-4">
                Sélectionner les morceaux de {{ musicianEdit?.name }} {{ musicianEdit?.surname }}
            </h4>

            <!-- Scrollable container for the list -->
            <div class="flex-1 overflow-auto">
                <ul class="grid grid-cols-1">
                    <li v-for="selection in musicianSelectionsEdit" class="inline-flex gap-2 my-1 first:mt-0 last:mb-0">
                        <div class="w-5 h-full inline-flex items-center">
                            <input type="checkbox" class="min-w-5 max-w-5 min-h-5 max-h-5 cursor-pointer"
                                v-model="selection.selected" :id="selection.track.uuid" />
                        </div>
                        <label :for="selection.track.uuid" class="cursor-pointer">
                            {{ selection.track.name }}
                        </label>
                    </li>
                </ul>
            </div>

            <div class="flex mt-6 gap-4">
                <button class="btn-secondary w-full" @click="showEdit = false">Annuler</button>
                <button class="btn-primary w-full" @click="saveEdit()">Modifier</button>
            </div>
        </div>
    </div>

    <div v-show="showRepartition"
        class="fixed top-0 left-0 h-full w-full flex items-center justify-center px-20 py-10 bg-zinc-800/50">
        <div class="w-full max-w-2xl bg-white p-4 rounded-md border border-zinc-300 max-h-full flex flex-col">
            <h3 class="text-center">Répartition des morceaux</h3>
            <div class="flex justify-center mt-4 mb-6">
                <button class="w-1/2 !rounded-r-none" :class="{
                    'btn-primary': showRepartitionPage === 0,
                    'btn-secondary': showRepartitionPage !== 0
                }" @click="showRepartitionPage = 0">
                    Par musicien
                </button>
                <button class="w-1/2 !rounded-l-none" :class="{
                    'btn-primary': showRepartitionPage === 1,
                    'btn-secondary': showRepartitionPage !== 1
                }" @click="showRepartitionPage = 1">
                    Par morceau
                </button>
            </div>

            <!-- Scrollable container for the content -->
            <div class="flex-1 overflow-auto pr-4">
                <div class="flex flex-col gap-4 mt-4" v-show="showRepartitionPage === 0">
                    <div v-for="(musician, index) in data.getRepartitionByMusicians()" :key="index">
                        <p>
                            {{ index + 1 }})
                            <span class="font-bold">{{ musician[0] }} {{ musician[1] }}</span> -
                            {{ musician[2] }}/{{ data.tracks.length }} morceau{{
                                musician[2] > 1 ? 'x' : ''
                            }}
                            sélectionné{{ musician[2] > 1 ? 's' : '' }}
                        </p>
                        <div class="w-full bg-zinc-100 h-4 rounded-md overflow-hidden mt-2">
                            <div v-show="musician[2] > 0" class="bg-blue-500 h-full rounded-md border border-blue-700"
                                :style="{
                                    width: `${Math.round((musician[2] / data.tracks.length) * 100)}%`
                                }"></div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col gap-4 mt-4" v-show="showRepartitionPage === 1">
                    <div v-for="(track, index) in data.getRepartitionByTracks()" :key="index">
                        <p>
                            {{ index + 1 }}) <span class="font-bold">{{ track[0] }}</span>
                        </p>
                        <p>
                            {{ track[2] }} musicien{{ track[2] > 1 ? 's' : '' }} - {{ track[1] }}/{{
                                data.musicians.length
                            }}
                            musicien{{ track[1] > 1 ? 's' : '' }} l'{{ track[1] > 1 ? 'ont' : 'a' }}
                            sélectionné
                        </p>
                        <div class="w-full bg-zinc-100 h-4 rounded-md overflow-hidden mt-2">
                            <div v-show="track[1] > 0" class="bg-blue-500 h-full rounded-md border border-blue-700"
                                :style="{
                                    width: `${Math.round((track[1] / data.musicians.length) * 100)}%`
                                }"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex mt-6 gap-4">
                <button class="btn-secondary w-full" @click="showRepartition = false">
                    Fermer
                </button>
            </div>
        </div>
    </div>


    <!-- Confirm reset popup -->
    <div v-show="showReset"
        class="fixed top-0 left-0 h-full w-full flex items-center justify-center px-20 bg-zinc-800/50">
        <div class="w-full max-w-2xl bg-white p-4 rounded-md border border-zinc-300">
            <h5 class="text-center">Voulez-vous vraiment remttre à zéro toutes les sélections ?</h5>
            <div class="flex mt-6 gap-4">
                <button class="btn-secondary w-full" @click="showReset = false">Annuler</button>
                <button class="btn-destructive w-full" @click="confirmReset()">Supprimer</button>
            </div>
        </div>
    </div>
</template>
