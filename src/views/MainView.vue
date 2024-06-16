<script setup lang="ts">
import { ref } from 'vue'
import type { Component } from 'vue'
import SideBar from '@/components/SideBar.vue'
import FlipClockView from './FlipClockView.vue'
import CodeBlockView from './CodeBlockView.vue'
import SignatureBoxView from './SignatureBoxView.vue'

const components: Record<string, { component: Component; name: string }> = {
  FlipClockView: {
    component: FlipClockView,
    name: 'Flip clock'
  },
  CodeBlockView: {
    component: CodeBlockView,
    name: 'Code block'
  },
  SignatureBoxView: {
    component: SignatureBoxView,
    name: 'Signature box'
  }
}
let selectedView = ref('FlipClockView')
</script>

<template>
  <div class="flex grow min-h-full py-4 w-full">
    <SideBar v-model="selectedView" :components="components" />
    <div class="flex flex-col px-4 w-full">
      <component :is="components[selectedView].component" />
    </div>
  </div>
</template>
