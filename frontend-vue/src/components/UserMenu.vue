<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCurrentUser } from '@/composables/useCurrentUser'

const { data: user, error, isLoading } = useCurrentUser()
const router = useRouter()
const open = ref(false)

function logout() {
  localStorage.removeItem('access_token')
  router.push('/login')
}
</script>

<template>
  <div class="relative">
    <button
      class="flex items-center space-x-2 bg-green-600 text-white px-3 py-1 rounded-md"
      @click="open = !open"
    >
      <span v-if="isLoading">Loading...</span>
      <span v-else-if="error">Guest</span>
      <span v-else>{{ user?.email }}</span>
    </button>

    <div
      v-if="open"
      class="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10"
    >
      <button
        class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        @click="router.push('/profile')"
      >
        My Profile
      </button>
      <button
        class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
        @click="logout"
      >
        Log Out
      </button>
    </div>
  </div>
</template>
