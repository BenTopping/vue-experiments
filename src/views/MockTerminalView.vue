<script setup lang="ts">
import { ref } from 'vue'
import MockTerminal from '@/components/experiments/MockTerminal.vue'
import CodeBlock from '@/components/experiments/CodeBlock.vue'
import IconCodeBracket from '@/components/icons/IconCodeBracket.vue'
import IconScience from '@/components/icons/IconScience.vue'
interface IDependency {
  name: string
  address: string
}
const dependencies: IDependency[] = []
const currentTab = ref('experiment')

const codeBlockString = `
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
<\/script>

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
          class="border-none p-0 bg-transparent outline-none grow"
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
`
</script>

<template>
  <div class="flex flex-col w-full h-full">
    <div class="flex flex-col mb-4 text-xl">
      <h2 class="text-5xl font-light mb-4">Mock terminal</h2>
      <div class="flex flex-col space-y-2">
        <span>An imitation of the mac terminal with some example commands.</span>
        <span>
          All commands are fake and do not actually do anything. The fake commands currently need to
          be hard coded in the component but this could be abstracted to a component helper.
        </span>
        <div class="flex flex-row space-x-2 py-4">
          <span>Dependencies:</span>
          <div v-if="dependencies.length">
            <a
              v-for="dep in dependencies"
              :key="dep.name"
              class="p-2 px-4 bg-gray-200 rounded-full mx-1 hover:text-white hover:bg-black transition"
              :href="dep.address"
              target="_blank"
            >
              {{ dep.name }}
            </a>
          </div>
          <div v-else>
            <span class="text-gray-400 italic">No dependencies!</span>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-row">
      <button
        @click="currentTab = 'experiment'"
        :class="`py-2 px-6 ${
          currentTab == 'experiment' ? 'bg-gray-200' : 'bg-gray-300'
        } rounded-t-lg cursor-pointer`"
      >
        <IconScience />
      </button>
      <button
        @click="currentTab = 'code'"
        :class="`p-2 px-6 rounded-t-lg ${
          currentTab == 'code' ? 'bg-gray-200' : 'bg-gray-300'
        } cursor-pointer`"
      >
        <IconCodeBracket />
      </button>
    </div>
    <div
      class="flex flex-col grow justify-center items-center p-8 rounded-md rounded-tl-none bg-gray-200"
    >
      <MockTerminal v-show="currentTab == 'experiment'" />
      <CodeBlock v-show="currentTab == 'code'" :code="codeBlockString" />
    </div>
  </div>
</template>
