<template>
  <div v-reveal="'stagger'" class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
    <div
      v-for="(s, i) in assistance.services"
      :key="s.title"
      class="group relative overflow-hidden rounded-3xl p-7 shadow-[0_20px_50px_-35px_rgba(2,32,47,0.5)] transition hover:-translate-y-1.5"
      :class="i === 0 ? 'sm:col-span-2 lg:col-span-1 lg:row-span-2 bg-navy text-white flex flex-col justify-end' : 'bg-white'"
    >
      <span class="absolute inset-x-0 top-0 h-0 bg-leaf/30 transition-all duration-500 group-hover:h-full" />
      <component :is="icons[s.icon]" class="relative size-10" :class="i === 0 ? 'text-leaf' : 'text-brush'" />
      <p v-if="s.note" class="relative mt-6 text-xs font-bold uppercase tracking-[0.25em] text-leaf">{{ s.note }}</p>
      <h3 class="relative mt-3 text-2xl leading-tight" :class="i === 0 ? 'text-white lg:text-4xl' : 'text-navy'">{{ s.title }}</h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PaintRoller, Hammer, ShieldCheck, Accessibility, House } from 'lucide-vue-next'
import { assistance } from '~/data/site'
const icons: Record<string, unknown> = { 'paint-roller': PaintRoller, hammer: Hammer, 'shield-check': ShieldCheck, accessibility: Accessibility, house: House }
</script>
