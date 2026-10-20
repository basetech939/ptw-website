<template>
  <!-- One house drawing, coloured by palette `p`; drawn twice (worn + freshly painted) -->
  <g>
    <!-- ground & walkway -->
    <rect x="-3000" y="520" width="7000" height="3000" :fill="p.ground" />
    <path d="M455 540 L545 540 L600 640 L400 640 Z" :fill="p.path" />

    <!-- tree -->
    <rect x="118" y="380" width="22" height="150" rx="6" :fill="p.trunk" />
    <g :fill="p.leaves">
      <circle cx="129" cy="350" r="62" />
      <circle cx="88" cy="390" r="44" />
      <circle cx="172" cy="392" r="46" />
    </g>

    <!-- chimney (behind roof) -->
    <rect x="618" y="150" width="46" height="100" :fill="p.chimney" />
    <rect x="610" y="142" width="62" height="14" rx="3" :fill="p.trim" />

    <!-- walls + siding -->
    <rect x="252" y="282" width="496" height="240" :fill="p.body" />
    <g :stroke="p.siding" stroke-width="3">
      <line v-for="y in siding" :key="y" x1="252" :y1="y" x2="748" :y2="y" />
    </g>

    <!-- roof -->
    <path d="M214 296 L500 116 L786 296 L760 300 L500 140 L240 300 Z" :fill="p.trim" />
    <path d="M240 300 L500 140 L760 300 L760 292 L500 132 L240 292 Z" :fill="p.trim" />
    <path d="M226 290 L500 118 L774 290 L748 290 L500 142 L252 290 Z" :fill="p.roof" />
    <path d="M252 290 L500 142 L748 290 Z" :fill="p.body" />
    <g :stroke="p.siding" stroke-width="3">
      <line x1="356" y1="230" x2="644" y2="230" />
      <line x1="320" y1="252" x2="680" y2="252" />
      <line x1="286" y1="272" x2="714" y2="272" />
    </g>
    <circle cx="500" cy="214" r="22" :fill="p.trim" />
    <circle cx="500" cy="214" r="15" :fill="p.window" />
    <path d="M485 214h30M500 199v30" :stroke="p.trim" stroke-width="4" />

    <!-- porch roof & posts -->
    <path d="M384 352 L616 352 L632 372 L368 372 Z" :fill="p.roof" />
    <rect x="368" y="372" width="264" height="8" :fill="p.trim" />
    <rect x="392" y="380" width="12" height="142" :fill="p.trim" />
    <rect x="596" y="380" width="12" height="142" :fill="p.trim" />

    <!-- door -->
    <rect x="464" y="398" width="72" height="124" rx="4" :fill="p.trim" />
    <rect x="471" y="405" width="58" height="117" rx="3" :fill="p.door" />
    <rect x="481" y="418" width="38" height="30" rx="3" :fill="p.window" opacity="0.85" />
    <circle cx="519" cy="466" r="4" :fill="p.trim" />

    <!-- windows with shutters -->
    <g v-for="x in [300, 620]" :key="x">
      <rect :x="x - 22" y="392" width="18" height="78" :fill="p.shutter" />
      <rect :x="x + 84" y="392" width="18" height="78" :fill="p.shutter" />
      <rect :x="x - 4" y="388" width="88" height="86" :fill="p.trim" />
      <rect :x="x + 2" y="394" width="76" height="74" :fill="p.window" />
      <path :d="`M${x + 40} 394v74M${x + 2} 431h76`" :stroke="p.trim" stroke-width="5" />
      <rect :x="x - 10" y="472" width="100" height="8" :fill="p.trim" />
    </g>

    <!-- steps -->
    <rect x="450" y="522" width="100" height="10" :fill="p.step" />
    <rect x="440" y="532" width="120" height="10" :fill="p.step" />

    <!-- bushes -->
    <g :fill="p.bush">
      <ellipse cx="318" cy="530" rx="58" ry="24" />
      <ellipse cx="682" cy="530" rx="58" ry="24" />
    </g>

    <!-- picket fence -->
    <g :fill="p.fence">
      <rect x="-3000" y="548" width="3400" height="7" />
      <rect x="600" y="548" width="3400" height="7" />
      <path v-for="x in pickets" :key="x" :d="`M${x} 584 V540 l6 -8 l6 8 V584 Z`" />
    </g>
  </g>
</template>

<script setup lang="ts">
defineProps<{ p: Record<string, string> }>()
const siding = Array.from({ length: 11 }, (_, i) => 302 + i * 20)
const pickets = [...Array.from({ length: 60 }, (_, i) => 374 - i * 26), ...Array.from({ length: 60 }, (_, i) => 612 + i * 26)]
</script>
