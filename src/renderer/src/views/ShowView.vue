<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import distributeTracks from '../assets/distribute'
import sortTracks from '../assets/sort'

var router = useRouter()

window.tracks = window.tracks || ref([])
window.musicians = window.musicians || ref([])
window.selectedTracks = window.selectedTracks || ref([])

var tracks = window.tracks
var musicians = window.musicians
var selectedTracks = window.selectedTracks

var { tracksWithMusicians, tracksInfoByMusician } = distributeTracks(
  tracks.value,
  musicians.value,
  selectedTracks.value
)

var sortedTracks = sortTracks(tracksWithMusicians)

if (sortedTracks.length === 0) {
  router.push('/')
}

function exportAsWord() {
  window.api.exportAsWord(
    JSON.stringify(sortedTracks),
    JSON.stringify(tracksInfoByMusician),
    JSON.stringify(musicians.value)
  )
}
</script>

<template>
  <main class="pb-16">
    <div v-for="(track, index) in sortedTracks" :key="index">
      <h1 class="text-2xl font-semibold mb-1" :class="{ '!mb-4': !track.similarityWithNext }">
        {{ index + 1 }}) {{ track.trackDetails.name }} ({{ track.trackDetails.maxMusicians }}
        musiciens)
      </h1>
      <p class="text-lg opacity-70 mb-4" v-show="track.similarityWithNext">
        Il y a {{ track.similarityWithNext }} musiciens en commun avec le morceau suivant.
      </p>
      <table
        class="w-full text-sm text-left bg-zinc-100 text-zinc-500 rounded-lg overflow-clip mb-4"
      >
        <thead class="text-zinc-700 uppercase bg-zinc-300">
          <tr>
            <th scope="col" class="px-6 py-3">Nom</th>
            <th scope="col" class="px-6 py-3">Prénom</th>
            <th scope="col" class="px-6 py-3">Choix</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="border-b text-base last:border-b-0 hover:bg-zinc-200 transition-all duration-150"
            v-for="person in track.assignedMusicians"
            :key="person.musician.id"
          >
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {{ person.musician.firstname }}
            </th>
            <th scope="row" class="px-6 py-4 font-normal text-gray-900 whitespace-nowrap">
              {{ person.musician.lastname }}
            </th>
            <th scope="row" class="px-6 py-4 font-normal text-gray-900 whitespace-nowrap">
              {{ person.chosen ? 'Oui' : 'Non' }}
            </th>
          </tr>
        </tbody>
      </table>

      <p class="text-lg opacity-70 mb-4" v-if="track.rejectedMusicians.length > 0">
        <span v-for="(person, index) in track.rejectedMusicians"
          >{{ person.firstname }} {{ person.lastname
          }}{{
            track.rejectedMusicians.length > 1 && index < track.rejectedMusicians.length - 2
              ? ', '
              : ''
          }}{{
            track.rejectedMusicians.length > 1 && index == track.rejectedMusicians.length - 2
              ? ' et '
              : ''
          }}</span
        >
        n'{{ track.rejectedMusicians.length > 1 ? 'ont ' : 'a ' }} pas été{{
          track.rejectedMusicians.length > 1 ? 's' : ''
        }}
        choisi{{ track.rejectedMusicians.length > 1 ? 's' : '(e)' }} pour jouer ce morceau.
      </p>
    </div>

    <hr class="mb-4" />

    <h1 class="text-3xl font-semibold mb-1">Informations sur les musiciens</h1>
    <p class="text-lg opacity-70 mb-4">
      Il y a {{ Object.values(tracksInfoByMusician).length }} musiciens qui jouent ces morceaux.
    </p>

    <table class="w-full text-sm text-left bg-zinc-100 text-zinc-500 rounded-lg overflow-clip mb-4">
      <thead class="text-zinc-700 uppercase bg-zinc-300">
        <tr>
          <th scope="col" class="pl-6 px-4 py-3">Nom</th>
          <th scope="col" class="px-4 py-3">Prénom</th>
          <th scope="col" class="px-4 py-3">Nb morceaux joués</th>
          <th scope="col" class="px-4 py-3">Nb morceaux choisis</th>
          <th scope="col" class="px-4 py-3">Morceaux choisis et joués</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="border-b text-base last:border-b-0 hover:bg-zinc-200 transition-all duration-150"
          v-for="(musician, musicianUUID) in tracksInfoByMusician"
        >
          <th scope="row" class="pl-6 px-4 py-4 font-medium text-gray-900 whitespace-nowrap">
            {{ musicians.find((m) => m.uuid === musicianUUID).firstname }}
          </th>
          <th scope="row" class="px-4 py-4 font-normal text-gray-900 whitespace-nowrap">
            {{ musicians.find((m) => m.uuid === musicianUUID).lastname }}
          </th>
          <th scope="row" class="px-4 py-4 font-normal text-center text-gray-900 whitespace-nowrap">
            {{ musician.played }}
          </th>
          <th scope="row" class="px-4 py-4 font-normal text-center text-gray-900 whitespace-nowrap">
            {{ musician.initial }}
          </th>
          <th scope="row" class="px-4 py-4 font-normal text-center text-gray-900 whitespace-nowrap">
            {{ musician.chosen }}
          </th>
        </tr>
      </tbody>
    </table>

    <div
      class="print:hidden fixed bottom-0 right-0 left-0 bg-white px-4 py-3 flex justify-between shadow-2xl shadow-black"
    >
      <button
        class="button bg-gradient-to-br from-blue-500 to-violet-700 hover:bg-blue-700 group"
        @click="router.push('/select')"
      >
        <i class="gg-arrow-left mr-2 group-hover:mr-4 transition-all duration-150"></i>
        Retour
      </button>
      <button
        class="button-lg bg-gradient-to-br from-blue-500 to-violet-700 hover:bg-blue-700"
        @click="exportAsWord()"
      >
        Exporter en word
      </button>
      <button
        class="button bg-gradient-to-br from-blue-500 to-violet-700 hover:bg-blue-700 group"
        @click="router.push('/show')"
        disabled
      >
        Suivant
        <i class="gg-arrow-right ml-2 group-hover:ml-4 transition-all duration-150"></i>
      </button>
    </div>
  </main>
</template>
