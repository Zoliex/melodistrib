<script setup>
defineProps({
  btnLeftText: {
    type: String,
    default: 'Importer'
  },
  btnRightText: {
    type: String,
    default: 'Exporter'
  },
  firstBtnClick: {
    type: Function
  },
  secondBtnClick: {
    type: Function
  },
  thirdBtnClick: {
    type: Function
  },
  fourthBtnClick: {
    type: Function
  }
})
</script>

<template>
  <div
    class="fixed bottom-0 right-0 left-0 bg-white px-4 py-3 flex justify-between shadow-2xl shadow-black"
  >
    <button
      class="button bg-gradient-to-br from-blue-500 to-violet-700 hover:bg-blue-700 group"
      disabled
    >
      <i class="gg-arrow-left mr-2 group-hover:mr-4 transition-all duration-150"></i>
      Retour
    </button>
    <button
      class="button bg-gradient-to-br from-blue-500 to-violet-700 hover:bg-blue-700"
      @click="importTracks()"
    >
      {{ btnLeftText }}
    </button>
    <button
      class="button bg-gradient-to-br from-blue-500 to-violet-700 hover:bg-blue-700"
      @click="exportTracks()"
    >
      {{ btnRightText }}
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
</template>
