<template>
  <header>
  </header>
  <div class="flex mx-auto container  md:flex-wrap xl:flex-wrap">
    <div class="w-4 sm:basis-full md:basis-1/5 xl:basis-1/3">
      
    </div>
    <div class="w-full sm:basis-full md:basis-3/5 xl:basis-1/3">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    <div class="w-4 sm:basis-full md:basis-1/5 xl:basis-1/3">
      
    </div>
  </div>
</template>
<script setup>

</script>

<style lang="scss">
  header{
    height: 40vh;
    background-color: var(--cool-white);
  }
  @media (min-width: 1024px) {

  }
  .fade-enter-active,
  .fade-leave-active {
    transition: 0.5s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    transform: translateY(300%)
  }
</style>
