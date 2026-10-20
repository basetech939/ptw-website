// All copy below is taken from ptwfoundation.org, the Linktree and the PTW flyer.
// Keep it in one place so the foundation can edit wording without touching components.

export const links = {
  donate: 'https://www.zeffy.com/en-US/donation-form/transforming-communities-through-paint',
  shop: 'https://jddcx2-ci.myshopify.com/',
  linktree: 'https://linktr.ee/_painttheworld_',
  facebook: 'https://www.facebook.com/share/17rFV1Ny3L/',
  instagram: 'https://www.instagram.com/painttheworld.432',
  tiktok: 'https://www.tiktok.com/@paint_the_world432',
  youtube: 'https://www.youtube.com/@PaintTheWorld432',
  email: 'info@ptwfoundation.org',
  partnershipsEmail: 'painttheworld432@gmail.com',
}

export const nav = [
  { to: '/', label: 'Home' },
  { to: '/get-assistance', label: 'Get Assistance' },
  { to: '/sponsorships', label: 'Sponsorships' },
  { to: '/partners', label: 'Partners' },
  { to: '/contact', label: 'Contact' },
]

export const tagline = 'Painting a better place'
export const motto = 'Painting Homes. Restoring Hope.'

export const socials = [
  { key: 'facebook', name: 'Facebook', handle: '@painttheworld432', count: '700K', href: links.facebook, color: '#1877F2' },
  { key: 'tiktok', name: 'TikTok', handle: '@paint_the_world432', count: '400K', href: links.tiktok, color: '#FE2C55' },
  { key: 'youtube', name: 'YouTube', handle: '@PaintTheWorld432', count: '140K', href: links.youtube, color: '#FF0000' },
  { key: 'instagram', name: 'Instagram', handle: '@painttheworld.432', count: '100K', href: links.instagram, color: '#E1306C' },
]

export const story = {
  title: 'Meet The Heart Behind The Paint!',
  paragraphs: [
    'Michael Garza, born and raised in Midland, Texas, founded Paint The World in 2024 with a simple mission: to use his skills in painting and a heart for helping others to make a difference.',
    'What started as one person giving back through free paint projects quickly grew into something much bigger! By sharing these interactions and transformations online, Michael was able to connect with a growing community of people who believed in the same mission: helping disadvantaged homeowners and showing how one act of service can inspire another!',
  ],
}

export const mission = {
  title: "Paint The World's Mission!",
  statement: 'Our mission is to restore homes, dignity, and hope for individuals and families in need through free and low-cost painting, repairs, and home improvement services.',
  paragraphs: [
    'Paint The World focuses on serving low-income families, seniors, veterans, single parents, individuals with disabilities, and others facing financial hardship who may not have the resources to maintain or improve their homes.',
    'Through skilled craftsmanship, community partnerships, and donations, we work to create safer, more comfortable living spaces while reminding every family we serve that their community has not forgotten them.',
  ],
}

export const impact = {
  title: 'The Impact of Our Work',
  intro: 'We believe everyone deserves to feel proud of the place they call home. Through the power of paint and compassion, we have already invested heavily in our local community! Check the numbers!',
  stats: [
    { value: 15, prefix: '', suffix: '+', label: 'Homes transformed' },
    { value: 100, prefix: '$', suffix: 'k+', label: 'Invested back in the community' },
    { value: 2, prefix: '', suffix: '+', label: 'Years of serving the community' },
    { value: 1, prefix: '', suffix: 'M+', label: 'People in our community online' },
  ],
  ticker: ['Transforming lives', 'Painting a better place', 'Community repairs', 'Free home painting'],
}

export const projects = [
  { before: '/images/projects/before_after_1_before.webp', after: '/images/projects/before_after_1_after.webp', caption: 'Recent project' },
  { before: '/images/projects/impact_white_house_before.webp', after: '/images/projects/impact_white_house_after.webp', caption: 'Recent project' },
  { before: '/images/projects/impact_illinois_st_before.webp', after: '/images/projects/impact_illinois_st_after.webp', caption: 'Illinois St.' },
  { before: '/images/projects/recent_project_2_before.webp', after: '/images/projects/recent_project_2_after.webp', caption: 'Recent project' },
]

export const videos = [
  { id: 'IO07ELdBUsQ', title: 'My Toughest Free Paint Job Yet?', thumb: '/images/projects/yt_toughest.webp' },
  { id: '32gs3uRMENo', title: 'We Painted Her House For Free', thumb: '/images/projects/yt_halloween.webp' },
]

