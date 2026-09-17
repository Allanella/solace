// Centralized clinic configuration
// Update these values to reflect Solace Dentalcare's actual information

export const CLINIC_CONFIG = {
  name: 'Solace Dentalcare',
  tagline: 'Restoring your beautiful Smile',
  description:
    'Professional, affordable and gentle dental care for the whole family in Kampala.',
  established: 2016,
  location: {
    city: 'Kampala',
    country: 'Uganda',
    address: 'Najera 11, opposite Najera 11 Central Market',
    mapsLabel: 'Solace Dentalcare Clinic Najeera II',
    mapsUrl: 'https://maps.app.goo.gl/mh9GayDXqkjTdizS7',
    coordinates: {
      lat: 0.389641763911584,
      lng: 32.623060574037545,
    },
    // Real "Embed a map" src, extracted from Google Maps share dialog.
    mapsEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7260616735975!2d32.623060574037545!3d0.389641763911584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177db1c069a097a9%3A0xf407071d6323742b!2sSolace%20dentalcare%20clinic%20Najeera%20II!5e0!3m2!1sen!2sug!4v1789641641028!5m2!1sen!2sug',
  },
  contact: {
    phone: '+256 763 496 878',
    phoneSecondary: '+256 703 195 685',
    officeLine: '+256 200 999 135',
    whatsapp: '+256 703 195 685',
    email: 'solacedentalcare2023@gmail.com',
    emergency: null,
  },
  social: {
    facebook: '',
    instagram: '',
    tiktok: 'https://www.tiktok.com/@solacedentalcare',
    linkedin: '',
    twitter: '',
  },
  // Google Business / Maps share link — used for "View on Google" and
  // "Google reviews" links across the site.
  googleBusinessUrl: 'https://maps.app.goo.gl/mh9GayDXqkjTdizS7',
  hours: {
    mondayToSaturday: {
      label: 'Monday – Saturday',
      open: '08:00 AM',
      close: '08:00 PM',
    },
    sunday: {
      label: 'Sunday',
      open: '09:00 AM',
      close: '02:00 PM',
    },
  },
  // Site configuration
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ||
    'https://solacedentalcare.vercel.app',
  // Real reviews copied from the Solace Dentalcare Google Business profile.
  reviews: [
    {
      id: 'daniel-omara',
      name: 'Daniel Omara',
      rating: 5,
      text:
        'The first time I went to Solace Dentalcare Clinic, I was stunned by the level of hygiene and professionalism from the point of contact at the reception by Nurse Sophia Nansubuga, who was very polite and attentive to each of us, the patients…',
      relativeTime: '6 months ago',
    },
    {
      id: 'myr-sharyah',
      name: 'myr sharyah',
      rating: 5,
      text: 'Best dental services, best patient care and amazing dentists. Thank you Dr. Peter and team.',
      relativeTime: '2 years ago',
    },
    {
      id: 'namanda-juliet',
      name: 'Namanda Juliet',
      rating: 5,
      text: 'They offer perfect service forever, you should visit them one day.',
      relativeTime: '6 days ago',
    },
  ] as {
    id: string
    name: string
    rating: number
    text: string
    relativeTime: string
  }[],
}

export const NAVIGATION = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Our Team', href: '/team' },
  { label: 'FAQs', href: '/faqs' },
  { label: 'Contact', href: '/contact' },
]

export const SERVICES = [
  {
    id: 'preventive',
    name: 'Preventive Care',
    description:
      'Keep your smile healthy with regular cleanings and checkups.',
    icon: 'Shield',
    items: [
      'Regular Checkups',
      'Professional Cleaning',
      'Fluoride Treatments',
      'Sealants',
      'Oral Health Education',
    ],
  },
  {
    id: 'restorative',
    name: 'Restorative Services',
    description: 'Restore damaged teeth and improve functionality.',
    icon: 'Wrench',
    items: [
      'Fillings',
      'Crowns',
      'Bridges',
      'Root Canals',
      'Dentures',
      'Implants',
    ],
  },
  {
    id: 'cosmetic',
    name: 'Cosmetic Dentistry',
    description: 'Enhance your smile with cosmetic treatments.',
    icon: 'Sparkles',
    items: [
      'Teeth Whitening',
      'Veneers',
      'Smile Design',
      'Bonding',
      'Orthodontics Consultation',
    ],
  },
]

export const POPULAR_SERVICES = [
  {
    id: 'cleaning',
    name: 'Professional Cleaning',
    description: 'Remove plaque and tartar buildup for a fresh, clean mouth.',
    icon: 'Sparkles',
    benefits: ['Prevents cavities', 'Fresh breath', 'Healthy gums'],
  },
  {
    id: 'whitening',
    name: 'Teeth Whitening',
    description: 'Brighten your smile with professional whitening treatments.',
    icon: 'Lightbulb',
    benefits: ['Instant results', 'Safe and effective', 'Long-lasting'],
  },
  {
    id: 'checkup',
    name: 'Routine Checkup',
    description:
      'Comprehensive oral health examination to detect issues early.',
    icon: 'Search',
    benefits: ['Early detection', 'Prevention', 'Peace of mind'],
  },
]

