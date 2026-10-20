<template>
  <div>
    <PageHero eyebrow="Donate" :intro="donation.intro">
      <template #title>Support Us And <span class="paint-word">Donate Today!</span></template>
    </PageHero>
    <section class="bg-cream py-20">
      <div class="container-x grid items-center gap-12 lg:grid-cols-2">
        <figure v-reveal class="overflow-hidden rounded-[2rem] shadow-2xl">
          <img :src="$a('/images/projects/work_in_progress.webp')" alt="A house being restored by the Paint The World team" class="aspect-[4/5] w-full object-cover" loading="lazy">
        </figure>
        <div>
          <h2 v-reveal class="text-[clamp(1.8rem,4vw,3rem)] leading-tight text-navy">Support Our Foundation</h2>
          <div v-reveal="'stagger'" class="mt-8 grid gap-3 sm:grid-cols-2">
            <a v-for="a in donation.amounts" :key="a.amount" :href="links.donate" target="_blank" rel="noopener" class="group rounded-3xl bg-white p-6 shadow-[0_20px_40px_-35px_rgba(2,32,47,0.6)] transition hover:-translate-y-1 hover:bg-leaf">
              <span class="font-display text-4xl text-brush group-hover:text-navy">${{ a.amount }}</span>
              <span class="mt-2 block text-navy/75">{{ a.text }}</span>
            </a>
          </div>
          <a v-reveal :href="links.donate" target="_blank" rel="noopener" class="btn-navy mt-8"><Heart class="size-4" /> Donate now</a>
          <p class="mt-4 text-sm text-navy/60">{{ donation.taxNote }} You'll complete your gift securely on Zeffy, our donation platform.</p>
        </div>
      </div>
    </section>
    <DonateBand />
  </div>
</template>

<script setup lang="ts">
import { Heart } from 'lucide-vue-next'
import { donation, links } from '~/data/site'
definePageMeta({ footerDrip: '#15678C' })
useHead({ title: 'Donate' })
</script>
