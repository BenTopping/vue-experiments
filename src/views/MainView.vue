<script setup lang="ts">
import { ref } from 'vue'
import type { Component } from 'vue'
import SideBar from '@/components/SideBar.vue'
import FlipClockView from './FlipClockView.vue'
import CodeBlockView from './CodeBlockView.vue'
import SignatureBoxView from './SignatureBoxView.vue'
import MockTerminalView from './MockTerminalView.vue'

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
  },
  TerminalView: {
    component: MockTerminalView,
    name: 'Mock terminal'
  }
}
let selectedView = ref('FlipClockView')
</script>

<template>
  <div class="flex py-4 w-full h-full">
      <SideBar v-model="selectedView" :components="components" />
      <div class="flex flex-col px-4 w-full h-full">
        <component :is="components[selectedView].component" />
      </div>
  </div>
</template>
