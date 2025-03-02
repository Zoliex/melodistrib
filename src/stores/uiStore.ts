import { defineStore } from 'pinia'

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useUIStore = defineStore('ui', {
    state: () => ({
        bodyOverflow: 'auto'
    }),
    actions: {
        disableScroll() {
            this.bodyOverflow = document.body.style.overflow
            document.body.style.overflow = 'hidden'
        },
        enableScroll() {
            document.body.style.overflow = this.bodyOverflow
        }
    }
})
