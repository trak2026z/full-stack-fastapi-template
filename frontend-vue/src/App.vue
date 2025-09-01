<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import UserMenu from '@/components/UserMenu.vue'

const route = useRoute()

// Ścieżki bez nagłówka (auth layout)
const authRoutes = ['/login', '/signup', '/recover-password', '/reset-password']

function isAuthPage() {
  return authRoutes.includes(route.path)
}

function isLoggedIn() {
  return !!localStorage.getItem('access_token')
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Górny pasek tylko dla zalogowanych -->
    <header
      v-if="!isAuthPage() && isLoggedIn()"
      class="flex justify-between items-center bg-gray-100 p-4 shadow"
    >
      <h1 class="text-xl font-bold text-green-600">FastAPI</h1>
      <UserMenu />
    </header>

    <!-- Główna zawartość -->
    <main class="flex-1 p-4">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
/* Style globalne możesz dodać tutaj */
</style>
