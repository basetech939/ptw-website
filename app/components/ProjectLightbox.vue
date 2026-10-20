<template>
  <Teleport to="body">
    <div
      v-if="open"
      ref="overlay"
      class="fixed inset-0 z-[100] flex flex-col bg-navy/95 text-white backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      :aria-label="`Before and after: ${current.caption}`"
      @touchstart.passive="touchStart"
      @touchend.passive="touchEnd"
    >
      <!-- top bar -->
      <div class="flex items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <div class="flex items-center gap-3">
          <img :src="$a('/brand/ptw-brush-light.svg')" alt="" class="h-8">
          <div>
            <p class="font-display text-lg leading-tight">{{ current.caption }}</p>
            <p class="text-xs uppercase tracking-[0.25em] text-white/60">Before &amp; after · {{ index + 1 }} / {{ items.length }}</p>
          </div>
        </div>
        <button ref="closeBtn" class="grid size-12 place-items-center rounded-full bg-white/10 transition hover:rotate-90 hover:bg-leaf hover:text-navy" aria-label="Close" @click="close">
          <X class="size-6" />
        </button>
      </div>

      <!-- stage -->
      <div ref="area" class="relative flex min-h-0 flex-1 items-center justify-center px-3 sm:px-24">
        <button class="nav-btn left-3 sm:left-6" aria-label="Previous project" @click="go(-1)"><ChevronLeft class="size-7" /></button>
        <div ref="stage" class="relative overflow-hidden rounded-2xl shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)]" :style="{ width: `${box.w}px`, height: `${box.h}px` }">
          <CompareSlider
            :key="index"
            v-model="pos"
            :before="current.before"
            :after="current.after"
            :caption="current.caption"
            large
            class="size-full"
          />
        </div>
        <button class="nav-btn right-3 sm:right-6" aria-label="Next project" @click="go(1)"><ChevronRight class="size-7" /></button>
      </div>

      <!-- thumbnails -->
      <div class="flex items-center justify-center gap-3 px-5 py-5">
        <button
          v-for="(p, i) in items"
          :key="i"
          class="relative h-14 w-20 overflow-hidden rounded-xl ring-2 transition sm:h-16 sm:w-24"
          :class="i === index ? 'ring-leaf scale-105' : 'ring-transparent opacity-50 hover:opacity-100'"
          :aria-label="`Show ${p.caption} (${i + 1})`"
          :aria-current="i === index"
          @click="show(i)"
        >
          <img :src="$a(p.after)" alt="" class="size-full object-cover">
        </button>
      </div>
      <p class="pb-4 text-center text-xs text-white/50"><span class="sm:hidden">Drag the brush to compare · tap the arrows to switch</span><span class="hidden sm:inline">Drag the brush to compare · ← → to switch · Esc to close</span></p>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { X, ChevronLeft, ChevronRight } from 'lucide-vue-next'

const { $lenis, $asset } = useNuxtApp()
const props = defineProps<{ items: { before: string; after: string; caption: string }[] }>()
const open = ref(false)
const index = ref(0)
const pos = ref(100)
const current = computed(() => props.items[index.value]!)
const overlay = ref<HTMLElement | null>(null)
const stage = ref<HTMLElement | null>(null)
const closeBtn = ref<HTMLButtonElement | null>(null)
const area = ref<HTMLElement | null>(null)

// Fit the frame to the photo's own shape so the divider and labels sit on the picture
const ratio = ref(0.75)
const box = reactive({ w: 0, h: 0 })
function fit() {
  if (!area.value) return
  const cs = getComputedStyle(area.value)
  const cw = area.value.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight)
  const ch = area.value.clientHeight
  const w = Math.min(cw, ch * ratio.value)
  box.w = Math.round(w); box.h = Math.round(w / ratio.value)
}
watch(() => current.value.after, (src) => {
  if (import.meta.server) return
  const img = new Image()
  img.onload = () => { ratio.value = img.naturalWidth / img.naturalHeight; fit() }
  img.src = $asset(src)
}, { immediate: true })
useResizeObserver(area, fit)
let lastFocus: HTMLElement | null = null
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// After a project appears: sweep the divider from "before" to the middle so the change is obvious
function wipe() {
  if (reduced()) { pos.value = 50; return }
  pos.value = 100
  gsap.to(pos, { value: 50, duration: 1.4, ease: 'power3.inOut', delay: 0.25 })
}

async function openAt(i: number, origin?: DOMRect) {
  lastFocus = document.activeElement as HTMLElement
  index.value = i
  open.value = true
  ;($lenis as { stop?: () => void } | null)?.stop?.()
  document.documentElement.style.overflow = 'hidden'
  await nextTick()
  fit()
  closeBtn.value?.focus()
  if (!reduced()) {
    gsap.fromTo(overlay.value, { opacity: 0 }, { opacity: 1, duration: 0.35 })
    if (origin && stage.value) {
      const s = stage.value.getBoundingClientRect()
      gsap.from(stage.value, {
        x: origin.left + origin.width / 2 - (s.left + s.width / 2),
        y: origin.top + origin.height / 2 - (s.top + s.height / 2),
        scale: Math.min(origin.width / s.width, origin.height / s.height),
        duration: 0.7, ease: 'expo.out',
      })
    }
  }
  wipe()
}

function close() {
  const done = () => {
    open.value = false
    ;($lenis as { start?: () => void } | null)?.start?.()
    document.documentElement.style.overflow = ''
    lastFocus?.focus()
  }
  if (reduced()) return done()
  gsap.to(overlay.value, { opacity: 0, duration: 0.25, onComplete: done })
}

function show(i: number) {
  if (i === index.value) return
  const dir = i > index.value ? 1 : -1
  index.value = (i + props.items.length) % props.items.length
  if (!reduced()) nextTick(() => gsap.from(stage.value, { xPercent: 12 * dir, opacity: 0, duration: 0.5, ease: 'power3.out' }))
  wipe()
}
const go = (d: number) => show((index.value + d + props.items.length) % props.items.length)

function onKey(e: KeyboardEvent) {
  if (!open.value) return
  if (e.key === 'Escape') close()
  else if (e.key === 'ArrowRight') go(1)
  else if (e.key === 'ArrowLeft') go(-1)
  else if (e.key === 'Tab' && overlay.value) {
    // keep focus inside the dialog
    const f = overlay.value.querySelectorAll<HTMLElement>('button, input')
    const first = f[0], last = f[f.length - 1]
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus() }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus() }
  }
}
// swipe between projects (only when the swipe starts outside the photo)
let tx = 0, tOnStage = false
const touchStart = (e: TouchEvent) => { tx = e.touches[0]!.clientX; tOnStage = !!stage.value?.contains(e.target as Node) }
const touchEnd = (e: TouchEvent) => { const dx = e.changedTouches[0]!.clientX - tx; if (!tOnStage && Math.abs(dx) > 60) go(dx < 0 ? 1 : -1) }

onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => { window.removeEventListener('keydown', onKey); if (open.value) document.documentElement.style.overflow = '' })

defineExpose({ openAt })
</script>

<style scoped>
.nav-btn {
  position: absolute; top: 50%; z-index: 10; display: grid; place-items: center;
  width: 3.25rem; height: 3.25rem; translate: 0 -50%; border-radius: 9999px;
  background: rgb(255 255 255 / 0.12); transition: background .2s, color .2s, transform .2s;
}
.nav-btn:hover { background: var(--color-leaf); color: var(--color-navy); transform: scale(1.08); }
</style>
