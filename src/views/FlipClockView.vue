<script setup lang="ts">
import FlipClock from '../components/experiments/FlipClock.vue'
interface IDependency {
  name: string
  address: string
}
const dependencies: IDependency[] = []
</script>

<template>
  <div class="flex flex-col grow">
    <div class="flex flex-col mb-4 text-xl">
      <h2 class="text-5xl font-light mb-4">Flip clock</h2>
      <div class="flex flex-col space-y-2">
        <span>A flip clock component to provide a unique way of displaying time on a website.</span>
        <span>
          Since the Date object only updates once a second, we can only assume the clock is accurate
          to ~ 1 second. This is a caveat of trying to make Date reactive. We can re-initalise it
          more frequently but it will never be precise.
        </span>
        <div class="flex flex-row space-x-2 py-4">
          <span>Dependencies:</span>
          <div v-if="dependencies.length">
            <a
              v-for="dep in dependencies"
              :key="dep.name"
              class="p-2 px-4 bg-gray-200 rounded-full mx-1 hover:text-white hover:bg-black transition"
              :href="dep.address"
              target="_blank"
            >
              {{ dep.name }}
            </a>
          </div>
          <div v-else>
            <span class="text-gray-400 italic">No dependencies!</span>
          </div>
        </div>
      </div>
    </div>
    <div class="flex grow justify-center items-center w-full p-8 rounded-md bg-gray-200">
      <FlipClock />
    </div>
  </div>
</template>
