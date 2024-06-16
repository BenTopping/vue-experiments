<script setup lang="ts">
defineProps({ modelValue: String })

const emit = defineEmits(['update:modelValue'])

function clickView(view: string) {
  emit('update:modelValue', view)
}
</script>

<template>
  <aside class="grow min-h-full border-r-2 pr-4 space-y-2">
    <button
      class="flex rounded-md bg-gray-100 w-64 text-xl p-4 select-none cursor-pointer hover:text-white hover:bg-black transition duration-75"
      @click="clickView('FlipClockView')"
    >
      Flip clock
    </button>
    <button
      class="flex rounded-md bg-gray-100 w-64 text-xl p-4 select-none cursor-pointer hover:text-white hover:bg-black transition duration-75"
      @click="clickView('CodeBlockView')"
    >
      Code block
    </button>
  </aside>
</template>
