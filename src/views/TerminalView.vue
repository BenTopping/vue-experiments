<script setup lang="ts">
import { ref } from 'vue'
import Terminal from '@/components/experiments/Terminal.vue'
import CodeBlock from '@/components/experiments/CodeBlock.vue'
import IconCodeBracket from '@/components/icons/IconCodeBracket.vue'
import IconScience from '@/components/icons/IconScience.vue'
interface IDependency {
  name: string
  address: string
}
const dependencies: IDependency[] = []
const currentTab = ref('experiment')
</script>

<template>
  <div class="flex flex-col grow">
    <div class="flex flex-col mb-4 text-xl">
      <h2 class="text-5xl font-light mb-4">Terminal</h2>
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
      class="flex flex-col grow justify-center items-center w-full p-8 rounded-md rounded-tl-none bg-gray-200"
    >
      <Terminal v-show="currentTab == 'experiment'" />
      <CodeBlock v-show="currentTab == 'code'" :code="'none'" />
    </div>
  </div>
</template>
