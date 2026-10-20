<template>
  <section data-section="How we help" class="relative overflow-hidden bg-cream py-24 sm:py-32">
    <PaintSplash kind="swoosh" class="-left-6 top-16 w-36" />
    <PaintSplash kind="splat" color="rgba(21,103,140,0.10)" class="-right-20 bottom-0 w-72" />
    <div class="container-x">
      <div class="grid items-end gap-6 md:grid-cols-[1.3fr_1fr]">
        <div v-reveal>
          <p class="eyebrow">Get assistance</p>
          <h2 class="mt-4 text-[clamp(2.2rem,5vw,4rem)] leading-[1] text-navy">What we can <span class="paint-word">help with</span></h2>
        </div>
        <div v-reveal>
          <p class="text-lg text-navy/75">Serving residents of Midland, Texas, with a 50 state campaign coming soon.</p>
          <NuxtLink to="/get-assistance" class="btn-navy mt-5">See who qualifies <ArrowRight class="size-4" /></NuxtLink>
        </div>
      </div>
      <div class="mt-12"><ServicesGrid /></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
</script>
