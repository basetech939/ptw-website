<template>
  <!-- Before/after compare: drag anywhere, or use the (invisible) range input with the keyboard -->
  <div ref="frame" class="relative cursor-ew-resize touch-pan-y select-none overflow-hidden" @pointerdown="start">
    <img :src="$a(after)" :alt="`${caption}, after`" class="absolute inset-0 size-full" :class="fit === 'contain' ? 'object-contain' : 'object-cover'" draggable="false">
    <img
      :src="$a(before)"
      :alt="`${caption}, before`"
      class="absolute inset-0 size-full grayscale-[35%]"
      :class="fit === 'contain' ? 'object-contain' : 'object-cover'"
      :style="{ clipPath: `inset(0 ${100 - pos}% 0 0)` }"
      draggable="false"
    >
    <span class="absolute left-4 top-4 rounded-full bg-navy/80 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">Before</span>
    <span class="absolute right-4 top-4 rounded-full bg-leaf px-3 py-1 text-xs font-bold uppercase tracking-widest text-navy">After</span>
    <div class="pointer-events-none absolute inset-y-0 w-1 -translate-x-1/2 bg-white shadow-[0_0_20px_rgba(0,0,0,0.35)]" :style="{ left: `${pos}%` }">
      <span class="absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-navy shadow-lg" :class="large ? 'size-16' : 'size-12'">
        <img :src="$a('/brand/ptw-brush.svg')" alt="" class="-rotate-90" :class="large ? 'h-9' : 'h-7'">
      </span>
    </div>
    <input
      v-model.number="pos"
      type="range"
      min="0"
      max="100"
      step="0.5"
      class="absolute inset-0 size-full cursor-ew-resize opacity-0"
      :aria-label="`Compare before and after: ${caption}`"
    >
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ before: string; after: string; caption: string; fit?: 'cover' | 'contain'; large?: boolean }>(), { fit: 'cover' })
const pos = defineModel<number>({ default: 50 })
const frame = ref<HTMLElement | null>(null)

function start(e: PointerEvent) {
  const el = frame.value!
  const move = (ev: PointerEvent) => {
    const r = el.getBoundingClientRect()
    pos.value = Math.min(100, Math.max(0, ((ev.clientX - r.left) / r.width) * 100))
  }
  move(e)
  window.addEventListener('pointermove', move)
  window.addEventListener('pointerup', () => window.removeEventListener('pointermove', move), { once: true })
}
</script>
