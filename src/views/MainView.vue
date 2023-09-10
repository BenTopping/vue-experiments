<script setup lang="ts">
import SideBar from "../components/SideBar.vue";
import FlipClock from "../components/experiments/FlipClock.vue"
</script>

<template>
  <div class="flex min-h-screen p-4">
    <SideBar />
    <div class="w-full">
      <FlipClock />
    </div>
  </div>
</template>
