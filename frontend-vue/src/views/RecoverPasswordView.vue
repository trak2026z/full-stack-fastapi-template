<script setup lang="ts">
import { ref } from 'vue'
import { useMutation } from '@tanstack/vue-query'
import { UsersService } from '@/client'
import { handleApiError } from '@/services/api'

const email = ref('')
const successMessage = ref('')

const recoverMutation = useMutation<void, unknown, { email: string }>({
  mutationFn: ({ email }) =>
    UsersService.recoverPassword({
      requestBody: {
        email,
      },
    }),
  onSuccess: () => {
    successMessage.value = 'Password reset link sent to your email.'
  },
  onError: handleApiError,
})

function onSubmit() {
  recoverMutation.mutate({ email: email.value })
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-50">
    <div class="w-full max-w-md bg-white rounded-lg shadow p-8">
      <!-- Logo -->
      <div class="flex justify-center mb-6">
        <img src="/favicon.ico" alt="FastAPI logo" class="h-12 w-12" />
      </div>

      <h2 class="text-center text-2xl font-bold mb-6">Recover Password</h2>

      <!-- Form -->
      <form @submit.prevent="onSubmit" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="email"
            type="email"
            id="email"
            required
            class="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-green-500 focus:ring-green-500"
            placeholder="you@example.com"
          />
        </div>

        <!-- Success / Error messages -->
        <p v-if="successMessage" class="text-green-600 text-sm">{{ successMessage }}</p>
        <p v-if="recoverMutation.error" class="text-red-600 text-sm">Failed to send reset link.</p>

        <!-- Submit button -->
        <button
          type="submit"
          class="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50"
          :disabled="recoverMutation.isPending"
        >
          <span v-if="recoverMutation.isPending">Sending...</span>
          <span v-else>Send Reset Link</span>
        </button>
      </form>

      <!-- Back to login -->
      <p class="mt-6 text-center text-sm text-gray-600">
        Remember your password?
        <router-link to="/login" class="text-green-600 hover:underline">Log In</router-link>
      </p>
    </div>
  </div>
</template>
