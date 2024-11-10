'use client'

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, FileText } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import WhatsAppButton from '@/components/shared/whatsapp-button'
import { motion } from 'framer-motion'

const productData = {
  title: "Straightening Machine",
  specs: "7-Roll design, 0.3-12mm material thickness",
  benefits: "High precision straightening, adjustable pressure, versatile material handling",
  image: "/images/products/Straightening.webp",
  media: [
    { type: 'image' as const, url: "/images/products/Straightening.webp" },
    { type: 'image' as const, url: "/images/products/Straightening-2.jpg" },
  ],
  category: "Material Processing",
  details: [
    "Roll Configuration: 7-Roll system",
    "Material Thickness: 0.3-12mm",
    "Material Width: Up to 2000mm",
    "Speed: Variable speed control",
    "Drive System: Independent motor drive",
    "Control: Digital control panel",
    "Adjustment: Micrometric adjustment system",
    "Applications: Sheet metal, plates, coils"
  ]
}

export default function ProductPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative pt-16 pb-12 sm:pb-16 lg:pb-24 bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Media Gallery */}
            <div className="w-full lg:w-1/2">
              {/* Add your media gallery component here */}
            </div>
            
            {/* Product Info */}
            <div className="w-full lg:w-1/2 text-white">
              <Badge className="mb-4 bg-red-600/90">{productData.category}</Badge>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                {productData.title}
              </h1>
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Specifications</h2>
                  <p className="text-gray-300">{productData.specs}</p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">Benefits</h2>
                  <p className="text-gray-300">{productData.benefits}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">Technical Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {productData.details.map((detail, index) => (
              <div key={index} className="flex items-start gap-2">
                <ChevronRight className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">{detail}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-gray-900 to-red-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            Interested in this Machine?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Contact us to learn more about specifications, pricing, and customization options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="default" 
              size="lg" 
              className="bg-white hover:bg-gray-100 text-red-600"
              asChild
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white/10"
            >
              <FileText className="mr-2 h-5 w-5" />
              Download Brochure
            </Button>
          </div>
        </div>
      </section>

      <WhatsAppButton />
    </main>
  )
}