<script setup lang="ts">
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div class="flex flex-col h-screen p-8 h-full w-full">
    <NavBar />
    <RouterView />
  </div>
</template>
