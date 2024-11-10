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
  title: "Eye Reaming Machine",
  specs: "Max eye dia: 60mm, VFD speed adjustment",
  benefits: "Hydraulic operation for bush reaming with separate coolant system",
  image: "/images/products/Eye reaming machine image.webp",
  category: "Reaming",
  details: [
    "Capacity / Power: Max eye dia: 60mm",
    "Key Mechanism / Design: VFD speed adjustment, hydraulic feed",
    "Operation Type: Hydraulic",
    "Applications: Bush reaming",
    "Additional Features: Separate coolant system, fixturing for applications"
  ],
  description: `Our Eye Reaming Machine combines precision VFD speed control with hydraulic feed for superior bush reaming operations. Capable of handling eye diameters up to 60mm, this machine features a dedicated coolant system and specialized fixturing for optimal performance.`,
  features: [
    "60mm maximum eye diameter",
    "VFD speed control system",
    "Hydraulic feed mechanism",
    "Dedicated coolant system",
    "Custom fixturing options",
    "Precision reaming control",
    "Advanced safety features",
    "Industrial-grade construction"
  ],
  gallery: [
    "/images/products/Eye reaming machine image.webp",
    // Add more images/videos as needed
  ]
}

// Rest of the component code remains the same as the template 