export const gallery = [
  { src: '/images/projects/ms_family.webp', alt: 'Michael with a homeowner in front of her newly painted house' },
  { src: '/images/projects/work_in_progress.webp', alt: 'A house mid-restoration, new siding going up' },
  { src: '/images/projects/impact_white_house_after.webp', alt: 'A freshly painted white house' },
  { src: '/images/projects/before_after_1_after.webp', alt: 'A family on the porch of their repainted home' },
  { src: '/images/projects/recent_project_2_after.webp', alt: 'A bright red door after the paint job' },
  { src: '/images/projects/impact_illinois_st_after.webp', alt: 'A brick home on Illinois St. after restoration' },
]

export const assistance = {
  title: 'Who Qualifies For Assistance',
  disclaimer: 'Meeting the eligibility requirements does not guarantee assistance. Projects are approved based on need, project scope, safety, and available funding. We provide support to individuals and families who meet our community-focused criteria.',
  priorities: [
    'Low-income households',
    'Seniors',
    'Veterans',
    'Individuals with disabilities',
    'Single parent households',
    'Families experiencing financial hardships',
    'Residents of Midland, Texas (50 state campaign coming soon)',
  ],
  services: [
    { title: 'Exterior Painting Transformation', note: 'Main objective', icon: 'paint-roller' },
    { title: 'Exterior Preparation And Repairs', icon: 'hammer' },
    { title: 'Safety Related Home Repairs', icon: 'shield-check' },
    { title: 'Wheelchair Ramps And Accessibility Improvements', icon: 'accessibility' },
    { title: 'Interior Repairs / Accessibility Improvements', icon: 'house' },
  ],
  howTo: 'If you or someone you know is in need of home improvement assistance, submit a request through our contact form and tell us about the homeowner, the property, and the work that is needed. Please include clear photos of the areas that need assistance.',
}

export const donation = {
  title: 'Support Us And Donate Today!',
  intro: 'Your donations fund paint, materials, and full home transformations. This mission is built by everyday people coming together to help families, homes, and communities one project at a time.',
  amounts: [
    { amount: 10, text: 'Paint Supporter' },
    { amount: 20, text: 'You help us start each project' },
    { amount: 50, text: 'You help drive each transformation forward' },
    { amount: 100, text: 'You help make full transformations possible' },
  ],
  closing: {
    title: "Together, We're not just painting homes, We're painting a better world",
    text: 'Whether you donate, sponsor a project, or share our mission, you become part of the change we are creating together. Your support helps us continue painting hope into the lives of others.',
  },
  taxNote: 'Donations are tax deductible.',
}

export const tiers = [
  {
    name: 'Brush Supporter', price: 500, fill: 0.25,
    text: 'Helps Paint The World start covering essential cost such as supplies, and prep materials that help us begin restoring a home for a family in need.',
    perks: ["Logo/Name listed on the foundation website's partner page"],
  },
  {
    name: 'Paint Partner', price: 1500, fill: 0.5,
    text: 'Supports the hands-on work that goes into renewing a home, from surface preparation and painting to materials and repair.',
    perks: ["Logo/Name listed on the foundation website's partner page", 'Tagged in post', 'Logo placement in the end credits on the next available restoration'],
  },
  {
    name: 'Restoration Partner', price: 3500, fill: 0.75,
    text: 'Provides significant support toward a full restoration project. All supplies covered!',
    perks: ["Logo/Name listed on the foundation website's partner page", 'Tagged in post', 'Logo placement in the end credits on the next available restoration', 'Verbal mention and visible logo placement in the intro of the next transformation video'],
  },
  {
    name: 'Transformation Partner', price: 5500, fill: 1,
    text: 'This is the highest level of strategic partnership. Sponsors a full restoration project!',
    perks: ["Exclusive Logo/Name placement on the foundation website's partner page and social media outlets", 'Tagged in post', 'Logo placement in the end credits on the next available restoration', 'Verbal mention and visible logo placement in the intro of the next transformation video', 'Logo on donor shirt of the current year'],
  },
]

export const partners = [
  { name: 'MJ Pro Contractor, LLC', logo: '/images/partners/mj_pro_contractor.webp' },
  { name: 'Graco', logo: '/images/partners/graco.webp' },
  { name: 'Soudal', logo: '/images/partners/soudal.webp' },
  { name: 'Crocodile Cloth', logo: '/images/partners/crocodile_cloth.webp' },
]

export const contact = {
  title: "We'd Love to Hear From You",
  intro: 'Got questions about assistance, or partnering with us? We are here to support you and would love to hear from you.',
  connect: 'Reach out to us with any questions, partnership ideas, or to offer your support. We would love to hear from you as we work together to color lives in our community.',
  subjects: ['Apply For Assistance', 'Donation Support', 'Partnership Proposals', 'Other'],
  responds: "You'll hear back from us within 1–3 business days.",
}
