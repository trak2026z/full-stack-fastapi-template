<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMutation } from '@tanstack/vue-query'
import { UsersService, TokenResponse } from '@/client'
import { handleApiError } from '@/services/api'

const router = useRouter()

const fullName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const signupMutation = useMutation<TokenResponse, unknown, { email: string; password: string; full_name: string }>({
  mutationFn: ({ email, password, full_name }) =>
    UsersService.createUser({
      requestBody: {
        email,
        password,
        full_name,
      },
    }),
  onSuccess: (data) => {
    // zapis tokena
    localStorage.setItem('access_token', data.access_token)
    router.push('/')
  },
  onError: handleApiError,
})

function onSubmit() {
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match')
    return
  }
  signupMutation.mutate({
    email: email.value,
    password: password.value,
    full_name: fullName.value,
  })
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-50">
    <div class="w-full max-w-md bg-white rounded-lg shadow p-8">
      <!-- Logo -->
      <div class="flex justify-center mb-6">
        <img src="/favicon.ico" alt="FastAPI logo" class="h-12 w-12" />
      </div>

      <h2 class="text-center text-2xl font-bold mb-6">Sign Up</h2>

      <!-- Form -->
      <form @submit.prevent="onSubmit" class="space-y-4">
        <div>
          <label for="fullName" class="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            v-model="fullName"
            type="text"
            id="fullName"
            required
            class="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-green-500 focus:ring-green-500"
            placeholder="John Doe"
          />
        </div>

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

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            v-model="password"
            type="password"
            id="password"
            required
            class="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-green-500 focus:ring-green-500"
            placeholder="••••••••"
          />
        </div>

        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            v-model="confirmPassword"
            type="password"
            id="confirmPassword"
            required
            class="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-green-500 focus:ring-green-500"
            placeholder="••••••••"
          />
        </div>

        <!-- Error message -->
        <p v-if="signupMutation.error" class="text-red-600 text-sm">Signup failed. Please try again.</p>

        <!-- Submit button -->
        <button
          type="submit"
          class="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50"
          :disabled="signupMutation.isPending"
        >
          <span v-if="signupMutation.isPending">Signing up...</span>
          <span v-else>Sign Up</span>
        </button>
      </form>

      <!-- Login link -->
      <p class="mt-6 text-center text-sm text-gray-600">
        Already have an account?
        <router-link to="/login" class="text-green-600 hover:underline">Log In</router-link>
      </p>
    </div>
  </div>
</template>
