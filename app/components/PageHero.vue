<template>
  <section :data-section="eyebrow" class="relative overflow-hidden bg-mist pb-20 pt-36 sm:pb-28 sm:pt-44">
    <svg class="stroke-bg pointer-events-none absolute -right-24 top-14 w-[760px] max-w-none overflow-visible text-leaf/60" viewBox="-40 -40 680 240" aria-hidden="true">
      <path ref="stroke" class="pre-hide" d="M20 110 C120 30 220 140 320 70 S520 40 580 90" fill="none" stroke="currentColor" stroke-width="56" stroke-linecap="round" />
    </svg>
    <div class="container-x relative">
      <p v-reveal class="eyebrow">{{ eyebrow }}</p>
      <h1 v-reveal class="mt-4 max-w-4xl text-[clamp(2.4rem,6.4vw,5.2rem)] leading-[0.98] text-navy">
        <slot name="title">{{ title }}</slot>
      </h1>
      <p v-if="intro" v-reveal class="mt-6 max-w-2xl text-lg text-navy/75">{{ intro }}</p>
      <div v-reveal class="mt-8"><slot /></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
defineProps<{ eyebrow: string; title?: string; intro?: string }>()
const stroke = ref<SVGPathElement | null>(null)
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !stroke.value) return
  const len = stroke.value.getTotalLength()
  gsap.set(stroke.value, { opacity: 1 })
  gsap.fromTo(stroke.value, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 1.6, ease: 'power3.inOut', delay: 0.2 })
})
</script>
