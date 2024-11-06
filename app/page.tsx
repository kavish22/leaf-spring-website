'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Award, Shield, Zap, Globe, Gauge, Flame, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

// Add this interface at the top of the file
interface Client {
  name: string;
  logo: string;
}

// Add this component before the HomePage component
const InfiniteClientCarousel = ({ clients }: { clients: Client[] }) => {
  const baseVelocity = -0.5
  const scrollerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    const scrollContent = Array.from(scroller.children)
    
    // Clone items for seamless loop
    scrollContent.forEach(item => {
      const clone = item.cloneNode(true)
      scroller.appendChild(clone)
    })

    let xPos = 0
    let animationFrameId: number

    const animate = () => {
      xPos += baseVelocity

      // Reset position when first set is fully scrolled
      const contentWidth = scrollContent.length * (200 + 24) // card width + gap
      if (Math.abs(xPos) >= contentWidth) {
        xPos = 0
      }

      scroller.style.transform = `translateX(${xPos}px)`
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="overflow-hidden">
      <div
        ref={scrollerRef}
        className="flex gap-6"
        style={{
          width: 'max-content',
          willChange: 'transform'
        }}
      >
        {clients.map((client, index) => (
          <Card 
            key={`client-${index}`}
            className="w-[200px] flex-shrink-0 bg-white hover:shadow-lg transition-shadow duration-300"
          >
            <CardContent className="flex aspect-square items-center justify-center p-6">
              <Image
                src={client.logo}
                alt={client.name}
                width={120}
                height={120}
                className="max-w-full max-h-full object-contain"
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Add this before the HomePage component
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Your Company Name",
  "description": "Manufacturer of leaf spring machinery and equipment",
  "url": "https://yourwebsite.com",
  "productLine": [
    {
      "@type": "Product",
      "name": "Heavy Duty Shearing Machine",
      "category": "Leaf Spring Manufacturing Equipment"
    },
    {
      "@type": "Product",
      "name": "Leaf Spring Assembly Lines",
      "category": "Industrial Manufacturing Equipment"
    }
    // Add more products as needed
  ]
}

// Define products array before productStructuredData
const products = [
  {
    title: "High-Pressure Water Jet Descaler Machine",
    specs: "Operates at 300 BAR, removing 95-99% of scale for better surface quality.",
    category: "Descaling Equipment"
  },
  // Add other products as needed
];

const productStructuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": products.map((product, index) => ({
    "@type": "Product",
    "position": index + 1,
    "name": product.title,
    "description": product.specs,
    "category": product.category,
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock"
    }
  }))
}

