<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

var router = useRouter()

window.tracks = window.tracks || ref([])
window.musicians = window.musicians || ref([])
window.selectedTracks = window.selectedTracks || ref([])

var tracks = window.tracks
var musicians = window.musicians
var selectedTracks = window.selectedTracks

var search = ref('')

function getTracks(musician) {
  return selectedTracks.value
    .filter((track) => track.musician == musician.uuid)
    .map((track) => track.tracks)
    .flat()
}

var showSelect = ref(false)
var tempSelect = ref([])
var tempMusician = ref([])

if (musicians.value.length == 0) {
  router.push('/')
}

function selectTracks(musician) {
  showSelect.value = true
  tempMusician.value = musician
  tempSelect.value = getTracks(musician)
}

function closeSelect() {
  showSelect.value = false
  selectedTracks.value = selectedTracks.value.filter(
    (track) => track.musician != tempMusician.value.uuid
  )
  selectedTracks.value.push({ musician: tempMusician.value.uuid, tracks: tempSelect.value })
}

function select(e) {
  e.target.checked
    ? tempSelect.value.push(e.target.value)
    : tempSelect.value.splice(tempSelect.value.indexOf(e.target.value), 1)
}

function getTrackName(track) {
  var trackName
  try {
    trackName = tracks.value.find((t) => t.uuid == track).name
  } catch (error) {
    trackName = ''
  }
  return trackName
}

async function importSelections() {
  const selectionsFile = await window.api.openSelectionsFile()
  if (selectionsFile) {
    const selection = JSON.parse(selectionsFile)
    musicians.value = selection.musicians
    tracks.value = selection.tracks
    selectedTracks.value = selection.selectedTracks
  }
}

async function exportSelections() {
  const selections = {
    musicians: musicians.value,
    tracks: tracks.value,
    selectedTracks: selectedTracks.value
  }
  const selectionsFile = JSON.stringify(selections, false, 2)
  window.api.saveSelectionsFile(selectionsFile)
}
</script>

<template>
  <main class="pb-16">
    <p class="text-xl mb-3 text-center">Cliquez sur un musicien pour sélectionner ses morceaux</p>
    <input type="text" v-model="search" placeholder="Rechercher" class="input mb-4 !bg-zinc-200" />
    <table class="w-full text-sm text-left bg-zinc-100 text-zinc-500 rounded-lg overflow-clip">
      <thead class="text-zinc-700 uppercase bg-zinc-300">
        <tr>
          <th scope="col" class="px-6 py-3">Nom</th>
          <th scope="col" class="px-6 py-3">Prénom</th>
          <th scope="col" class="px-6 py-3">Musiques sélectionnées</th>
        </tr>
      </thead>
      <tbody>
        <tr
          title="Cliquez pour selectionner les morceaux"
          class="border-b text-base last:border-b-0 hover:bg-zinc-200 transition-all duration-150 cursor-pointer"
          v-for="musician in musicians.filter(
            (musician) => musician.firstname.includes(search) || musician.lastname.includes(search)
          )"
          :key="musician.id"
        >
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            @click="selectTracks(musician)"
          >
            {{ musician.firstname }}
          </th>
          <td class="px-6 py-4" @click="selectTracks(musician)">
            {{ musician.lastname }}
          </td>
          <td class="px-6 py-4" @click="selectTracks(musician)">
            <p v-for="track in getTracks(musician)" :key="track.id">
              {{ getTrackName(track) }}
            </p>
            {{ getTracks(musician).length == 0 ? 'Aucune musique sélectionnée' : '' }}
          </td>
        </tr>
      </tbody>
    </table>

    <div
      class="bg-zinc-950 fixed z-50 w-full h-full top-0 left-0 bg-opacity-60 flex items-center justify-center"
      v-show="showSelect"
    >
      <div class="bg-white w-4/5 h-min max-h-4/5 rounded-lg p-4 relative">
        <h1 class="text-2xl font-semibold text-center mb-4">
          Selectionner les morceaux de {{ tempMusician.firstname }} {{ tempMusician.lastname }}
        </h1>
        <div class="w-full h-72 relative">
          <div class="absolute top-0 right-0 bottom-0 left-0 overflow-auto">
            <div v-for="track in tracks" :key="track.id" class="flex items-center">
              <input
                type="checkbox"
                :value="track.uuid"
                :checked="tempSelect.includes(track.uuid)"
                @change="select($event)"
                :id="track.uuid"
                class="w-5 h-5 cursor-pointer"
              />
              <label :for="track.uuid" class="ml-2 text-lg cursor-pointer">{{ track.name }}</label>
            </div>
          </div>
        </div>
        <div class="flex justify-between mt-4">
          <button class="button-lg bg-green-500" @click="closeSelect()">Valider</button>
          <button class="button-lg bg-red-500" @click="showSelect = false">Annuler</button>
        </div>
      </div>
    </div>

    <div
      class="fixed bottom-0 right-0 left-0 bg-white px-4 py-3 flex justify-between shadow-2xl shadow-black"
    >
      <button
        class="button bg-gradient-to-br from-blue-500 to-violet-700 hover:bg-blue-700 group"
        @click="router.push('/musicians')"
      >
        <i class="gg-arrow-left mr-2 group-hover:mr-4 transition-all duration-150"></i>
        Retour
      </button>
      <button
        class="button bg-gradient-to-br from-blue-500 to-violet-700 hover:bg-blue-700"
        @click="importSelections()"
      >
        Importer tout
      </button>
      <button
        class="button bg-gradient-to-br from-blue-500 to-violet-700 hover:bg-blue-700"
        @click="exportSelections()"
      >
        Exporter tout
      </button>
      <button
        class="button bg-gradient-to-br from-blue-500 to-violet-700 hover:bg-blue-700 group"
        @click="router.push('/show')"
      >
        Suivant
        <i class="gg-arrow-right ml-2 group-hover:ml-4 transition-all duration-150"></i>
      </button>
    </div>
  </main>
</template>
