<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'

const prompt = ref('')
const promptInput = ref<HTMLInputElement | null>(null)

onMounted(() => {
  nextTick(() => {
    promptInput.value?.focus()
  })
})
</script>

<template>
  <div class="flex flex-col w-full h-full text-white font-bold bg-black rounded-md font-mono">
    <div class="flex flex-row w-full space-x-2 p-2 border-b-2 border-gray-800">
      <span class="w-5 h-5 bg-red-600 rounded-full aspect-square border border-gray-800"></span>
      <span class="w- h-5 bg-amber-400 rounded-full aspect-square border border-gray-800"></span>
      <span class="w-5 h-5 bg-green-600 rounded-full aspect-square border border-gray-800"></span>
    </div>
    <div class="flex flex-col p-2">
      <div class="flex flex-row space-x-2">
        <span class="text-nowrap">~ terminal $</span>
        <input
          ref="promptInput"
          class="border-none p-0 bg-transparent outline-none grow"
          type="text"
          v-model="prompt"
          placeholder="Type 'help' to get started"
          autofocus
        />
      </div>
    </div>
  </div>
</template>