export default function HomePage() {
  return (
    <>
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 md:py-32">
          {/* Add a subtle gradient overlay for better text readability */}
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/70 to-black/50" />
          <div className="absolute inset-0 z-0">
            <Image
              src="https://placehold.co/1920x1080/333333/ffffff"
              alt="Hero Background"
              fill
              className="object-cover"
              priority
            />
          </div>
          
          <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center">
            <div className="w-full pr-0 md:pr-12">
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 md:mb-8 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300"
              >
                Complete Leaf Spring Manufacturing Machinery Solutions
              </motion.h1>
              <motion.p className="text-lg sm:text-xl md:text-2xl mb-8 md:mb-10">
                Industry-Leading Heavy Duty Shearing Machines, Assembly Lines, and Stress Shot Peening Automation Systems
              </motion.p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <Link href="#product-showcase" className="inline-flex items-center bg-white text-red-600 border-2 border-red-600 hover:bg-red-600 hover:text-white hover:border-2 hover:border-white transition-colors px-8 py-3 rounded-md font-bold">
                  Explore Our Machinery <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
                <Link href="#contact" className="inline-flex items-center bg-white text-red-600 border-2 border-red-600 hover:bg-red-600 hover:text-white hover:border-2 hover:border-white transition-colors px-8 py-3 rounded-md font-bold">
                  Get In Touch <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Product Showcase */}
        <section id="product-showcase" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-center text-gray-800">
              Leaf Spring Machinery Product Range
            </h2>
            <p className="text-lg md:text-xl mb-12 md:mb-16 text-center text-gray-600">
              Engineered for Reliability and Performance
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  title: "High-Pressure Water Jet Descaler Machine",
                  specs: "Operates at 300 BAR, removing 95-99% of scale for better surface quality.",
                  benefits: "Provides clean surfaces on leaf springs, ideal for tough automotive and industrial environments.",
                  image: "https://placehold.co/400x300",
                  icon: <Gauge className="w-8 h-8 text-red-600" />
                },
                {
                  title: "Heavy-Duty Leaf Spring Shearing Machine",
                  specs: "250-ton capacity, scissor mechanism for precise shearing.",
                  benefits: "Boosts manufacturing efficiency, precisely cuts heavy materials in high-demand industrial setups.",
                  image: "https://placehold.co/400x300",
                  icon: <Shield className="w-8 h-8 text-red-600" />
                },
                {
                  title: "Automated Heat Treatment Furnace",
                  specs: "Customizable temperature control for optimized leaf spring toughness.",
                  benefits: "Enhances durability and strength, meeting global standards for industrial applications.",
                  image: "https://placehold.co/400x300",
                  icon: <Flame className="w-8 h-8 text-red-600" />
                }
              ].map((product, index) => (
                <Card key={index} className="overflow-hidden transition-all duration-300 hover:shadow-xl group">
                  <Image src={product.image} alt={product.title} width={400} height={300} className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105" />
                  <CardHeader>
                    <CardTitle className="flex items-center text-2xl text-gray-800">
                      <span className="mr-3 text-red-600 group-hover:text-red-700 transition-colors">{product.icon}</span>
                      {product.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold mb-2 text-gray-700">{product.specs}</p>
                    <p className="text-gray-600">{product.benefits}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-16">
              <Link href="/products/leaf-spring-machinery" className="inline-flex items-center bg-red-600 text-white border-2 border-red-600 hover:bg-white hover:text-red-600 transition-colors px-8 py-3 rounded-md">
                View All Products <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 md:py-24 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-center text-gray-800">
              Why Choose Our Leaf Spring Manufacturing Machinery
            </h2>
            <p className="text-lg md:text-xl mb-12 md:mb-16 text-center text-gray-600">
              Innovative, Durable, and Certified for Automotive and Heavy-Duty Industries
            </p>
            
            {/* Add relative positioning and border container */}
            <div className="relative">
              {/* Fading borders */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent" />
              <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-red-600 to-transparent" />
              <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-red-600 to-transparent" />
              
              {/* Content with padding to avoid border overlap */}
              <div className="p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                  {[
                    { 
                      title: "ISO 9001-Certified", 
                      icon: <Award className="w-12 h-12 text-red-600" />, 
                      description: "Ensuring consistent quality and reliability in every machine" 
                    },
                    { 
                      title: "Heavy-Duty Design", 
                      icon: <Shield className="w-12 h-12 text-red-600" />, 
                      description: "Built to withstand rigorous industrial applications" 
                    },
                    { 
                      title: "Advanced Technology", 
                      icon: <Zap className="w-12 h-12 text-red-600" />, 
                      description: "Incorporating the latest in manufacturing innovations" 
                    },
                    { 
                      title: "Global Performance", 
                      icon: <Globe className="w-12 h-12 text-red-600" />, 
                      description: "Trusted by industry leaders worldwide" 
                    },
                  ].map((item, index) => (
                    <Card key={index} className="text-center transition-all duration-300 hover:shadow-xl group hover:-translate-y-1 bg-white">
                      <CardHeader>
                        <div className="mx-auto mb-4 transition-transform duration-300 group-hover:scale-110">{item.icon}</div>
                        <CardTitle className="text-2xl text-gray-800">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{item.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-16 md:mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-12">
              {[
                { metric: "98%", description: "Customer Satisfaction Rate" },
                { metric: "90%", description: "Reduction in Downtime" },
                { metric: "50+", description: "Global Clients Served" },
              ].map((item, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-lg text-center transition-all duration-300 hover:shadow-xl hover:bg-red-50">
                  <h3 className="text-5xl font-bold text-red-600 mb-4">{item.metric}</h3>
                  <p className="text-xl text-gray-700">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Client Showcase */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-4 text-center text-gray-800">Trusted by Industry Leaders</h2>
            <p className="text-xl mb-16 text-center text-gray-600">Our clients rely on our machinery for reliable leaf spring manufacturing solutions</p>
            
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
              
              <InfiniteClientCarousel clients={Array.from({ length: 10 }).map((_, index) => ({
                name: `Client ${index + 1}`,
                logo: "https://placehold.co/120x120"
              }))} />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-red-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8">
              Explore Our Full Range of Leaf Spring Manufacturing Solutions
            </h2>
            <Link href="/products" className="inline-flex items-center bg-white text-red-600 border-2 border-red-600 hover:bg-red-600 hover:text-white hover:border-2 hover:border-white transition-colors px-8 py-3 rounded-md font-bold">
              Browse Our Products <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  )
}