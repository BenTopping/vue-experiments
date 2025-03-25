<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import SideBar from '@/components/SideBar.vue'
</script>

<template>
  <div class="flex flex-col grow min-h-svh p-8 max-w-swh">
    <div class="flex flex-col grow w-full h-full">
      <NavBar />
      <div class="flex grow py-4 h-full">
        <SideBar />
        <div class="min-h-full px-4 w-full mx-auto">
          <router-view v-slot="{ Component, route }">
            <transition :name="route.meta.transition" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.load-enter-active {
  transition: opacity 0.2s ease;
}

.load-enter-from {
  opacity: 0;
}

.load-leave-active {
  transition: opacity 0.2s ease;
}

.load-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.2s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.2s ease-out;
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.slide-down-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
