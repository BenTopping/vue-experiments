<script setup lang="ts">
import CodeBlock from '@/components/experiments/CodeBlock.vue'
import IconScience from '@/components/icons/IconScience.vue'
interface IDependency {
  name: string
  address: string
}
const dependencies: IDependency[] = [
  {
    name: 'Shiki',
    address: 'https://shiki.style/'
  }
]

const codeBlockString: string = `
<script async setup lang="ts">
import { ref, onMounted } from 'vue'
import { codeToHtml } from 'shiki'
const copied = ref(false)
const props = defineProps({
  code: {
    type: String,
    default: ''
  }
})
const highlightedCode = ref('')
function copy() {
  copied.value = true
  navigator.clipboard.writeText(props.code)
  setTimeout(() => (copied.value = false), 2000)
}

onMounted(async () => {
  highlightedCode.value = await codeToHtml(props.code, {
    lang: 'typescript',
    theme: 'vitesse-black'
  })

  return {
    highlightedCode
  }
})
<\/script>

<template>
  <div class="flex rounded-md w-full h-full bg-black text-white p-8 relative">
    <transition name="slide-up">
      <div
        v-show="copied"
        class="absolute text-xl right-1/2 translate-x-1/2 top-4 rounded-full bg-gray-600 items-center px-6 p-2"
      >
        <span>Copied</span>
      </div>
    </transition>
    <div class="absolute right-4 top-4">
      <button class="hover:bg-gray-600 p-4 h-full rounded-md shadow-lg bg-gray-700" @click="copy">
        <!-- Clipboard Tick Icon -->
        <svg
          v-show="copied"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
          height="40"
          viewBox="0 -960 960 960"
          width="40"
        >
          <path
            d="M422.462-344.154 678.308-600 650-628.308 422.462-400.769l-114-114-28.308 28.307 142.308
                        142.308ZM224.615-160q-26.846 0-45.731-18.884Q160-197.769 160-224.615v-510.77q0-26.846 18.884-45.731Q197.769-800
                        224.615-800h188q-5.461-30.616 14.654-55.308Q447.385-880 480-880q33.385 0 53.5 24.692 20.116 24.692 13.885 55.308h188q26.846 0
                        45.731 18.884Q800-762.231 800-735.385v510.77q0 26.846-18.884 45.731Q762.231-160 735.385-160h-510.77Zm0-40h510.77q9.23 0
                        16.923-7.692Q760-215.385 760-224.615v-510.77q0-9.23-7.692-16.923Q744.615-760 735.385-760h-510.77q-9.23 0-16.923 7.692Q200-744.615
                        200-735.385v510.77q0 9.23 7.692 16.923Q215.385-200 224.615-200ZM480-782.308q13 0 21.5-8.5t8.5-21.5q0-13-8.5-21.5t-21.5-8.5q-13
                        0-21.5 8.5t-8.5 21.5q0 13 8.5 21.5t21.5 8.5ZM200-200v-560 560Z"
          />
        </svg>
        <!-- Clipboard Icon -->
        <svg
          v-show="!copied"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
          height="40"
          viewBox="0 -960 960 960"
          width="40"
        >
          <path
            d="M224.615-160q-26.846 0-45.731-18.884Q160-197.769 160-224.615v-510.77q0-26.846 18.884-45.731Q197.769-800
                    224.615-800h185.462q5.615-23.462 24.923-39.423 19.308-15.962 45-15.962 26.154 0 45.346 15.962 19.193 15.961 24.808
                    39.423h185.231q26.846 0 45.731 18.884Q800-762.231 800-735.385v510.77q0 26.846-18.884 45.731Q762.231-160 735.385-160h-510.77Zm0-40h510.77q9.23
                    0 16.923-7.692Q760-215.385 760-224.615v-510.77q0-9.23-7.692-16.923Q744.615-760 735.385-760H640v89.231H320V-760h-95.385q-9.23 0-16.923
                    7.692Q200-744.615 200-735.385v510.77q0 9.23 7.692 16.923Q215.385-200 224.615-200ZM480-750.769q13.923 0 23.115-9.193 9.193-9.192 9.193-23.115
                    0-13.923-9.193-23.115-9.192-9.193-23.115-9.193-13.923 0-23.115 9.193-9.193 9.192-9.193 23.115 0 13.923 9.193 23.115 9.192 9.193 23.115 9.193Z"
          />
        </svg>
      </button>
    </div>
    <div v-html="highlightedCode"></div>
  </div>
</template>

<style scoped>
.slide-up-enter-active {
  transition: all 0.15s ease-out;
}
.slide-up-leave-active {
  transition: all 0.15s ease-out;
}
.slide-up-enter-from {
  opacity: 0;
  transform: translateY(-20px) translateX(50%);
}
.slide-up-leave-to {
  opacity: 0;
}
</style>
`
</script>

<template>
  <div class="flex flex-col">
    <div class="flex flex-col mb-4 text-xl">
      <h2 class="text-5xl font-light mb-4">Code block</h2>
      <div class="flex flex-col space-y-2">
        <span>A Vue SFC to create a code-block given a string</span>
        <span>
          The component includes a copy button and feedback animation to copy the given code to the
          user's clipboard. It uses Shiki for syntax highlighting.
        </span>
        <div class="flex flex-row space-x-2 py-4 items-center">
          <span class="py-2">Dependencies:</span>
          <div v-if="dependencies.length">
            <a
              v-for="dep in dependencies"
              :key="dep.name"
              class="py-2 px-6 bg-gray-200 rounded-full hover:text-white hover:bg-black transition"
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
      <button class="py-2 px-6 bg-gray-200 rounded-t-lg cursor-pointer">
        <IconScience />
      </button>
    </div>
    <div
      class="flex justify-center items-center max-w-full p-8 rounded-md rounded-tl-none bg-gray-200"
    >
      <CodeBlock :code="codeBlockString" />
    </div>
  </div>
</template>
