import { createRouter, createWebHashHistory } from 'vue-router'
import TracksView from '../views/TracksView.vue'
import MusiciansView from '../views/MusiciansView.vue'
import SelectView from '../views/SelectView.vue'
import ShowView from '../views/ShowView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/tracks'
    },
    {
      path: '/tracks',
      name: 'tracks',
      component: TracksView,
      meta: {
        fullname: 'Choix des morceaux',
        progress: 25
      }
    },
    {
      path: '/musicians',
      name: 'musicians',
      component: MusiciansView,
      meta: {
        fullname: 'Choix des musiciens',
        progress: 50
      }
    },
    {
      path: '/select',
      name: 'select',
      component: SelectView,
      meta: {
        fullname: 'Sélection des morceaux',
        progress: 75
      }
    },
    {
      path: '/show',
      name: 'show',
      component: ShowView,
      meta: {
        fullname: 'Affichage des résultats',
        description: 'Entrez les morceaux du concert',
        progress: 100
      }
    }
  ]
})

export default router
