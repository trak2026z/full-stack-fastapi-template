<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMutation } from '@tanstack/vue-query'
import { UsersService, type UserPublic } from '@/client'
import { handleApiError } from '@/services/api'

const router = useRouter()

const fullName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const signupMutation = useMutation<
  UserPublic,
  unknown,
  { email: string; password: string; full_name: string }
>({
  mutationFn: ({ email, password, full_name }) =>
    UsersService.registerUser({
      requestBody: {
        email,
        password,
        full_name,
      },
    }),
  onSuccess: () => {
    alert('Account created successfully! Please log in.')
    router.push('/login')
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
          <label class="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            v-model="fullName"
            type="text"
            required
            class="mt-1 block w-full border rounded-md p-2"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="email"
            type="email"
            required
            class="mt-1 block w-full border rounded-md p-2"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Password</label>
          <input
            v-model="password"
            type="password"
            required
            class="mt-1 block w-full border rounded-md p-2"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            v-model="confirmPassword"
            type="password"
            required
            class="mt-1 block w-full border rounded-md p-2"
          />
        </div>

        <!-- Password mismatch -->
        <p v-if="password !== confirmPassword && confirmPassword" class="text-red-600 text-sm">
          Passwords do not match
        </p>

        <!-- Error API -->
        <p v-if="signupMutation.isError" class="text-red-600 text-sm">
          Signup failed. Please try again.
        </p>

        <!-- Submit -->
        <button
          type="submit"
          class="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50"
          :disabled="
            signupMutation.isLoading ||
            !fullName ||
            !email ||
            !password ||
            password !== confirmPassword
          "
        >
          <span v-if="signupMutation.isLoading">Signing up...</span>
          <span v-else>Sign Up</span>
        </button>
      </form>

      <p class="mt-6 text-center text-sm text-gray-600">
        Already have an account?
        <router-link to="/login" class="text-green-600 hover:underline">Log In</router-link>
      </p>
    </div>
  </div>
</template>
