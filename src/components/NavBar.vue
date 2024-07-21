<script setup lang="ts">
import { useRouter } from 'vue-router'
import IconScience from '@/components/icons/IconScience.vue'

const router = useRouter()
</script>

<template>
  <div class="flex w-full align-items border-b-2 pb-4">
    <div class="flex flex-row gap-x-4 items-center">
      <IconScience
        height="96"
        width="96"
        class="cursor-pointer"
        @click="router.push({ name: 'main' })"
      />
      <div class="flex flex-col gap-y-2">
        <h1 class="text-5xl font-light">Vue Experiments</h1>
        <span class="text-gray-700 text-wrap max-w-lg">
          A series of drop-in Vue Single-File Components written in Typescript and TailwindCSS with
          the aim of finding unique implementations
        </span>
      </div>
    </div>
  </div>
</template>
