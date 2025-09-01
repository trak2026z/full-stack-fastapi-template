<script setup lang="ts">
import { ref, computed } from 'vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { useAuth } from '@/composables/useAuth'
import SidebarItems from './SidebarItems.vue'

const open = ref(false)
const { currentUser, logout } = useAuth()
</script>

<template>
  <!-- Mobile sidebar -->
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-50" @close="open = false">
      <TransitionChild
        as="template"
        enter="transition-opacity ease-linear duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-900/50" />
      </TransitionChild>

      <div class="fixed inset-0 flex">
        <TransitionChild
          as="template"
          enter="transition ease-in-out duration-300 transform"
          enter-from="-translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leave-from="translate-x-0"
          leave-to="-translate-x-full"
        >
          <DialogPanel class="relative flex w-full max-w-xs flex-1 flex-col bg-white">
            <SidebarItems @close="open = false" />

            <div class="mt-auto p-4 border-t">
              <button
                @click="logout"
                class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
              >
                <span class="i-heroicons-arrow-left-on-rectangle w-5 h-5" />
                Log out
              </button>

              <p v-if="currentUser?.email" class="mt-2 text-xs text-gray-600 truncate">
                Logged in as: {{ currentUser.email }}
              </p>
            </div>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>

  <!-- Desktop sidebar -->
  <div class="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-gray-50 border-r">
    <div class="flex flex-col flex-grow pt-5 overflow-y-auto">
      <SidebarItems />
    </div>
    <div class="p-4 border-t">
      <button
        @click="logout"
        class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
      >
        <span class="i-heroicons-arrow-left-on-rectangle w-5 h-5" />
        Log out
      </button>
      <p v-if="currentUser?.email" class="mt-2 text-xs text-gray-600 truncate">
        Logged in as: {{ currentUser.email }}
      </p>
    </div>
  </div>
</template>
