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
  specs: "Up to 60mm diameter, 4000mm length capacity",
  benefits: "Advanced parallelogram design for superior straightening accuracy",
  image: "/images/products/straightening-parallelogram.webp",
  category: "Straightening",
  details: [
    "Capacity / Power: Up to 60mm diameter",
    "Key Mechanism / Design: Parallelogram roller configuration",
    "Operation Type: Automatic with precision control",
    "Applications: Heavy-duty bar and tube straightening",
    "Additional Features: 4000mm length capacity, Multi-roller system",
    "Control System: PLC-based with touch interface",
    "Straightening Speed: Variable, up to 30m/min",
    "Power Requirements: 380V/50Hz, 3-phase"
  ],
  description: `Our Parallelogram Straightening Machine represents the pinnacle of straightening technology, 
  handling materials up to 60mm in diameter and 4000mm in length. The unique parallelogram roller configuration 
  ensures superior straightening accuracy while minimizing material stress, making it ideal for demanding 
  industrial applications.`,
  features: [
    "60mm maximum diameter capacity",
    "4000mm length handling capability",
    "Parallelogram roller arrangement",
    "Advanced pressure control system",
    "Multiple straightening passes",
    "Automated material handling",
    "Quick-change roller system",
    "Safety interlocking mechanism"
  ],
  gallery: [
    "/images/products/Straighening-Parallelogram.webp",
    "/images/products/straightening-parallelogram-2.webp",
    "/images/products/straightening-parallelogram-3.webp"
  ]
}

export default function ProductPage() {
  const [selectedImage, setSelectedImage] = useState(product.gallery[0])
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/products" className="hover:text-red-600">Products</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900">{product.title}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-4">
              {product.gallery.map((media, index) => (
                <div
                  key={index}
                  className={`relative aspect-video bg-white rounded-lg overflow-hidden cursor-pointer border-2 
                    ${selectedImage === media ? 'border-red-600' : 'border-gray-200'}`}
                  onClick={() => setSelectedImage(media)}
                >
                  <Image
                    src={media}
                    alt={`${product.title} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Main Display */}
            <div className="relative aspect-video bg-white rounded-lg overflow-hidden cursor-pointer"
                 onClick={() => setIsImageModalOpen(true)}>
              <Image
                src={selectedImage}
                alt={product.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-4 bg-red-600 text-white">{product.category}</Badge>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
              <p className="text-gray-600">{product.description}</p>
            </div>

            {/* Specifications */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Technical Specifications</h2>
              <ul className="space-y-3">
                {product.details.map((detail, index) => (
                  <li key={index} className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{detail}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Key Features */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Key Features</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <ChevronRight className="h-5 w-5 text-red-600 flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Contact Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white" asChild>
                <Link href="/contact">
                  <Phone className="mr-2 h-4 w-4" />
                  Contact Sales
                </Link>
              </Button>
              <Button className="flex-1 text-red-600 border-red-600 hover:bg-red-50" variant="outline" asChild>
                <Link href="mailto:sales@example.com">
                  <Mail className="mr-2 h-4 w-4" />
                  Email Inquiry
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {isImageModalOpen && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsImageModalOpen(false)}
        >
          <div className="relative w-full max-w-4xl aspect-video">
            <Image
              src={selectedImage}
              alt={product.title}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </main>
  )
} 