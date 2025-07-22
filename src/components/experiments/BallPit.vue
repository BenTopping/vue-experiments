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
</script>

<template>
  <div ref="containerRef" class="relative w-full h-full overflow-hidden">
    <div ref="matterContainerRef" class="absolute top-0 left-0 z-0"></div>
  </div>
</template>
