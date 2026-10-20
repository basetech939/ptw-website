<template>
  <section ref="root" data-section="Impact" class="relative overflow-hidden bg-mist">
    <div class="relative">
    <PaintSplash kind="stroke" color="rgba(21,103,140,0.10)" class="-right-28 top-16 w-[520px]" />
    <PaintSplash kind="splat" class="-left-20 top-1/2 w-60" />
    <div class="container-x py-24 sm:py-32">
      <div v-reveal class="max-w-3xl">
        <p class="eyebrow">Check the numbers</p>
        <h2 class="mt-4 text-[clamp(2.2rem,5vw,4rem)] leading-[1] text-navy">{{ impact.title }}</h2>
        <p class="mt-6 text-lg text-navy/75">{{ impact.intro }}</p>
      </div>
      <dl v-reveal="'stagger'" class="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div v-for="s in impact.stats" :key="s.label" class="relative flex flex-col-reverse overflow-hidden rounded-3xl bg-white p-7">
          <span class="absolute -right-6 -top-6 size-24 rounded-full bg-leaf/40 blur-xl" />
          <dt class="relative mt-2 font-semibold text-navy/70">{{ s.label }}</dt>
          <dd class="relative font-display text-[clamp(2.4rem,5vw,4.2rem)] leading-none text-navy">
            <CountUp :value="s.value" :prefix="s.prefix" :suffix="s.suffix" />
          </dd>
        </div>
      </dl>
    </div>
    </div>

    <!-- ticker -->
    <div class="ticker-wrap border-y border-navy/10 bg-leaf py-4" aria-hidden="true">
      <div class="ticker flex w-max gap-10 whitespace-nowrap font-display text-2xl text-navy">
        <span v-for="n in 4" :key="n" class="flex gap-10">
          <span v-for="t in impact.ticker" :key="t" class="flex items-center gap-10">{{ t }} <span class="text-brush">✦</span></span>
        </span>
      </div>
    </div>

    <!-- horizontal gallery: pinned + scrubbed on desktop, swipeable on phones -->
    <div class="container-x pt-16 md:hidden">
      <p class="eyebrow">In the neighbourhood</p>
      <p class="mt-3 font-display text-[1.9rem] leading-tight text-navy">Everyone deserves to feel proud of the place they call home.</p>
      <p class="mt-2 text-sm text-navy/60">Swipe to see more →</p>
    </div>
    <div class="gallery-pin relative snap-x snap-mandatory overflow-x-auto pb-16 pt-8 [scrollbar-width:none] md:flex md:h-dvh md:snap-none md:items-center md:overflow-hidden md:py-0 md:pt-20">
      <div class="track flex w-max items-center gap-5 px-5 sm:px-8 md:gap-6 md:pl-12 md:pr-[12vw] 2xl:pl-28">
        <div class="hidden w-[40vw] max-w-md shrink-0 flex-col justify-center pr-6 md:flex">
          <p class="eyebrow">In the neighbourhood</p>
          <p class="mt-4 font-display text-[clamp(1.8rem,3.4vw,2.8rem)] leading-tight text-navy">Everyone deserves to feel proud of the place they call home.</p>
        </div>
        <figure v-for="(g, i) in gallery" :key="i" class="shot relative h-[56vh] max-h-[560px] w-[78vw] max-w-[440px] shrink-0 snap-center overflow-hidden rounded-[2rem] md:h-[58vh] md:w-[72vw]" :class="i % 2 ? 'md:translate-y-8' : 'md:-translate-y-8'">
          <img :src="$a(g.src)" :alt="g.alt" class="size-full scale-110 object-cover" loading="lazy">
        </figure>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { impact, gallery } from '~/data/site'

const root = useScrollFx(({ gsap, reduced }) => {
  const q = gsap.utils.selector(root.value)
  if (reduced) return
  gsap.to(q('.ticker'), { xPercent: -25, ease: 'none', duration: 18, repeat: -1 })
  const mm = gsap.matchMedia()
  mm.add('(min-width: 768px)', () => {
    const track = q('.track')[0] as HTMLElement
    const dist = () => track.scrollWidth - window.innerWidth
    gsap.to(track, {
      x: () => -dist(), ease: 'none',
      scrollTrigger: { trigger: q('.gallery-pin')[0], start: 'top top', end: () => `+=${dist()}`, scrub: 0.8, pin: true, invalidateOnRefresh: true },
    })
    // images are scaled 110%, so ±4% drift never exposes an edge
    q('.shot img').forEach((img: Element) => gsap.fromTo(img, { xPercent: 4 }, { xPercent: -4, ease: 'none', scrollTrigger: { trigger: q('.gallery-pin')[0], start: 'top top', end: () => `+=${dist()}`, scrub: true } }))
  })
})
</script>
