<script setup lang="ts">
import { ref } from 'vue'
import { useCurrentUser } from '@/composables/useCurrentUser'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { UsersService, type UserUpdate, type UserPublic } from '@/client'

import AppearanceView from '@/views/AppearanceView.vue'


const { data: user, isLoading, error } = useCurrentUser()
const activeTab = ref<'profile' | 'password' | 'appearance' | 'danger'>('profile')

// tryb edycji
const editing = ref(false)
const form = ref<UserUpdate>({ full_name: '', email: '' })
const queryClient = useQueryClient()

// mutacja update
const updateUser = useMutation<UserPublic, unknown, UserUpdate>({
  mutationFn: (data) => UsersService.updateUserMe({ requestBody: data }),
  onSuccess: () => {
    editing.value = false
    queryClient.invalidateQueries({ queryKey: ['currentUser'] })
  },
})

// --- Password form ---
const passwordForm = ref({
  current_password: '',
  new_password: '',
  confirm_password: '',
})

const updatePassword = useMutation<
  { message: string }, // response type
  unknown,
  { current_password: string; new_password: string }
>({
  mutationFn: (data) =>
    UsersService.updatePasswordMe({ requestBody: data }),
  onSuccess: () => {
    passwordForm.value = {
      current_password: '',
      new_password: '',
      confirm_password: '',
    }
    alert('Password updated successfully')
  },
  onError: () => {
    alert('Failed to update password')
  },
})

const deleteAccount = useMutation({
  mutationFn: () => UsersService.deleteUserMe(),
  onSuccess: () => {
    alert('Account deleted')
    localStorage.removeItem('access_token')
    window.location.href = '/signup' // przenosimy do rejestracji
  },
  onError: () => {
    alert('Failed to delete account')
  },
})
function onDeleteAccount() {
  if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
    deleteAccount.mutate()
  }
}




</script>

<template>
  <div class="max-w-3xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">User Settings</h1>

    <!-- Tabs -->
    <div class="flex space-x-4 border-b mb-6">
      <button class="px-4 py-2 -mb-px border-b-2"
        :class="activeTab === 'profile' ? 'border-green-600 font-semibold' : 'border-transparent'"
        @click="activeTab = 'profile'">
        My profile
      </button>
      <button class="px-4 py-2 -mb-px border-b-2"
        :class="activeTab === 'password' ? 'border-green-600 font-semibold' : 'border-transparent'"
        @click="activeTab = 'password'">
        Password
      </button>
      <button class="px-4 py-2 -mb-px border-b-2"
        :class="activeTab === 'appearance' ? 'border-green-600 font-semibold' : 'border-transparent'"
        @click="activeTab = 'appearance'">
        Appearance
      </button>
      <button class="px-4 py-2 -mb-px border-b-2 text-red-600"
        :class="activeTab === 'danger' ? 'border-red-600 font-semibold' : 'border-transparent'"
        @click="activeTab = 'danger'">
        Danger zone
      </button>
    </div>

    <!-- Tab content -->
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="error" class="text-red-600">Failed to load user.</div>
    <div v-else>
      <!-- My profile -->
      <div v-if="activeTab === 'profile'">
        <h2 class="font-semibold mb-2">User Information</h2>

        <div v-if="!editing">
          <p><strong>Full name:</strong> {{ user?.full_name }}</p>
          <p><strong>Email:</strong> {{ user?.email }}</p>
          <button class="mt-4 px-4 py-2 bg-green-600 text-white rounded-md" @click="() => {
              form.full_name = user?.full_name || ''
              form.email = user?.email || ''
              editing = true
            }">
            Edit
          </button>
        </div>

        <div v-else>
          <label class="block mb-2">
            Full name
            <input v-model="form.full_name" type="text" class="mt-1 block w-full border rounded-md p-2" />
          </label>
          <label class="block mb-2">
            Email
            <input v-model="form.email" type="email" class="mt-1 block w-full border rounded-md p-2" />
          </label>

          <div class="flex space-x-2 mt-4">
            <button class="px-4 py-2 bg-green-600 text-white rounded-md" :disabled="updateUser.isLoading"
              @click="updateUser.mutate({ full_name: form.full_name, email: form.email })">
              Save
            </button>

            <button class="px-4 py-2 bg-gray-300 rounded-md" @click="editing = false">
              Cancel
            </button>
          </div>
        </div>
      </div>

      <!-- Password -->
      <div v-else-if="activeTab === 'password'">
        <h2 class="font-semibold mb-2">Change Password</h2>

        <label class="block mb-2">
          Current password
          <input v-model="passwordForm.current_password" type="password"
            class="mt-1 block w-full border rounded-md p-2" />
        </label>

        <label class="block mb-2">
          New password
          <input v-model="passwordForm.new_password" type="password" class="mt-1 block w-full border rounded-md p-2" />
        </label>

        <label class="block mb-2">
          Confirm new password
          <input v-model="passwordForm.confirm_password" type="password"
            class="mt-1 block w-full border rounded-md p-2" />
        </label>

        <div class="flex space-x-2 mt-4">
          <button class="px-4 py-2 bg-green-600 text-white rounded-md"
            :disabled="updatePassword.isLoading || passwordForm.new_password !== passwordForm.confirm_password" @click="updatePassword.mutate({
              current_password: passwordForm.current_password,
              new_password: passwordForm.new_password
            })">
            Save
          </button>
          <button class="px-4 py-2 bg-gray-300 rounded-md"
            @click="passwordForm = { current_password: '', new_password: '', confirm_password: '' }">
            Cancel
          </button>
        </div>

        <p v-if="passwordForm.new_password !== passwordForm.confirm_password && passwordForm.confirm_password"
          class="text-red-600 mt-2">
          Passwords do not match
        </p>
      </div>



      <!-- Appearance -->
      <!-- Appearance -->
      <div v-else-if="activeTab === 'appearance'">
        <AppearanceView />
      </div>


      <!-- Danger zone -->
      <div v-else-if="activeTab === 'danger'">
        <h2 class="font-semibold mb-2 text-red-600">Danger Zone</h2>
        <p class="text-gray-600 mb-4">
          Permanently delete your data and everything associated with your account.
        </p>
        <button class="px-4 py-2 bg-red-600 text-white rounded-md" :disabled="deleteAccount.isLoading"
          @click="onDeleteAccount">
          Delete
        </button>


      </div>
    </div>
  </div>
</template>
