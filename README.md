# Paint The World — website

Full redesign of ptwfoundation.org, built on the `nuxt-simple-kit` starter (Nuxt 4 + Tailwind 4) with GSAP ScrollTrigger and Lenis smooth scrolling.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (.output/)
npm run preview    # preview the production build
```

## Where things are

| What | Where |
|---|---|
| All wording, links, numbers, tiers, partners | `app/data/site.ts` — edit text here, not in components |
| Scroll-painted house (home hero) | `app/components/PaintHouseHero.vue` + `HouseScene.vue` |
| Pages | `app/pages/` — `index`, `get-assistance`, `donate`, `sponsorships`, `partners`, `contact` |
| GSAP + ScrollTrigger + Lenis setup | `app/plugins/gsap.client.ts`, `app/composables/useScrollFx.ts` |
| `v-reveal` fade-in directive | `app/plugins/reveal.ts` |
| Brand colours & fonts | `app/assets/css/main.css` (Russo One = logo font, Raleway = tagline font) |
| Logo files | `public/brand/` (from the SVG recreation of the original logo) |
| Photos | `public/images/` (optimised from ptwfoundation.org; before/after shots split into halves) |

## Home page story

1. **Hero:** pinned scroll story. A grey, worn house (cracks, peeling paint, boarded window) gets painted stroke by stroke by the PTW brush. The sky turns blue, the sun rises, windows glow and flowers bloom, ending on "Painting Homes. Restoring Hope."
2. **Community:** 1M+ with live counters per platform.
3. **Michael's story:** photos reveal with parallax.
4. **Mission statement:** fills in word by word as you scroll.
5. **Before/after sliders:** drag the brush handle (also keyboard-accessible).
6. **Videos:** the two YouTube videos load only on click.
7. **Impact:** counters, a ticker, and a pinned horizontal photo gallery (swipe on mobile).
8. **What we can help with:** sponsorship paint cans that fill by tier.
9. **Donate band and partners.**

Everything respects `prefers-reduced-motion` (final states shown, no scroll animation).

## Before launch

- **Contact form:** there's no form backend yet. Submitting opens the visitor's email app with the message pre-filled, sent to `info@ptwfoundation.org` (or the partnerships address for partnership proposals). Photo uploads need a real backend (e.g. a Nuxt server route + email service, or Formspree).
- **Donations:** all donate buttons go to the existing Zeffy form.
- **Numbers:** social counts and impact stats are copied from the current site. Update them in `site.ts`.
- **Spelling note:** the original site's "recourses" and "saftey" typos are corrected here.
- **Git remote:** this folder was cloned from the starter repo, so `origin` still points to `Moeabdelhafeed/nuxt-simple-kit`. Change it before pushing anywhere.
