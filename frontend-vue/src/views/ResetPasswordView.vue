<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMutation } from '@tanstack/vue-query'
import { UsersService } from '@/client'
import { handleApiError } from '@/services/api'

const route = useRoute()
const router = useRouter()

const newPassword = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')
const successMessage = ref('')

const resetMutation = useMutation<void, unknown, { token: string; new_password: string }>({
  mutationFn: ({ token, new_password }) =>
    UsersService.resetPassword({
      requestBody: {
        token,
        new_password,
      },
    }),
  onSuccess: () => {
    successMessage.value = 'Password has been reset successfully. You can now log in.'
    setTimeout(() => {
      router.push('/login')
    }, 2000)
  },
  onError: handleApiError,
})

function onSubmit() {
  errorMessage.value = ''
  const token = route.query.token as string

  if (!token) {
    errorMessage.value = 'Invalid or missing reset token.'
    return
  }

  if (newPassword.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match.'
    return
  }

  resetMutation.mutate({ token, new_password: newPassword.value })
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-50">
    <div class="w-full max-w-md bg-white rounded-lg shadow p-8">
      <!-- Logo -->
      <div class="flex justify-center mb-6">
        <img src="/favicon.ico" alt="FastAPI logo" class="h-12 w-12" />
      </div>

      <h2 class="text-center text-2xl font-bold mb-6">Reset Password</h2>

      <!-- Form -->
      <form @submit.prevent="onSubmit" class="space-y-4">
        <div>
          <label for="newPassword" class="block text-sm font-medium text-gray-700"
            >New Password</label
          >
          <input
            v-model="newPassword"
            type="password"
            id="newPassword"
            required
            class="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-green-500 focus:ring-green-500"
            placeholder="••••••••"
          />
        </div>

        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700"
            >Confirm Password</label
          >
          <input
            v-model="confirmPassword"
            type="password"
            id="confirmPassword"
            required
            class="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-green-500 focus:ring-green-500"
            placeholder="••••••••"
          />
        </div>

        <!-- Messages -->
        <p v-if="errorMessage" class="text-red-600 text-sm">{{ errorMessage }}</p>
        <p v-if="successMessage" class="text-green-600 text-sm">{{ successMessage }}</p>
        <p v-if="resetMutation.error" class="text-red-600 text-sm">Failed to reset password.</p>

        <!-- Submit button -->
        <button
          type="submit"
          class="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50"
          :disabled="resetMutation.isPending"
        >
          <span v-if="resetMutation.isPending">Resetting...</span>
          <span v-else>Reset Password</span>
        </button>
      </form>

      <!-- Back to login -->
      <p class="mt-6 text-center text-sm text-gray-600">
        <router-link to="/login" class="text-green-600 hover:underline">Back to Login</router-link>
      </p>
    </div>
  </div>
</template>
