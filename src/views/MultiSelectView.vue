<script setup lang="ts">
import { ref } from 'vue'
import MultiSelect from '@/components/experiments/MultiSelect.vue'
import CodeBlock from '@/components/experiments/CodeBlock.vue'
import IconScience from '@/components/icons/IconScience.vue'
import IconCodeBracket from '@/components/icons/IconCodeBracket.vue'
interface IDependency {
  name: string
  address: string
}
const dependencies: IDependency[] = []

const currentTab = ref('experiment')
const codeBlockString: string = `
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
<\/script>

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
            class="flex outline-hidden w-full"
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
`
</script>

<template>
  <div class="flex flex-col h-full w-full">
    <div class="flex flex-col mb-4 text-xl">
      <h2 class="text-5xl font-light mb-4">Multi select</h2>
      <div class="flex flex-col space-y-2">
        <span>A Vue SFC to create a select box that allows you to select multiple values.</span>
        <span>
          The component tracks previously selected values and allows you to remove them by clicking
          on the 'x'. This component can be used for filters, tags, and more.
        </span>
        <div class="flex flex-row space-x-2 py-4 items-center">
          <span class="py-2">Dependencies:</span>
          <div v-if="dependencies.length">
            <a
              v-for="dep in dependencies"
              :key="dep.name"
              class="py-2 px-6 bg-gray-200 rounded-full hover:text-white hover:bg-black transition"
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
      class="flex flex-col grow justify-center items-center w-full h-full p-8 rounded-md rounded-tl-none bg-gray-200"
    >
      <MultiSelect v-show="currentTab == 'experiment'" />
      <CodeBlock v-show="currentTab == 'code'" :code="codeBlockString" />
    </div>
  </div>
</template>
