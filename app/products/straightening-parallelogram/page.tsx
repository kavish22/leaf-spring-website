'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, ChevronRight, PlayCircle } from 'lucide-react'
import WhatsAppButton from '@/components/shared/whatsapp-button'
import Link from 'next/link'

const product = {
  title: "Straightening - Parallelogram",
  specs: "50 Ton capacity, Parallelogram mechanism",
  benefits: "Hydraulic operation for lateral bend correction in hot conditions",
  image: "/images/products/Straighening-Parallelogram.webp",
  category: "Straightening",
  details: [
    "Capacity / Power: 50 Ton",
    "Key Mechanism / Design: Parallelogram mechanism",
    "Operation Type: Hydraulic",
    "Applications: Lateral bend correction",
    "Additional Features: Suitable for hot conditions"
  ],
  description: `The Parallelogram Straightening Machine features an innovative 50-ton capacity system with a specialized parallelogram mechanism. Engineered for hot condition operations, this hydraulic system ensures precise lateral bend correction with its unique geometric design.`,
  features: [
    "50 Ton operating capacity",
    "Parallelogram mechanism design",
    "Hot condition operation",
    "Hydraulic control system",
    "Precision bend correction",
    "Advanced safety features",
    "Robust industrial construction",
    "User-friendly controls"
  ],
  gallery: [
    "/images/products/Straighening-Parallelogram.webp",
    // Add more images/videos as needed
  ]
}

// Rest of the component code remains the same as the template 