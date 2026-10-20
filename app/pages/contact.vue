<template>
  <div>
    <PageHero eyebrow="Contact us" :intro="contact.intro">
      <template #title>We'd Love to <span class="paint-word">Hear From You</span></template>
    </PageHero>

    <ContactSection />
  </div>
</template>

<script setup lang="ts">
import { contact } from '~/data/site'
useHead({ title: 'Contact Us' })
</script>
