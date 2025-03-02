<script setup lang="ts">
import { ref } from 'vue'
import { ChevronDown } from 'lucide-vue-next'

const isOpen = ref(false)
const toggleDropdown = () => {
    isOpen.value = !isOpen.value
}
</script>
<template>
    <div class="relative w-full">
        <h3
            class="mt-4 cursor-pointer flex items-center justify-start select-none break-words"
            @click="toggleDropdown"
        >
            <ChevronDown
                :class="{ 'rotate-180': isOpen }"
                class="w-7 h-7 transition-transform mr-2"
            />
            <slot name="title"></slot>
        </h3>
        <transition name="fade-height">
            <div v-if="isOpen" class="overflow-hidden">
                <slot></slot>
            </div>
        </transition>
        <h6 v-if="!isOpen" class="mt-2">
            Clickez sur le titre pour afficher le contenu de cette section
        </h6>
    </div>
</template>

<style>
.fade-height-enter-active,
.fade-height-leave-active {
    transition:
        opacity 0.3s ease-in-out,
        max-height 0.3s ease-in-out;
}
.fade-height-enter-from,
.fade-height-leave-to {
    opacity: 0;
    max-height: 0;
}
.fade-height-enter-to,
.fade-height-leave-from {
    max-height: 1500px; /* Adjust according to content size */
}
</style>
