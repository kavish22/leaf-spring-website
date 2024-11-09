'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Award, Shield, Zap, Globe, Gauge, Flame, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useEffect } from 'react'
import { cn } from "@/lib/utils"

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
    <div className="overflow-hidden p-4">
      <div
        ref={scrollerRef}
        className="flex gap-8"
        style={{
          width: 'max-content',
          willChange: 'transform'
        }}
      >
        {clients.map((client, index) => (
          <div key={`client-${index}`} className="flex-shrink-0">
            <Card 
              className="w-[200px] h-[200px] border-2 border-red-900 rounded-xl overflow-hidden 
                        bg-gradient-to-br from-white to-red-50 hover:shadow-xl transition-all duration-300 
                        hover:border-red-800 group hover:-translate-y-1 hover:shadow-red-900/10"
            >
              <CardContent className="w-full h-full p-4">
                <div className="w-full h-full flex items-center justify-center border-2 border-red-900/50 
                              rounded-lg bg-white p-4 group-hover:border-red-800/50 
                              transition-all duration-300">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    width={140}
                    height={140}
                    className="max-w-full max-h-full object-contain opacity-90 group-hover:opacity-100 
                              transition-opacity duration-300 drop-shadow-sm"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
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

// Update the clients array before the HomePage component
const clients = [
  { name: "Client 1", logo: "/images/clients/client (1).webp" },
  { name: "Client 2", logo: "/images/clients/client (2).webp" },
  { name: "Client 3", logo: "/images/clients/client (3).webp" },
  { name: "Client 4", logo: "/images/clients/client (4).webp" },
  { name: "Client 5", logo: "/images/clients/client (5).webp" },
  { name: "Client 6", logo: "/images/clients/client (6).webp" },
  { name: "Client 7", logo: "/images/clients/client (7).webp" },
  { name: "Client 8", logo: "/images/clients/client (8).webp" },
  { name: "Client 9", logo: "/images/clients/client (9).webp" },
];

const heroPattern = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
};

// Add a new subtle pattern overlay
const subtlePattern = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E")`,
};

export default function HomePage() {
  return (
    <>
      <main className="bg-gradient-to-b from-gray-50 to-white w-full overflow-x-hidden">
        {/* Hero Section - Enhanced */}
        <section className="relative h-[60vh] sm:h-[calc(100vh-56px)] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/90 to-black/85" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
            <div className="absolute inset-0" style={subtlePattern} />
          </div>
          
          {/* Background image with subtle animation */}
          <div className="absolute inset-0 z-0 scale-105">
            <div className="h-full w-full">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
            </div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-300">
                  Complete Leaf Spring Manufacturing Machinery Solutions
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 text-gray-200 max-w-2xl leading-relaxed">
                Industry-Leading Heavy Duty Shearing Machines, Assembly Lines, and Stress Shot Peening Automation Systems
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center">
                <Link 
                  href="#product-showcase" 
                  className="group w-full sm:w-auto inline-flex items-center justify-center bg-red-600 text-white border-2 border-red-600 hover:bg-red-700 hover:border-red-700 transition-all duration-300 px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg hover:shadow-red-600/30"
                >
                  Explore Our Machinery 
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link 
                  href="/contact" 
                  className="group w-full sm:w-auto inline-flex items-center justify-center bg-white/10 text-white border-2 border-white/20 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg"
                >
                  Get In Touch 
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                
                {/* Social proof - Only show on larger screens */}
                <div className="hidden lg:flex items-center gap-4 ml-6 text-white/80">
                  <div className="w-px h-8 bg-white/20" />
                  <div>
                    <div className="flex -space-x-1.5">
                      {[1, 2, 3, 4].map((i) => (
                        <div 
                          key={i} 
                          className="w-6 h-6 rounded-full border-2 border-red-600 bg-white/10 backdrop-blur-sm"
                        />
                      ))}
                    </div>
                    <p className="text-xs mt-1.5">Trusted by 500+ Companies</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Showcase Section - Adjusted spacing */}
        <section id="product-showcase" className="pt-8 pb-16 md:pt-12 md:pb-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white/50 backdrop-blur-sm" />
          <div className="container mx-auto px-4 relative">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-800 leading-[1.3] pb-2">
                Leaf Spring Machinery Product Range
              </h2>
              <p className="text-lg md:text-xl text-gray-600">
                Engineered for Reliability and Performance
              </p>
            </div>

            {/* Product cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {[
                {
                  title: "High-Pressure Water Jet Descaler Machine",
                  specs: "Operates at 300 BAR, removing 95-99% of scale for better surface quality.",
                  benefits: "Provides clean surfaces on leaf springs, ideal for tough automotive and industrial environments.",
                  image: "/images/products/Descaler.webp"
                },
                {
                  title: "Heavy-Duty Leaf Spring Shearing Machine",
                  specs: "250-ton capacity, robust scissor mechanism for precise and efficient shearing.",
                  benefits: "Boosts manufacturing efficiency, precisely cuts heavy materials in high-demand industrial setups.",
                  image: "/images/products/Shearing.webp"
                },
                {
                  title: "Automated Heat Treatment Furnace",
                  specs: "Customizable temperature control for optimized leaf spring toughness.",
                  benefits: "Enhances durability and strength, meeting global standards for industrial applications.",
                  image: "/images/products/heat-furnace.webp"
                }
              ].map((product, index) => (
                <Card 
                  key={index} 
                  className="overflow-hidden bg-white border border-gray-100 rounded-xl 
                            shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)]
                            transition-all duration-300 ease-out
                            hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)]"
                >
                  <div className="relative h-[300px] overflow-hidden">
                    <Image 
                      src={product.image} 
                      alt={product.title} 
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                  
                  <CardHeader className="space-y-4 pb-2">
                    <CardTitle className="text-xl font-bold tracking-tight text-gray-900 leading-tight text-left">
                      {product.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-red-600 text-left">
                        Specifications
                      </h4>
                      <p className="text-sm text-gray-700 leading-relaxed text-left">
                        {product.specs}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-red-600 text-left">
                        Key Benefits
                      </h4>
                      <p className="text-sm text-gray-700 leading-relaxed text-left">
                        {product.benefits}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* View All Products Button - Adjusted spacing */}
        <div className="-mt-20 md:-mt-28 py-4 md:py-6 bg-gradient-to-b from-white to-gray-50 relative z-10">
          <div className="container mx-auto px-4">
            <div className="text-center mt-4 md:mt-6">
              <Link 
                href="/products" 
                className="inline-flex items-center justify-center bg-red-600 text-white border-2 border-red-600 
                          hover:bg-red-700 hover:border-red-700 transition-colors px-8 py-3 rounded-md 
                          font-semibold shadow-lg hover:shadow-red-100"
              >
                View All Products <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section - Enhanced */}
        <section className="py-20 md:py-32 relative bg-black">
          <div className="absolute inset-0" style={subtlePattern} />
          <div className="absolute inset-0 bg-gradient-to-br from-black/90 to-black/80" />
          
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl mx-auto text-center mb-4 md:mb-6">
              <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">
                Why Choose Our Leaf Spring Manufacturing Machinery
              </h2>
              <p className="text-lg md:text-xl text-gray-300">
                Innovative, Durable, and Certified for Automotive and Heavy-Duty Industries
              </p>
            </div>
            
            {/* Feature Cards */}
            <div className="relative">
              {/* Fading borders - adjusted for dark theme */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
              <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-gray-700 to-transparent" />
              <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-gray-700 to-transparent" />
              
              {/* Content with improved padding and layout */}
              <div className="p-6 md:p-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
                  {[
                    { 
                      title: "ISO Certified", 
                      icon: <Award className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-red-500" />, 
                      description: "Quality assured manufacturing" 
                    },
                    { 
                      title: "Heavy-Duty", 
                      icon: <Shield className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-red-500" />, 
                      description: "Built for industrial use" 
                    },
                    { 
                      title: "Advanced Tech", 
                      icon: <Zap className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-red-500" />, 
                      description: "Latest innovations" 
                    },
                    { 
                      title: "Global Reach", 
                      icon: <Globe className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-red-500" />, 
                      description: "Worldwide trusted" 
                    },
                  ].map((item, index) => (
                    <Card 
                      key={index} 
                      className="text-center transition-all duration-300 hover:shadow-2xl group bg-black/60 backdrop-blur-md border border-gray-800/50 rounded-xl overflow-hidden"
                    >
                      <CardHeader className="space-y-3 pb-2 md:pb-4 px-2 md:px-6">
                        <div className="mx-auto rounded-full bg-gray-900 p-2 md:p-3 transition-transform duration-300 group-hover:scale-110 group-hover:bg-gray-800 border border-gray-800 shadow-sm">
                          {item.icon}
                        </div>
                        <CardTitle className="text-base md:text-xl lg:text-2xl text-gray-100 line-clamp-1">
                          {item.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="px-2 md:px-6">
                        <p className="text-xs md:text-sm lg:text-base text-gray-400 line-clamp-2 min-h-[2.5rem] md:min-h-0">
                          {item.description}
                        </p>
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
                <div 
                  key={index} 
                  className="bg-black/50 backdrop-blur-sm border border-gray-800 shadow-[0_0_1px_rgba(255,255,255,0.1)] p-8 rounded-lg text-center transition-all duration-300 hover:shadow-xl hover:bg-gray-800"
                >
                  <h3 className="text-5xl font-bold text-red-500 mb-4">{item.metric}</h3>
                  <p className="text-xl text-gray-300">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Client Showcase - Enhanced */}
        <section className="pt-12 pb-24 md:pt-16 md:pb-32 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-700 leading-[1.3] pb-2">
                Trusted by Industry Leaders
              </h2>
              <p className="text-xl mb-16 text-center text-gray-600">
                Our clients rely on our machinery for reliable leaf spring manufacturing solutions
              </p>
              
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
                
                <InfiniteClientCarousel clients={clients} />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Updated to match Join Our Team style */}
        <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-br from-gray-900 to-red-900 text-white relative">
          <div className="absolute inset-0" style={heroPattern} />
          <div className="container mx-auto px-4 text-center relative">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-white">
              Explore Our Full Range of Leaf Spring Manufacturing Solutions
            </h2>
            <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-12 max-w-3xl mx-auto text-gray-100">
              Discover our comprehensive selection of high-quality machinery designed for optimal performance and reliability.
            </p>
            <Button 
              variant="default" 
              size="lg" 
              className="bg-white hover:bg-gray-100 text-red-600 transition-colors text-base sm:text-lg px-6 sm:px-8 py-2.5 sm:py-3" 
              asChild
            >
              <Link href="/products">Browse Our Products</Link>
            </Button>
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