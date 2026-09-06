import { HomePage } from '@/components/solace-site'

export default function Page() {
  return <HomePage />
}

export const revalidate = 3600

export const metadata = {
  title: 'Solace Dentalcare | Restoring your beautiful Smile',
  description: 'Professional, affordable and gentle dental care for the whole family in Kampala.',
}

