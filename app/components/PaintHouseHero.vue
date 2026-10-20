<template>
  <section ref="root" data-section="Home" class="relative h-dvh min-h-[640px] overflow-hidden bg-mist" aria-label="Painting Homes. Restoring Hope.">
    <!-- Captions: one story beat per stretch of scroll -->
    <div class="pointer-events-none absolute inset-x-0 top-[6.5rem] z-20 sm:top-28">
      <div class="container-x relative text-center">
        <p
          v-for="(c, i) in captions"
          :key="i"
          class="caption absolute inset-x-5 top-0 mx-auto max-w-4xl font-display text-[clamp(2.5rem,6vw,4.6rem)] leading-[1.02] text-navy sm:inset-x-8"
          :class="i === 0 ? '' : 'opacity-0'"
          v-html="c"
        />
        <div class="final pointer-events-auto absolute inset-x-5 top-0 mx-auto max-w-4xl opacity-0 sm:inset-x-8">
          <p class="eyebrow justify-center">501(c)(3) nonprofit · Midland, Texas</p>
          <h1 class="mt-3 text-[clamp(1.95rem,7.6vw,5.6rem)] leading-[0.98] text-navy">
            Painting Homes.<br><span class="paint-word">Restoring Hope.</span>
          </h1>
          <div class="mt-6 flex flex-wrap justify-center gap-2.5 sm:mt-7 sm:gap-3">
            <NuxtLink to="/donate" class="btn-paint max-sm:!px-4 max-sm:!py-3 max-sm:!text-xs max-sm:!tracking-[0.1em]">Donate now</NuxtLink>
            <NuxtLink to="/get-assistance" class="btn-navy max-sm:!px-4 max-sm:!py-3 max-sm:!text-xs max-sm:!tracking-[0.1em]">Get assistance</NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <div class="hint absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-navy/70">
      Scroll to paint
      <span class="block h-10 w-6 rounded-full border-2 border-navy/40 p-1"><span class="hint-dot block h-2 w-full rounded-full bg-navy/60" /></span>
    </div>

    <svg
      class="absolute bottom-0 left-1/2 h-[72%] w-[250%] max-w-none -translate-x-1/2 overflow-visible sm:h-[62%] sm:w-full"
      viewBox="0 0 1000 640"
      preserveAspectRatio="xMidYMax meet"
      role="img"
      aria-label="A worn grey house being repainted in bright colours"
    >
      <defs>
        <filter id="soft" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="30" /></filter>
        <filter id="rough" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7" />
          <feDisplacementMap in="SourceGraphic" scale="26" />
        </filter>
        <mask id="paint-mask" maskUnits="userSpaceOnUse" x="-3000" y="-3000" width="7000" height="7000">
          <!-- the world outside the frame washes into colour as the house gets painted -->
          <path class="outer-wash" d="M-3000 -3000H4000V4000H-3000Z M0 0V640H1000V0Z" fill-rule="evenodd" fill="#fff" opacity="0" filter="url(#soft)" />
          <rect class="full-wash" x="-3000" y="-3000" width="7000" height="7000" fill="#fff" opacity="0" />
          <path
            ref="stroke"
            class="pre-hide"
            :d="strokePath"
            fill="none"
            stroke="#fff"
            stroke-width="118"
            stroke-linecap="round"
            stroke-linejoin="round"
            filter="url(#rough)"
          />
        </mask>
        <linearGradient id="sky-new" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="-200" y2="560">
          <stop offset="0" stop-color="#BFE6FA" />
          <stop offset="1" stop-color="#EEF7FC" />
        </linearGradient>
        <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stop-color="#FFE7A3" stop-opacity="0.9" />
          <stop offset="1" stop-color="#FFE7A3" stop-opacity="0" />
        </radialGradient>
      </defs>

      <!-- ===== BEFORE: faded, peeling, forgotten ===== -->
      <g>
        <rect x="-3000" y="-3000" width="7000" height="3640" fill="#D9DEE1" />
        <rect x="-3000" y="520" width="7000" height="3000" fill="#B5AE95" />
        <HouseScene :p="worn" />
        <!-- overcast sky -->
        <g class="clouds-worn" fill="#C3C9CC">
          <path d="M300 170a34 34 0 0 1 62-16 26 26 0 0 1 40 24h-118a18 18 0 0 1 16-8Z" />
          <path d="M560 110a40 40 0 0 1 72-18 30 30 0 0 1 46 28h-136a20 20 0 0 1 18-10Z" />
          <path d="M120 120a26 26 0 0 1 48-12 20 20 0 0 1 30 18h-90a14 14 0 0 1 12-6Z" />
          <path d="M760 190a26 26 0 0 1 48-12 20 20 0 0 1 30 18h-90a14 14 0 0 1 12-6Z" />
        </g>

        <!-- wear and tear -->
        <g fill="#B7BCBE">
          <path d="M282 300c18-6 30 4 26 16s-20 12-30 6-6-18 4-22Z" />
          <path d="M680 470c14-8 34-2 32 12s-22 16-32 10-10-16 0-22Z" />
          <path d="M560 300c10-4 22 2 20 10s-16 8-22 4-6-12 2-14Z" />
          <path d="M330 470c12-4 22 4 18 12s-18 6-22 0 0-10 4-12Z" />
        </g>
        <g stroke="#8E9496" stroke-width="2" fill="none" stroke-linecap="round">
          <path d="M268 330l14 18-6 14 12 20" />
          <path d="M720 300l-10 22 8 10-6 18" />
          <path d="M444 486l10 10-4 14" />
        </g>
        <!-- boarded-up right window -->
        <g fill="#9A8F80" stroke="#7F7466" stroke-width="2">
          <rect x="606" y="408" width="108" height="14" transform="rotate(-12 660 415)" />
          <rect x="606" y="432" width="108" height="14" transform="rotate(9 660 439)" />
        </g>
        <!-- weeds -->
        <g stroke="#8D8A70" stroke-width="3" fill="none" stroke-linecap="round">
          <path d="M268 540l-6-22M272 540l4-18M276 540l10-16" />
          <path d="M728 540l-8-20M732 540l2-24M736 540l9-14" />
        </g>
      </g>

      <!-- ===== AFTER: revealed by the brush strokes ===== -->
      <g mask="url(#paint-mask)">
        <rect x="-3000" y="-3000" width="7000" height="3640" fill="url(#sky-new)" />
        <rect x="-3000" y="520" width="7000" height="3000" fill="#7CCB86" />
        <circle class="sun" cx="840" cy="300" r="46" fill="#FFC857" />
        <g class="clouds" fill="#fff" opacity="0.95">
          <path d="M300 170a34 34 0 0 1 62-16 26 26 0 0 1 40 24h-118a18 18 0 0 1 16-8Z" />
          <path d="M560 110a40 40 0 0 1 72-18 30 30 0 0 1 46 28h-136a20 20 0 0 1 18-10Z" />
          <path d="M120 120a26 26 0 0 1 48-12 20 20 0 0 1 30 18h-90a14 14 0 0 1 12-6Z" />
          <path d="M760 190a26 26 0 0 1 48-12 20 20 0 0 1 30 18h-90a14 14 0 0 1 12-6Z" />
        </g>
        <HouseScene :p="fresh" />
        <!-- warm windows -->
        <g class="glow" opacity="0">
          <ellipse cx="340" cy="425" rx="70" ry="50" fill="url(#glow)" />
          <ellipse cx="660" cy="425" rx="70" ry="50" fill="url(#glow)" />
        </g>
      </g>

      <!-- flowers bloom once the job is done -->
      <g class="flowers pre-hide">
        <g v-for="(f, i) in flowers" :key="i" class="flower" :transform="`translate(${f.x} ${f.y})`">
          <circle r="6" :fill="f.c" />
          <circle r="2.4" fill="#FFF6C9" />
        </g>
      </g>
      <g class="birds" fill="none" stroke="#02202F" stroke-width="2.4" stroke-linecap="round" opacity="0">
        <path d="M560 120q8-8 16 0q8-8 16 0" />
        <path d="M600 96q6-6 12 0q6-6 12 0" />
      </g>

      <!-- the brush that does the work (Paint The World's own brush) -->
      <g ref="painter" class="painter pre-hide">
        <image :href="$a('/brand/ptw-brush.svg')" width="76" height="130" transform="translate(38 0) rotate(180)" />
      </g>
    </svg>
  </section>
</template>

<script setup lang="ts">

const captions = [
  'Every home tells a story.<span class="mt-4 block font-sans text-base font-semibold tracking-normal text-navy/60 sm:text-lg">Scroll and watch this one get a fresh start.</span>',
  'Some stories need <span class="paint-word" style="--paint:#FFC857">a little help.</span>',
  'One free paint job <span class="paint-word">at a time…</span>',
]

// Serpentine stroke that sweeps the scene row by row, like a roller.
// Phones only see the middle of the drawing, so they get a tighter path that keeps the brush on screen.
function serpentine(x0: number, x1: number, rows: number[]) {
  return rows.map((y, i) => (i % 2 === 0 ? `${i === 0 ? 'M' : 'L'}${x0} ${y} L${x1} ${y}` : `L${x1} ${y} L${x0} ${y}`)).join(' ')
}
const strokePath = serpentine(60, 940, [70, 160, 250, 340, 430, 520, 610])
const narrowPath = serpentine(300, 700, [110, 180, 250, 320, 390, 460, 530, 600])

const worn = {
  body: '#B9BEC1', siding: '#A4AAAD', roof: '#6E7477', trim: '#C9CDCF', door: '#8D9397',
  window: '#7F878B', shutter: '#9AA0A3', chimney: '#8C8682', ground: '#B5AE95', path: '#C7C1AE',
  fence: '#C3C0B5', trunk: '#7B746C', leaves: '#9EA59A', bush: '#98A08F', step: '#ADA9A0',
}
const fresh = {
  body: '#A8E6AC', siding: '#8FD694', roof: '#02202F', trim: '#FFFFFF', door: '#15678C',
  window: '#FFE29A', shutter: '#02202F', chimney: '#E4572E', ground: '#7CCB86', path: '#F2E9DA',
  fence: '#FFFFFF', trunk: '#7A4E2D', leaves: '#3FAE5A', bush: '#2F9A4C', step: '#E9DFD0',
}

const flowers = [
  { x: 286, y: 528, c: '#E4572E' }, { x: 306, y: 520, c: '#FFC857' }, { x: 330, y: 530, c: '#F28AB2' },
  { x: 352, y: 522, c: '#E4572E' }, { x: 648, y: 524, c: '#FFC857' }, { x: 670, y: 530, c: '#F28AB2' },
  { x: 694, y: 520, c: '#E4572E' }, { x: 716, y: 528, c: '#FFC857' }, { x: 120, y: 520, c: '#F28AB2' },
  { x: 880, y: 526, c: '#FFC857' },
]

// The home page opens inside the pinned hero: tell header/rails before first paint
const heroPinned = useState('hero-pinned', () => false)
heroPinned.value = true
onBeforeUnmount(() => { heroPinned.value = false })

const stroke = ref<SVGPathElement | null>(null)
const painter = ref<SVGGElement | null>(null)

const root = useScrollFx(({ gsap, reduced }) => {
  if (window.matchMedia('(max-width: 639px)').matches) stroke.value!.setAttribute('d', narrowPath)
  const len = stroke.value!.getTotalLength()
  const q = gsap.utils.selector(root.value)
  if (reduced) {
    heroPinned.value = false
    gsap.set(stroke.value, { strokeDasharray: len, strokeDashoffset: 0, opacity: 1 })
    gsap.set(q('.caption'), { opacity: 0 })
    gsap.set(q('.final'), { opacity: 1 })
    gsap.set([q('.painter'), q('.hint')], { opacity: 0 })
    gsap.set(q('.glow'), { opacity: 1 })
    gsap.set(q('.full-wash'), { opacity: 1 })
    gsap.set(q('.flowers'), { opacity: 1 })
    gsap.set(q('.sun'), { attr: { cy: 130 } })
    return
  }
  gsap.set(stroke.value, { strokeDasharray: len, strokeDashoffset: len, opacity: 1 })
  gsap.set(painter.value, { opacity: 0 })
  gsap.set(q('.flower'), { scale: 0, transformOrigin: '50% 50%' })
  gsap.set(q('.flowers'), { opacity: 1 })
  gsap.to(q('.hint-dot'), { y: 18, repeat: -1, yoyo: true, duration: 0.8, ease: 'sine.inOut' })

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: root.value, start: 'top top', end: '+=320%', scrub: 0.6, pin: true, anticipatePin: 1,
      onToggle: (self) => { heroPinned.value = self.isActive },
      onRefresh: (self) => { heroPinned.value = self.progress < 1 },
    },
  })
  tl.to(stroke.value, { strokeDashoffset: 0, duration: 10 }, 0)
    .to(painter.value, {
      duration: 10,
      motionPath: { path: stroke.value!, align: stroke.value!, alignOrigin: [0.5, 1] },
    }, 0)
    .to(painter.value, { rotation: 8, yoyo: true, repeat: 13, duration: 10 / 14, transformOrigin: '50% 100%' }, 0)
    .to(q('.hint'), { opacity: 0, duration: 0.6 }, 0)
    .to(painter.value, { opacity: 1, duration: 0.25 }, 0.02)
    .to(q('.outer-wash'), { opacity: 1, duration: 8, ease: 'power1.in' }, 2)
    // story beats
    .to(q('.caption')[0]!, { opacity: 0, y: -24, duration: 0.6 }, 2.2)
    .fromTo(q('.caption')[1]!, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6 }, 2.9)
    .to(q('.caption')[1]!, { opacity: 0, y: -24, duration: 0.6 }, 5.2)
    .fromTo(q('.caption')[2]!, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6 }, 5.9)
    .to(q('.caption')[2]!, { opacity: 0, y: -24, duration: 0.6 }, 8.8)
    .to(q('.full-wash'), { opacity: 1, duration: 0.8 }, 9.6)
    // finishing touches
    .to(q('.sun'), { attr: { cy: 130 }, duration: 4 }, 6)
    .to([q('.clouds'), q('.clouds-worn')], { x: 40, duration: 10 }, 0)
    .to(painter.value, { opacity: 0, y: '-=60', duration: 0.8 }, 10)
    .to(q('.glow'), { opacity: 1, duration: 1 }, 9.6)
    .to(q('.flower'), { scale: 1, duration: 0.6, stagger: 0.08, ease: 'back.out(3)' }, 9.8)
    .to(q('.birds'), { opacity: 1, x: -60, duration: 2 }, 9.8)
    .fromTo(q('.final'), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, 9.6)
    .to({}, { duration: 1.2 })
})
</script>
