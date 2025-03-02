import { createMemoryHistory, createRouter } from 'vue-router'

const router = createRouter({
    history: createMemoryHistory(),
    routes: [
        {
            path: '/',
            redirect: '/tracks'
        },
        {
            name: 'Saisie des morceaux',
            path: '/tracks',
            component: () => import('@/views/TracksView.vue'),
            meta: {
                step: 1,
                next: '/musicians'
            }
        },
        {
            name: 'Saisie des musiciens',
            path: '/musicians',
            component: () => import('@/views/MusiciansView.vue'),
            meta: {
                step: 2,
                next: '/selections',
                previous: '/tracks'
            }
        },
        {
            name: 'Sélection des morceaux',
            path: '/selections',
            component: () => import('@/views/SelectionsView.vue'),
            meta: {
                step: 3,
                previous: '/musicians',
                next: '/distribution'
            }
        },
        {
            name: 'Répartition des musiciens',
            path: '/distribution',
            component: () => import('@/views/DistributionView.vue'),
            meta: {
                step: 4,
                previous: '/selections'
            }
        }
    ]
})

export default router
