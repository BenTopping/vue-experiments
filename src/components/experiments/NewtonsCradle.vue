<script setup lang="ts"></script>

<template>
  <div class="flex flex-row">
    <div class="flex flex-row grow">
      <div
        class="flex h-full bg-black w-2 rotate-15 rounded-full items-center justify-center z-1"
      ></div>
      <div class="flex flex-col">
        <div class="w-full h-2 bg-black rounded-full relative top-2"></div>
        <div class="flex flex-row">
          <div class="flex flex-col items-center leftball">
            <div class="flex bg-white w-1 h-32"></div>
            <div class="flex w-8 h-8 bg-green-400 rounded-full"></div>
          </div>
          <div v-for="index in 3" :key="index">
            <div class="flex flex-col items-center">
              <div class="flex bg-white w-1 h-32"></div>
              <div class="flex w-8 h-8 bg-green-400 rounded-full"></div>
            </div>
          </div>
          <div class="flex flex-col items-center rightball">
            <div class="flex bg-white w-1 h-32"></div>
            <div class="flex w-8 h-8 bg-green-400 rounded-full"></div>
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
  animation: leftball 1.25s alternate ease-in infinite;
  transform: rotate(0deg);
  transform-origin: 50% 0%;
}

.rightball {
  animation: rightball 1.25s alternate ease-out infinite;
  transform: rotate(0deg);
  transform-origin: 50% 0%;
}

@keyframes leftball {
  0% {
    transform: rotate(60deg);
  }
  50% {
    transform: rotate(0deg);
  }
}

@keyframes rightball {
  50% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-60deg);
  }
}
</style>
