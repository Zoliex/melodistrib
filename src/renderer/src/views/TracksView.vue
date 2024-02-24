<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { v5 as uuidv5 } from 'uuid'

var router = useRouter()

window.tracks = window.tracks || ref([])
window.musicians = window.musicians || ref([])
window.selectedTracks = window.selectedTracks || ref([])

var tracks = window.tracks
var musicians = window.musicians
var selectedTracks = window.selectedTracks

const trackStructure = ref({
  name: '',
  maxMusicians: 12
})

function removeTrack(uuid) {
  tracks.value = tracks.value.filter((track) => track[0] !== uuid)

  sortTracks()
}

function addTrack() {
  if (!tracks.value.find((t) => t.name == trackStructure.value.name)) {
    tracks.value.push([
      getUuid(trackStructure.value.name, trackStructure.value.maxMusicians),
      trackStructure.value.name,
      trackStructure.value.maxMusicians
    ])
    trackStructure.value = { name: '', maxMusicians: 12 }
  } else {
    alert('Ce morceau existe déjà')
  }

  sortTracks()
}

async function importTracks() {
  const tracksFile = await window.api.openTracksFile()
  if (tracksFile) {
    tracks.value = JSON.parse(tracksFile)
  }

  sortTracks()
}

async function exportTracks() {
  const tracksFile = JSON.stringify(tracks.value)
  window.api.saveTracksFile(tracksFile)
}

async function importSelections() {
  const selectionsFile = await window.api.openSelectionsFile()
  if (selectionsFile) {
    const selection = JSON.parse(selectionsFile)
    musicians.value = selection.musicians
    tracks.value = selection.tracks
    selectedTracks.value = selection.selectedTracks
    router.push('/select')
  }

  sortAll()
}

function getUuid(name, maxMusicians) {
  const MY_NAMESPACE = '3d62b37a-a824-58f8-9600-41e7d8e1cf84'
  return uuidv5(name + maxMusicians, MY_NAMESPACE)
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
    <div class="p-4 bg-gray-200 rounded-xl">
      <p class="text-xl font-semibold mb-2 text-center">Ajouter un morceau</p>
      <p class="mb-2 text-lg">Nom du morceau</p>
      <input
        v-model="trackStructure.name"
        type="text"
        placeholder="Entrez le nom du morceau"
        class="input mb-3"
      />
      <p class="mb-2 text-lg">Nombre de musiciens jouant ce morceau</p>
      <input
        v-model="trackStructure.maxMusicians"
        type="number"
        min="1"
        placeholder="Nombre de musiciens"
        class="input"
      />
      <button
        class="outline-none py-1 h-9 text-lg rounded-lg w-full bg-green-500 text-white mt-4 hover:opacity-80 transition-all duration-150 disabled:opacity-60"
        :disabled="trackStructure.name == '' || trackStructure.maxMusicians == ''"
        @click="addTrack()"
      >
        Ajouter
      </button>
    </div>

    <h1 class="text-2xl font-semibold mt-3 mb-2">Liste des morceaux</h1>
    <p v-if="tracks.length != 0" class="text-lg opacity-70 mb-3">
      Il y a {{ tracks.length }} morceau{{ tracks.length > 1 ? 'x' : '' }}
    </p>
    <p v-if="tracks.length == 0" class="opacity-60 text-lg">Aucun morceau</p>
    <div class="grid grid-cols-2 gap-y-0 gap-4">
      <div
        v-for="track in tracks"
        :key="track[0]"
        class="p-4 pr-14 my-2 bg-gray-200 rounded-lg w-full relative"
      >
        <h1 class="font-semibold text-lg text-wrap break-words">{{ track[1] }}</h1>
        <p>{{ track[2] }} musiciens</p>
        <button
          class="absolute top-3 right-3 outline-none bg-red-500 text-white py-2 px-3 rounded-md"
          title="Supprimer"
          @click="removeTrack(track[0])"
        >
          <i class="gg-trash"></i>
        </button>
      </div>
    </div>
    <div
      class="fixed bottom-0 right-0 left-0 bg-white px-4 py-3 flex justify-between shadow-2xl shadow-black"
    >
      <button
        class="button bg-gradient-to-br from-blue-500 to-violet-700 hover:bg-blue-700 group"
        @click="importSelections()"
      >
        Importer tout
      </button>
      <button
        class="button bg-gradient-to-br from-blue-500 to-violet-700 hover:bg-blue-700"
        @click="importTracks()"
      >
        Importer
      </button>
      <button
        class="button bg-gradient-to-br from-blue-500 to-violet-700 hover:bg-blue-700"
        :disabled="tracks.length == 0"
        @click="exportTracks()"
      >
        Exporter
      </button>
      <button
        class="button bg-gradient-to-br from-blue-500 to-violet-700 hover:bg-blue-700 group"
        :disabled="tracks.length == 0"
        @click="router.push('/musicians')"
      >
        Suivant
        <i class="gg-arrow-right ml-2 group-hover:ml-4 transition-all duration-150"></i>
      </button>
    </div>
  </main>
</template>
