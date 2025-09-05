<script setup lang="ts">
import { ref, computed } from 'vue'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { ItemsService } from '@/services/ItemsService'
import type {
  ItemsReadItemsResponse,
  ItemsCreateItemData,
  ItemsUpdateItemData,
  ItemsDeleteItemData,
} from '@/client'

// Stan modali
const showAdd = ref(false)
const showEdit = ref<{ visible: boolean; item: any | null }>({ visible: false, item: null })
const showDelete = ref<{ visible: boolean; item: any | null }>({ visible: false, item: null })

const queryClient = useQueryClient()

// Pobranie itemów
const { data: itemsResponse, isLoading } = useQuery<ItemsReadItemsResponse>({
  queryKey: ['items'],
  queryFn: () => ItemsService.readItems(),
})

// Zmapowana lista itemów (tylko data[])
const items = computed(() => itemsResponse.value?.data ?? [])

// Mutacje
const addMutation = useMutation({
  mutationFn: (payload: ItemsCreateItemData) => ItemsService.createItem(payload),
  onSuccess: () => queryClient.invalidateQueries(['items']),
})

const editMutation = useMutation({
  mutationFn: (payload: ItemsUpdateItemData) => ItemsService.updateItem(payload),
  onSuccess: () => queryClient.invalidateQueries(['items']),
})

const deleteMutation = useMutation({
  mutationFn: (payload: ItemsDeleteItemData) => ItemsService.deleteItem(payload),
  onSuccess: () => queryClient.invalidateQueries(['items']),
})

// Formularz lokalny
const form = ref<{ title: string; description: string }>({ title: '', description: '' })

function openAdd() {
  form.value = { title: '', description: '' }
  showAdd.value = true
}

function openEdit(item: any) {
  form.value = { title: item.title, description: item.description ?? '' }
  showEdit.value = { visible: true, item }
}

function openDelete(item: any) {
  showDelete.value = { visible: true, item }
}

function handleAdd() {
  addMutation.mutate({ requestBody: { ...form.value } })
  showAdd.value = false
}

function handleEdit() {
  if (showEdit.value.item) {
    editMutation.mutate({
      id: showEdit.value.item.id,
      requestBody: { ...form.value },
    })
  }
  showEdit.value = { visible: false, item: null }
}

function handleDelete() {
  if (showDelete.value.item) {
    deleteMutation.mutate({ id: showDelete.value.item.id })
  }
  showDelete.value = { visible: false, item: null }
}
</script>

<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-4">Items Management</h1>

    <!-- Add button -->
    <button
      class="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      @click="openAdd"
    >
      + Add Item
    </button>

    <!-- Table -->
    <table class="w-full border-collapse">
      <thead>
        <tr class="bg-gray-100 text-left">
          <th class="p-2 border">ID</th>
          <th class="p-2 border">Title</th>
          <th class="p-2 border">Description</th>
          <th class="p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="isLoading">
          <td colspan="4" class="p-4 text-center">Loading...</td>
        </tr>
        <tr v-for="item in items" :key="item.id">
          <td class="p-2 border">{{ item.id }}</td>
          <td class="p-2 border">{{ item.title }}</td>
          <td class="p-2 border">{{ item.description }}</td>
          <td class="p-2 border space-x-2">
            <button class="px-3 py-1 bg-blue-500 text-white rounded" @click="openEdit(item)">
              Edit
            </button>
            <button class="px-3 py-1 bg-red-500 text-white rounded" @click="openDelete(item)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Add modal -->
    <div v-if="showAdd" class="fixed inset-0 flex items-center justify-center bg-black/50">
      <div class="bg-white p-6 rounded w-96">
        <h2 class="text-lg font-semibold mb-4">Add Item</h2>
        <input
          v-model="form.title"
          placeholder="Title"
          class="w-full mb-2 border rounded px-2 py-1"
        />
        <input
          v-model="form.description"
          placeholder="Description"
          class="w-full mb-4 border rounded px-2 py-1"
        />
        <div class="flex justify-end gap-2">
          <button class="px-4 py-2 bg-gray-300 rounded" @click="showAdd = false">Cancel</button>
          <button class="px-4 py-2 bg-green-600 text-white rounded" @click="handleAdd">Save</button>
        </div>
      </div>
    </div>

    <!-- Edit modal -->
    <div v-if="showEdit.visible" class="fixed inset-0 flex items-center justify-center bg-black/50">
      <div class="bg-white p-6 rounded w-96">
        <h2 class="text-lg font-semibold mb-4">Edit Item</h2>
        <input
          v-model="form.title"
          placeholder="Title"
          class="w-full mb-2 border rounded px-2 py-1"
        />
        <input
          v-model="form.description"
          placeholder="Description"
          class="w-full mb-4 border rounded px-2 py-1"
        />
        <div class="flex justify-end gap-2">
          <button
            class="px-4 py-2 bg-gray-300 rounded"
            @click="showEdit = { visible: false, item: null }"
          >
            Cancel
          </button>
          <button class="px-4 py-2 bg-blue-600 text-white rounded" @click="handleEdit">
            Update
          </button>
        </div>
      </div>
    </div>

    <!-- Delete modal -->
    <div
      v-if="showDelete.visible"
      class="fixed inset-0 flex items-center justify-center bg-black/50"
    >
      <div class="bg-white p-6 rounded w-96">
        <h2 class="text-lg font-semibold mb-4">Delete Item</h2>
        <p>Are you sure you want to delete "{{ showDelete.item?.title }}"?</p>
        <div class="flex justify-end gap-2 mt-4">
          <button
            class="px-4 py-2 bg-gray-300 rounded"
            @click="showDelete = { visible: false, item: null }"
          >
            Cancel
          </button>
          <button class="px-4 py-2 bg-red-600 text-white rounded" @click="handleDelete">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
