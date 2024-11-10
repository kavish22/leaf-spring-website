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
  title: "Mechanical Straightening Machine",
  specs: "Max 180 Ton, High stroke frequency machine",
  benefits: "Mechanical operation with 48 cycles per minute and 22 KW power",
  image: "/images/products/Cold straightening image.webp",
  category: "Straightening",
  details: [
    "Capacity / Power: Max 180 Ton",
    "Key Mechanism / Design: High stroke frequency",
    "Operation Type: Mechanical",
    "Applications: Straightening of parts",
    "Additional Features: 48 cycles per minute, 22 KW power"
  ],
  description: `Our Mechanical Straightening Machine delivers powerful 180-ton capacity with high-frequency stroke operations. Featuring a 22 KW power system and achieving 48 cycles per minute, this machine combines speed with precision for efficient straightening operations.`,
  features: [
    "180 Ton maximum capacity",
    "48 cycles per minute",
    "22 KW power system",
    "High-frequency operation",
    "Precision straightening control",
    "Robust mechanical design",
    "Advanced safety features",
    "Industrial-grade durability"
  ],
  gallery: [
    "/images/products/Cold straightening image.webp",
    // Add more images/videos as needed
  ]
}

// Rest of the component code remains the same as the template 