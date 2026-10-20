<template>
  <section ref="root" data-section="Community" class="relative overflow-hidden bg-cream py-24 sm:py-32">
    <PaintSplash kind="splat" class="-left-16 top-10 w-72" />
    <PaintSplash kind="stroke" color="rgba(21,103,140,0.12)" class="-right-24 bottom-10 w-[460px]" />
    <div class="container-x">
      <div v-reveal class="mx-auto max-w-3xl text-center">
        <p class="eyebrow justify-center">Join the movement</p>
        <h2 class="mt-4 text-[clamp(2rem,5vw,3.6rem)] leading-[1.05] text-navy">
          Join Our Community of <span class="paint-word">1 million+</span> Supporting Positive Change!
        </h2>
      </div>
      <div v-reveal="'stagger'" class="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <a
          v-for="s in socials"
          :key="s.key"
          :href="s.href"
          target="_blank"
          rel="noopener"
          class="group relative overflow-hidden rounded-3xl bg-white p-6 shadow-[0_20px_50px_-30px_rgba(2,32,47,0.45)] transition hover:-translate-y-2"
        >
          <span class="absolute inset-x-0 bottom-0 h-1.5 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" :style="{ background: s.color }" />
          <SocialIcon :name="s.key" class="size-9" :style="{ color: s.color }" />
          <p class="mt-6 font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-none text-navy">
            <CountUp :value="parseInt(s.count)" suffix="K" />
          </p>
          <p class="mt-2 font-semibold text-navy">on {{ s.name }}</p>
          <p class="text-sm text-muted-foreground">{{ s.handle }}</p>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { socials } from '~/data/site'
const root = ref(null)
</script>
