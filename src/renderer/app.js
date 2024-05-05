import { createApp } from 'vue'
import App from '~/App.vue'
import '~/assets/css/index.css'
import { plugin, defaultConfig } from '@formkit/vue'
import { generateClasses } from '@formkit/themes'
import theme from './formkitTheme'
import router from './routes'
import VueFinalModal from 'vue-final-modal'
import decode from 'jwt-decode'

export function validateJWT (jwt) {
  if (!jwt) {
    return false
  }
  const { exp = Infinity } = decode(jwt)
  const today = parseInt(new Date().getTime() / 1000, 10)
  return exp > today
}

router.beforeEach((to, from) => {
  const token = localStorage.getItem('token')
  if (to.path !== '/login' && (token === null || !validateJWT(token))) {
    return { path: '/login' }
  }
})

createApp(App)
  .use(router)
  .use(plugin, defaultConfig({
    config: {
      classes: generateClasses(theme)
    }
  }))
  .use(VueFinalModal)
  .mount('#app')
