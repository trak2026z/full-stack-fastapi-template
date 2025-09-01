<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLogin } from '@/composables/useLogin'

const email = ref('')
const password = ref('')
const { mutate: login, isPending, error } = useLogin()
const router = useRouter()

function onSubmit() {
  login(
    { username: email.value, password: password.value },
    {
      onSuccess: () => {
        router.push('/')
      },
    },
  )
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-50">
    <div class="w-full max-w-md bg-white rounded-lg shadow p-8">
      <!-- Logo -->
      <div class="flex justify-center mb-6">
        <img src="/favicon.ico" alt="FastAPI logo" class="h-12 w-12" />
      </div>

      <h2 class="text-center text-2xl font-bold mb-6">Log In</h2>

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

        <!-- Forgot Password -->
        <div class="flex justify-end">
          <router-link to="/recover-password" class="text-sm text-green-600 hover:underline">
            Forgot Password?
          </router-link>
        </div>

        <!-- Error message -->
        <p v-if="error" class="text-red-600 text-sm">Login failed. Please try again.</p>

        <!-- Submit button -->
        <button
          type="submit"
          class="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50"
          :disabled="isPending"
        >
          <span v-if="isPending">Logging in...</span>
          <span v-else>Log In</span>
        </button>
      </form>

      <!-- Sign up link -->
      <p class="mt-6 text-center text-sm text-gray-600">
        Don’t have an account?
        <router-link to="/signup" class="text-green-600 hover:underline">Sign Up</router-link>
      </p>
    </div>
  </div>
</template>
