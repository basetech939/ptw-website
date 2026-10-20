<template>
  <div class="relative min-h-dvh">
    <a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-leaf focus:px-4 focus:py-2 focus:text-navy">Skip to content</a>
    <SiteHeader />
    <SideRails />
    <main id="main">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>
