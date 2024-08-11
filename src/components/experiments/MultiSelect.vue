<script setup lang="ts">
import { ref } from 'vue'

const filters = ref<string[]>([])
const inputValue = ref<string>('')

function addFilter() {
  if (inputValue.value) {
    filters.value.push(inputValue.value)
    inputValue.value = ''
  }
}

function removeFilter(filter: string) {
  filters.value.splice(filters.value.indexOf(filter), 1)
}
</script>

<template>
  <div class="flex flex-row w-1/2">
    <div
      class="flex flex-row grow bg-white rounded-md border-gray-200 border-2 hover:border-blue-600 transition-all"
    >
      <div class="flex flex-row w-full flex-wrap px-4 align-middle">
        <div
          v-for="filter in filters"
          :key="filter"
          class="bg-gray-200 px-4 py-2 rounded-md items-center m-1"
        >
          <span class="pr-2">{{ filter }}</span>
          <button
            class="border-l-2 border-gray-400 text-gray-400 pl-2"
            @click="removeFilter(filter)"
          >
            X
          </button>
        </div>
        <input
          v-model="inputValue"
          @keydown.enter="addFilter()"
          class="flex outline-none py-2 m-1"
          placeholder="Type to filter..."
        />
      </div>
      <!-- Search Icon -->
      <div class="flex items-center px-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="40"
          viewBox="0 -960 960 960"
          width="40"
          fill="#e5e7eb"
        >
          <path
            d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38
                        69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>
