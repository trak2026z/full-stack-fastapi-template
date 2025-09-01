<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import UserMenu from '@/components/UserMenu.vue'
import Sidebar from '@/components/Sidebar.vue'

const route = useRoute()

// Ścieżki bez sidebaru i headera (auth layout)
const authRoutes = ['/login', '/signup', '/recover-password', '/reset-password']

function isAuthPage() {
  return authRoutes.includes(route.path)
}

function isLoggedIn() {
  return !!localStorage.getItem('access_token')
}
</script>

<template>
  <div class="min-h-screen flex">
    <!-- Sidebar tylko gdy zalogowany i nie na auth routes -->
    <Sidebar v-if="!isAuthPage() && isLoggedIn()" />

    <!-- Prawa część strony -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <header
        v-if="!isAuthPage() && isLoggedIn()"
        class="flex justify-between items-center bg-gray-100 p-4 shadow"
      >
        <h1 class="text-xl font-bold text-green-600">FastAPI</h1>
        <UserMenu />
      </header>

      <!-- Główna zawartość -->
      <main class="flex-1 p-4 overflow-y-auto">
        <RouterView />
      </main>
    </div>
  </div>
</template>
