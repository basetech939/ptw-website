<template>
  <!-- Wide screens only: brand label + socials on the left, paint progress with section markers on the right -->
  <div class="pointer-events-none fixed inset-y-0 left-0 right-0 z-40 hidden transition-opacity duration-700 2xl:block" :class="ready && !heroPinned ? 'opacity-100' : 'opacity-0'">
    <div class="pointer-events-auto absolute left-5 top-1/2 flex -translate-y-1/2 flex-col items-center gap-4 rounded-full bg-cream/85 px-1.5 py-4 shadow-[0_10px_30px_-15px_rgba(2,32,47,0.45)] backdrop-blur">
      <a
        v-for="s in socials"
        :key="s.key"
        :href="s.href"
        target="_blank"
        rel="noopener"
        :aria-label="s.name"
        class="grid size-9 place-items-center rounded-full text-navy/60 transition hover:scale-110 hover:bg-leaf hover:text-navy"
      >
        <SocialIcon :name="s.key" class="size-4" />
      </a>
      <span class="h-10 w-px bg-navy/20" />
      <p class="rotate-180 text-[11px] font-bold uppercase tracking-[0.35em] text-navy/50 [writing-mode:vertical-rl]">Painting a better place · Midland, Texas</p>
    </div>

    <nav class="pointer-events-auto absolute right-5 top-1/2 flex w-16 -translate-y-1/2 flex-col items-center rounded-full bg-cream/90 pb-5 pt-4 shadow-[0_14px_40px_-18px_rgba(2,32,47,0.55)] ring-1 ring-navy/5 backdrop-blur" aria-label="Page sections">
      <span ref="pctEl" class="w-12 text-center font-display text-[13px] tabular-nums text-navy">0%</span>
      <div class="relative mt-4 h-[40vh] w-1.5 rounded-full bg-navy/10">
        <div ref="fillEl" class="absolute inset-0 origin-top scale-y-0 rounded-full bg-gradient-to-b from-leaf to-leaf-2" />
        <button
          v-for="m in markers"
          :key="m.id"
          class="group absolute left-1/2 grid size-6 -translate-x-1/2 -translate-y-1/2 place-items-center"
          :style="{ top: `${m.at * 100}%` }"
          :aria-label="`Go to ${m.label}`"
          @click="goTo(m.id)"
        >
          <span class="size-2 rounded-full transition duration-300 group-hover:scale-150" :class="m.passed ? 'bg-navy' : 'bg-navy/25'" />
          <span class="pointer-events-none absolute right-8 whitespace-nowrap rounded-full bg-navy px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-lg transition duration-200 group-hover:-translate-x-1 group-hover:opacity-100">{{ m.label }}</span>
        </button>
        <!-- the brush sits in a white chip so it stays visible on any colour -->
        <div ref="brushEl" class="pointer-events-none absolute left-1/2 top-0 grid size-10 place-items-center rounded-full bg-white shadow-[0_6px_18px_-6px_rgba(2,32,47,0.6)] ring-2 ring-leaf">
          <img :src="$a('/brand/ptw-brush.svg')" alt="" class="h-7 w-auto rotate-180">
        </div>
      </div>
      <span class="mt-5 flex h-32 items-start overflow-hidden">
        <span ref="labelEl" class="block rotate-180 text-[10px] font-bold uppercase tracking-[0.22em] text-navy/60 [writing-mode:vertical-rl]">{{ current }}</span>
      </span>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { socials } from '~/data/site'

const heroPinned = useState('hero-pinned', () => false)
const pctEl = ref<HTMLElement | null>(null)
const fillEl = ref<HTMLElement | null>(null)
const brushEl = ref<HTMLElement | null>(null)
const labelEl = ref<HTMLElement | null>(null)
const current = ref('')
const ready = ref(false)
const markers = ref<{ id: string; label: string; at: number; passed: boolean }[]>([])
const nuxtApp = useNuxtApp()

let st: ScrollTrigger | null = null
let progress = 0

// Section markers come from any element with data-section="Label" on the current page
function measure() {
  const max = ScrollTrigger.maxScroll(window) || 1
  markers.value = Array.from(document.querySelectorAll<HTMLElement>('[data-section]')).map((el) => {
    const top = el.getBoundingClientRect().top + window.scrollY
    if (!el.id) el.id = `s-${el.dataset.section!.toLowerCase().replace(/\W+/g, '-')}`
    const at = Math.min(1, Math.max(0, top / max))
    return { id: el.id, label: el.dataset.section!, at, passed: progress >= at - 0.002 }
  })
}

function goTo(id: string) {
  const target = document.getElementById(id)
  if (!target) return
  const lenis = nuxtApp.$lenis as { scrollTo?: (t: HTMLElement, o?: object) => void } | null
  if (lenis?.scrollTo) lenis.scrollTo(target, { offset: -10, duration: 1.4 })
  else target.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  const setFill = gsap.quickSetter(fillEl.value!, 'scaleY')
  const setTip = gsap.quickTo(brushEl.value!, 'top', { duration: 0.25, ease: 'power3' })
  const tilt = gsap.quickTo(brushEl.value!, 'rotation', { duration: 0.5, ease: 'power3' })
  gsap.set(brushEl.value, { xPercent: -50, yPercent: -50 })
  let lastPct = -1
  st = ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => {
      progress = self.progress
      setFill(progress)
      setTip(progress * (brushEl.value!.parentElement!.clientHeight))
      tilt(gsap.utils.clamp(-25, 25, self.getVelocity() / 120))
      const pct = Math.round(progress * 100)
      if (pct !== lastPct && pctEl.value) { pctEl.value.textContent = `${pct}%`; lastPct = pct }
      let now = ''
      for (const m of markers.value) {
        const passed = progress >= m.at - 0.002
        if (m.passed !== passed) m.passed = passed
        if (passed) now = m.label
      }
      if (now !== current.value) {
        current.value = now
        if (labelEl.value) gsap.fromTo(labelEl.value, { yPercent: -30, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.4, ease: 'power3.out' })
      }
    },
  })
  ScrollTrigger.addEventListener('refresh', measure)
  nuxtApp.hook('page:finish', () => setTimeout(measure, 400))
  measure()
  // only show once pins/markers are measured, so nothing flashes on first load
  setTimeout(() => { measure(); ready.value = true }, 500)
})
onBeforeUnmount(() => { st?.kill(); ScrollTrigger.removeEventListener('refresh', measure) })
</script>
