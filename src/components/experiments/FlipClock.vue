<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const date = ref(new Date())
let dateInterval: number | undefined = undefined

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
</script>

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
