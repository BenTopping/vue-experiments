<script setup lang="ts">
import { ref } from 'vue'
import NewtonsCradle from '@/components/experiments/NewtonsCradle.vue'
import CodeBlock from '@/components/experiments/CodeBlock.vue'
import IconCodeBracket from '@/components/icons/IconCodeBracket.vue'
import IconScience from '@/components/icons/IconScience.vue'
interface IDependency {
  name: string
  address: string
}
const dependencies: IDependency[] = []
const currentTab = ref('experiment')

const codeBlockString: string = `
<script setup lang="ts"><\/script>

<template>
  <div class="flex flex-row">
    <div class="flex flex-row grow">
      <div
        class="flex h-full bg-black w-2 rotate-15 rounded-full items-center justify-center"
      ></div>
      <div class="flex flex-col">
        <div class="w-full h-2 bg-black rounded-full relative top-2"></div>
        <div class="flex flex-row">
          <div class="flex flex-col items-center leftball">
            <div class="flex bg-black w-1 h-32"></div>
            <div class="flex w-8 h-8 bg-black rounded-full border-2 border-black"></div>
          </div>
          <div v-for="index in 3" :key="index">
            <div class="flex flex-col items-center">
              <div class="flex bg-black w-1 h-32"></div>
              <div class="flex w-8 h-8 bg-black rounded-full border-2 border-black"></div>
            </div>
          </div>
          <div class="flex flex-col items-center rightball">
            <div class="flex bg-black w-1 h-32"></div>
            <div class="flex w-8 h-8 bg-black rounded-full border-2 border-black"></div>
          </div>
        </div>
      </div>
      <div
        class="flex h-full bg-black w-2 -rotate-15 rounded-full items-center justify-center"
      ></div>
    </div>
  </div>
</template>

<style>
.leftball {
  animation: leftball 2.5s cubic-bezier(0.5, 0, 0.5, 1) infinite both;
  transform: rotate(0deg);
  transform-origin: 50% 0%;
}

.rightball {
  animation: rightball 2.5s cubic-bezier(0.5, 0, 0.5, 1) 1.25s infinite both;
  transform: rotate(0deg);
  transform-origin: 50% 0%;
}

@keyframes leftball {
  25% {
    transform: rotate(75deg);
  }
  50% {
    transform: rotate(0deg);
  }
}

@keyframes rightball {
  25% {
    transform: rotate(-75deg);
  }
  50% {
    transform: rotate(0deg);
  }
}
</style>

`
</script>

<template>
  <div class="flex flex-col h-full w-full">
    <div class="flex flex-col mb-4 text-xl">
      <h2 class="text-5xl font-light mb-4">Newton's Cradle</h2>
      <div class="flex flex-col space-y-2">
        <span>Mimicking conservation of momentum with CSS animations.</span>
        <span>
          An animated version of the classic Newton's Cradle toy. An alternative would be to use
          something like
          <a href="https://brm.io/matter-js/" target="_blank" class="font-bold"> Matter.js </a> for
          a more realistic physics simulation. This ended up using no Vue / Javascript and just CSS
          animations. Originally I used Vue to toggle the applied css classes to make the animation
          infinite but this can be done more easily using CSS.
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
        :class="`py-2 px-6 ${
          currentTab == 'experiment' ? 'bg-gray-200' : 'bg-gray-300'
        } rounded-t-lg cursor-pointer`"
        @click="currentTab = 'experiment'"
      >
        <IconScience />
      </button>
      <button
        :class="`p-2 px-6 rounded-t-lg ${
          currentTab == 'code' ? 'bg-gray-200' : 'bg-gray-300'
        } cursor-pointer`"
        @click="currentTab = 'code'"
      >
        <IconCodeBracket />
      </button>
    </div>
    <div
      class="flex flex-col grow justify-center items-center w-full p-8 rounded-md rounded-tl-none bg-gray-200"
    >
      <NewtonsCradle v-show="currentTab == 'experiment'" />
      <CodeBlock v-show="currentTab == 'code'" :code="codeBlockString" />
    </div>
  </div>
</template>
