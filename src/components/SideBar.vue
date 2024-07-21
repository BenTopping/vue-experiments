<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const routeNames = router
  .getRoutes()
  .map((route: { name: any }) => route.name)
  .filter((name: any) => name != 'main')
</script>

<template>
  <aside class="flex flex-col min-h-full border-r-2 pr-4 space-y-2">
    <button
      v-for="(route, key) in routeNames"
      :key="key"
      class="flex rounded-md bg-gray-100 w-64 text-xl p-4 select-none cursor-pointer hover:text-white hover:bg-black transition duration-75"
      @click="router.push({ name: route })"
    >
      {{ route }}
    </button>
  </aside>
</template>
