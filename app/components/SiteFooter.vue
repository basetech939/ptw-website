<template>
  <footer class="relative overflow-hidden bg-navy text-white">
    <PaintDrips :style="{ color: dripColor }" />
    <div class="container-x relative grid gap-12 pb-10 pt-12 md:grid-cols-[1.4fr_1fr_1fr]">
      <div>
        <BrandLogo light />
        <p class="mt-6 max-w-sm text-white/70">
          Restoring homes, dignity, and hope for families in need through free and low-cost painting, repairs, and home improvement.
        </p>
        <p class="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-leaf">501(c)(3) Nonprofit · Midland, Texas</p>
        <div class="mt-6 flex gap-3">
          <a
            v-for="s in socials"
            :key="s.key"
            :href="s.href"
            target="_blank"
            rel="noopener"
            :aria-label="s.name"
            class="grid size-11 place-items-center rounded-full bg-white/10 transition hover:-translate-y-1 hover:bg-leaf hover:text-navy"
          >
            <SocialIcon :name="s.key" class="size-5" />
          </a>
        </div>
      </div>
      <div>
        <h3 class="text-lg">Explore</h3>
        <ul class="mt-4 space-y-2 text-white/75">
          <li v-for="item in nav" :key="item.to">
            <NuxtLink :to="item.to" class="hover:text-leaf">{{ item.label }}</NuxtLink>
          </li>
          <li><NuxtLink to="/donate" class="hover:text-leaf">Donate</NuxtLink></li>
          <li><a :href="links.shop" target="_blank" rel="noopener" class="hover:text-leaf">Shop with Paint The World</a></li>
        </ul>
      </div>
      <div>
        <h3 class="text-lg">Contact Us</h3>
        <ul class="mt-4 space-y-3 text-white/75">
          <li>
            <span class="block text-xs uppercase tracking-[0.2em] text-white/45">Email</span>
            <a :href="`mailto:${links.email}`" class="hover:text-leaf">{{ links.email }}</a>
          </li>
          <li>
            <span class="block text-xs uppercase tracking-[0.2em] text-white/45">Marketing &amp; partnerships</span>
            <a :href="`mailto:${links.partnershipsEmail}`" class="break-all hover:text-leaf">{{ links.partnershipsEmail }}</a>
          </li>
          <li>
            <span class="block text-xs uppercase tracking-[0.2em] text-white/45">All links</span>
            <a :href="links.linktree" target="_blank" rel="noopener" class="hover:text-leaf">linktr.ee/_painttheworld_</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="container-x relative flex flex-col gap-2 border-t border-white/10 py-6 text-sm text-white/50 sm:flex-row sm:justify-between">
      <p>© {{ year }} Paint the World Foundation. All rights reserved.</p>
      <p>Painting Homes. Changing Lives.</p>
    </div>
    <div class="container-x relative pb-6 text-xs text-white/40">
      <p>Concept redesign by <a href="https://basetech.tech" target="_blank" rel="noopener" class="underline-offset-2 hover:text-leaf hover:underline">BaseTech</a> · not the official Paint The World website (<a href="https://www.ptwfoundation.org" target="_blank" rel="noopener" class="underline-offset-2 hover:text-leaf hover:underline">ptwfoundation.org</a>)</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { nav, links, socials } from '~/data/site'
const year = new Date().getFullYear()
// drips take the colour of whatever section sits above the footer on this page
const route = useRoute()
const dripColor = computed(() => (route.meta.footerDrip as string | undefined) ?? '#FBF6EF')
</script>
