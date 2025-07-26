<script setup lang="ts">
import { computed, ref } from 'vue'
const currentMonth = ref<number>(1)
const currentDay = ref<number | null>(1)
const currentYear = ref<number>(new Date().getFullYear())
const months: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]
const currentDays = computed(() => {
  if (currentMonth.value === null) return []
  const daysInMonth = new Date(currentYear.value, currentMonth.value, 0).getDate()
  return Array.from({ length: daysInMonth }, (_, i) => i + 1)
})
const currentDate = computed(() => {
  if (currentMonth.value === null || currentDay.value === null) return null
  return new Date(currentYear.value, currentMonth.value - 1, currentDay.value, 12, 0, 0)
    .toUTCString()
    .slice(0, 17)
})
const setMonth = (month: number) => {
  currentMonth.value = month
  if (currentDays.value.includes(currentDay.value)) return
  currentDay.value = null
}
const years = () => {
  return Array.from({ length: 100 }, (_, i) => currentYear.value - i)
}
</script>

<template>
  <div class="flex flex-row w-full h-full">
    <div
      class="flex flex-row grow relative items-center justify-center w-full select-none h-[400px]"
    >
      <!-- left-[calc(50%+12px)] because we want the center origin. So 50% - (w-24(96px) / 2)  -->
      <button
        v-for="month in 12"
        :class="`absolute left-[calc(50%-48px)] top-1/2 origin-center flex border-gray-400 border rounded-full w-24 text-center justify-center items-center cursor-pointer ${currentMonth === month ? 'bg-green-400 text-white' : ''}`"
        :style="{ transform: `rotate(${month * 30}deg) translateY(180px)` }"
        @click="setMonth(month)"
      >
        {{ months[month - 1] }}
      </button>
      <!-- left-[calc(50%+12px)] because we want the center origin. So 50% - (w-6(12px) / 2)  -->
      <button
        v-for="day in currentDays"
        :class="`absolute left-[calc(50%-12px)] top-1/2 origin-center flex border-gray-400 border rounded-full w-6 text-center justify-center items-center cursor-pointer ${currentDay === day ? 'bg-green-400 text-white' : ''}`"
        :style="{ transform: `rotate(${(day * 360) / currentDays.length}deg) translateY(150px)` }"
        @click="currentDay = day"
      >
        {{ day }}
      </button>
      <div class="flex flex-col items-center justify-center">
        <div class="w-full max-w-sm min-w-[200px]">
          <div class="relative">
            <select
              v-model="currentYear"
              class="w-full text-sm border border-gray-400 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-gray-600 hover:border-gray-600 shadow-sm focus:shadow-md appearance-none cursor-pointer"
            >
              <option v-for="year in years()" :key="year" :value="year">{{ year }}</option>
            </select>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.2"
              stroke="currentColor"
              class="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
              />
            </svg>
          </div>
        </div>
        <div>
          <span class="text-gray-400">
            Selected date: {{ currentDate ? currentDate : 'None' }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
