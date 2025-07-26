<script setup lang="ts">
import { ref } from 'vue'
import CircularCalendar from '@/components/experiments/CircularCalendar.vue'
import CodeBlock from '@/components/experiments/CodeBlock.vue'
import IconCodeBracket from '@/components/icons/IconCodeBracket.vue'
import IconScience from '@/components/icons/IconScience.vue'
interface IDependency {
  name: string
  address: string
}
const dependencies: IDependency[] = []
const currentTab = ref('experiment')

const codeBlockString: string = `
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
<\/script>

<template>
  <div class="flex flex-row w-full h-full">
    <div
      class="flex flex-row grow relative items-center justify-center w-full select-none h-[400px]"
    >
      <!-- left-[calc(50%+12px)] because we want the center origin. So 50% - (w-24(96px) / 2)  -->
      <button
        v-for="month in 12"
        :class="\`absolute left-[calc(50%-48px)] top-1/2 origin-center flex border-gray-400 border rounded-full w-24 text-center justify-center items-center cursor-pointer \${currentMonth === month ? 'bg-green-400 text-white' : ''}\`"
        :style="{ transform: \`rotate(\${month * 30}deg) translateY(180px)\` }"
        @click="setMonth(month)"
      >
        {{ months[month - 1] }}
      </button>
      <!-- left-[calc(50%+12px)] because we want the center origin. So 50% - (w-6(12px) / 2)  -->
      <button
        v-for="day in currentDays"
        :class="\`absolute left-[calc(50%-12px)] top-1/2 origin-center flex border-gray-400 border rounded-full w-6 text-center justify-center items-center cursor-pointer \${currentDay === day ? 'bg-green-400 text-white' : ''}\`"
        :style="{ transform: \`rotate(\${(day * 360) / currentDays.length}deg) translateY(150px)\` }"
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
`
</script>

<template>
  <div class="flex flex-col h-full w-full">
    <div class="flex flex-col mb-4 text-xl">
      <h2 class="text-5xl font-light mb-4">Circular calendar</h2>
      <div class="flex flex-col space-y-2">
        <span>A unique way of selecting a date. </span>
        <span>
          This component is not reactive CSS, so it will not scale to different screen sizes. The
          idea behind this is it allows a quick selection of a date without the need for a full
          calendar view. Readibility is affected by the rotation of the text according to its
          position. Aligning the text relative to the center of the circle would be one solution but
          it reduces the circular effect.
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
    <div class="flex flex-row">
      <button
        :class="`py-2 px-6 ${
          currentTab == 'experiment' ? 'bg-gray-200' : 'bg-gray-300'
        } rounded-t-lg cursor-pointer`"
        @click="currentTab = 'experiment'"
      >
        <IconScience />
      </button>
      <button
        :class="`p-2 px-6 rounded-t-lg ${
          currentTab == 'code' ? 'bg-gray-200' : 'bg-gray-300'
        } cursor-pointer`"
        @click="currentTab = 'code'"
      >
        <IconCodeBracket />
      </button>
    </div>
    <div
      class="flex flex-col grow justify-center items-center w-full p-8 rounded-md rounded-tl-none bg-gray-200"
    >
      <CircularCalendar v-show="currentTab == 'experiment'" />
      <CodeBlock v-show="currentTab == 'code'" :code="codeBlockString" />
    </div>
  </div>
</template>
