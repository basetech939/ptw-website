<template>
  <div>
    <PaintHouseHero />
    <CommunityBand />
    <StorySection />
    <MissionStatement />
    <ProjectsSection />
    <ImpactSection />
    <HelpTeaser />
    <section data-section="Sponsorships" class="relative overflow-hidden bg-mist py-24 sm:py-32">
      <PaintSplash kind="splat" class="-right-20 top-10 w-80" />
      <PaintSplash kind="stroke" color="rgba(21,103,140,0.10)" class="-left-36 bottom-16 w-[480px]" />
      <div class="container-x">
        <div class="grid items-end gap-6 md:grid-cols-[1.3fr_1fr]">
          <div v-reveal>
            <p class="eyebrow">Sponsorships</p>
            <h2 class="mt-4 text-[clamp(2.2rem,5vw,4rem)] leading-[1] text-navy">Ready to make a <span class="paint-word">world of difference?</span></h2>
          </div>
          <div v-reveal>
            <p class="text-lg text-navy/75">Every level puts paint on a real home. The higher the tier, the fuller the can.</p>
            <NuxtLink to="/sponsorships" class="btn-navy mt-5">Compare all perks</NuxtLink>
          </div>
        </div>
        <div class="mt-12"><TierCards compact /></div>
      </div>
    </section>
    <DonateBand />
    <PartnersStrip />
    <ContactSection heading="Let's paint a better place together" />
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Painting Homes. Restoring Hope.' })
</script>
