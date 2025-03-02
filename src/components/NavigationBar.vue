<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, ArrowRight } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()

defineProps<{
    conditionNext?: boolean
    conditionPrevious?: boolean
}>()
</script>

<template>
    <!-- App navigation header -->
    <div class="flex justify-between items-center mb-6">
        <button
            class="btn-primary w-40 btn-icon"
            @click="router.push(route.meta.previous || '')"
            :disabled="!route.meta.previous || !conditionPrevious"
        >
            <ArrowLeft :size="20" /> Précédent
        </button>
        <h3>{{ route.name }} ({{ route.meta.step }}/4)</h3>
        <button
            class="btn-primary w-40 btn-icon"
            @click="router.push(route.meta.next || '')"
            :disabled="!route.meta.next || !conditionNext"
        >
            Suivant <ArrowRight :size="20" />
        </button>
    </div>
</template>
