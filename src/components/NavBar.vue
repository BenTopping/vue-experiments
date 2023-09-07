<script setup lang="ts">
import IconScience from './icons/IconScience.vue';
</script>

<template>
  <div class="flex w-full align-items border-b-2 pb-4">
    <div class="flex flex-row gap-x-4 items-center">
      <IconScience height="96" width="96" class="min-w-[96px]"/>
      <div class="flex flex-col gap-y-2">
        <h1 class="text-5xl font-light">Vue Experiments</h1>
        <span class="text-gray-700 text-wrap max-w-lg">
          A series of drop-in Vue Single-File Components written in typescript
          with the aim of pushing my Vue abilities
        </span>
      </div>
    </div>
  </div>
</template>
