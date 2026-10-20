<template>
  <div>
    <PageHero eyebrow="Partners" intro="The businesses standing behind every restoration. Thank you for helping us paint a better place.">
      <template #title>Our Foundation <span class="paint-word">Partners</span></template>
    </PageHero>
    <PartnersStrip title="With gratitude to" />
    <section class="bg-mist py-24">
      <div class="container-x text-center">
        <h2 v-reveal class="mx-auto max-w-3xl text-[clamp(2rem,4.6vw,3.4rem)] leading-tight text-navy">Want your logo on the next transformation?</h2>
        <div v-reveal class="mt-8 flex flex-wrap justify-center gap-3">
          <NuxtLink to="/sponsorships" class="btn-navy">See sponsorship tiers</NuxtLink>
          <NuxtLink to="/contact?subject=Partnership%20Proposals" class="btn-ghost text-navy">Propose a partnership</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ footerDrip: '#EEF4F8' })
useHead({ title: 'Partners' })
</script>
