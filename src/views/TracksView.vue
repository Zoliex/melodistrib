<script setup lang="ts">
import { ref, watch } from 'vue'
import { DATA_ORDER, useDataStore } from '@/stores/dataStore'
import { useUIStore } from '@/stores/uiStore'
import {
    PenLineIcon,
    Trash,
    UsersRound,
    Plus,
    Upload,
    Download,
    Save,
    Search
} from 'lucide-vue-next'
import NavigationBar from '@/components/NavigationBar.vue'
import { useDistributionStore } from '@/stores/distributionStore'

const data = useDataStore()
const ui = useUIStore()
const distribution = useDistributionStore()

const showAdd = ref<boolean>(false)
const track = ref<{ name: string; maxMusicians: number }>({
    name: '',
    maxMusicians: 12
})

const showEdit = ref<boolean>(false)
const editTrack = ref<Track>({
    name: '',
    maxMusicians: 12,
    uuid: ''
})

const showDelete = ref<boolean>(false)
const deleteTrackUUID = ref<string>('')

const showReset = ref<boolean>(false)

const searchQuery = ref<string>('')

watch([showAdd, showEdit, showDelete], ([showAddValue, showEditValue, showDeleteValue]) => {
    if (showAddValue || showEditValue || showDeleteValue) {
        ui.disableScroll()
    } else {
        ui.enableScroll()
    }
})

//Add a track to list
function add() {
    //Check if elements are not empty
    if (track.value.name != '' && track.value.maxMusicians > 0) {
        data.addTrack(track.value.name, track.value.maxMusicians)
        track.value = {
            name: '',
            maxMusicians: 12
        }

        showAdd.value = false
    }
}

//Show popup for editing a track
function edit(uuid: string) {
    const editTrackData = data.getTrack(uuid)

    if (editTrackData) {
        showEdit.value = true
        // Cloning the Object with Spread Operator
        editTrack.value = { ...editTrackData }
    } else {
        throw new Error("❌ Le morceau n'existe pas")
    }
}

//Save changes for a track
function saveEdit() {
    if (editTrack.value.name != '' && editTrack.value.maxMusicians > 0) {
        data.updateTrack(editTrack.value)
        showEdit.value = false
    }
}

function showDeleteTrack(uuid: string) {
    showDelete.value = true
    deleteTrackUUID.value = uuid
}

function confirmDelete() {
    showDelete.value = false
    data.deleteTrack(deleteTrackUUID.value)
}

function confirmReset() {
    showReset.value = false
    data.flushTracks()
}

function searchTracks(tracks: Track[], query: string) {
    return tracks.filter((elmt) => elmt.name.toLowerCase().includes(query.toLowerCase()))
}
</script>