export const TRUST_POINTS = [
  {
    title: 'Experienced Professionals',
    description: 'Experienced dental professionals focused on quality treatment.',
    icon: 'Award',
  },
  {
    title: 'Patient-Centered Care',
    description: 'A patient-centered environment designed to make dental visits more comfortable.',
    icon: 'Heart',
  },
  {
    title: 'Family Focused',
    description: 'Dental care for both children and adults with a warm, welcoming approach.',
    icon: 'Users',
  },
  {
    title: 'Affordable Care',
    description:
      'Professional dental services designed to remain accessible to our community.',
    icon: 'DollarSign',
  },
  {
    title: 'Modern Technology',
    description:
      'Use of modern dental techniques and equipment for superior results.',
    icon: 'Zap',
  },
  {
    title: 'Complete Services',
    description:
      'Preventive, restorative and cosmetic services under one roof.',
    icon: 'CheckCircle',
  },
]

export const VALUES = [
  {
    title: 'Quality Care',
    description: 'Commitment to excellence in every treatment and interaction.',
    icon: 'Crown',
  },
  {
    title: 'Patient Trust',
    description: 'Building lasting relationships based on trust and transparency.',
    icon: 'Shield',
  },
  {
    title: 'Compassion',
    description: 'Treating every patient with warmth, empathy, and understanding.',
    icon: 'Heart',
  },
  {
    title: 'Innovation',
    description: 'Adopting modern techniques and technology for better outcomes.',
    icon: 'Zap',
  },
]

export const TEAM_MEMBERS = [
  {
    id: 'dr-peter',
    name: 'Dr. Peter',
    role: 'Lead Dentist & Clinic Director',
    qualifications: 'BDS — Dental Surgeon',
    bio: 'Leads the clinical team at Solace Dentalcare, with a focus on gentle, thorough treatment for patients of all ages.',
    image: null,
  },
  {
    id: 'nurse-sophia',
    name: 'Nurse Sophia Nansubuga',
    role: 'Patient Care & Front Desk',
    qualifications: 'Registered Nurse',
    bio: 'Often the first friendly face you meet at Solace Dentalcare, known for her warm welcome and attentive care.',
    image: null,
  },
  {
    id: 'dental-hygienist',
    name: '[Dental Hygienist Name]',
    role: 'Dental Hygienist',
    qualifications: '[Dental Hygiene Certification]',
    bio: '[Add professional biography when available]',
    image: null,
  },
]

export const APPOINTMENT_STEPS = [
  {
    step: 1,
    title: 'Schedule Your Visit',
    description: 'Choose a convenient appointment time that works for you.',
  },
  {
    step: 2,
    title: 'Meet Our Team',
    description: 'Discuss your dental concerns with a professional.',
  },
  {
    step: 3,
    title: 'Get Recommendations',
    description: 'Receive personalized recommendations for your oral health.',
  },
  {
    step: 4,
    title: 'Begin Your Journey',
    description: 'Start your path toward better oral health and a confident smile.',
  },
]

export const FAQ_ITEMS = [
  {
    id: 'frequency',
    question: 'How often should I visit the dentist?',
    answer:
      'We recommend visiting for a checkup and cleaning at least twice a year. However, patients with specific dental concerns may need more frequent visits. Please contact Solace Dentalcare to discuss your individual needs.',
  },
  {
    id: 'children',
    question: 'Do you provide dental care for children?',
    answer:
      'Yes, we specialize in family dental care and have experience treating children of all ages. We create a warm, welcoming environment to help children feel comfortable during their visits. Please contact us to schedule your child\'s first appointment.',
  },
  {
    id: 'emergency',
    question: 'Do you handle dental emergencies?',
    answer:
      'Please contact Solace Dentalcare immediately if you have a dental emergency. We will do our best to accommodate urgent cases as quickly as possible.',
  },
  {
    id: 'insurance',
    question: 'Do you accept dental insurance?',
    answer:
      'Please contact Solace Dentalcare to confirm which insurance plans we accept and to verify your coverage.',
  },
  {
    id: 'whitening',
    question: 'Is teeth whitening safe?',
    answer:
      'Professional teeth whitening is safe when performed by trained dental professionals. Our team uses proven techniques to brighten your smile while protecting your teeth. Contact us to learn more about our whitening options.',
  },
  {
    id: 'cost',
    question: 'What are your pricing options?',
    answer:
      'We are committed to providing affordable, quality dental care. For specific pricing information on services, please contact Solace Dentalcare directly.',
  },
]