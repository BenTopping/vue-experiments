<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

let date: any = ref(new Date())
let dateInterval: any = null

const seconds = computed(() => padZero(date.value.getSeconds()))
const minutes = computed(() => padZero(date.value.getMinutes()))
const hours = computed(() => padZero(date.value.getHours()))

function updateDate() {
    date.value = new Date()
}

function padZero(i: number) {
  const num = i < 10 ? "0" + i : i
  return num;
}

onMounted(() => {
    dateInterval = setInterval(updateDate, 1000)
})
onUnmounted(() => {
    clearInterval(dateInterval)
})
</script>

<template>
    <div class="flex flex-col">
        <div class="flex flex-col mb-2">
            <h2 class="text-5xl font-light pb-2">Flip clock</h2>
            <span class="text-xl">A flip clock component to provide a unique way of displaying time on a website.</span>
            <span class="text-xl">
                Since the Date object only updates once a second, we can only assume the clock is accurate to ~ 1 second.
                This is a caveat of trying to make Date reactive. We can re-initalise it more frequently but it will never
                be precise.
            </span>
        </div>
        <div class="flex flex-row space-x-8 justify-center w-full p-8 rounded-md bg-gray-100 text-7xl">
            <div class="rounded-lg w-32 h-48 text-center relative shadow-md text-black bg-white shadow-md">
                <div class="h-1/2 rounded-t-lg">
                    <transition name="flip-top">
                        <div :key=hours class="absolute w-full h-1/2 overflow-hidden bg-gray-100 rounded-t-lg border-4 border-b-0">
                            <span class="absolute bottom-0 -translate-x-1/2 translate-y-1/2">{{ hours }}</span>
                        </div>
                    </transition>
                </div>
                <div class="h-1/2 rounded-b-lg">
                    <transition name="flip-bottom">
                        <div :key=hours class="absolute w-full h-1/2 top-1/2 overflow-hidden bg-white rounded-b-lg border-4 border-t-0">
                            <span class="absolute -translate-x-1/2 -translate-y-1/2">{{ hours }}</span>
                        </div>
                    </transition>
                </div>
            </div>
            <div class="rounded-lg w-32 h-48 text-center relative shadow-md text-black bg-white shadow-md">
                <div class="h-1/2 rounded-t-lg">
                    <transition name="flip-top">
                        <div :key=minutes class="absolute w-full h-1/2 overflow-hidden bg-gray-100 rounded-t-lg border-4 border-b-0">
                            <span class="absolute bottom-0 -translate-x-1/2 translate-y-1/2">{{ minutes }}</span>
                        </div>
                    </transition>
                </div>
                <div class="h-1/2 rounded-b-lg">
                    <transition name="flip-bottom">
                        <div :key=minutes class="absolute w-full h-1/2 top-1/2 overflow-hidden bg-white rounded-b-lg border-4 border-t-0">
                            <span class="absolute -translate-x-1/2 -translate-y-1/2">{{ minutes }}</span>
                        </div>
                    </transition>
                </div>
            </div>
            <div class="rounded-lg w-32 h-48 text-center relative shadow-md text-black bg-white shadow-md">
                <div class="h-1/2 rounded-t-lg">
                    <transition name="flip-top">
                        <div :key=seconds class="absolute w-full h-1/2 overflow-hidden bg-gray-100 rounded-t-lg border-4 border-b-0">
                            <span class="absolute bottom-0 -translate-x-1/2 translate-y-1/2">{{ seconds }}</span>
                        </div>
                    </transition>
                </div>
                <div class="h-1/2 rounded-b-lg">
                    <transition name="flip-bottom">
                        <div :key=seconds class="absolute w-full h-1/2 top-1/2 overflow-hidden bg-white rounded-b-lg border-4 border-t-0">
                            <span class="absolute -translate-x-1/2 -translate-y-1/2">{{ seconds }}</span>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.flip-top-leave-active {
    animation: flip-top 250ms ease-in;
    transform-origin: bottom;
    z-index: 10;
}

.flip-bottom-enter-active {
    animation: flip-bottom 250ms ease-out 250ms;
    transform-origin: top;
    transform: rotateX(90deg);
    z-index: 10;
}

.flip-bottom-leave-active {
    transition: 500ms;
}

@keyframes flip-top {
    100% {
        transform: rotateX(90deg)
    }
}

@keyframes flip-bottom {
    100% {
        transform: rotateX(0deg)
    }
}

</style>
