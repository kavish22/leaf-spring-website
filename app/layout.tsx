import './globals.css'
import type { Metadata } from 'next'
import Header from '@/components/shared/header'
import Footer from '@/components/shared/footer'

export const metadata: Metadata = {
  title: 'Leaf Spring Manufacturing Machinery & Equipment | Complete Product Range',
  description: 'Leading manufacturer of leaf spring machinery: Heavy duty shearing machines, assembly lines, stress shot peening automation, and complete parabolic line solutions. ISO 9001-certified equipment.',
  keywords: 'leaf spring machinery, heavy duty shearing machine, leaf spring assembly lines, stress shot peening automation, parabolic descaler, hydraulic endurance testing machine',
  openGraph: {
    title: 'Leaf Spring Manufacturing Machinery & Equipment',
    description: 'Complete range of leaf spring manufacturing solutions including shearing machines, assembly lines, and automation systems.',
    images: ['/path-to-your-og-image.jpg'],
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}