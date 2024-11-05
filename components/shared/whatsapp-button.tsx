'use client'

import Link from 'next/link'
import { FaWhatsapp } from 'react-icons/fa'

export default function WhatsAppContact() {
  return (
    <Link 
      href="https://wa.me/1234567890" 
      className="fixed bottom-4 right-4 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
    >
      <FaWhatsapp size={24} />
    </Link>
  )
}