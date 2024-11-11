'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = ['Home', 'Products', 'About', 'Team', 'Contact']

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const getHref = (item: string) => {
    return item.toLowerCase() === 'home' ? '/' : `/${item.toLowerCase()}`
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 transition-all duration-300">
      <nav className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Link href="/" className="text-xl md:text-2xl font-bold text-red-600 transition-colors hover:text-red-700">
          <div>
            LEAF SPRING MACHINES
            <div className="text-xs text-gray-600 font-normal">Engineered for Excellence</div>
          </div>
        </Link>
        <ul className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <li key={item}>
              <Link href={getHref(item)} className="text-gray-600 hover:text-red-600 transition-colors text-lg font-medium">
                {item}
              </Link>
            </li>
          ))}
        </ul>
        <Button className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
          <Menu className="h-6 w-6" />
        </Button>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-full sm:w-80 bg-white shadow-lg z-50 overflow-y-auto"
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-8">
                <span className="text-2xl font-bold text-gray-900">Menu</span>
                <Button 
                  className="p-2 hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <ul className="space-y-4">
                {navItems.map((item) => (
                  <li key={item}>
                    <Link
                      href={getHref(item)}
                      className="block text-gray-600 hover:text-red-600 transition-colors text-lg font-medium py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}