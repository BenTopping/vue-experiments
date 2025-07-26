<script setup lang="ts">
import { ref } from 'vue'
import BallPit from '@/components/experiments/BallPit.vue'
import CodeBlock from '@/components/experiments/CodeBlock.vue'
import IconCodeBracket from '@/components/icons/IconCodeBracket.vue'
import IconScience from '@/components/icons/IconScience.vue'
interface IDependency {
  name: string
  address: string
}
const dependencies: IDependency[] = [
  {
    name: 'Matter.js',
    address: 'https://brm.io/matter-js/'
  }
]
const currentTab = ref('experiment')

const codeBlockString: string = `
<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue'
import Matter from 'matter-js'

// module aliases
const Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite,
  Mouse = Matter.Mouse,
  MouseConstraint = Matter.MouseConstraint

const balls: Matter.Body[] = []
const canvasContainerRef = useTemplateRef<HTMLDivElement>('matterContainerRef')
const containerRef = useTemplateRef<HTMLDivElement>('containerRef')

const runPhysics = () => {
  // create an engine
  const engine = Engine.create()

  if (!containerRef.value) {
    console.error('containerRef is null')
    return
  }

  const containerRect = containerRef.value.getBoundingClientRect()
  const width = containerRect.width
  const height = containerRect.height

  if (!canvasContainerRef.value) {
    console.error('canvasContainerRef is null')
    return
  }

  // create a renderer
  const render = Render.create({
    element: canvasContainerRef.value,
    engine: engine,
    options: {
      width,
      height,
      wireframes: false,
      background: 'bg-gray-200'
    }
  })

  // create balls and walls
  createBalls(width, height)
  const ground = Bodies.rectangle(width / 2, height + 25, width, 50, {
    isStatic: true,
    render: { fillStyle: 'transparent' }
  })
  const leftWall = Bodies.rectangle(-25, height / 2, 50, height, {
    isStatic: true,
    render: { fillStyle: 'transparent' }
  })
  const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height, {
    isStatic: true,
    render: { fillStyle: 'transparent' }
  })

  const mouse = Mouse.create(containerRef.value)
  const mouseConstraint = MouseConstraint.create(engine, {
    mouse,
    constraint: {
      stiffness: 0.25,
      render: { visible: false }
    }
  })
  render.mouse = mouse

  // add all of the bodies to the world
  Composite.add(engine.world, [...balls, mouseConstraint, leftWall, rightWall, ground])

  // run the renderer
  Render.run(render)

  // create runner
  const runner = Runner.create()

  // run the engine
  Runner.run(runner, engine)

  // run the renderer
  Render.run(render)
}

const createBalls = (width: number, height: number) => {
  for (let i = 0; i < 50; i++) {
    const radius = Math.random() * 30 + 10
    const x = Math.random() * (width - 2 * radius) + radius
    const y = Math.random() * (height - 2 * radius) + radius

    const ball = Bodies.circle(x, y, radius, {
      restitution: 0.9,
      render: {
        fillStyle: 'rgb(74 222 128)',
        strokeStyle: '#ffffff',
        lineWidth: 3
      }
    })
    balls.push(ball)
  }
}

onMounted(() => {
  runPhysics()
})
<\/script>

<template>
  <div ref="containerRef" class="relative w-full h-full overflow-hidden">
    <div ref="matterContainerRef" class="absolute top-0 left-0 z-0"></div>
  </div>
</template>
`
</script>

<template>
  <div class="flex flex-col h-full w-full">
    <div class="flex flex-col mb-4 text-xl">
      <h2 class="text-5xl font-light mb-4">Ball pit</h2>
      <div class="flex flex-col space-y-2">
        <span
          >A ball pit simulation using
          <a href="https://brm.io/matter-js/" target="_blank" class="font-bold"> Matter.js </a>
        </span>
        <span>
          The ball pit contains 50 randomly sized balls and it is interactive using the realistic
          physics from matter.js. Drag and throw the balls around to see it in action.
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
      <BallPit v-show="currentTab == 'experiment'" />
      <CodeBlock v-show="currentTab == 'code'" :code="codeBlockString" />
    </div>
  </div>
</template>
