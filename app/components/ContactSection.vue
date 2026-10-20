<template>
<section id="contact" data-section="Contact" class="relative overflow-hidden bg-cream py-20 sm:py-28">
  <PaintSplash kind="splat" class="-left-20 top-16 w-72" />
  <PaintSplash kind="stroke" color="rgba(21,103,140,0.10)" class="-right-32 bottom-20 w-[480px]" />
  <div v-if="heading" class="container-x mb-12">
    <p v-reveal class="eyebrow">Contact us</p>
    <h2 v-reveal class="mt-4 max-w-3xl text-[clamp(2.2rem,5vw,4rem)] leading-[1] text-navy">{{ heading }}</h2>
    <p v-reveal class="mt-5 max-w-2xl text-lg text-navy/75">{{ contact.intro }}</p>
  </div>
    <div class="container-x grid gap-12 lg:grid-cols-[1.4fr_1fr]">
      <form v-reveal class="rounded-[2rem] bg-white p-7 shadow-[0_30px_60px_-45px_rgba(2,32,47,0.6)] sm:p-10" @submit.prevent="send">
        <div class="grid gap-5 sm:grid-cols-2">
          <label class="field">
            <span>First Name *</span>
            <input v-model="f.first" required autocomplete="given-name">
          </label>
          <label class="field">
            <span>Last Name *</span>
            <input v-model="f.last" required autocomplete="family-name">
          </label>
          <label class="field">
            <span>Email Address *</span>
            <input v-model="f.email" type="email" required autocomplete="email">
          </label>
          <label class="field">
            <span>Phone Number</span>
            <input v-model="f.phone" type="tel" autocomplete="tel">
          </label>
        </div>
        <fieldset class="mt-6">
          <legend class="text-sm font-bold text-navy">Subject *</legend>
          <div class="mt-3 flex flex-wrap gap-2">
            <label v-for="s in contact.subjects" :key="s" class="cursor-pointer">
              <input v-model="f.subject" type="radio" name="subject" :value="s" class="peer sr-only" required>
              <span class="block rounded-full border-2 border-navy/15 px-4 py-2 text-sm font-semibold text-navy transition peer-checked:border-navy peer-checked:bg-leaf peer-focus-visible:outline-2 peer-focus-visible:outline-brush">{{ s }}</span>
            </label>
          </div>
        </fieldset>
        <label class="field mt-6">
          <span>Message *</span>
          <textarea v-model="f.message" rows="6" required :placeholder="f.subject === 'Apply For Assistance' ? 'Tell us about the homeowner, the property, and the work that is needed.' : ''" />
        </label>
        <p v-if="f.subject === 'Apply For Assistance'" class="mt-3 rounded-2xl bg-leaf/30 p-4 text-sm text-navy">
          Please include clear photos of the areas that need assistance. Attach them to the email that opens next.
        </p>
        <button type="submit" class="btn-navy mt-7 w-full sm:w-auto"><Send class="size-4" /> Send Message</button>
        <p class="mt-3 text-sm text-navy/60">{{ contact.responds }}</p>
      </form>

      <aside class="space-y-5">
        <p v-reveal class="text-lg text-navy/75">{{ contact.connect }}</p>
        <div v-reveal="'stagger'" class="space-y-4">
          <a :href="`mailto:${links.email}`" class="block rounded-3xl bg-white p-6 transition hover:-translate-y-1">
            <p class="eyebrow">Donation support</p>
            <p class="mt-2 font-semibold text-navy">{{ links.email }}</p>
          </a>
          <a :href="`mailto:${links.partnershipsEmail}`" class="block rounded-3xl bg-white p-6 transition hover:-translate-y-1">
            <p class="eyebrow">Sponsorship support</p>
            <p class="mt-2 break-all font-semibold text-navy">{{ links.partnershipsEmail }}</p>
          </a>
          <a :href="links.linktree" target="_blank" rel="noopener" class="block rounded-3xl bg-navy p-6 text-white transition hover:-translate-y-1">
            <p class="eyebrow !text-leaf">Follow our foundation</p>
            <div class="mt-3 flex gap-3">
              <SocialIcon v-for="s in socials" :key="s.key" :name="s.key" class="size-6" />
            </div>
            <p class="mt-3 text-sm text-white/70">View all links →</p>
          </a>
        </div>
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Send } from 'lucide-vue-next'
import { contact, links, socials } from '~/data/site'

const props = defineProps<{ heading?: string; subject?: string }>()
const route = useRoute()
const preset = props.subject ?? String(route.query.subject ?? '')
const f = reactive({
  first: '', last: '', email: '', phone: '', message: '',
  subject: contact.subjects.includes(preset) ? preset : '',
})

// No form backend yet: compose an email to the right inbox with everything filled in
function send() {
  const to = f.subject === 'Partnership Proposals' ? links.partnershipsEmail : links.email
  const body = `${f.message}\n\nFrom: ${f.first} ${f.last}\n${f.email}${f.phone ? `\n${f.phone}` : ''}`
  window.location.href = `mailto:${to}?subject=${encodeURIComponent(`${f.subject}: ${f.first} ${f.last}`)}&body=${encodeURIComponent(body)}`
}
</script>

<style scoped>
.field { display: block; }
.field > span { display: block; font-size: 0.875rem; font-weight: 700; color: var(--color-navy); }
.field input, .field textarea {
  margin-top: 0.5rem; width: 100%; border-radius: 1rem; border: 2px solid #DCE6EC; background: #FBFDFE;
  padding: 0.85rem 1rem; color: var(--color-navy); transition: border-color .2s, box-shadow .2s;
}
.field input:focus, .field textarea:focus { outline: none; border-color: var(--color-brush); box-shadow: 0 0 0 4px rgba(21,103,140,.15); }
</style>
