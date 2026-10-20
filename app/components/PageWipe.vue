<template>
  <!-- Between pages: three brush-stroke bands sweep across, the next page loads underneath, then they sweep away -->
  <div ref="root" class="pointer-events-none fixed inset-0 z-[95] invisible overflow-hidden" aria-hidden="true">
    <svg
      v-for="(c, i) in colors"
      :key="c"
      class="band absolute left-0 h-[38%] w-[125vw] max-w-none"
      :style="{ top: `${i * 31 - 2}%`, color: c }"
      viewBox="0 0 125 40"
      preserveAspectRatio="none"
    >
      <path fill="currentColor" d="M0 2 Q30 -1 60 1.5 T110 1 L118 2 Q125 6 120 10 Q124 15 119 20 Q125 26 120 31 Q124 36 117 39 Q80 41 40 38.5 T0 39 Z" />
    </svg>
    <div class="mark absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3 opacity-0">
      <img :src="$a('/brand/ptw-brush-white.svg')" alt="" class="h-20 w-auto drop-shadow-[0_6px_16px_rgba(0,0,0,0.35)]">
      <img :src="$a('/brand/ptw-wordmark-white.svg')" alt="" class="h-7 w-auto">
    </div>
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
const colors = ['#9DE9A1', '#15678C', '#02202F']
const root = ref<HTMLElement | null>(null)

function cover() {
  return new Promise<void>((resolve) => {
    const q = gsap.utils.selector(root.value)
    gsap.timeline({ onComplete: resolve })
      .set(root.value, { visibility: 'visible' })
      .fromTo(q('.band'), { xPercent: -105 }, { xPercent: -8, duration: 0.6, ease: 'power3.inOut', stagger: 0.08 })
      .fromTo(q('.mark'), { opacity: 0, scale: 0.8, rotate: -10 }, { opacity: 1, scale: 1, rotate: 0, duration: 0.35, ease: 'back.out(2)' }, '-=0.2')
  })
}
function reveal() {
  return new Promise<void>((resolve) => {
    const q = gsap.utils.selector(root.value)
    gsap.timeline({ onComplete: () => { gsap.set(root.value, { visibility: 'hidden' }); resolve() } })
      .to(q('.mark'), { opacity: 0, scale: 0.9, duration: 0.2 })
      .to(q('.band'), { xPercent: 100, duration: 0.65, ease: 'power3.inOut', stagger: 0.08 }, '-=0.05')
  })
}
defineExpose({ cover, reveal })
</script>
