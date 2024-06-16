<script setup lang="ts">
import { ref } from 'vue'
import FlipClock from '../components/experiments/FlipClock.vue'
import CodeBlock from '../components/experiments/CodeBlock.vue'
import IconCodeBracket from '../components/icons/IconCodeBracket.vue'
import IconScience from '@/components/icons/IconScience.vue'
interface IDependency {
  name: string
  address: string
}
const dependencies: IDependency[] = []
const currentTab = ref('experiment')

const codeBlockString: string = `
<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

let date: any = ref(new Date())
let dateInterval: any = null

const seconds = computed(() => padZero(date.value.getSeconds()))
const minutes = computed(() => padZero(date.value.getMinutes()))
const hours = computed(() => padZero(date.value.getHours()))

function updateDate() {
  date.value = new Date()
}

function padZero(i: number) {
  const num = i < 10 ? '0' + i : i
  return num
}

onMounted(() => {
  dateInterval = setInterval(updateDate, 1000)
})

onUnmounted(() => {
  clearInterval(dateInterval)
})
<\/\script>

<template>
  <div
    class="flex flex-row space-x-8 text-7xl text-white font-bold p-5 border-8 border-slate-800 bg-black rounded-md"
  >
    <div class="rounded-lg w-32 h-48 text-center relative shadow-md bg-black shadow-md">
      <div class="h-1/2">
        <transition name="flip-top">
          <div
            :key="hours"
            class="absolute w-full h-1/2 overflow-hidden bg-slate-800 border-black border-2 rounded-t-md"
          >
            <span class="absolute bottom-0 -translate-x-1/2 translate-y-1/2">{{ hours }}</span>
          </div>
        </transition>
      </div>
      <div class="h-1/2">
        <transition name="flip-bottom">
          <div
            :key="hours"
            class="absolute w-full h-1/2 top-1/2 overflow-hidden bg-slate-800 border-black border-2 rounded-b-md"
          >
            <span class="absolute -translate-x-1/2 -translate-y-1/2">{{ hours }}</span>
          </div>
        </transition>
      </div>
    </div>
    <div class="rounded-lg w-32 h-48 text-center relative shadow-md bg-black shadow-md">
      <div class="h-1/2">
        <transition name="flip-top">
          <div
            :key="minutes"
            class="absolute w-full h-1/2 overflow-hidden bg-slate-800 border-black border-2 rounded-t-md"
          >
            <span class="absolute bottom-0 -translate-x-1/2 translate-y-1/2">{{ minutes }}</span>
          </div>
        </transition>
      </div>
      <div class="h-1/2">
        <transition name="flip-bottom">
          <div
            :key="minutes"
            class="absolute w-full h-1/2 top-1/2 overflow-hidden bg-slate-800 border-black border-2 rounded-b-md"
          >
            <span class="absolute -translate-x-1/2 -translate-y-1/2">{{ minutes }}</span>
          </div>
        </transition>
      </div>
    </div>
    <div class="rounded-lg w-32 h-48 text-center relative shadow-md bg-black shadow-md">
      <div class="h-1/2">
        <transition name="flip-top">
          <div
            :key="seconds"
            class="absolute w-full h-1/2 overflow-hidden bg-slate-800 border-black border-2 rounded-t-md"
          >
            <span class="absolute bottom-0 -translate-x-1/2 translate-y-1/2">{{ seconds }}</span>
          </div>
        </transition>
      </div>
      <div class="h-1/2">
        <transition name="flip-bottom">
          <div
            :key="seconds"
            class="absolute w-full h-1/2 top-1/2 overflow-hidden bg-slate-800 border-black border-2 rounded-b-md"
          >
            <span class="absolute -translate-x-1/2 -translate-y-1/2">{{ seconds }}</span>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<style scoped>
.flip-top-leave-active {
  animation: flip-top 250ms ease-in;
  transform-origin: bottom;
  z-index: 10;
}

.flip-bottom-enter-active {
  animation: flip-bottom 250ms ease-out 250ms;
  transform-origin: top;
  transform: rotateX(90deg);
  z-index: 10;
}

.flip-bottom-leave-active {
  transition: 500ms;
}

@keyframes flip-top {
  100% {
    transform: rotateX(90deg);
  }
}

@keyframes flip-bottom {
  100% {
    transform: rotateX(0deg);
  }
}
</style>
`
</script>

<template>
  <div class="flex flex-col grow">
    <div class="flex flex-col mb-4 text-xl">
      <h2 class="text-5xl font-light mb-4">Flip clock</h2>
      <div class="flex flex-col space-y-2">
        <span>A flip clock component to provide a unique way of displaying time on a website.</span>
        <span>
          Since the Date object only updates once a second, we can only assume the clock is accurate
          to ~ 1 second. This is a caveat of trying to make Date reactive. We can re-initalise it
          more frequently but it will never be precise.
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
      <FlipClock v-show="currentTab == 'experiment'" />
      <CodeBlock v-show="currentTab == 'code'" :code="codeBlockString" />
    </div>
  </div>
</template>
