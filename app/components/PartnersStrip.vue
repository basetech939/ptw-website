<template>
  <section data-section="Partners" class="relative overflow-hidden bg-cream py-20">
    <PaintSplash kind="stroke" class="-left-32 top-6 w-[440px]" />
    <PaintSplash kind="stroke" color="rgba(21,103,140,0.10)" class="-right-32 bottom-0 w-[440px]" />
    <div class="container-x">
      <p v-reveal class="eyebrow justify-center">{{ title }}</p>
      <div v-reveal="'stagger'" class="mt-10 grid grid-cols-2 items-center gap-6 md:grid-cols-4">
        <div v-for="p in partners" :key="p.name" class="grid h-32 place-items-center rounded-3xl bg-white p-6 shadow-[0_20px_40px_-35px_rgba(2,32,47,0.6)] transition hover:-translate-y-1">
          <img :src="$a(p.logo)" :alt="p.name" class="max-h-20 w-auto object-contain" loading="lazy">
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { partners } from '~/data/site'
withDefaults(defineProps<{ title?: string }>(), { title: 'Our Foundation Partners' })
</script>
