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
    // TODO: Add exact address when available
    address: '[Clinic address - Kampala, Uganda]',
    // TODO: Add coordinates for Google Maps when available
    coordinates: {
      lat: 0.3476,
      lng: 32.5825,
    },
  },
  contact: {
    // TODO: Add actual phone number
    phone: '[Clinic phone number]',
    // TODO: Add WhatsApp number - keep here for easy updates
    whatsapp: '[WhatsApp number for inquiries]',
    // TODO: Add actual email
    email: '[clinic@solacedentalcare.ug]',
  },
  social: {
    // TODO: Add actual social media links when available
    facebook: '',
    instagram: '',
    linkedin: '',
    twitter: '',
  },
  hours: {
    weekday: {
      open: '08:00 AM',
      close: '05:00 PM',
    },
    saturday: {
      open: '09:00 AM',
      close: '02:00 PM',
    },
    sunday: 'Closed',
  },
  // Site configuration
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ||
    'https://solacedentalcare.vercel.app',
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
    id: 'lead-dentist',
    name: '[Lead Dentist Name]',
    role: 'Lead Dentist & Clinic Director',
    qualifications: '[BDS, Dental Specialization]',
    bio: '[Add professional biography when available]',
    // TODO: Add actual photo path when available
    image: null,
  },
  {
    id: 'associate-dentist',
    name: '[Associate Dentist Name]',
    role: 'General Dentist',
    qualifications: '[BDS]',
    bio: '[Add professional biography when available]',
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
