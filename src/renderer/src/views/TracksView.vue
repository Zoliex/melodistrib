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

const track = ref({
  name: '',
  maxMusicians: 12
})

function removeTrack(id) {
  tracks.value = tracks.value.filter((track) => track.id !== id)

  setId()
}

function addTrack() {
  if (!tracks.value.find((t) => t.name == track.value.name)) {
    tracks.value.push({
      name: track.value.name,
      maxMusicians: track.value.maxMusicians,
      uuid: getUuid(track.value.name, track.value.maxMusicians)
    })
    track.value = { name: '', maxMusicians: 12 }
  } else {
    alert('Ce morceau existe déjà')
  }

  setId()
}

function setId() {
  for (let i = 0; i < tracks.value.length; i++) {
    tracks.value[i].id = i
  }
}

async function importTracks() {
  const tracksFile = await window.api.openTracksFile()
  if (tracksFile) {
    tracks.value = JSON.parse(tracksFile)
  }
}

async function exportTracks() {
  const tracksFile = JSON.stringify(tracks.value, false, 2)
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
}

function getUuid(name, maxMusicians) {
  const MY_NAMESPACE = '3d62b37a-a824-58f8-9600-41e7d8e1cf84'
  return uuidv5(name + maxMusicians, MY_NAMESPACE)
}
</script>

<template>
  <main class="pb-16">
    <div class="p-4 bg-gray-200 rounded-xl">
      <p class="text-xl font-semibold mb-2 text-center">Ajouter un morceau</p>
      <p class="mb-2 text-lg">Nom du morceau</p>
      <input
        type="text"
        v-model="track.name"
        placeholder="Entrez le nom du morceau"
        class="input mb-3"
      />
      <p class="mb-2 text-lg">Nombre de musiciens jouant ce morceau</p>
      <input
        type="number"
        v-model="track.maxMusicians"
        min="1"
        placeholder="Nombre de musiciens"
        class="input"
      />
      <button
        @click="addTrack()"
        :disabled="track.name == '' || track.maxMusicians == ''"
        class="outline-none py-1 h-9 text-lg rounded-lg w-full bg-green-500 text-white mt-4 hover:opacity-80 transition-all duration-150 disabled:opacity-60"
      >
        Ajouter
      </button>
    </div>

    <h1 class="text-2xl font-semibold mt-3 mb-2">Liste des morceaux</h1>
    <p v-if="tracks.length == 0" class="opacity-60 text-lg">Aucun morceau</p>
    <div class="grid grid-cols-2 gap-y-0 gap-4">
      <div
        v-for="track in tracks.slice().reverse()"
        :key="track.id"
        class="p-4 pr-14 my-2 bg-gray-200 rounded-lg w-full relative"
      >
        <h1 class="font-semibold text-lg text-wrap">{{ track.name }}</h1>
        <p>{{ track.maxMusicians }} musiciens</p>
        <button
          @click="removeTrack(track.id)"
          class="absolute top-3 right-3 outline-none bg-red-500 text-white py-2 px-3 rounded-md"
          title="Supprimer"
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
        @click="exportTracks()"
        :disabled="tracks.length == 0"
      >
        Exporter
      </button>
      <button
        class="button bg-gradient-to-br from-blue-500 to-violet-700 hover:bg-blue-700 group"
        @click="router.push('/musicians')"
        :disabled="tracks.length == 0"
      >
        Suivant
        <i class="gg-arrow-right ml-2 group-hover:ml-4 transition-all duration-150"></i>
      </button>
    </div>
  </main>
</template>
