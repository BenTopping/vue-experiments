<script setup lang="ts">
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen h-full w-full p-8">
    <NavBar />
    <RouterView />
  </div>
</template>
