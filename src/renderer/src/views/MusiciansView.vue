<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { v5 as uuidv5 } from 'uuid'

var router = useRouter()
var route = useRoute()

window.tracks = window.tracks || ref([])
window.musicians = window.musicians || ref([])
window.selectedTracks = window.selectedTracks || ref([])

var tracks = window.tracks
var musicians = window.musicians
var selectedTracks = window.selectedTracks

if (tracks.value.length == 0) {
  router.push('/')
}

const musician = ref({
  firstname: '',
  lastname: ''
})

function removeMusician(uuid) {
  musicians.value = musicians.value.filter((musician) => musician.uuid !== uuid)

  selectedTracks.value = selectedTracks.value.filter(
    (selectedTrack) => selectedTrack.musician !== uuid
  )
}

function addMusician() {
  if (
    !musicians.value.find(
      (m) => m.firstname == musician.value.firstname && m.lastname == musician.value.lastname
    )
  ) {
    musicians.value.push({
      firstname: musician.value.firstname,
      lastname: musician.value.lastname,
      uuid: getUuid(musician.value.firstname, musician.value.lastname)
    })
    musician.value = { firstname: '', lastname: '' }
  } else {
    alert('Ce musicien existe déjà')
  }
}

async function importMusicians() {
  const musiciansFile = await window.api.openMusiciansFile()
  if (musiciansFile) {
    musicians.value = JSON.parse(musiciansFile)
  }
}

async function exportMusicians() {
  const musiciansFile = JSON.stringify(musicians.value, false, 2)
  window.api.saveMusiciansFile(musiciansFile)
}

function getUuid(firstname, lastname) {
  const MY_NAMESPACE = '3d62b37a-a824-58f8-9600-41e7d8e1cf84'
  return uuidv5(firstname + lastname, MY_NAMESPACE)
}
</script>

<template>
  <main class="pb-16">
    <div class="p-4 bg-gray-200 rounded-xl">
      <p class="text-xl font-semibold mb-2 text-center">Ajouter un musicien</p>
      <p class="mb-2 text-lg">Prénom du musicien</p>
      <input
        type="text"
        v-model="musician.firstname"
        placeholder="Entrez le prénom du musicien"
        class="input mb-3"
      />
      <p class="mb-2 text-lg">Nom du musicien</p>
      <input
        type="text"
        v-model="musician.lastname"
        min="1"
        placeholder="Entrez le nom du musicien"
        class="input"
      />
      <button
        @click="addMusician()"
        :disabled="musician.firstname == '' || musician.lastname == ''"
        class="outline-none py-1 h-9 text-lg rounded-lg w-full bg-green-500 text-white mt-4 hover:opacity-80 transition-all duration-150 disabled:opacity-60"
      >
        Ajouter
      </button>
    </div>

    <h1 class="text-2xl font-semibold mt-3 mb-2">Liste des musiciens</h1>
    <p class="text-lg opacity-70 mb-3" v-if="musicians.length != 0">
      Il y a {{ Object.values(musicians).length }} musiciens
    </p>
    <p v-if="musicians.length == 0" class="opacity-60 text-lg">Aucun musicien</p>
    <div class="grid grid-cols-2 gap-y-0 gap-4">
      <div
        v-for="musician in musicians.slice().reverse()"
        class="p-4 pr-14 my-2 bg-gray-200 rounded-lg w-full relative"
      >
        <h1 class="font-semibold text-lg break-words">{{ musician.firstname }}</h1>
        <p class="break-words">{{ musician.lastname }}</p>
        <button
          @click="removeMusician(musician.uuid)"
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
        @click="exportMusicians()"
        :disabled="musicians.length == 0"
      >
        Exporter
      </button>
      <button
        class="button bg-gradient-to-br from-blue-500 to-violet-700 hover:bg-blue-700 group"
        @click="router.push('/select')"
        :disabled="musicians.length == 0"
      >
        Suivant
        <i class="gg-arrow-right ml-2 group-hover:ml-4 transition-all duration-150"></i>
      </button>
    </div>
  </main>
</template>
