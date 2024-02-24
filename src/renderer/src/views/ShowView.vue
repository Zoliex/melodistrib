<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import distributeTracks from '../assets/distribute'
import sortTracks from '../assets/sort'

var router = useRouter()

window.tracks = window.tracks || ref([])
window.musicians = window.musicians || ref([])
window.selectedTracks = window.selectedTracks || ref([])

var tracks = window.tracks
var musicians = window.musicians
var selectedTracks = window.selectedTracks

var { result, stats } = distributeTracks(tracks.value, musicians.value, selectedTracks.value)

var sortedTracks = sortTracks(result)

if (sortedTracks.length === 0) {
  router.push('/')
}

function exportAsWord() {
  window.api.exportAsWord(
    JSON.stringify(sortedTracks),
    JSON.stringify(stats),
    JSON.stringify(musicians.value)
  )
}

function rejectedMusicians(track) {
  return track.selected.filter((m) => !track.assigned.includes(m))
}
</script>

<template>
  <main class="pb-16">
    <div v-for="(track, index) in result" :key="index">
      <h1 class="text-2xl font-semibold mb-1" :class="{ '!mb-4': !track.similarityWithNext }">
        {{ index + 1 }}) {{ track.name }} ({{ track.max }}
        musiciens)
      </h1>
      <p class="text-lg opacity-70 mb-4">
        Il y a {{ track.assigned.length }} musiciens qui jouent ce morceau{{
          track.similarityWithNext != null
            ? ` et ${track.similarityWithNext} musiciens en commun avec le morceau suivant`
            : ''
        }}
      </p>
      <table
        class="w-full text-sm text-left bg-zinc-100 text-zinc-500 rounded-lg overflow-clip mb-4"
      >
        <thead class="text-zinc-700 uppercase bg-zinc-300">
          <tr>
            <th scope="col" class="px-6 py-3">Nom</th>
            <th scope="col" class="px-6 py-3">Prénom</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(musician, idx) in track.assigned"
            :key="idx"
            class="border-b text-base last:border-b-0 hover:bg-zinc-200 transition-all duration-150"
          >
            <th scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap">
              {{ musicians.find((m) => m[0] === musician)[1] }}
            </th>
            <th scope="row" class="px-6 py-3 font-normal text-gray-900 whitespace-nowrap">
              {{ musicians.find((m) => m[0] === musician)[2] }}
            </th>
          </tr>
        </tbody>
      </table>
      <p v-if="rejectedMusicians(track).length > 0" class="text-lg opacity-70 mb-4">
        <svg
          viewBox="0 0 36 36"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          class="w-4 h-4 mr-2 -mt-1 inline"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            class="fill-yellow-400"
            d="M2.653 35C.811 35-.001 33.662.847 32.027L16.456 1.972c.849-1.635 2.238-1.635 3.087 0l15.609 30.056c.85 1.634.037 2.972-1.805 2.972H2.653z"
          ></path>
          <path
            class="fill-black"
            d="M15.583 28.953a2.421 2.421 0 0 1 2.419-2.418a2.421 2.421 0 0 1 2.418 2.418a2.422 2.422 0 0 1-2.418 2.419a2.422 2.422 0 0 1-2.419-2.419zm.186-18.293c0-1.302.961-2.108 2.232-2.108c1.241 0 2.233.837 2.233 2.108v11.938c0 1.271-.992 2.108-2.233 2.108c-1.271 0-2.232-.807-2.232-2.108V10.66z"
          ></path>
        </svg>

        <span v-for="(person, idx2) in rejectedMusicians(track)" :key="idx2">
          {{ musicians.find((m) => m[0] === person)[1] }}
          {{ musicians.find((m) => m[0] === person)[2]
          }}{{
            rejectedMusicians(track).length > 1 && idx2 < rejectedMusicians(track).length - 2
              ? ', '
              : ''
          }}{{
            rejectedMusicians(track).length > 1 && idx2 == rejectedMusicians(track).length - 2
              ? ' et '
              : ''
          }}</span
        >
        n'{{ rejectedMusicians(track).length > 1 ? 'ont ' : 'a ' }} pas été{{
          rejectedMusicians(track).length > 1 ? 's' : ''
        }}
        choisi{{ rejectedMusicians(track).length > 1 ? 's' : '(e)' }} pour jouer ce morceau
      </p>
    </div>

    <hr class="mb-4" />

    <h1 class="text-3xl font-semibold mb-1">Informations sur les musiciens</h1>
    <p class="text-lg opacity-70 mb-4">
      Il y a {{ Object.values(stats).length }} musiciens qui jouent ces morceaux
    </p>

    <table class="w-full text-sm text-left bg-zinc-100 text-zinc-500 rounded-lg overflow-clip mb-4">
      <thead class="text-zinc-700 uppercase bg-zinc-300">
        <tr>
          <th scope="col" class="pl-6 px-4 py-3">Nom</th>
          <th scope="col" class="px-4 py-3">Prénom</th>
          <th scope="col" class="px-4 py-3">Nb morceaux joués</th>
          <th scope="col" class="px-4 py-3">Nb morceaux choisis</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(stat, index) in stats"
          :key="index"
          class="border-b text-base last:border-b-0 hover:bg-zinc-200 transition-all duration-150"
          :class="{ 'bg-zinc-200': stat[1] != stat[2] }"
        >
          <th scope="row" class="pl-6 px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
            {{ musicians.find((m) => m[0] === stat[0])[1] }}
          </th>
          <th scope="row" class="px-4 py-3 font-normal text-gray-900 whitespace-nowrap">
            {{ musicians.find((m) => m[0] === stat[0])[2] }}
          </th>
          <th scope="row" class="px-4 py-3 font-normal text-center text-gray-900 whitespace-nowrap">
            {{ stat[2] }}
          </th>
          <th scope="row" class="px-4 py-3 font-normal text-center text-gray-900 whitespace-nowrap">
            {{ stat[1] }}
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
        disabled
        @click="router.push('/show')"
      >
        Suivant
        <i class="gg-arrow-right ml-2 group-hover:ml-4 transition-all duration-150"></i>
      </button>
    </div>
  </main>
</template>
