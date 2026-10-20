<template>
  <section ref="root" data-section="Our story" class="relative overflow-hidden bg-mist py-24 sm:py-36">
    <PaintSplash kind="swoosh" class="-right-10 top-20 w-40" />
    <PaintSplash kind="splat" color="rgba(21,103,140,0.10)" class="-left-20 bottom-8 w-64" />
    <div class="container-x grid items-center gap-14 lg:grid-cols-2">
      <div class="relative h-[520px] sm:h-[620px]">
        <figure class="photo-a pre-clip-up absolute left-0 top-0 w-[68%] overflow-hidden rounded-[2rem] shadow-2xl">
          <img :src="$a('/images/team/michael_park.webp')" alt="Michael Garza, founder of Paint The World" class="aspect-[4/5] w-full scale-110 object-cover object-[30%_50%]" loading="lazy">
        </figure>
        <figure class="photo-b pre-clip-down absolute bottom-0 right-0 w-[56%] overflow-hidden rounded-[2rem] border-8 border-mist shadow-2xl">
          <img :src="$a('/images/team/michael_plaque.webp')" alt="Michael holding the YouTube 100K subscriber award" class="aspect-[3/4] w-full scale-110 object-cover" loading="lazy">
        </figure>
        <div class="badge pre-scale absolute left-[52%] top-[44%] grid size-28 -translate-x-1/2 place-items-center rounded-full bg-leaf text-center font-display text-sm leading-tight text-navy shadow-xl sm:size-32">
          Since<br><span class="text-3xl">2024</span>
        </div>
      </div>
      <div>
        <p v-reveal class="eyebrow">Our story</p>
        <h2 v-reveal class="mt-4 text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.05] text-navy">{{ story.title }}</h2>
        <div v-reveal="'stagger'" class="mt-6 space-y-5 text-lg leading-relaxed text-navy/80">
          <p v-for="(p, i) in story.paragraphs" :key="i">{{ p }}</p>
        </div>
        <div v-reveal class="mt-8 flex flex-wrap gap-3">
          <a :href="links.youtube" target="_blank" rel="noopener" class="btn-navy"><SocialIcon name="youtube" class="size-5" /> Watch the transformations</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { story, links } from '~/data/site'

const root = useScrollFx(({ gsap, reduced }) => {
  if (reduced) return
  const q = gsap.utils.selector(root.value)
  const st = { trigger: root.value, start: 'top 70%' }
  gsap.fromTo(q('.photo-a'), { clipPath: 'inset(100% 0% 0% 0% round 2rem)' }, { clipPath: 'inset(0% 0% 0% 0% round 2rem)', duration: 1.3, ease: 'power3.inOut', scrollTrigger: st })
  gsap.fromTo(q('.photo-b'), { clipPath: 'inset(0% 0% 100% 0% round 2rem)' }, { clipPath: 'inset(0% 0% 0% 0% round 2rem)', duration: 1.3, delay: 0.25, ease: 'power3.inOut', scrollTrigger: st })
  gsap.fromTo(q('.badge'), { scale: 0, rotate: -40 }, { scale: 1, rotate: 0, duration: 0.9, delay: 0.9, ease: 'back.out(2)', scrollTrigger: st })
  gsap.to(q('.photo-a img'), { yPercent: -8, ease: 'none', scrollTrigger: { trigger: root.value, scrub: true } })
  gsap.to(q('.photo-b img'), { yPercent: 8, ease: 'none', scrollTrigger: { trigger: root.value, scrub: true } })
  gsap.to(q('.badge'), { rotate: 25, ease: 'none', scrollTrigger: { trigger: root.value, scrub: true } })
})
</script>
