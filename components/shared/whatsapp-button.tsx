'use client'

import Link from 'next/link'
import { FaWhatsapp } from 'react-icons/fa'

// Add this interface at the top of the file
interface WhatsAppButtonProps {
  className?: string;
}

// Update the component definition
const WhatsAppButton = ({ className }: WhatsAppButtonProps) => {
  return (
    <Link 
      href="https://wa.me/918120007474" 
      className={`fixed bottom-4 right-4 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50 ${className}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
    >
      <FaWhatsapp size={24} />
    </Link>
  )
}

export default WhatsAppButton