<template>
  <section ref="root" data-section="Donate" class="relative overflow-hidden bg-brush py-28 text-white sm:py-36">
    <svg class="splat pointer-events-none absolute -left-24 -top-24 size-[420px] text-leaf/25" viewBox="0 0 200 200" aria-hidden="true"><path fill="currentColor" d="M100 20c14 0 18 18 30 22s28-8 36 4-6 26-2 38 22 18 18 32-22 12-30 22-4 30-18 34-22-12-34-12-26 16-38 8 2-28-6-38-30-10-30-24 22-18 24-30-14-26-4-36 26 2 36-4 4-16 18-16z" /></svg>
    <svg class="splat pointer-events-none absolute -bottom-32 -right-20 size-[480px] text-navy/25" viewBox="0 0 200 200" aria-hidden="true"><path fill="currentColor" d="M100 20c14 0 18 18 30 22s28-8 36 4-6 26-2 38 22 18 18 32-22 12-30 22-4 30-18 34-22-12-34-12-26 16-38 8 2-28-6-38-30-10-30-24 22-18 24-30-14-26-4-36 26 2 36-4 4-16 18-16z" /></svg>
    <div class="container-x relative text-center">
      <h2 v-reveal class="mx-auto max-w-4xl text-[clamp(2.2rem,5.4vw,4.4rem)] leading-[1.02]">{{ donation.closing.title }}</h2>
      <p v-reveal class="mx-auto mt-6 max-w-2xl text-lg text-white/85">{{ donation.closing.text }}</p>
      <div v-reveal="'stagger'" class="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
        <a
          v-for="a in donation.amounts"
          :key="a.amount"
          :href="links.donate"
          target="_blank"
          rel="noopener"
          class="group rounded-2xl bg-white/10 p-4 text-left ring-1 ring-white/20 transition hover:-translate-y-1 hover:bg-leaf hover:text-navy"
        >
          <span class="font-display text-3xl">${{ a.amount }}</span>
          <span class="mt-1 block text-sm leading-snug opacity-80">{{ a.text }}</span>
        </a>
      </div>
      <div v-reveal class="mt-10 flex flex-wrap justify-center gap-3">
        <a :href="links.donate" target="_blank" rel="noopener" class="btn-paint"><Heart class="size-4" /> Donate now</a>
        <NuxtLink to="/sponsorships" class="btn-ghost text-white">Sponsor a project</NuxtLink>
      </div>
      <p class="mt-6 text-sm text-white/70">{{ donation.taxNote }} Secure donations are processed by Zeffy.</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Heart } from 'lucide-vue-next'
import { donation, links } from '~/data/site'

const root = useScrollFx(({ gsap, reduced }) => {
  if (reduced) return
  gsap.utils.selector(root.value)('.splat').forEach((el: Element, i: number) =>
    gsap.fromTo(el, { rotate: i ? 30 : -30, scale: 0.6 }, { rotate: 0, scale: 1, ease: 'none', scrollTrigger: { trigger: root.value, scrub: true } }))
})
</script>
