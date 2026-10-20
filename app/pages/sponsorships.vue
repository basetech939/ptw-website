<template>
  <div>
    <PageHero eyebrow="Sponsorships" intro="Ready to make a world of difference? Contact our foundation team to discuss a partnership tailored to your goals, or visit our Donate page to get started right away!">
      <template #title>Sponsorship <span class="paint-word">Tiers</span></template>
      <div class="flex flex-wrap gap-3">
        <NuxtLink to="/contact?subject=Partnership%20Proposals" class="btn-navy">Contact us</NuxtLink>
        <a :href="links.donate" target="_blank" rel="noopener" class="btn-paint">Donate</a>
      </div>
    </PageHero>
    <section class="bg-cream py-24">
      <div class="container-x">
        <TierCards />
        <div v-reveal class="mt-12 flex flex-col items-start justify-between gap-6 rounded-[2rem] bg-white p-8 sm:flex-row sm:items-center">
          <div>
            <p class="font-display text-2xl text-navy">Customizable</p>
            <p class="mt-1 text-navy/70">Want something different? We'll build a partnership around your goals. {{ donation.taxNote }}</p>
          </div>
          <a :href="`mailto:${links.partnershipsEmail}`" class="btn-navy shrink-0">{{ links.partnershipsEmail }}</a>
        </div>
      </div>
    </section>
    <PartnersStrip title="Joining partners like" />
  </div>
</template>

<script setup lang="ts">
import { links, donation } from '~/data/site'
useHead({ title: 'Sponsorships' })
</script>
