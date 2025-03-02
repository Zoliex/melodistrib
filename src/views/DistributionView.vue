<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Line } from 'vue-chartjs'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement
} from 'chart.js'
import annotationPlugin from 'chartjs-plugin-annotation'

import { DATA_ORDER, useDataStore } from '@/stores/dataStore'
import { useUIStore } from '@/stores/uiStore'
import { useDistributionStore } from '@/stores/distributionStore'
import { useDistributionViewStore } from '@/stores/ditributionViewStore'

import { VueDraggable } from 'vue-draggable-plus'

import {
    Download,
    Sparkles,
    Settings,
    Plus,
    UserRound,
    RefreshCw,
    Trash,
    LoaderCircle,
    FileText,
    Shuffle,
    ArrowDownUp,
    Upload
} from 'lucide-vue-next'

import NavigationBar from '@/components/NavigationBar.vue'
import DropDown from '@/components/DropDown.vue'
import { exportToWord } from '@/lib/export'

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    annotationPlugin
)

const data = useDataStore()
const ui = useUIStore()
const distribution = useDistributionStore()
const distributionView = useDistributionViewStore()

const modalState = ref<
    | 'settings'
    | 'forceAttribution'
    | 'deleteForcedAttribution'
    | 'resetAttribution'
    | 'deleteAttributtion'
    | 'addAttribution'
    | 'changeOrder'
    | null
>(null)

const currentAttribution = ref<{ musicianUUID: string; trackUUID: string }>({
    musicianUUID: '',
    trackUUID: ''
})
const tempDistribution = ref<DistributionItem[]>([])

const notFoundErrors = ref<Array<{ type: 'musician' | 'track', uuid: string }>>([])

watch(modalState, (newVal, oldVal) => {
    if (newVal && !oldVal) ui.disableScroll()
    else if (!newVal && oldVal) ui.enableScroll()
})

function openModal(type: typeof modalState.value, musicianUUID = '', trackUUID = '') {
    modalState.value = type
    currentAttribution.value = { musicianUUID, trackUUID }

    if (type == "changeOrder") {
        tempDistribution.value = distribution.getTempDistribution()
    }
}

function closeModal() {
    modalState.value = null
}

function forceAttributionAdd() {
    if (currentAttribution.value.musicianUUID && currentAttribution.value.trackUUID) {
        distributionView.settings.forceAttribution.push({ ...currentAttribution.value })
    }
    openModal('settings')
}

function confirmDeleteForcedAttribution() {
    distributionView.settings.forceAttribution = distributionView.settings.forceAttribution.filter(
        (force) =>
            force.musicianUUID !== currentAttribution.value.musicianUUID ||
            force.trackUUID !== currentAttribution.value.trackUUID
    )
    openModal('settings')
}

function resetForcedAttributions() {
    distributionView.settings.forceAttribution = []
    openModal('settings')
}

function confirmDeleteAttribution() {
    distribution.removeFromDistribution(
        currentAttribution.value.trackUUID,
        currentAttribution.value.musicianUUID
    )
    closeModal()
    updateChart()
}

function confirmAddAttribution() {
    distribution.addToDistribution(
        currentAttribution.value.trackUUID,
        currentAttribution.value.musicianUUID
    )
    closeModal()
    updateChart()
}

function confirmChangeOrder() {
    distribution.setDistribution(tempDistribution.value)
    closeModal()
}

const isDistributing = ref<boolean>(false)
/**
 * Generate a distribution of musicians on tracks according to the given options.
 *
 * This function is async because it calls distribution.distribute which is async.
 * Also, it waits a little time before calling the heavy function to allow the DOM to be refreshed.
 * This is necessary because we want the user to see the loader while the distribution is being generated.
 *
 * @async
 */
