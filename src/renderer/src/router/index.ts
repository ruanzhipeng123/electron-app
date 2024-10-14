import { createMemoryHistory, createRouter } from 'vue-router'

import Home from '@renderer/views/Home.vue'
import Setting from '@renderer/views/Setting.vue'

const routes = [
  { name: 'home', path: '/', component: Home },
  { name: 'setting', path: '/setting', component: Setting },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router