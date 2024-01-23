<script setup>
import { RouterView, useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <div class="px-4 py-3">
    <h1 class="print:hidden text-3xl font-semibold mb-3">{{ route.meta.fullname }}</h1>
    <h1 class="print:block hidden text-3xl font-semibold mb-3">
      Enchaînement de morceaux du {{ new Date().getDate() }}/{{ new Date().getMonth() + 1 }}/{{
        new Date().getFullYear()
      }}
    </h1>
    <div class="h-4 w-full bg-gray-200 rounded-full overflow-clip mb-4 print:hidden">
      <div
        class="h-full bg-gradient-to-r from-blue-500 to-purple-700 flex items-center justify-center text-sm text-white rounded-full transition-all duration-150 ease-in-out"
        :style="{ width: route.meta.progress + '%' }"
      >
        <p v-show="route.meta.progress >= 5">{{ route.meta.progress }}%</p>
      </div>
    </div>
    <router-view />
  </div>
</template>
