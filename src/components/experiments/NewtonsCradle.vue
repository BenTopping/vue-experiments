<script setup lang="ts">
import { ref, onMounted } from 'vue'

const leftball = ref(true)

onMounted(() => {
  setInterval(() => {
    leftball.value = !leftball.value
  }, 1100)
})
</script>

<template>
  <div class="flex flex-row">
    <div class="flex flex-col grow">
      <div class="w-full h-2 bg-black rounded-full p-2 relative top-1"></div>
      <div class="flex flex-row">
        <div :class="['flex flex-col items-center', { leftball }]">
          <div class="flex bg-black w-1 h-32"></div>
          <div class="flex w-8 h-8 bg-black rounded-full border-2 border-black"></div>
        </div>
        <div v-for="index in 5" :key="index">
          <div class="flex flex-col items-center">
            <div class="flex bg-black w-1 h-32"></div>
            <div class="flex w-8 h-8 bg-black rounded-full border-2 border-black"></div>
          </div>
        </div>
        <div :class="['flex flex-col items-center', { rightball: !leftball }]">
          <div class="flex bg-black w-1 h-32"></div>
          <div class="flex w-8 h-8 bg-black rounded-full border-2 border-black"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.leftball {
  animation: leftball 1.2s cubic-bezier(0.5, 0, 0.5, 1) both;
  transform: rotate(0deg);
  transform-origin: 50% 0%;
}

.rightball {
  animation: rightball 1.2s cubic-bezier(0.5, 0, 0.5, 1) both;
  transform: rotate(0deg);
  transform-origin: 50% 0%;
}

@keyframes leftball {
  50% {
    transform: rotate(60deg);
  }
}

@keyframes rightball {
  50% {
    transform: rotate(-60deg);
  }
}
</style>
