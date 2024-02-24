<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

var router = useRouter()

window.tracks = window.tracks || ref([])
window.musicians = window.musicians || ref([])
window.selectedTracks = window.selectedTracks || ref([])

var tracks = window.tracks
var musicians = window.musicians
var selectedTracks = window.selectedTracks

var search = ref('')

function getTracks(uuid) {
  return [
    ...(selectedTracks.value.filter((selection) => selection[0] == uuid)[0] || [uuid])
  ].splice(1)
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
  tempSelect.value = getTracks(musician[0])
}

function closeSelect() {
  showSelect.value = false
  selectedTracks.value = selectedTracks.value.filter(
    (selection) => selection[0] != tempMusician.value[0]
  )
  selectedTracks.value.push([tempMusician.value[0], ...tempSelect.value])
}

function select(e) {
  e.target.checked
    ? tempSelect.value.push(e.target.value)
    : tempSelect.value.splice(tempSelect.value.indexOf(e.target.value), 1)
}

function getTrackName(track) {
  var trackName
  try {
    trackName = tracks.value.find((t) => t[0] == track)[1]
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

  sortAll()
}

async function exportSelections() {
  const selections = {
    musicians: musicians.value,
    tracks: tracks.value,
    selectedTracks: selectedTracks.value
  }
  const selectionsFile = JSON.stringify(selections)
  window.api.saveSelectionsFile(selectionsFile)
}

function sortTracks() {
  tracks.value.sort((a, b) => a[1].localeCompare(b[1]))
}

function sortMusicians() {
  musicians.value.sort((a, b) => a[2].localeCompare(b[2]))
}

function sortAll() {
  sortTracks()
  sortMusicians()
}
</script>

<template>
  <main class="pb-16">
    <p class="text-xl mb-3 text-center">Cliquez sur un musicien pour sélectionner ses morceaux</p>
    <input v-model="search" type="text" placeholder="Rechercher" class="input mb-4 !bg-zinc-200" />
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
          v-for="musician in musicians.filter(
            (musician) =>
              musician[1].toLowerCase().includes(search.toLowerCase()) ||
              musician[2].toLowerCase().includes(search.toLowerCase())
          )"
          :key="musician[0]"
          title="Cliquez pour selectionner les morceaux"
          class="border-b text-base last:border-b-0 hover:bg-zinc-200 transition-all duration-150 cursor-pointer"
        >
          <th
            scope="row"
            class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap"
            @click="selectTracks(musician)"
          >
            {{ musician[1] }}
          </th>
          <td class="px-6 py-3" @click="selectTracks(musician)">
            {{ musician[2] }}
          </td>
          <td class="px-6 py-3" @click="selectTracks(musician)">
            <ul class="list-disc">
              <li v-for="track in getTracks(musician[0])" :key="track[0]">
                {{ getTrackName(track) }}
              </li>
            </ul>
            {{ getTracks(musician[0]).length == 0 ? 'Aucune musique sélectionnée' : '' }}
          </td>
        </tr>
      </tbody>
    </table>

    <div
      v-show="showSelect"
      class="bg-zinc-950 fixed z-50 w-full h-full top-0 left-0 bg-opacity-60 flex items-center justify-center"
    >
      <div class="bg-white w-4/5 h-min max-h-4/5 rounded-lg p-4 relative">
        <h1 class="text-2xl font-semibold text-center mb-4">
          Selectionner les morceaux de {{ tempMusician[1] }} {{ tempMusician[2] }}
        </h1>
        <div class="w-full h-72 relative">
          <div class="absolute top-0 right-0 bottom-0 left-0 overflow-auto">
            <div v-for="track in tracks" :key="track[0]" class="flex items-center my-1">
              <div class="w-5 h-full flex">
                <input
                  :id="track[0]"
                  type="checkbox"
                  :value="track[0]"
                  :checked="tempSelect.includes(track[0])"
                  class="!w-5 !h-5 cursor-pointer"
                  @change="select($event)"
                />
              </div>

              <label :for="track[0]" class="ml-2 text-lg cursor-pointer">
                {{ track[1] }} ({{ track[2] }} musicien{{ track[2] > 1 ? 's' : '' }})
              </label>
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
