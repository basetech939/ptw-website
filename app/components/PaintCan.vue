<template>
  <!-- A paint can that fills to `fill` (0–1) when it scrolls into view; reacts to hover on a parent `.group` -->
  <svg ref="el" viewBox="0 0 120 150" class="paint-can h-auto w-24 overflow-visible" aria-hidden="true">
    <defs>
      <clipPath :id="`can-${uid}`"><rect x="14" y="30" width="92" height="100" rx="8" /></clipPath>
    </defs>
    <g class="pc-can">
      <path class="pc-handle" d="M30 30 Q60 -8 90 30" fill="none" :stroke="ink" stroke-width="5" stroke-linecap="round" />
      <rect x="14" y="30" width="92" height="100" rx="8" :fill="dark ? '#0B3346' : '#EEF4F8'" :stroke="ink" stroke-width="5" />
      <g :clip-path="`url(#can-${uid})`">
        <g class="paint">
          <rect class="level" x="0" :y="130 - 100 * fill" width="120" :height="100 * fill + 30" :fill="color" />
          <path class="wave" :d="`M-30 ${130 - 100 * fill} q15 -8 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 v20 h-180z`" :fill="color" />
        </g>
      </g>
      <!-- drip that runs over the rim on hover -->
      <path class="pc-drip" :d="`M96 30 v26 a6 6 0 0 1 -12 0 v-26 z`" :fill="color" />
      <rect class="pc-lid" x="10" y="24" width="100" height="12" rx="4" :fill="ink" />
      <rect x="34" y="62" width="52" height="30" rx="4" :fill="dark ? '#02202F' : '#fff'" opacity="0.92" />
      <path d="M44 77h32" :stroke="dark ? '#9DE9A1' : '#02202F'" stroke-width="4" stroke-linecap="round" />
    </g>
  </svg>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
const props = defineProps<{ fill: number; color: string; dark?: boolean }>()
const ink = computed(() => (props.dark ? '#FFFFFF' : '#02202F'))
const uid = useId()
const el = ref<SVGSVGElement | null>(null)
let tw: gsap.core.Timeline | null = null
let wave: gsap.core.Tween | null = null
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  tw = gsap.timeline({ scrollTrigger: { trigger: el.value, start: 'top 85%', once: true } })
    .from(el.value!.querySelector('.paint'), { y: 100 * props.fill + 10, duration: 1.4, ease: 'power2.out' })
  wave = gsap.to(el.value!.querySelector('.wave'), { x: 30, duration: 1.6, repeat: -1, ease: 'none' })
})
onBeforeUnmount(() => { tw?.scrollTrigger?.kill(); tw?.kill(); wave?.kill() })
</script>

<style>
/* Hover reactions are driven by the parent card (.group), so these rules are global with pc- prefixes */
.pc-can, .pc-drip, .pc-lid, .pc-handle { transform-box: fill-box; transition: transform .55s cubic-bezier(.34, 1.56, .64, 1); }
.pc-can { transform-origin: 50% 100%; }
.pc-lid { transform-origin: 0% 50%; }
.pc-handle { transform-origin: 50% 100%; }
.pc-drip { transform-origin: 50% 0%; transform: scaleY(0); transition-duration: .7s; transition-timing-function: cubic-bezier(.22, 1, .36, 1); }
.group:hover .pc-can { transform: rotate(-7deg) translateY(-4px); }
.group:hover .pc-lid { transform: rotate(-14deg) translate(-2px, -10px); }
.group:hover .pc-drip { transform: scaleY(1); }
</style>
