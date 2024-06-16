<script setup lang="ts">
import { ref } from 'vue'
import SignatureBox from '@/components/experiments/SignatureBox.vue'
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
import { ref } from 'vue'

const props = defineProps({
    width: {
        type: Number,
        default: 750
    },
    height: {
        type: Number,
        default: 250
    }
})

let isDrawing = ref(false)
let x = ref(0)
let y = ref(0)
let canvas = ref<InstanceType<typeof HTMLCanvasElement> | null>(null)

function startDrawing(event: MouseEvent) {
    isDrawing.value = true
    x.value = event.offsetX
    y.value = event.offsetY
}

function draw(event: MouseEvent) {
    if (!isDrawing.value || !canvas.value) return
    const ctx = canvas.value.getContext('2d')
    if (!ctx) return
    ctx.beginPath()
    ctx.moveTo(x.value, y.value)
    ctx.lineTo(event.offsetX, event.offsetY)
    ctx.stroke()
    x.value = event.offsetX
    y.value = event.offsetY
}

function stopDrawing() {
    isDrawing.value = false
}

function clearCanvas() {
    if (!canvas.value) return
    const ctx = canvas.value.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
}

function saveCanvas() {
    if (!canvas.value) return
    const dataURL = canvas.value.toDataURL()
    const a = document.createElement('a')
    a.href = dataURL
    a.download = 'signature.png'
    a.click()
}

<\/\script>

<template>
    <div class="flex flex-row">
        <canvas ref="canvas" class="border-2 border-gray-200 rounded-lg bg-white" :width=props.width :height=props.height
            @mousedown="startDrawing" @mousemove="draw" @mouseup="stopDrawing" @mouseleave="stopDrawing">
        </canvas>
        <div class="flex flex-col px-2 space-y-2">
            <button class="p-2 shadow-md rounded-lg bg-white" @click="clearCanvas">
                <!-- Delete Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40" fill="#FF0000">
                    <path
                        d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z" />
                </svg>
            </button>
            <button class="flex p-2 shadow-md rounded-lg bg-white" @click="saveCanvas">
                <!-- Download Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40" fill="#000000">
                    <path
                        d="M480-336 288-528l51-51 105 105v-342h72v342l105-105 51 51-192 192ZM263.72-192Q234-192 213-213.15T192-264v-72h72v72h432v-72h72v72q0 29.7-21.16 50.85Q725.68-192 695.96-192H263.72Z" />
                </svg>
            </button>
        </div>
    </div>
</template>
`
</script>

<template>
  <div class="flex flex-col grow">
    <div class="flex flex-col mb-4 text-xl">
      <h2 class="text-5xl font-light mb-4">Signature box</h2>
      <div class="flex flex-col space-y-2">
        <span>A box to draw a signature in.</span>
        <span>
          An extension of this could be to add colour and sizing options or to run some handwriting
          recognition on it.
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
        @click="currentTab = 'experiment'"
        :class="`py-2 px-6 ${
          currentTab == 'experiment' ? 'bg-gray-200' : 'bg-gray-300'
        } rounded-t-lg cursor-pointer`"
      >
        <IconScience />
      </button>
      <button
        @click="currentTab = 'code'"
        :class="`p-2 px-6 rounded-t-lg ${
          currentTab == 'code' ? 'bg-gray-200' : 'bg-gray-300'
        } cursor-pointer`"
      >
        <IconCodeBracket />
      </button>
    </div>
    <div
      class="flex flex-col grow justify-center items-center w-full p-8 rounded-md rounded-tl-none bg-gray-200"
    >
      <SignatureBox v-show="currentTab == 'experiment'" />
      <CodeBlock v-show="currentTab == 'code'" :code="codeBlockString" />
    </div>
  </div>
</template>
