<script setup lang="ts">
import { ref, watch } from 'vue'
import { useDataStore, DATA_ORDER } from '@/stores/dataStore'
import { useUIStore } from '@/stores/uiStore'
import {
    PenLineIcon,
    Trash,
    Plus,
    Upload,
    Download,
    UserRound,
    Search,
    Save
} from 'lucide-vue-next'
import NavigationBar from '@/components/NavigationBar.vue'
import { useDistributionStore } from '@/stores/distributionStore'

const data = useDataStore()
const ui = useUIStore()
const distribution = useDistributionStore()

const showAdd = ref<boolean>(false)
const musician = ref<{ name: string; surname: string }>({
    name: '',
    surname: ''
})

const showEdit = ref<boolean>(false)
const editMusician = ref<Musician>({
    name: '',
    surname: '',
    selectedTracks: [],
    uuid: ''
})

const showDelete = ref<boolean>(false)
const deleteMusicianUUID = ref<string>('')

const showReset = ref<boolean>(false)

const searchQuery = ref<string>('')

watch([showAdd, showEdit, showDelete], ([showAddValue, showEditValue, showDeleteValue]) => {
    if (showAddValue || showEditValue || showDeleteValue) {
        ui.disableScroll()
    } else {
        ui.enableScroll()
    }
})

//Add a musician to list
function add() {
    //Check if elements are not empty
    if (musician.value.name != '' && musician.value.surname != '') {
        data.addMusician(musician.value.name, musician.value.surname)
        musician.value = {
            name: '',
            surname: ''
        }

        showAdd.value = false
    }
}

//Show popup for editing a musician
function edit(uuid: string) {
    const editMusicianData = data.getMusician(uuid)

    //Checking if musician exists
    if (editMusicianData) {
        showEdit.value = true
        // Cloning the Object with Spread Operator
        editMusician.value = { ...editMusicianData }
    } else {
        throw new Error("❌ Le morceau n'existe pas")
    }
}

//Save changes for a musician
function saveEdit() {
    //Checking if args are not empty
    if (editMusician.value.name != '' && editMusician.value.surname != '') {
        data.updateMusician(editMusician.value)
        showEdit.value = false
    }
}

//Delete popup
function showDeleteMusician(uuid: string) {
    showDelete.value = true
    deleteMusicianUUID.value = uuid
}

function confirmDelete() {
    showDelete.value = false
    data.deleteMusician(deleteMusicianUUID.value)
}

function confirmReset() {
    showReset.value = false
    data.flushMusicians()
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
    <NavigationBar :condition-previous="true" :condition-next="data.musicians.length != 0" />

    <!-- Musicians header + Add element button -->
    <div class="flex justify-between items-center">
        <div class="flex flex-col justify-between">
            <h3>Liste des musiciens</h3>
            <h6>
                {{
                    data.musicians.length > 0
                        ? `Il y a ${data.musicians.length} musicien${data.musicians.length == 1 ? '' : 's'}`
                        : "Il n'y a aucun musicien"
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
                @click="data.exportMusicians()"
                :disabled="data.musicians.length === 0"
            >
                <Download :size="20" /> Exporter
            </button>
            <button class="btn-secondary btn-icon" @click="data.importMusicians()">
                <Upload :size="20" /> Importer
            </button>
        </div>

        <div class="max-w-md w-full relative">
            <input
                class="!pr-8"
                type="text"
                placeholder="Chercher un musicien"
                v-model="searchQuery"
            />
            <div class="absolute h-full top-0 right-0 inline-flex items-center pr-2">
                <Search :size="20" />
            </div>
        </div>
    </div>
    
    <div class="flex gap-2 mt-2">
            <button class="btn-secondary btn-icon text-nowrap" @click="data.importAll()">
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

    <!-- Musician cards -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        <div
            v-for="(musician, idx) in searchMusicians(
                data.getMusicians(DATA_ORDER.NAME_ALPHABETIC),
                searchQuery
            )"
            :key="idx"
            class="p-2 rounded-md overflow-hidden border border-zinc-300 hover:border-zinc-400 relative min-h-16 flex flex-col justify-between gap-1"
        >
            <h4 class="inline-flex items-center gap-2 break-words">
                <UserRound :size="20" class="min-w-5 min-h-5" /> {{ musician.name }}
            </h4>
            <h5 class="break-words">{{ musician.surname }}</h5>

            <div
                v-show="!showEdit"
                class="absolute top-0 left-0 w-full h-full p-2 flex gap-2 items-center opacity-0 hover:opacity-100 transition-opacity duration-150 ease-in-out bg-zinc-800/20"
            >
                <button
                    @click="showDeleteMusician(musician.uuid)"
                    class="btn-destructive btn-icon w-full h-15"
                >
                    <Trash :size="20" /> Supprimer
                </button>
                <button @click="edit(musician.uuid)" class="btn-primary btn-icon w-full h-15">
                    <PenLineIcon :size="20" /> Editer
                </button>
            </div>
        </div>
    </div>

    <!-- Add new musician popup -->
    <div
        v-show="showAdd"
        class="fixed top-0 left-0 h-full w-full flex justify-center items-center px-20 bg-zinc-800/50"
    >
        <div class="w-full max-w-2xl bg-white p-4 rounded-md border border-zinc-300">
            <h3 class="text-center mb-4">Ajouter un musicien</h3>
            <h5 class="mb-2">Nom du musicien</h5>
            <input
                type="text"
                placeholder="Entrez le nom du musicien"
                v-model="musician.name"
                @keypress.enter="add()"
            />
            <h5 class="mb-2 mt-4">Prénom du musicien</h5>
            <input
                type="text"
                placeholder="Entrez le prénom du musicien"
                v-model="musician.surname"
                @keypress.enter="add()"
            />
            <div class="flex mt-6 gap-4">
                <button class="btn-secondary w-full" @click="showAdd = false">Annuler</button>
                <button
                    class="btn-primary w-full"
                    :disabled="musician.name == '' || musician.surname == ''"
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
            <h3 class="text-center mb-4">Editer un musicien</h3>
            <h5 class="mb-2">Nom du musicien</h5>
            <input type="text" placeholder="Entrez le nom du morceau" v-model="editMusician.name" />
            <h5 class="mb-2 mt-4">Prénom du musicien</h5>
            <input
                type="text"
                placeholder="Entrez le prénom du musicien"
                v-model="editMusician.surname"
            />
            <div class="flex mt-6 gap-4">
                <button class="btn-secondary w-full" @click="showEdit = false">Annuler</button>
                <button
                    class="btn-primary w-full"
                    :disabled="editMusician.name == '' || editMusician.surname == ''"
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
            <h5 class="text-center">Voulez-vous vraiment supprimer ce musicien ?</h5>
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
            <h5 class="text-center">Voulez-vous vraiment remttre à zéro tous les musiciens ?</h5>
            <div class="flex mt-6 gap-4">
                <button class="btn-secondary w-full" @click="showReset = false">Annuler</button>
                <button class="btn-destructive w-full" @click="confirmReset()">Supprimer</button>
            </div>
        </div>
    </div>
</template>
