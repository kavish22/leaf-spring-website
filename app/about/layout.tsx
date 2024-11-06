import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About LEAFSPRINGS - Leading Leaf Spring Manufacturing Solutions',
  description: 'Learn about LEAFSPRINGS\'s journey, values, and commitment to innovation in leaf spring manufacturing technology.',
  openGraph: {
    title: 'About LEAFSPRINGS',
    description: 'Leading Leaf Spring Manufacturing Solutions',
    images: ['/path-to-og-image.jpg'],
  }
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 