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

if (tracks.value.length == 0) {
  router.push('/')
}

const musicianStructure = ref({
  firstname: '',
  lastname: ''
})

function removeMusician(uuid) {
  musicians.value = musicians.value.filter((musician) => musician[0] !== uuid)

  selectedTracks.value = selectedTracks.value.filter((selectedTrack) => selectedTrack[0] !== uuid)

  sortMusicians()
}

function addMusician() {
  if (
    !musicians.value.find(
      (m) =>
        m.firstname == musicianStructure.value.firstname &&
        m.lastname == musicianStructure.value.lastname
    )
  ) {
    musicians.value.push([
      getUuid(musicianStructure.value.firstname, musicianStructure.value.lastname),
      musicianStructure.value.firstname,
      musicianStructure.value.lastname
    ])
    musicianStructure.value = { firstname: '', lastname: '' }
  } else {
    alert('Ce musicien existe déjà')
  }

  sortMusicians()
}

async function importMusicians() {
  const musiciansFile = await window.api.openMusiciansFile()
  if (musiciansFile) {
    musicians.value = JSON.parse(musiciansFile)
  }

  sortMusicians()
}

async function exportMusicians() {
  const musiciansFile = JSON.stringify(musicians.value)
  window.api.saveMusiciansFile(musiciansFile)
}

function getUuid(firstname, lastname) {
  const MY_NAMESPACE = '3d62b37a-a824-58f8-9600-41e7d8e1cf84'
  return uuidv5(firstname + lastname, MY_NAMESPACE)
}

function sortMusicians() {
  musicians.value.sort((a, b) => a[2].localeCompare(b[2]))
}
</script>

<template>
  <main class="pb-16">
    <div class="p-4 bg-gray-200 rounded-xl">
      <p class="text-xl font-semibold mb-2 text-center">Ajouter un musicien</p>
      <p class="mb-2 text-lg">Prénom du musicien</p>
      <input
        v-model="musicianStructure.firstname"
        type="text"
        placeholder="Entrez le prénom du musicien"
        class="input mb-3"
      />
      <p class="mb-2 text-lg">Nom du musicien</p>
      <input
        v-model="musicianStructure.lastname"
        type="text"
        min="1"
        placeholder="Entrez le nom du musicien"
        class="input"
      />
      <button
        class="outline-none py-1 h-9 text-lg rounded-lg w-full bg-green-500 text-white mt-4 hover:opacity-80 transition-all duration-150 disabled:opacity-60"
        :disabled="musicianStructure.firstname == '' || musicianStructure.lastname == ''"
        @click="addMusician()"
      >
        Ajouter
      </button>
    </div>

    <h1 class="text-2xl font-semibold mt-3 mb-2">Liste des musiciens</h1>
    <p v-if="musicians.length != 0" class="text-lg opacity-70 mb-3">
      Il y a {{ musicians.length }} musicien{{ musicians.length > 1 ? 's' : '' }}
    </p>
    <p v-if="musicians.length == 0" class="opacity-60 text-lg">Aucun musicien</p>
    <div class="grid grid-cols-2 gap-y-0 gap-4">
      <div
        v-for="musician in musicians.slice()"
        :key="musician[0]"
        class="p-4 pr-14 my-2 bg-gray-200 rounded-lg w-full relative"
      >
        <h1 class="font-semibold text-lg break-words">{{ musician[1] }}</h1>
        <p class="break-words">{{ musician[2] }}</p>
        <button
          class="absolute top-3 right-3 outline-none bg-red-500 text-white py-2 px-3 rounded-md"
          title="Supprimer"
          @click="removeMusician(musician[0])"
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
        @click="router.push('/tracks')"
      >
        <i class="gg-arrow-left mr-2 group-hover:mr-4 transition-all duration-150"></i>
        Retour
      </button>
      <button
        class="button bg-gradient-to-br from-blue-500 to-violet-700 hover:bg-blue-700"
        @click="importMusicians()"
      >
        Importer
      </button>
      <button
        class="button bg-gradient-to-br from-blue-500 to-violet-700 hover:bg-blue-700"
        :disabled="musicians.length == 0"
        @click="exportMusicians()"
      >
        Exporter
      </button>
      <button
        class="button bg-gradient-to-br from-blue-500 to-violet-700 hover:bg-blue-700 group"
        :disabled="musicians.length == 0"
        @click="router.push('/select')"
      >
        Suivant
        <i class="gg-arrow-right ml-2 group-hover:ml-4 transition-all duration-150"></i>
      </button>
    </div>
  </main>
</template>
