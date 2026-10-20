<template>
  <section ref="root" data-section="Mission" class="relative bg-navy pb-28 text-white sm:pb-40">
    <PaintDrips class="text-mist" />
    <div class="container-x pt-10 sm:pt-16">
      <p class="eyebrow !text-leaf">{{ mission.title }}</p>
      <p class="statement mt-6 font-display text-[clamp(1.8rem,4.4vw,3.6rem)] leading-[1.15]">
        <span v-for="(w, i) in words" :key="i" class="word inline-block opacity-20" :class="{ 'text-leaf': hl.includes(w.replace(/[,.]/g, '')) }">{{ w }}&nbsp;</span>
      </p>
      <div v-reveal="'stagger'" class="mt-16 grid gap-6 md:grid-cols-2">
        <p v-for="(p, i) in mission.paragraphs" :key="i" class="rounded-3xl bg-white/5 p-7 text-lg leading-relaxed text-white/80 ring-1 ring-white/10">{{ p }}</p>
      </div>
      <ul v-reveal="'stagger'" class="mt-10 flex flex-wrap gap-3" aria-label="Who we serve">
        <li v-for="g in groups" :key="g" class="rounded-full border border-leaf/40 px-5 py-2.5 font-semibold text-leaf">{{ g }}</li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { mission } from '~/data/site'

const words = mission.statement.split(' ')
const hl = ['homes', 'dignity', 'hope']
const groups = ['Low-income families', 'Seniors', 'Veterans', 'Single parents', 'Individuals with disabilities', 'Families facing hardship']

const root = useScrollFx(({ gsap, reduced }) => {
  const q = gsap.utils.selector(root.value)
  if (reduced) { gsap.set(q('.word'), { opacity: 1 }); return }
  gsap.to(q('.word'), {
    opacity: 1, stagger: 0.1, ease: 'none',
    scrollTrigger: { trigger: q('.statement')[0], start: 'top 80%', end: 'bottom 45%', scrub: true },
  })
})
</script>
