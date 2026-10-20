<template>
  <section data-section="Projects" class="relative overflow-hidden bg-cream py-24 sm:py-32">
    <PaintSplash kind="stroke" class="-left-32 top-24 w-[520px]" />
    <PaintSplash kind="splat" color="rgba(21,103,140,0.10)" class="-right-16 top-1/2 w-72" />
    <PaintSplash kind="swoosh" color="rgba(157,233,161,0.3)" class="-left-8 bottom-10 w-32" />
    <div class="container-x">
      <div class="grid items-end gap-6 md:grid-cols-[1.2fr_1fr]">
        <div v-reveal>
          <p class="eyebrow">Our latest projects</p>
          <h2 class="mt-4 text-[clamp(2.2rem,5vw,4rem)] leading-[1] text-navy">
            Painting Homes.<br><span class="paint-word">Restoring Hope.</span>
          </h2>
        </div>
        <p v-reveal class="text-lg text-navy/75">
          Drag the brush across each photo to see the transformation, or open it full screen. Real homes, real families, right here in our community.
        </p>
      </div>

      <div v-reveal="'stagger'" class="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <BeforeAfter v-for="(p, i) in projects" :key="i" v-bind="p" @expand="(e) => expand(i, e)" />
      </div>

      <div class="mt-24 grid gap-8 lg:grid-cols-2">
        <div v-for="v in videos" :key="v.id" v-reveal>
          <LiteYoutube :id="v.id" :title="v.title" :thumb="v.thumb" />
          <p class="mt-4 font-display text-xl text-navy">{{ v.title }}</p>
        </div>
      </div>
    </div>
    <ProjectLightbox ref="lightbox" :items="projects" />
  </section>
</template>

<script setup lang="ts">
import { projects, videos } from '~/data/site'

const lightbox = ref<{ openAt: (i: number, origin?: DOMRect) => void } | null>(null)
function expand(i: number, e: MouseEvent) {
  const card = (e.currentTarget as HTMLElement).closest('figure')
  lightbox.value?.openAt(i, card?.getBoundingClientRect())
}
</script>
