<template>
  <!-- Decorative paint marks for section edges; drifts slightly on scroll -->
  <svg ref="el" :viewBox="shapes[kind]!.vb" class="pointer-events-none absolute -z-0 select-none" :style="{ color }" aria-hidden="true">
    <path :d="shapes[kind]!.d" fill="currentColor" />
    <circle v-for="(c, i) in (shapes[kind]!.dots || [])" :key="i" :cx="c[0]" :cy="c[1]" :r="c[2]" fill="currentColor" />
  </svg>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
const props = withDefaults(defineProps<{ kind?: 'stroke' | 'splat' | 'swoosh'; color?: string; drift?: number }>(), { kind: 'stroke', color: 'rgba(157,233,161,0.35)', drift: 60 })
const shapes: Record<string, { vb: string; d: string; dots?: number[][] }> = {
  stroke: {
    vb: '0 0 400 120',
    d: 'M18 64c22-30 60-40 104-36 40 4 70 18 112 14 36-4 64-18 104-16 30 2 52 14 52 30 0 20-26 32-58 34-44 3-70-12-110-10-42 2-70 22-118 22-46 0-102-8-86-38Z',
  },
  splat: {
    vb: '0 0 200 200',
    d: 'M100 24c12 0 16 20 28 22s26-10 34 2-6 24-2 36 22 16 18 30-22 10-30 20-6 30-20 32-20-14-30-14-24 18-36 10 2-26-6-36-28-8-28-22 20-18 22-30-12-24-2-34 24 4 34-4 6-12 18-12Z',
    dots: [[20, 40, 7], [176, 30, 5], [186, 170, 8], [30, 176, 5], [150, 190, 4]],
  },
  swoosh: {
    vb: '0 0 120 400',
    d: 'M70 10c26 30 40 80 30 130-8 40-34 66-36 108-2 40 26 70 22 110-4 30-30 44-46 30-20-18-10-60-6-100 4-46-14-76-10-122 4-50 24-76 22-110-1-24 10-60 24-46Z',
  },
}
const el = ref<SVGSVGElement | null>(null)
let tw: gsap.core.Tween | null = null
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  tw = gsap.fromTo(el.value, { y: props.drift, rotate: -4 }, { y: -props.drift, rotate: 4, ease: 'none', scrollTrigger: { trigger: el.value!.parentElement, scrub: true } })
})
onBeforeUnmount(() => { tw?.scrollTrigger?.kill(); tw?.kill() })
</script>