<template>
    <!-- Navigation bar -->
    <NavigationBar :condition-next="data.tracks.length != 0" />

    <!-- Tracks header + Add element button -->
    <div class="flex justify-between items-center">
        <div class="flex flex-col justify-between">
            <h3>Liste des morceaux</h3>
            <h6>
                {{
                    data.tracks.length > 0
                        ? `Il y a ${data.tracks.length} morceau${data.tracks.length == 1 ? '' : 'x'}`
                        : "Il n'y a aucun morceau"
                }}
            </h6>
        </div>

        <button class="btn-primary btn-icon" @click="showAdd = true">
            <Plus :size="20" /> Ajouter
        </button>
    </div>

    <!-- Import buttons + search bar -->
    <div class="mt-4 flex gap-6 justify-between w-full">
        <div class="flex gap-2">
            <button
                class="btn-secondary btn-icon"
                @click="data.exportTracks()"
                :disabled="data.tracks.length === 0"
            >
                <Download :size="20" /> Exporter
            </button>
            <button class="btn-secondary btn-icon" @click="data.importTracks()">
                <Upload :size="20" /> Importer
            </button>
        </div>

        <div class="max-w-md w-full relative">
            <input
                class="!pr-8"
                type="text"
                placeholder="Chercher un morceau"
                v-model="searchQuery"
            />
            <div class="absolute h-full top-0 right-0 inline-flex items-center pr-2">
                <Search :size="20" />
            </div>
        </div>
    </div>
    
    <div class="flex gap-2 mt-2">
            <button class="btn-secondary btn-icon" @click="data.importAll()">
                <Save :size="20" /> Importer sélections
            </button>
        <button
            class="btn-secondary btn-icon"
            @click="distribution.importDistribution()"
        >
            <Save :size="20" /> Importer l'enchaînement
        </button>
        <button
            class="btn-destructive btn-icon"
            @click="showReset = true"
        >
            <Trash :size="20" /> Tout supprimer
        </button>
    </div>

    <!-- Tracks cards -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        <div
            v-for="(track, idx) in searchTracks(data.getTracks(DATA_ORDER.ALPHABETIC), searchQuery)"
            :key="idx"
            class="p-2 rounded-md overflow-hidden border border-zinc-300 hover:border-zinc-400 relative min-h-16 flex flex-col justify-between gap-1"
        >
            <h4 class="break-words">{{ track.name }}</h4>
            <div class="flex items-center gap-2">
                <UsersRound :size="20" class="text-zinc-700" />
                <p>{{ track.maxMusicians }} musicien{{ track.maxMusicians == 1 ? '' : 's' }}</p>
            </div>

            <div
                v-show="!showEdit"
                class="absolute top-0 left-0 w-full h-full p-2 flex gap-2 items-center opacity-0 hover:opacity-100 transition-opacity duration-150 ease-in-out bg-zinc-800/20"
            >
                <button
                    @click="showDeleteTrack(track.uuid)"
                    class="btn-destructive btn-icon w-full h-15"
                >
                    <Trash :size="20" /> Supprimer
                </button>
                <button @click="edit(track.uuid)" class="btn-primary btn-icon w-full h-15">
                    <PenLineIcon :size="20" /> Editer
                </button>
            </div>
        </div>
    </div>

    <!-- Add new track popup -->
    <div
        v-show="showAdd"
        class="fixed top-0 left-0 h-full w-full flex justify-center items-center px-20 bg-zinc-800/50"
    >
        <div class="w-full max-w-2xl bg-white p-4 rounded-md border border-zinc-300">
            <h3 class="text-center mb-4">Ajouter un morceau</h3>
            <h5 class="mb-2">Nom du morceau</h5>
            <input
                type="text"
                placeholder="Entrez le nom du morceau"
                v-model="track.name"
                @keypress.enter="add()"
            />
            <h5 class="mb-2 mt-4">Nombre de musiciens jouant ce morceau</h5>
            <input
                type="number"
                min="1"
                step="1"
                placeholder="Nombre de musiciens"
                v-model="track.maxMusicians"
                @keypress.enter="add()"
            />
            <div class="flex mt-6 gap-4">
                <button class="btn-secondary w-full" @click="showAdd = false">Annuler</button>
                <button
                    class="btn-primary w-full"
                    :disabled="track.name == '' || track.maxMusicians <= 0"
                    @click="add()"
                >
                    Ajouter
                </button>
            </div>
        </div>
    </div>

    <!-- Edit track popup -->
    <div
        v-show="showEdit"
        class="fixed top-0 left-0 h-full w-full flex items-center justify-center px-20 bg-zinc-800/50"
    >
        <div class="w-full max-w-2xl bg-white p-4 rounded-md border border-zinc-300">
            <h3 class="text-center mb-4">Editer un morceau</h3>
            <h5 class="mb-2">Nom du morceau</h5>
            <input type="text" placeholder="Entrez le nom du morceau" v-model="editTrack.name" />
            <h5 class="mb-2 mt-4">Nombre de musiciens jouant ce morceau</h5>
            <input
                type="number"
                min="1"
                step="1"
                placeholder="Nombre de musiciens"
                v-model="editTrack.maxMusicians"
            />
            <div class="flex mt-6 gap-4">
                <button class="btn-secondary w-full" @click="showEdit = false">Annuler</button>
                <button
                    class="btn-primary w-full"
                    :disabled="editTrack.name == '' || editTrack.maxMusicians <= 0"
                    @click="saveEdit()"
                >
                    Modifier
                </button>
            </div>
        </div>
    </div>

    <!-- Confirm delete popup -->
    <div
        v-show="showDelete"
        class="fixed top-0 left-0 h-full w-full flex items-center justify-center px-20 bg-zinc-800/50"
    >
        <div class="w-full max-w-2xl bg-white p-4 rounded-md border border-zinc-300">
            <h5 class="text-center">Voulez-vous vraiment supprimer ce morceau ?</h5>
            <div class="flex mt-6 gap-4">
                <button class="btn-secondary w-full" @click="showDelete = false">Annuler</button>
                <button class="btn-destructive w-full" @click="confirmDelete()">Supprimer</button>
            </div>
        </div>
    </div>

    <!-- Confirm reset popup -->
    <div
        v-show="showReset"
        class="fixed top-0 left-0 h-full w-full flex items-center justify-center px-20 bg-zinc-800/50"
    >
        <div class="w-full max-w-2xl bg-white p-4 rounded-md border border-zinc-300">
            <h5 class="text-center">Voulez-vous vraiment remttre à zéro tous les morceaux ?</h5>
            <div class="flex mt-6 gap-4">
                <button class="btn-secondary w-full" @click="showReset = false">Annuler</button>
                <button class="btn-destructive w-full" @click="confirmReset()">Supprimer</button>
            </div>
        </div>
    </div>
</template>
