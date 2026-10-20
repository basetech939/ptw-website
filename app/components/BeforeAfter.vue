<template>
  <figure class="group relative">
    <div class="relative overflow-hidden rounded-[1.75rem] bg-cloud shadow-[0_30px_60px_-35px_rgba(2,32,47,0.6)]">
      <CompareSlider :before="before" :after="after" :caption="caption" class="aspect-[4/5]" />
      <button
        class="absolute bottom-4 right-4 z-10 grid size-11 place-items-center rounded-full bg-white/90 text-navy shadow-lg backdrop-blur transition duration-300 hover:scale-110 hover:bg-leaf sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100"
        :aria-label="`View ${caption} full screen`"
        @click="$emit('expand', $event)"
      >
        <Maximize2 class="size-5" />
      </button>
    </div>
    <figcaption class="mt-3 flex items-center justify-between text-xs font-bold uppercase tracking-[0.25em] text-navy/60">
      {{ caption }}
      <button class="normal-case tracking-normal text-brush underline-offset-4 hover:underline" @click="$emit('expand', $event)">Full screen</button>
    </figcaption>
  </figure>
</template>

<script setup lang="ts">
import { Maximize2 } from 'lucide-vue-next'
defineProps<{ before: string; after: string; caption: string }>()
defineEmits<{ expand: [MouseEvent] }>()
</script>
