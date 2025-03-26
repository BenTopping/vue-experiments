<script setup lang="ts"></script>

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
