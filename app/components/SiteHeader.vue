<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-all duration-500"
    :class="solid ? 'bg-cream/85 shadow-[0_10px_30px_-20px_rgba(2,32,47,0.5)] backdrop-blur-md' : 'bg-transparent'"
  >
    <div class="container-x flex h-20 items-center justify-between gap-3 sm:gap-6">
      <BrandLogo />
      <nav class="hidden items-center gap-1 lg:flex" aria-label="Main">
        <NuxtLink
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="rounded-full px-4 py-2 text-sm font-semibold text-navy/80 transition hover:bg-navy/5 hover:text-navy"
          active-class="!text-navy bg-leaf/50"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>
      <div class="flex shrink-0 items-center gap-2">
        <NuxtLink to="/donate" class="btn-paint !px-3.5 !py-2.5 sm:!px-5" aria-label="Donate">
          <Heart class="size-4" /> <span class="hidden min-[420px]:inline">Donate</span>
        </NuxtLink>
        <button
          class="grid size-11 place-items-center rounded-full bg-navy text-white lg:hidden"
          :aria-expanded="open"
          aria-controls="mobile-nav"
          aria-label="Menu"
          @click="open = !open"
        >
          <X v-if="open" class="size-5" />
          <Menu v-else class="size-5" />
        </button>
      </div>
    </div>
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-3"
      leave-active-class="transition duration-200 ease-in"
      leave-to-class="opacity-0 -translate-y-3"
    >
      <nav v-if="open" id="mobile-nav" class="border-t border-navy/10 bg-cream px-5 pb-6 pt-2 lg:hidden" aria-label="Mobile">
        <NuxtLink
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="block border-b border-navy/10 py-4 font-display text-2xl text-navy"
          @click="open = false"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { Heart, Menu, X } from 'lucide-vue-next'
import { nav } from '~/data/site'

const open = ref(false)
const { y } = useWindowScroll()
// While the home hero is pinned the page isn't really scrolling yet, so the bar stays clear
const heroPinned = useState('hero-pinned', () => false)
const solid = computed(() => open.value || (!heroPinned.value && y.value > 40))
const route = useRoute()
watch(() => route.path, () => { open.value = false })
</script>
