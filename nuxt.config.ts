import tailwindcss from "@tailwindcss/vite"

// Served under /<repo>/ on GitHub Pages (set by the deploy workflow), at / everywhere else
const baseURL = process.env.NUXT_APP_BASE_URL || '/'

// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: [
    "~/assets/css/main.css",
  ],

  app: {
    baseURL,
    head: {
      htmlAttrs: { lang: 'en' },
      titleTemplate: '%s · Paint The World Foundation (concept)',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#02202F' },
        { name: 'description', content: 'Paint The World restores homes, dignity and hope for families in need through free and low-cost painting, repairs and home improvement. A 501(c)(3) nonprofit in Midland, Texas.' },
      ],
      script: [
        {
          // Hide scroll-revealed content before first paint (no flash), unless motion is reduced.
          // Safety net: if the app hasn't started in 4s, show everything.
          innerHTML: "(function(){var d=document.documentElement;if(!matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('js-anim');setTimeout(function(){if(!window.__ptwReady)d.classList.remove('js-anim')},4000)}})()",
          tagPosition: 'head',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: `${baseURL}brand/ptw-brush.svg` },
      ],
    },
  },

  site: {
    url: process.env.NUXT_SITE_URL || 'https://basetech939.github.io',
    name: 'Paint The World Foundation (concept)',
  },

  // robots.txt only works at a domain root, not under a GitHub Pages sub-path
  robots: { robotsTxt: baseURL === '/' },
  // link checker flags the github.io sub-path trailing slash as a 'failing page'; not useful here
  linkChecker: { enabled: false },

  vite: {
    plugins: [
      tailwindcss(),
    ],
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'class-variance-authority',
        'clsx',
        'reka-ui',
        'tailwind-merge',
        'gsap',
        'gsap/ScrollTrigger',
        'gsap/MotionPathPlugin',
        'lenis',
      ]
    }
  },

  i18n: {
    baseUrl: 'https://www.ptwfoundation.org',
    locales: [
      { code: 'en', language: 'en-US', file: 'en.json', name: 'English', dir: 'ltr' },
    ],
    defaultLocale: 'en',
    strategy: 'no_prefix',
  },

  shadcn: {
    prefix: '',
    componentDir: '@/components/ui'
  },

  seo: {
    automaticDefaults: false
  },

  modules: [
    "@nuxtjs/i18n",
    'shadcn-nuxt',
    '@vueuse/nuxt',
    'nuxt-lucide-icons',
    'motion-v/nuxt',
    '@nuxtjs/seo',
    'v-gsap-nuxt',
  ],
})
