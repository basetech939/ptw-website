<template>
  <!-- Paint running down from the section above (colour = currentColor).
       A "gooey" filter (blur + alpha threshold) melts the band, trails and beads into one liquid shape,
       so beads swell out of a flat edge, run down on a thinning neck, and droplets break off on their own. -->
  <svg
    ref="el"
    viewBox="0 0 1440 170"
    preserveAspectRatio="xMidYMin slice"
    class="pointer-events-none -mt-px block h-[max(80px,11.8vw)] w-full"
    aria-hidden="true"
    fill="currentColor"
  >
    <defs>
      <filter :id="gooId" x="-5%" y="-50%" width="110%" height="200%" color-interpolation-filters="sRGB">
        <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 36 -16" />
      </filter>
    </defs>
    <g :filter="`url(#${gooId})`">
      <rect x="-60" y="-80" width="1560" height="98" />
      <g v-for="(d, i) in drips" :key="i" class="drip">
        <rect class="trail" :x="d.x - d.w * 0.31" y="0" :width="d.w * 0.62" height="18" :rx="d.w * 0.31" />
        <circle class="bead" :cx="d.x" cy="10" :r="d.w / 2" />
      </g>
      <circle v-for="(d, i) in drops" :key="`o${i}`" class="drop" :cx="d.x" cy="10" :r="d.r" />
    </g>
  </svg>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'

const BAND = 18 // bottom edge of the flat band
const gooId = `goo-${useId()}`

// x, run length, bead width, fixed so server and client match
const drips = [
  { x: 40, len: 34, w: 22 }, { x: 128, len: 92, w: 18 }, { x: 214, len: 22, w: 26 }, { x: 300, len: 112, w: 16 },
  { x: 386, len: 52, w: 22 }, { x: 470, len: 72, w: 19 }, { x: 556, len: 28, w: 28 }, { x: 642, len: 100, w: 18 },
  { x: 726, len: 44, w: 23 }, { x: 812, len: 118, w: 16 }, { x: 896, len: 32, w: 26 }, { x: 982, len: 84, w: 19 },
  { x: 1068, len: 50, w: 23 }, { x: 1152, len: 104, w: 18 }, { x: 1238, len: 26, w: 26 }, { x: 1322, len: 76, w: 19 },
  { x: 1404, len: 40, w: 23 },
]
const drops = drips.filter((d) => d.len >= 90).map((d) => ({ x: d.x, r: d.w * 0.3, from: BAND + d.len, to: BAND + d.len + 34 }))

const el = ref<SVGSVGElement | null>(null)
let tl: gsap.core.Timeline | null = null

onMounted(() => {
  const svg = el.value!
  const groups = Array.from(svg.querySelectorAll<SVGGElement>('.drip'))
  const dropEls = Array.from(svg.querySelectorAll<SVGCircleElement>('.drop'))
  // p: 0 = bead hidden inside the band (edge is flat), 1 = fully run
  const state = drips.map(() => ({ p: 0 }))
  const draw = (i: number) => {
    const d = drips[i]!, g = groups[i]!, p = state[i]!.p
    const r = d.w / 2
    const swell = Math.min(1, p * 3.2) // bead first swells at the edge…
    const run = Math.max(0, (p - 0.22) / 0.78) // …then runs down
    const cy = BAND - r + swell * (r * 1.05) + run * d.len
    const bead = g.children[1] as SVGCircleElement
    const trail = g.children[0] as SVGRectElement
    bead.setAttribute('cy', cy.toFixed(2))
    bead.setAttribute('r', (r * (0.75 + 0.25 * swell)).toFixed(2))
    trail.setAttribute('height', Math.max(BAND, cy).toFixed(2))
  }
  state.forEach((_, i) => draw(i))
  dropEls.forEach((c) => c.setAttribute('cy', String(BAND - 20)))

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    state.forEach((s, i) => { s.p = 1; draw(i) })
    return
  }

  tl = gsap.timeline({ scrollTrigger: { trigger: svg, start: 'clamp(top 95%)', end: 'clamp(top 30%)', scrub: 1.2 } })
  const rand = gsap.utils.random(0, 0.8, 0.05, true)
  drips.forEach((d, i) => {
    tl!.to(state[i]!, { p: 1, duration: 0.7 + d.len / 200, ease: 'power1.inOut', onUpdate: () => draw(i) }, rand())
  })
  // droplets ride down inside their drip, then keep falling and pinch off (the goo filter splits them)
  drops.forEach((d, k) => {
    const c = dropEls[k]!
    tl!.fromTo(c, { attr: { cy: d.from - 4 } }, { attr: { cy: d.to }, duration: 0.5, ease: 'power2.in' }, '>-0.25')
  })
})
onBeforeUnmount(() => { tl?.scrollTrigger?.kill(); tl?.kill() })
</script>
