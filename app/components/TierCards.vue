<template>
  <div v-reveal="'stagger'" class="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
    <article
      v-for="(t, i) in tiers"
      :key="t.name"
      class="group relative flex flex-col overflow-hidden rounded-[2rem] p-7 ring-2 ring-transparent transition duration-500 ease-out hover:-translate-y-3"
      :class="i === tiers.length - 1 ? 'bg-navy text-white shadow-[0_40px_80px_-40px_rgba(2,32,47,0.9)] hover:ring-leaf hover:shadow-[0_50px_90px_-35px_rgba(2,32,47,1)]' : 'bg-white text-navy shadow-[0_30px_60px_-45px_rgba(2,32,47,0.6)] hover:ring-leaf/70 hover:shadow-[0_45px_80px_-40px_rgba(2,32,47,0.7)]'"
    >
      <span class="pointer-events-none absolute -bottom-24 -right-24 size-56 rounded-full opacity-0 blur-2xl transition duration-700 group-hover:opacity-60" :style="{ background: colors[i] }" />
      <span v-if="i === tiers.length - 1" class="absolute right-6 top-4 z-10 rounded-full bg-leaf px-3 py-1 text-xs font-bold uppercase tracking-widest text-navy">Full project</span>
      <PaintCan :fill="t.fill" :color="colors[i]!" :dark="i === tiers.length - 1" class="relative" />
      <h3 class="relative mt-5 text-2xl">{{ t.name }}</h3>
      <p class="relative mt-1 self-start font-display text-4xl" :class="i === tiers.length - 1 ? 'text-leaf' : 'text-brush'">
        <span class="relative z-10">${{ t.price.toLocaleString('en-US') }}</span>
        <span class="absolute -inset-x-1 bottom-0.5 h-3 origin-left scale-x-0 rounded-full transition-transform duration-500 ease-out group-hover:scale-x-100" :class="i === tiers.length - 1 ? 'bg-brush' : 'bg-leaf/70'" />
      </p>
      <p class="relative mt-4" :class="i === tiers.length - 1 ? 'text-white/75' : 'text-navy/70'">{{ t.text }}</p>
      <ul v-if="!compact" class="relative mt-5 space-y-2.5 text-sm">
        <li v-for="perk in t.perks" :key="perk" class="flex gap-2.5">
          <Check class="mt-0.5 size-4 shrink-0" :class="i === tiers.length - 1 ? 'text-leaf' : 'text-brush'" />
          <span>{{ perk }}</span>
        </li>
      </ul>
    </article>
  </div>
</template>

<script setup lang="ts">
import { Check } from 'lucide-vue-next'
import { tiers } from '~/data/site'
defineProps<{ compact?: boolean }>()
const colors = ['#9DE9A1', '#6FCF7A', '#1E7FAA', '#9DE9A1']
</script>
