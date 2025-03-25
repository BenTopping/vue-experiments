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
      class="flex flex-row grow bg-white rounded-md border-gray-200 border-2 hover:border-gray-600 transition-all py-2"
    >
      <div class="flex flex-col w-full flex-wrap px-2 gap-y-2 justify-center">
        <div class="flex flex-row w-full">
          <input
            v-model="inputValue"
            @keydown.enter="addFilter()"
            class="flex outline-none w-full"
            placeholder="Type to filter..."
          />
          <!-- Search Icon -->
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
        <div
          v-if="filters.length"
          class="flex flex-wrap gap-x-2 gap-y-2 border-t-2 border-gray-200 pt-2"
        >
          <div
            v-for="filter in filters"
            :key="filter"
            class="flex bg-gray-600 text-md px-2 py rounded-md text-white items-center"
          >
            <span class="pr-2">{{ filter }}</span>
            <button class="pl-2 items-center text-sm" @click="removeFilter(filter)">X</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
