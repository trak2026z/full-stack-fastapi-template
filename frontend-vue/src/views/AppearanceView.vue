<script setup lang="ts">
import { ref, watch } from 'vue'

type Theme = 'system' | 'light' | 'dark'

// wczytanie z localStorage albo domyślnie system
const theme = ref<Theme>((localStorage.getItem('theme') as Theme) || 'system')

// funkcja zmiany motywu
function applyTheme(value: Theme) {
  if (value === 'system') {
    document.documentElement.removeAttribute('data-theme')
  } else {
    document.documentElement.setAttribute('data-theme', value)
  }
  localStorage.setItem('theme', value)
}

// reagowanie na zmianę
watch(
  theme,
  (newValue) => {
    applyTheme(newValue)
  },
  { immediate: true },
)
</script>

<template>
  <div>
    <h2 class="font-semibold mb-2">Appearance</h2>
    <div class="space-y-2">
      <label class="flex items-center space-x-2">
        <input type="radio" value="system" v-model="theme" />
        <span>System</span>
      </label>
      <label class="flex items-center space-x-2">
        <input type="radio" value="light" v-model="theme" />
        <span>Light Mode</span>
      </label>
      <label class="flex items-center space-x-2">
        <input type="radio" value="dark" v-model="theme" />
        <span>Dark Mode</span>
      </label>
    </div>
  </div>
</template>

<style>
:root[data-theme='dark'] {
  --bg-color: #111827;
  --text-color: #f9fafb;
  --input-bg: #1f2937;
  --input-text: #f9fafb;
  --input-placeholder: #9ca3af;
  --input-border: #374151;
}

:root[data-theme='light'] {
  --bg-color: #ffffff;
  --text-color: #111827;
  --input-bg: #ffffff;
  --input-text: #111827;
  --input-placeholder: #6b7280;
  --input-border: #d1d5db;
}


body {
  background-color: var(--bg-color);
  color: var(--text-color);
}


</style>
