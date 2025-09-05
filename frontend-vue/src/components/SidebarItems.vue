<script setup lang="ts">
import { computed } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useRoute } from 'vue-router'

const { currentUser } = useAuth()
const route = useRoute()

const baseItems = [
  { icon: 'i-heroicons-home', title: 'Dashboard', path: '/' },
  { icon: 'i-heroicons-briefcase', title: 'Items', path: '/items' },
  { icon: 'i-heroicons-user', title: 'My Profile', path: '/profile' },
]

const items = computed(() => {
  if (currentUser.value?.is_superuser) {
    return [...baseItems, { icon: 'i-heroicons-users', title: 'Admin', path: '/admin' }]
  }
  return baseItems
})
</script>

<template>
  <div>
    <p class="px-4 py-2 text-xs font-bold text-gray-500">Menu</p>
    <nav class="space-y-1">
      <router-link
        v-for="item in items"
        :key="item.title"
        :to="item.path"
        class="flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium"
        :class="[
          route.path === item.path
            ? 'bg-gray-100 text-gray-900'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
        ]"
      >
        <span :class="['w-5 h-5', item.icon]" />
        <span>{{ item.title }}</span>
      </router-link>
    </nav>
  </div>
</template>
