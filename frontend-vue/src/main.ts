import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin, QueryCache, MutationCache } from '@tanstack/vue-query'

import App from './App.vue'
import router from './router'

import { OpenAPI, ApiError } from './client'

//Konfiguracja OpenAPI klienta
OpenAPI.BASE = import.meta.env.VITE_API_URL
OpenAPI.TOKEN = async () => {
  return localStorage.getItem('access_token') || ''
}

//Obsługa błędów API
function handleApiError(error: unknown) {
  if (error instanceof ApiError && [401, 403].includes(error.status)) {
    localStorage.removeItem('access_token')
    window.location.href = '/login'
  }
}

const app = createApp(App)

app.use(createPinia())
app.use(router)

//Vue Query – globalny client z obsługą błędów
app.use(VueQueryPlugin, {
  queryClientConfig: {
    queryCache: new QueryCache({ onError: handleApiError }),
    mutationCache: new MutationCache({ onError: handleApiError }),
  },
})

app.mount('#app')