async function distribute() {
    isDistributing.value = true

    //Wait DOM to refresh before calling heavy function
    setTimeout(async () => {
        distributionView.generationTime = await distribution.distribute(distributionView.settings)
        isDistributing.value = false
        updateChart()

        //Reset not found errors
        notFoundErrors.value = []
    }, 0)
}

const hasForcedAttributions = computed(() => distributionView.settings.forceAttribution.length > 0)

/**
 * Updates the chart data according to the distribution statistics.
 *
 * This function is called after a distribution is generated.
 * It updates the chart data with the new distribution statistics.
 */
function updateChart() {
    distributionView.repartitionByMusiciansChart.data = {
        labels: distribution.stats.musicians
            .filter((musician) => musician.totalAssignedTracks > 0)
            .map(
                (musician) =>
                    getMusician(musician.uuid, 'all')
            ),
        datasets: [
            {
                data: distribution.stats.musicians
                    .filter((musician) => musician.totalAssignedTracks > 0)
                    .map((musician) => musician.totalAssignedTracks),
                label: 'Morceau assignés',
                borderColor: 'oklch(0.623 0.214 259.815)',
                backgroundColor: 'oklch(0.707 0.165 254.624)',
                tension: 0.2
            },
            {
                data: distribution.stats.musicians
                    .filter((musician) => musician.totalAssignedTracks > 0)
                    .map((musician) => musician.totalSelectedTracks),
                label: 'Morceau sélectionnés',
                borderColor: 'oklch(0.637 0.237 25.331)',
                backgroundColor: 'oklch(0.704 0.191 22.216)',
                tension: 0.2
            }
        ]
    }

    if (!distributionView.repartitionByMusiciansChart.options.plugins) return
    if (!distributionView.repartitionByMusiciansChart.options.plugins.annotation) return
    distributionView.repartitionByMusiciansChart.options.plugins.annotation.annotations = [
        {
            type: 'line',
            yMin: distribution.stats.distribution.meanAssigned,
            yMax: distribution.stats.distribution.meanAssigned,
            borderColor: 'oklch(0.623 0.214 259.815)',
            borderWidth: 1,
            borderDash: [5, 5]
        },
        {
            type: 'line',
            yMin: distribution.stats.distribution.meanSelected,
            yMax: distribution.stats.distribution.meanSelected,
            borderColor: 'oklch(0.637 0.237 25.331)',
            borderWidth: 1,
            borderDash: [5, 5]
        }
    ]
}

async function importDistribution() {
    await distribution.importDistribution()
    updateChart()
}

//Initially update the chart
updateChart()
/**
 * Retrieves specific details of a musician by their UUID.
 *
 * This function attempts to find a musician in the data store using the provided UUID.
 * Depending on the 'type' argument, it returns either the name, surname, or full name
 * of the musician. If the musician with the given UUID is not found, it logs the error
 * to an array to track these occurrences without duplication.
 *
 * @param uuid - The unique identifier of the musician to find.
 * @param type - Specifies which detail to retrieve: 'name', 'surname', or 'all' for full name.
 * @returns The requested detail as a string, or undefined if the musician is not found.
 */

function getMusician(uuid: string, type: 'name' | 'surname' | 'all'): string {
    const musician = data.getMusician(uuid)

    if (!musician) {
        //Check if the error is not already in the array to avoid duplicates
        if (!notFoundErrors.value.find((error) => error.uuid === uuid)) {
            notFoundErrors.value.push({ type: 'musician', uuid })
        }
    } else {
        if (type === 'all') {
            return `${musician.name} ${musician.surname}`
        } else if (type === 'name') {
            return musician.name
        } else if (type === 'surname') {
            return musician.surname
        }
    }

    return 'Inconnu'
}

function musicianExists(uuid: string): boolean {
    return data.getMusician(uuid) !== undefined
}

