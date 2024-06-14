<script setup lang="ts">
import { ref } from 'vue'
import SideBar from '../components/SideBar.vue'
import FlipClockView from './FlipClockView.vue'
import CodeBlockView from './CodeBlockView.vue'

const components: any = {
  FlipClockView,
  CodeBlockView
}
let selectedView = ref('FlipClockView')
</script>

<template>
  <div class="flex grow min-h-full py-4 w-full">
    <SideBar v-model="selectedView" />
    <div class="flex flex-col px-4 w-full">
      <component :is="components[selectedView]" />
    </div>
  </div>
</template>
