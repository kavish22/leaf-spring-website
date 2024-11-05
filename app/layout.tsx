import { Inter } from 'next/font/google'
import Header from '@/components/shared/header'
import Footer from '@/components/shared/footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'LEAFSPRINGS',
  description: 'Engineered for excellence in leaf spring machinery',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}