function getTrack(uuid: string, type: 'name' | 'maxMusicians'): string | number {
    const track = data.getTrack(uuid)

    if (!track) {
        //Check if the error is not already in the array to avoid duplicates
        if (!notFoundErrors.value.find((error) => error.uuid === uuid)) {
            notFoundErrors.value.push({ type: 'track', uuid })
        }
    } else {
        if (type === 'name') {
            return track.name
        } else if (type === 'maxMusicians') {
            return track.maxMusicians.toString()
        }
    }

    if(type === 'maxMusicians') {
        return 0
    } else {
        return 'Inconnu'
    }
}

function trackExists(uuid: string): boolean {
    return data.getTrack(uuid) !== undefined
}
</script>

<template>
    <NavigationBar :condition-previous="true" :condition-next="false" />

    <div class="flex justify-between items-center">
        <div>
            <h3>Enchainement de morceaux</h3>
            <h6>
                {{
                    data.musicians.length > 0
                        ? `Il y a ${data.musicians.length} musicien${data.musicians.length === 1 ? '' : 's'
                        }`
                        : "Il n'y a aucun musicien"
                }}
            </h6>
        </div>

        <div class="flex gap-2">
            <button class="btn-primary btn-icon" @click="distribute">
                <LoaderCircle v-show="isDistributing" :size="20" class="animate-spin" key="loading" />
                <Sparkles v-show="!isDistributing" :size="20" key="sparkles" />
                Générer
            </button>

            <button class="btn-secondary btn-icon" @click="openModal('settings')">
                <Settings :size="20" />
            </button>
        </div>
    </div>

    <div class="flex gap-2 mt-4">
        <button class="btn-secondary btn-icon" @click="distribution.exportDistribution()"
            :disabled="distribution.distribution.length === 0">
            <Download :size="20" /> Exporter l'enchaînement
        </button>
        <button class="btn-secondary btn-icon" @click="importDistribution()">
            <Upload :size="20" /> Importer l'enchaînement
        </button>
        <button class="btn-secondary btn-icon" @click="exportToWord()"
            :disabled="distribution.distribution.length === 0">
            <FileText :size="20" /> Exporter sous Word
        </button>
    </div>

    <div class="flex gap-2 mt-2">
        <button class="btn-secondary btn-icon" @click="openModal('changeOrder')"
            :disabled="distribution.distribution.length === 0">
            <ArrowDownUp :size="20" /> Changer l'ordre manuellement
        </button>
        <button class="btn-secondary btn-icon" @click="distribution.sortTracks()"
            :disabled="distribution.distribution.length === 0">
            <Shuffle :size="20" /> Optimiser l'ordre
        </button>
    </div>

    <div class="bg-orange-300 border border-orange-500 rounded-md p-2 mt-4" v-show="distribution.changesSinceLastGeneration.length > 0">
        <h4>Attention : Les données ont changées, veuillez générer un nouvel enchaînement</h4>
        <ul class="list-disc ml-5 mt-1">
            <li v-if="distribution.changesSinceLastGeneration.some((change) => change.type === 'add')">{{ distribution.changesSinceLastGeneration.filter((change) => change.type === 'add').length }} ajout{{ distribution.changesSinceLastGeneration.filter((change) => change.type === 'add').length > 1 ? 's' : '' }}</li>
            <li v-if="distribution.changesSinceLastGeneration.some((change) => change.type === 'edit')">{{ distribution.changesSinceLastGeneration.filter((change) => change.type === 'edit').length }} édition{{ distribution.changesSinceLastGeneration.filter((change) => change.type === 'edit').length > 1 ? 's' : '' }}</li>
            <li v-if="distribution.changesSinceLastGeneration.some((change) => change.type === 'remove')">{{ distribution.changesSinceLastGeneration.filter((change) => change.type === 'remove').length }} suppression{{ distribution.changesSinceLastGeneration.filter((change) => change.type === 'remove').length > 1 ? 's' : '' }}</li>
        </ul>
    </div>

    <div class="bg-red-300 border border-red-500 rounded-md p-2 mt-2" v-show="notFoundErrors.length > 0">
        <h4>Attention : Certaines données sont manquantes, veuillez générer un nouvel enchaînement</h4>
        <ul class="list-disc ml-5 mt-1">
            <li v-if="notFoundErrors.some((error) => error.type === 'track')">{{ notFoundErrors.filter((error) => error.type === 'track').length }} morceau{{ notFoundErrors.filter((error) => error.type === 'track').length > 1 ? 's' : '' }} non trouvé{{ notFoundErrors.filter((error) => error.type === 'track').length > 1 ? 's' : '' }}</li>
            <li v-if="notFoundErrors.some((error) => error.type === 'musician')">{{ notFoundErrors.filter((error) => error.type === 'musician').length }} musicien{{ notFoundErrors.filter((error) => error.type === 'musician').length > 1 ? 's' : '' }} non trouvé{{ notFoundErrors.filter((error) => error.type === 'musician').length > 1 ? 's' : '' }}</li>
        </ul>
    </div>

    <div v-if="modalState === 'settings'" class="modal-overlay">
        <div class="modal-content">
            <h3 class="text-center mb-4">Options de répartition</h3>

            <div class="flex-1 overflow-auto pr-2">
                <h4>Morceau de départ</h4>
                <h6 class="italic">Choisissez le premier morceau qui sera joué</h6>
                <select class="mt-2" v-model="distributionView.settings.firstTrackUUID">
                    <option :value="track.uuid" v-for="track in data.getTracks(DATA_ORDER.ALPHABETIC)">
                        {{ track.name }}
                    </option>
                </select>

                <h4 class="mt-6">Mélanger les morceaux aléatoirement</h4>
                <h6 class="italic">
                    Pour éviter de distribuer les morceaux dans l'ordre alphabétique
                </h6>
                <div class="inline-flex gap-2 items-center mt-2">
                    <div class="w-5 h-full aspect-square inline-flex items-center">
                        <input type="checkbox" class="min-w-5 max-w-5 min-h-5 max-h-5 cursor-pointer"
                            id="shuffle-distribution" v-model="distributionView.settings.shuffleTracks" />
                    </div>
                    <label for="shuffle-distribution" class="cursor-pointer">
                        Activer l'option
                    </label>
                </div>

                <h4 class="mt-4">Forcer l'attribution</h4>
                <h6 class="italic">Attribuer obligatoirement un morceau à un musicien</h6>
                <div class="inline-flex gap-2 items-center mt-2">
                    <button class="btn-secondary btn-icon" @click="openModal('forceAttribution')">
                        <Plus :size="20" /> Ajouter
                    </button>
                    <button class="btn-destructive btn-icon" @click="openModal('resetAttribution')"
                        :disabled="!hasForcedAttributions">
                        <RefreshCw :size="20" /> Remettre à zéro
                    </button>
                </div>

                <div class="grid grid-cols-2 gap-4 mt-4">
                    <div v-for="musician in distributionView.settings.forceAttribution"
                        class="p-2 rounded-md overflow-hidden border border-zinc-300 hover:border-zinc-400 relative min-h-16 flex flex-col justify-between gap-1">
                        <h4 class="inline-flex items-center gap-2 break-words">
                            <UserRound :size="20" />
                            <span :class="{
                                'text-red-500 font-bold': !musicianExists(musician.musicianUUID)
                            }">
                                {{ getMusician(musician.musicianUUID, 'all') }}
                            </span>
                        </h4>
                        <p>
                            <span :class="{
                                'text-red-500 font-bold': !trackExists(musician.trackUUID)
                            }">
                                {{ getTrack(musician.trackUUID, 'name') }}
                            </span>
                        </p>

                        <div
                            class="absolute top-0 left-0 w-full h-full p-2 flex items-center opacity-0 hover:opacity-100 transition-opacity duration-150 ease-in-out bg-zinc-800/20">
                            <button @click="
                                openModal(
                                    'deleteForcedAttribution',
                                    musician.musicianUUID,
                                    musician.trackUUID
                                )
                                " class="btn-destructive btn-icon w-full h-15">
                                <Trash :size="20" /> Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex mt-6 gap-4">
                <button class="btn-secondary w-full" @click="closeModal()">Fermer</button>
            </div>
        </div>
    </div>

    <div v-if="modalState === 'forceAttribution'" class="modal-overlay">
        <div class="modal-content">
            <h3 class="text-center mb-4">Options : Forcer l'attribution d'un musicien</h3>
            <h5 class="mb-2">Nom du morceau</h5>
            <select v-model="currentAttribution.trackUUID">
                <option value="" disabled>Sélectionnez un morceau</option>
                <option :value="track.uuid" v-for="track in data.getTracks(DATA_ORDER.ALPHABETIC)" :disabled="distributionView.settings.forceAttribution.some(
                    (force) =>
                        force.musicianUUID == currentAttribution.musicianUUID &&
                        force.trackUUID == track.uuid
                )
                    ">
                    {{ track.name }}
                </option>
            </select>
            <h5 class="mb-2 mt-4">Nom du musicien</h5>
            <select v-model="currentAttribution.musicianUUID">
                <option value="" disabled>Sélectionnez un musicien</option>
                <option :value="musician.uuid" v-for="musician in data.getMusicians(DATA_ORDER.NAME_ALPHABETIC)"
                    :disabled="distributionView.settings.forceAttribution.some(
                        (force) =>
                            force.musicianUUID == musician.uuid &&
                            force.trackUUID == currentAttribution.trackUUID
                    )
                        ">
                    {{ musician.name }} {{ musician.surname }}
                </option>
            </select>
            <div class="flex mt-6 gap-4">
                <button class="btn-secondary w-full" @click="openModal('settings')">Annuler</button>
                <button class="btn-primary w-full" @click="forceAttributionAdd()"
                    :disabled="!currentAttribution.trackUUID || !currentAttribution.musicianUUID">
                    Attribuer
                </button>
            </div>
        </div>
    </div>

    <div v-if="modalState === 'deleteForcedAttribution'" class="modal-overlay">
        <div class="modal-content">
            <h5 class="text-center">Voulez-vous vraiment supprimer cette attribution forcée ?</h5>
            <div class="flex mt-6 gap-4">
                <button class="btn-secondary w-full" @click="openModal('settings')">Annuler</button>
                <button class="btn-destructive w-full" @click="confirmDeleteForcedAttribution()">
                    Supprimer
                </button>
            </div>
        </div>
    </div>

    <div v-if="modalState === 'resetAttribution'" class="modal-overlay">
        <div class="modal-content">
            <h5 class="text-center">
                Voulez-vous vraiment supprimer toutes les attributions forcées ?
            </h5>
            <div class="flex mt-6 gap-4">
                <button class="btn-secondary w-full" @click="openModal('settings')">Annuler</button>
                <button class="btn-destructive w-full" @click="resetForcedAttributions()">
                    Supprimer
                </button>
            </div>
        </div>
    </div>

    <div v-if="modalState === 'deleteAttributtion'" class="modal-overlay">
        <div class="modal-content">
            <h5 class="text-justify">
                Voulez-vous vraiment supprimer
                <span class="font-semibold" :class="{ 'text-red-500 font-bold': !musicianExists(currentAttribution.musicianUUID) }">{{ getMusician(currentAttribution.musicianUUID, 'all') }}</span>
                du morceau
                <span class="font-semibold" :class="{ 'text-red-500 font-bold': !trackExists(currentAttribution.trackUUID) }">{{ getTrack(currentAttribution.trackUUID, 'name') }}</span>
                ?
            </h5>
            <div class="flex mt-6 gap-4">
                <button class="btn-secondary w-full" @click="closeModal()">Annuler</button>
                <button class="btn-destructive w-full" @click="confirmDeleteAttribution()">
                    Supprimer
                </button>
            </div>
        </div>
    </div>

    <div v-if="modalState === 'addAttribution'" class="modal-overlay">
        <div class="modal-content">
            <h3 class="text-center">Attribuer un musicien</h3>

            <h5 class="mt-4">Morceau</h5>
            <h5 class="font-semibold" :class="{ 'text-red-500 font-bold': !trackExists(currentAttribution.trackUUID) }">{{ getTrack(currentAttribution.trackUUID, 'name') }}</h5>

            <h5 class="mb-2 mt-4">Nom du musicien</h5>
            <select v-model="currentAttribution.musicianUUID">
                <option value="" disabled>Sélectionnez un musicien</option>
                <option :value="musician.uuid" v-for="musician in data.getMusicians(DATA_ORDER.NAME_ALPHABETIC)"
                    :disabled="distribution
                            .getTrack(currentAttribution.trackUUID)
                            ?.assignedMusiciansUUID.includes(musician.uuid)
                        ">
                    {{ musician.name }} {{ musician.surname }}
                </option>
            </select>

            <div class="flex mt-6 gap-4">
                <button class="btn-secondary w-full" @click="closeModal()">Annuler</button>
                <button class="btn-primary w-full" @click="confirmAddAttribution()" :disabled="currentAttribution.musicianUUID == '' || currentAttribution.trackUUID == ''
                    ">
                    Attribuer
                </button>
            </div>
        </div>
    </div>

    <div v-if="modalState === 'changeOrder'" class="modal-overlay">
        <div class="modal-content">
            <h3 class="text-center">Changer l'ordre d'enchaînement</h3>

            <h4 class="mt-4">Enchainement de morceaux actuel</h4>
            <h6>Faites un glisser-déposer sur un morceau pour modifier son ordre</h6>

            <VueDraggable v-model="tempDistribution" :animation="150"
                class="mt-4 flex flex-col gap-2 flex-1 overflow-auto">
                <div v-for="dist in tempDistribution" :key="dist.trackUUID"
                    class="border border-zinc-400 p-2 rounded-md cursor-grab active:cursor-grabbing" :class="{ 'text-red-500 font-bold': !trackExists(dist.trackUUID) }">
                    {{ getTrack(dist.trackUUID, 'name') }}
                </div>
            </VueDraggable>

            <div class="flex mt-6 gap-4">
                <button class="btn-secondary w-full" @click="closeModal()">Annuler</button>
                <button class="btn-primary w-full" @click="confirmChangeOrder()">
                    Attribuer
                </button>
            </div>
        </div>
    </div>

    <div v-if="distribution.distribution.length > 0">
        <DropDown>
            <template #title>Statistiques de distribution</template>
            <ul class="grid grid-cols-1 lg:grid-cols-2 list-disc px-5 mt-4">
                <li>
                    Temps de génération : {{ distributionView.generationTime.toFixed(2) }} secondes
                </li>
                <li>Nombre de morceaux : {{ distribution.distribution.length }}</li>
                <li>
                    Moyenne de morceaux assignés par musicien :
                    {{ distribution.stats.distribution.meanAssigned.toFixed(2) }}
                </li>
                <li>
                    Moyenne de morceaux sélectionnés par musicien :
                    {{ distribution.stats.distribution.meanSelected.toFixed(2) }}
                </li>
                <li>
                    Qualité de distribution :
                    {{ (distribution.stats.distribution.meanRatio * 100).toFixed(1) }} %
                </li>
            </ul>
            <h6 class="mt-2 italic">
                Les statistiques ci-dessus sont calculées en tenant compte des musiciens qui ont au
                moins un morceau sélectionné et attribué.
            </h6>
        </DropDown>

        <DropDown>
            <template #title>Répartition des musiciens</template>

            <Line id="my-chart-id" :options="distributionView.repartitionByMusiciansChart.options as any"
                :data="distributionView.repartitionByMusiciansChart.data as any" :plugins="[annotationPlugin]"
                height="75" />
            <h6 class="mt-2 italic">
                Le graphe ci-dessus tient uniquement compte des musiciens qui ont au moins un
                morceau attribué.
            </h6>
        </DropDown>

        <!-- Code to view distribution DATA -->
        <div class="flex flex-col gap-4 mt-4">
            <div v-for="(dist, index) in distribution.distribution">
                <h3 :class="{ 'text-red-500 font-bold': !trackExists(dist.trackUUID) }">
                    {{ index + 1 }}) {{ getTrack(dist.trackUUID, 'name') }} ({{
                        getTrack(dist.trackUUID, 'maxMusicians')
                    }}
                    musicien{{ getTrack(dist.trackUUID, 'maxMusicians') || 0 > 1 ? 's' : '' }})
                </h3>
                <h4 class="mt-2" v-if="dist.assignedMusiciansUUID.length > 0">
                    Il y a {{ dist.assignedMusiciansUUID.length }} musicien{{
                        dist.assignedMusiciansUUID.length > 1 ? 's' : ''
                    }}
                    qui joue{{ dist.assignedMusiciansUUID.length > 1 ? 'nt' : '' }} sur ce morceau
                    {{
                        index + 1 == distribution.distribution.length
                            ? ''
                            : dist.musiciansInCommonWithNextTrack
                                ? `et ${dist.musiciansInCommonWithNextTrack.length}
                    musicien${dist.musiciansInCommonWithNextTrack.length > 1
                                    ? 's' : ''} en commun avec le morceau suivant`
                                : ''
                    }}
                </h4>
                <h4 v-else>Il n'y a aucun musicien qui joue sur ce morceau</h4>
                <!-- Data table with musicians and selections -->
                <table class="mt-4">
                    <thead>
                        <tr>
                            <td>Nom</td>
                            <td>Prénom</td>
                            <td class="w-32">Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(musicianUUID, index) in dist.assignedMusiciansUUID" :key="index">
                            <td :class="{ 'text-red-500 font-bold': !data.getMusician(musicianUUID) }">{{ getMusician(musicianUUID, 'name') }}</td>
                            <td :class="{ 'text-red-500 font-bold': !data.getMusician(musicianUUID) }">{{ getMusician(musicianUUID, 'surname') }}</td>
                            <td>
                                <button class="btn btn-secondary w-full btn-icon" @click="
                                    openModal(
                                        'deleteAttributtion',
                                        musicianUUID,
                                        dist.trackUUID
                                    )
                                    ">
                                    <Trash :size="20" />Supprimer
                                </button>
                            </td>
                        </tr>
                        <tr class="hover:!bg-transparent hover:!cursor-auto">
                            <td colspan="3">
                                <div class="flex items-center justify-center gap-4">
                                    Un musicien manque à l'appel ? Pas de problème, ajoutez-le :
                                    <button class="btn btn-primary btn-icon"
                                        @click="openModal('addAttribution', '', dist.trackUUID)">
                                        <Plus :size="20" /> Ajouter
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <h4 class="mt-2" v-if="dist.rejectedMusiciansUUID.length > 0">
                    ⚠️ Il y a {{ dist.rejectedMusiciansUUID.length }} musicien{{
                        dist.rejectedMusiciansUUID.length > 1 ? 's' : ''
                    }}
                    rejeté{{ dist.rejectedMusiciansUUID.length > 1 ? 's' : '' }} :
                    {{
                        dist.rejectedMusiciansUUID
                            .map(
                                (uuid) => getMusician(uuid, 'all')
                            )
                            .join(', ')
                    }}
                </h4>
            </div>
        </div>
    </div>
    <div v-else>
        <h6 class="mt-4">Aucune distribution disponible, cliquez sur "Générer"</h6>
    </div>
</template>
