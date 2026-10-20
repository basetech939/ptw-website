<template>
  <div>
    <PageHero eyebrow="Get assistance" :intro="assistance.disclaimer">
      <template #title>Who Qualifies For <span class="paint-word">Assistance</span></template>
      <a href="#contact" class="btn-navy">Apply for assistance <ArrowRight class="size-4" /></a>
    </PageHero>

    <section class="bg-cream py-24">
      <div class="container-x grid gap-12 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <h2 v-reveal class="text-[clamp(1.8rem,4vw,3rem)] leading-tight text-navy">Our current guidelines prioritize the following:</h2>
          <p v-reveal class="mt-4 text-navy/70">Projects are approved based on need, project scope, safety, and available funding.</p>
        </div>
        <ul v-reveal="'stagger'" class="grid gap-3 sm:grid-cols-2">
          <li v-for="(p, i) in assistance.priorities" :key="p" class="flex items-center gap-4 rounded-2xl bg-white p-5 font-semibold text-navy shadow-[0_20px_40px_-35px_rgba(2,32,47,0.6)]" :class="i === assistance.priorities.length - 1 ? 'sm:col-span-2 bg-leaf/40' : ''">
            <span class="grid size-10 shrink-0 place-items-center rounded-full bg-navy font-display text-sm text-leaf">{{ i + 1 }}</span>
            {{ p }}
          </li>
        </ul>
      </div>
    </section>

    <section class="bg-mist py-24">
      <div class="container-x">
        <p v-reveal class="eyebrow">What we can help with</p>
        <h2 v-reveal class="mt-4 max-w-3xl text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.02] text-navy">From a fresh coat of paint to a <span class="paint-word">safer home</span></h2>
        <div class="mt-12"><ServicesGrid /></div>
      </div>
    </section>

    <section class="bg-navy py-24 text-white">
      <div class="container-x grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p v-reveal class="eyebrow !text-leaf">How to apply</p>
          <h2 v-reveal class="mt-4 text-[clamp(2rem,4.6vw,3.4rem)] leading-tight">Tell us about the home</h2>
          <p v-reveal class="mt-6 text-lg leading-relaxed text-white/80">{{ assistance.howTo }}</p>
          <a v-reveal href="#contact" class="btn-paint mt-8">Apply for assistance</a>
        </div>
        <ol v-reveal="'stagger'" class="space-y-4">
          <li v-for="(s, i) in steps" :key="s.t" class="flex gap-5 rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
            <span class="font-display text-4xl text-leaf">0{{ i + 1 }}</span>
            <div>
              <p class="font-display text-xl">{{ s.t }}</p>
              <p class="mt-1 text-white/70">{{ s.d }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>
    <ContactSection heading="Apply for assistance" subject="Apply For Assistance" />
  </div>
</template>

<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import { assistance } from '~/data/site'
useHead({ title: 'Get Assistance' })
const steps = [
  { t: 'The homeowner', d: 'Who lives there and what their situation is.' },
  { t: 'The property', d: 'Where the home is (we currently serve Midland, Texas).' },
  { t: 'The work needed', d: 'What needs painting or repair. Include clear photos of those areas.' },
]
</script>
