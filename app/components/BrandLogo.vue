<template>
  <NuxtLink to="/" class="group flex min-w-0 items-center gap-2 sm:gap-3" aria-label="Paint The World, home">
    <img :src="$a(light ? '/brand/ptw-brush-light.svg' : '/brand/ptw-brush.svg')" alt="" class="h-10 w-auto transition-transform duration-500 group-hover:-rotate-12 sm:h-11" width="26" height="44">
    <img :src="$a(light ? '/brand/ptw-wordmark-white.svg' : '/brand/ptw-wordmark.svg')" alt="Paint The World: Painting a better place" class="h-5 w-auto min-[400px]:h-6 sm:h-8" width="230" height="32">
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{ light?: boolean }>()
</script>
