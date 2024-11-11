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
  title: "Manual Leaf Spring Assembling Machine",
  specs: "5-20 Ton capacity, All steel fabrication",
  benefits: "Hydraulic operation for leaf spring assembly",
  image: "/images/products/Leaf Spring Assembling Press.webp",
  category: "Assembly",
  details: [
    "Capacity / Power: 5-20 Ton",
    "Key Mechanism / Design: All steel fabrication",
    "Operation Type: Hydraulic",
    "Applications: Leaf spring assembly",
    "Additional Features: Robust steel-fabricated design",
    "Control System: Manual with pressure monitoring",
    "Maximum Material Width: Up to 120mm",
    "Processing Length: Up to 1800mm"
  ],
  description: `Our Manual Leaf Spring Assembling Machine combines robust construction with precise hydraulic control, offering capacities from 5 to 20 tons. Built with all-steel fabrication, this machine ensures reliable and accurate assembly of leaf springs while maintaining operational simplicity and durability.`,
  features: [
    "5-20 Ton variable capacity",
    "All-steel construction",
    "Hydraulic operation system",
    "Manual control interface",
    "Pressure monitoring display",
    "Adjustable assembly settings",
    "Safety interlocking system",
    "Easy maintenance design"
  ],
  gallery: [
    "/images/products/Leaf Spring Assembling Press.webp",
    // Add more images/videos as needed
  ]
} 
export default function ProductPage() {
    const [selectedImage, setSelectedImage] = useState(product.image)
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
                    onClick={() => {
                      setSelectedImage(media);
                    }}
                  >
                    {media.includes('youtube.com') ? (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <Image 
                          src={product.image}
                          alt="Video thumbnail"
                          fill
                          className="object-cover"
                        />
                        <PlayCircle className="absolute text-red-600 w-10 h-10" />
                      </div>
                    ) : (
                      <Image
                        src={media}
                        alt={`${product.title} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                ))}
              </div>
  
              {/* Main Display */}
              <div className="relative aspect-video bg-white rounded-lg overflow-hidden cursor-pointer"
                   onClick={() => setIsImageModalOpen(true)}>
                {selectedImage.includes('youtube.com') ? (
                  <iframe
                    src={selectedImage}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <Image
                    src={selectedImage}
                    alt={product.title}
                    fill
                    className="object-cover"
                    priority
                  />
                )}
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
                <Link href="mailto:gunalan@r-tech.in">
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
              {selectedImage.includes('youtube.com') ? (
                <iframe
                  src={selectedImage}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <Image
                  src={selectedImage}
                  alt={product.title}
                  fill
                  className="object-contain"
                />
              )}
            </div>
          </div>
        )}
      </main>
    )
  }