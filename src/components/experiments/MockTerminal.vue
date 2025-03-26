<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'

type Command = {
  input: string
  output?: string[]
}

const prompt = '~ terminal $'
const command = ref({ input: '', output: [] } as Command)
const commands = ref<Command[]>([])
const promptInput = ref<HTMLInputElement | null>(null)
const scrollContainer = ref<null | HTMLElement>(null)

const addCommand = () => {
  if (!command.value) commands.value.push({ input: '' })
  else {
    // 200ms delay
    setTimeout(() => {
      handleCommand()
    }, 100)
  }
}

const handleCommand = () => {
  switch (command.value.input) {
    case 'help':
      command.value.output = ['Available commands: help, about, contact, clear, art!']
      break
    case 'about':
      command.value.output = ['About...']
      break
    case 'contact':
      command.value.output = ['You can reach me at...']
      break
    case 'clear':
      commands.value = []
      break
    case 'art!':
      command.value.output = [
        '         ____',
        '         \\  /',
        '         |  |',
        '        /    \\',
        '       /      \\',
        '      /        \\',
        '     (__________)',
        ' '
      ]
      break
    default:
      command.value.output = []
  }
  commands.value.push(command.value)
  command.value = { input: '', output: [] }

  // nextTick ensures the new content exists before going to the bottom
  nextTick(() => {
    scrollToBottom()
  })
}
const scrollToBottom = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight
  }
}

onMounted(() => {
  nextTick(() => {
    promptInput.value?.focus()
  })
  // Initial command
  command.value.input = 'art!'
  addCommand()
})
</script>

<template>
  <div
    class="flex flex-col w-full h-full max-h-[500px] text-white font-bold bg-black rounded-md font-mono"
  >
    <div class="flex flex-row w-full space-x-2 p-2 border-b-2 border-gray-800">
      <span class="w-5 h-5 bg-red-600 rounded-full aspect-square border border-gray-800"></span>
      <span class="w- h-5 bg-amber-400 rounded-full aspect-square border border-gray-800"></span>
      <span class="w-5 h-5 bg-green-600 rounded-full aspect-square border border-gray-800"></span>
    </div>
    <div ref="scrollContainer" class="p-2 w-full h-full overflow-y-scroll">
      <div v-for="(c, index) in commands" :key="index" class="flex-col">
        <div class="flex-row space-x-2">
          <span>{{ prompt }}</span>
          <span>{{ c.input }}</span>
        </div>
        <div v-for="(output, idx) in c.output" :key="idx">
          <span class="whitespace-pre">{{ output }}</span>
        </div>
      </div>
      <div class="flex flex-row space-x-2">
        <span class="text-nowrap">{{ prompt }}</span>
        <input
          ref="promptInput"
          class="border-none p-0 bg-transparent outline-hidden grow"
          type="text"
          v-model="command.input"
          placeholder="Type 'help' to get started"
          @keydown.enter="addCommand"
        />
      </div>
    </div>
  </div>
</template>

<!-- Some custom scrollbar styles -->
<style scoped>
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #000000;
  border-radius: 5px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #1f2937;
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #4b5563;
}
</style>
