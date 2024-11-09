'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Award, Shield, Zap, Globe, Gauge, Flame, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from "framer-motion"
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
            className="w-[200px] flex-shrink-0 bg-white hover:shadow-lg transition-shadow duration-300 border border-red-600"
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

export default function HomePage() {
  const { scrollYProgress } = useScroll({
    axis: 'y'
  })
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  return (
    <>
      <main className="bg-gradient-to-b from-gray-50 to-white w-full overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
          {/* Enhanced gradient overlay */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            {/* Add subtle pattern overlay */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("/patterns/grid.svg")' }} />
          </div>
          
          {/* Background image with subtle animation */}
          <div className="absolute inset-0 z-0 scale-105">
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
              className="h-full w-full"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
            </motion.div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 leading-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-300">
                    Complete Leaf Spring Manufacturing Machinery Solutions
                  </span>
                </h1>
              </motion.div>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 text-gray-200 max-w-2xl leading-relaxed"
              >
                Industry-Leading Heavy Duty Shearing Machines, Assembly Lines, and Stress Shot Peening Automation Systems
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center"
              >
                <Link 
                  href="#product-showcase" 
                  className="group w-full sm:w-auto inline-flex items-center justify-center bg-red-600 text-white border-2 border-red-600 hover:bg-red-700 hover:border-red-700 transition-all duration-300 px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg hover:shadow-red-600/30"
                >
                  Explore Our Machinery 
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link 
                  href="#contact" 
                  className="group w-full sm:w-auto inline-flex items-center justify-center bg-white/10 text-white border-2 border-white/20 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg"
                >
                  Get In Touch 
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                
                {/* Social proof - Only show on larger screens */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="hidden lg:flex items-center gap-4 ml-6 text-white/80"
                >
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
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Product Showcase Section */}
        <section id="product-showcase" className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-800 leading-[1.3] pb-2">
                Leaf Spring Machinery Product Range
              </h2>
              <p className="text-lg md:text-xl mb-6 md:mb-8 text-center text-gray-600">
                Engineered for Reliability and Performance
              </p>
              {/* Product cards grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
                    className="overflow-hidden transition-all duration-300 hover:shadow-xl bg-white border-0 shadow-lg h-full"
                  >
                    <div className="relative h-[300px]">
                      <Image 
                        src={product.image} 
                        alt={product.title} 
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
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
            </motion.div>
          </div>
        </section>

        {/* View All Products Button - Adjusted spacing */}
        <div className="-mt-16 md:-mt-24 py-4 md:py-6 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mt-4 md:mt-6"
            >
              <Link 
                href="/products/leaf-spring-machinery" 
                className="inline-flex items-center justify-center bg-red-600 text-white border-2 border-red-600 hover:bg-white hover:text-red-600 transition-colors px-8 py-3 rounded-md font-semibold shadow-lg hover:shadow-red-100"
              >
                View All Products <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <section className="py-16 md:py-24 relative bg-black">
          {/* Enhanced decorative elements */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 left-0 w-96 h-96 bg-red-600 rounded-full blur-[128px]" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-800 rounded-full blur-[128px]" />
          </div>
          
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
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
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
                      className="text-center transition-all duration-300 hover:shadow-xl group bg-black/50 backdrop-blur-sm border border-gray-800 shadow-[0_0_1px_rgba(255,255,255,0.1)]"
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
        <section className="py-24 md:py-32 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
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
            </motion.div>
          </div>
        </section>

        {/* CTA Section - Enhanced */}
        <section className="py-24 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-700 via-red-600 to-red-700" />
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("/patterns/circuit.svg")' }} />
          
          <div className="container mx-auto px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center text-white"
            >
              <h2 className="text-2xl md:text-4xl font-bold mb-6 md:mb-8">
                Explore Our Full Range of Leaf Spring Manufacturing Solutions
              </h2>
              <Link href="/products" className="inline-flex items-center bg-white text-red-600 border-2 border-red-600 hover:bg-red-600 hover:text-white hover:border-2 hover:border-white transition-colors px-6 md:px-8 py-2 md:py-3 rounded-md font-bold text-sm md:text-base">
                Browse Our Products <ChevronRight className="ml-2 h-3 w-3 md:h-4 md:w-4" />
              </Link>
            </motion.div>
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