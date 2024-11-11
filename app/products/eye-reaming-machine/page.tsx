'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, PlayCircle, Phone, Mail } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// Product data
const product = {
  title: "Eye Reaming Machine",
  category: "Eye Processing",
  description: "Advanced eye reaming machine designed for precise and efficient processing of leaf spring eyes. Features automated control systems and adjustable reaming parameters for optimal performance.",
  image: "/images/products/Eye Reaming Machine.webp",
  gallery: [
    "/images/products/Eye Reaming Machine.webp",
    "/images/products/Eye Reaming-1.png",
    "/images/products/Eye Reaming-2.png",
    "/images/products/Eye Reaming-3.png",
    "https://www.youtube.com/embed/gZ49yp2zo0I?rel=0",



    // Add more images once available
  ],
  specs: "Reaming diameter: 20-80mm, Hydraulic operation",
  benefits: "Automated control with 200 pieces per hour capacity",
  details: [
    "Processing capacity: Up to 200 pieces per hour",
    "Reaming diameter range: 20-80mm",
    "Spindle speed: 0-1000 RPM",
    "Automatic feeding system",
    "Digital control panel with parameter display",
    "Hydraulic clamping mechanism",
    "Power supply: 380V/50Hz, 3 Phase",
    "Machine dimensions: 2000 x 1500 x 1800mm"
  ],
  features: [
    "Precision reaming operation",
    "Quick-change tooling system",
    "Automatic lubrication",
    "Safety interlocking system",
    "Low maintenance design",
    "User-friendly controls",
    "Minimal setup time",
    "High durability components"
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
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={85}
                  className="object-cover"
                  priority
                  onError={(e) => {
                    console.error('Error loading image:', selectedImage);
                    e.currentTarget.src = '/images/placeholder.jpg'; // Add a placeholder image
                  }}
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
