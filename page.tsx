'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Award, Shield, Zap, Globe, Gauge, Flame, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useEffect, useState } from 'react'
import { cn } from "@/lib/utils"  
import heroImage from '@/public/images/banner-1.png'
import dynamic from 'next/dynamic'

// Dynamically import CountUp with SSR disabled
const CountUp = dynamic(() => import('react-countup'), { 
  ssr: false,
  loading: () => <span>0</span>
})

// Add this interface at the top of the file
interface Client {    
  name: string;
  logo: string;
}

// Add this interface if not already present
interface ProductCard {
  title: string;
  description: string;
  image: string;
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
  }, [baseVelocity])

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
                        bg-white hover:shadow-xl transition-all duration-300 
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

// Add this component before HomePage
const HeroCarousel = ({ products }: { products: ProductCard[] }) => {
  const baseVelocity = -1
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
      const contentWidth = scrollContent.length * (320 + 16) // card width + gap
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
  }, [baseVelocity])

  return (
    <div className="absolute bottom-16 sm:bottom-0 left-0 right-0 overflow-hidden 
                    h-[140px] sm:h-[240px] 
                    bg-gradient-to-t from-black/40 to-transparent">
      <div
        ref={scrollerRef}
        className="flex gap-2 sm:gap-4 py-2 sm:py-4"
        style={{
          width: 'max-content',
          willChange: 'transform'
        }}
      >
        {products.map((product, index) => (
          <div 
            key={`product-${index}`} 
            className="flex-shrink-0 
                     w-[180px] sm:w-[320px] 
                     h-[120px] sm:h-[200px] 
                     bg-black/40 backdrop-blur-sm 
                     border border-white/40 rounded-lg overflow-hidden 
                     transition-all duration-300"
          >
            <div className="flex flex-col h-full">
              <div className="relative w-full h-[80px] sm:h-[140px] flex-shrink-0">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain opacity-90 transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />
              </div>
              
              <div className="flex-1 p-1.5 sm:p-2.5 bg-gradient-to-t from-black/60 to-black/30">
                <h3 className="text-red-500 text-[11px] sm:text-sm font-medium mb-0.5 
                             transition-colors duration-300 line-clamp-1">
                  {product.title}
                </h3>
                <p className="text-gray-300/80 text-[9px] sm:text-xs line-clamp-1 sm:line-clamp-2">
                  {product.description}
                </p>
              </div>
            </div>
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
  console.log('Hero Image:', heroImage);

  // Add this product data
  const heroProducts = [
    {
      title: "High-Pressure Water Jet Descaler",
      description: "300 BAR system for 95% scale removal",
      image: "/images/5s.png"
    },
    {
      title: "Heavy-Duty Shearing Machine",
      description: "250-ton hydraulic shearing for large sections",
      image: "/images/6s.png"
    },
    {
      title: "Leaf Spring Assembly Line",
      description: "50-ton automated system with quality control",
      image: "/images/7s.png"
    },
    {
      title: "Multi Station Press",
      description: "100T/200T/100T/100T press for forming operations",
      image: "/images/2s.png"
    },
    {
      title: "Eye Milling Machine",
      description: "Precision milling with 0.5-2.0mm stock capacity",
      image: "/images/1s.png"
    },
    {
      title: "Hockey Puck Bending Machine",
      description: "25+25+50 Ton system for lateral bend correction",
      image: "/images/3s.png"
    },
    {
      title: "Eye Grinding Machine",
      description: "High-precision grinding for eye ends",
      image: "/images/4s.png"
    }
  ]

  // Add state management for video
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Add video loading and play handling
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      console.log('Video loaded');
      setIsVideoLoaded(true);
      
      // Try to play the video
      const playVideo = async () => {
        try {
          await video.play();
          console.log('Video playing');
          setIsVideoPlaying(true);
        } catch (error) {
          console.error("Video autoplay failed:", error);
          // If autoplay fails, we keep showing the image
          setIsVideoPlaying(false);
        }
      };

      playVideo();
    };

    const handleError = (error: any) => {
      console.error("Video loading error:", error);
      setIsVideoLoaded(false);
      setIsVideoPlaying(false);
    };

    const handlePlaying = () => {
      console.log('Video is now playing');
      setIsVideoPlaying(true);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);
    video.addEventListener('playing', handlePlaying);

    // Try to load the video immediately
    if (video.readyState >= 3) {
      handleLoadedData();
    }

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
      video.removeEventListener('playing', handlePlaying);
    };
  }, []);

  return (
    <>
      <main className="bg-gradient-to-b from-gray-50 to-white w-full overflow-x-hidden">
        {/* Hero Section - Updated mobile styles */}
        <section className="relative h-[100vw] sm:h-[calc(100vh-4rem)] flex items-center overflow-hidden bg-gray-900 pt-16 sm:pt-16">
          {/* Video Container - With mobile CTA buttons */}
          <div className="absolute inset-0">
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              className={cn(
                "absolute inset-0 w-full h-full object-cover transition-opacity duration-700",
                "sm:object-center", // Desktop centered
                "object-[95%_center]", // Mobile: show more of the right side
                isVideoPlaying ? "opacity-100" : "opacity-0"
              )}
              poster="/images/video-poster.jpg"
            >
              <source 
                src="/videos/hero-background.mp4" 
                type="video/mp4"
                media="all"
              />
              Your browser does not support the video tag.
            </video>

            {/* Mobile CTA buttons - Positioned at bottom right of video */}
            <div className="sm:hidden absolute bottom-6 right-4 z-20 flex flex-row gap-2">
              <Link 
                href="#product-showcase" 
                className="group inline-flex items-center justify-center 
                          bg-gradient-to-br from-red-600 to-red-700
                          hover:from-red-700 hover:to-red-800
                          text-[9px] font-semibold text-white
                          px-2 py-1
                          rounded-lg
                          border border-red-500/50
                          shadow-lg shadow-black/20"
              >
                Explore 
                <ChevronRight className="ml-1 h-2 w-2 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>

              <Link 
                href="/contact" 
                className="group inline-flex items-center justify-center 
                          bg-white/10 hover:bg-white/15 backdrop-blur-sm
                          text-[9px] font-semibold text-white
                          px-2 py-1
                          rounded-lg
                          border border-white/20
                          shadow-lg shadow-black/10"
              >
                Contact 
                <ChevronRight className="ml-1 h-2 w-2 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          {/* Existing overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40 sm:bg-black/30" />
          
          {/* Lighter vignette effect */}
          <div className="absolute inset-0 bg-radial-gradient pointer-events-none" 
               style={{
                 background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.2) 100%)'
               }} 
          />

          {/* Optional: Add a subtle light overlay for better text contrast */}
          <div className="absolute inset-0 mix-blend-soft-light bg-gradient-to-br from-neutral-400/10 to-neutral-900/10" />

          {/* Updated text overlay with repositioned mobile CTAs */}
          <div className="container mx-auto px-4 relative z-10 -mt-48 sm:-mt-64 md:-mt-72">
            <div className="max-w-3xl relative">
              {/* Mobile-only badge */}
              <div className="sm:hidden mb-3">
                <span className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 
                                rounded-full px-3 py-1 text-[10px] font-medium tracking-wider 
                                text-white/90 uppercase">
                  Premium Manufacturing Solutions
                </span>
              </div>

              {/* Desktop badge remains unchanged */}
              <div className="hidden sm:inline-block mb-2 sm:mb-3">
                <span className="text-[9px] sm:text-sm font-semibold tracking-wider uppercase 
                               px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/10 backdrop-blur-sm 
                               border border-white/20 text-white/90">
                  Industry Leading Manufacturing Solutions
                </span>
              </div>

              <h1 className="text-left sm:text-left">
                <span className="text-[28px] sm:text-4xl md:text-5xl lg:text-6xl font-bold 
                               bg-clip-text text-transparent bg-gradient-to-r 
                               from-white via-white to-gray-300
                               animate-gradient inline-block sm:inline
                               leading-[1.2] tracking-tight">
                  Complete Leaf Spring
                </span>
                <span className="block mt-1 sm:mt-2 
                               text-[26px] sm:text-4xl md:text-5xl lg:text-6xl font-bold
                               bg-clip-text text-transparent bg-gradient-to-r 
                               from-white/90 via-white/90 to-gray-300/90
                               leading-[1.4] tracking-tight
                               pb-1">
                  Manufacturing Machinery
                </span>
              </h1>

              <p className="text-[13px] sm:text-base md:text-lg 
                           mb-5 sm:mb-8 
                           text-gray-300/90 max-w-2xl 
                           leading-relaxed font-medium 
                           backdrop-blur-[2px] text-left sm:text-left
                           tracking-wide">
                Industry-Leading Heavy Duty Shearing Machines, Assembly Lines, and High Pressure Descaler
              </p>

              {/* Desktop CTA buttons remain unchanged */}
              <div className="hidden sm:flex flex-row gap-4 items-center justify-start">
                <Link 
                  href="#product-showcase" 
                  className="group flex-none sm:flex-none inline-flex items-center justify-center 
                            bg-gradient-to-br from-red-600 to-red-700
                            hover:from-red-700 hover:to-red-800
                            text-[11px] sm:text-sm font-semibold text-white
                            px-4 sm:px-6 py-2.5 sm:py-3 
                            rounded-lg sm:rounded-full
                            border border-red-500/50
                            shadow-lg shadow-black/20"
                >
                  Explore Our Machinery 
                  <ChevronRight className="ml-1.5 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4 
                                      transition-transform duration-300 
                                      group-hover:translate-x-0.5" />
                </Link>

                <Link 
                  href="/contact" 
                  className="group flex-none sm:flex-none inline-flex items-center justify-center 
                            bg-white/10 hover:bg-white/15 backdrop-blur-sm
                            text-[11px] sm:text-sm font-semibold text-white
                            px-4 sm:px-6 py-2.5 sm:py-3 
                            rounded-lg sm:rounded-full
                            border border-white/20
                            shadow-lg shadow-black/10"
                >
                  Get In Touch 
                  <ChevronRight className="ml-1.5 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4 
                                      transition-transform duration-300 
                                      group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Add the carousel - Hide on mobile */}
          <div className="hidden sm:block">
            <HeroCarousel products={heroProducts} />
          </div>
        </section>

        {/* Mobile-only Product Carousel Section - Black background */}
        <section className="block sm:hidden bg-black h-[calc(100vh-100vw)]">
          <div className="container mx-auto h-full flex items-center">
            <div className="overflow-hidden">
              <div
                className="flex gap-3 animate-scroll"
                style={{
                  width: 'max-content',
                  willChange: 'transform'
                }}
              >
                {[...heroProducts, ...heroProducts].map((product, index) => (
                  <div 
                    key={`product-${index}`} 
                    className="w-[140px] flex-shrink-0"
                  >
                    <div className="rounded-xl overflow-hidden 
                                  hover:shadow-xl transition-all duration-300 
                                  hover:-translate-y-1 flex flex-col
                                  border-2 border-white/40">
                      <div className="relative w-full h-[90px] bg-black/10 backdrop-blur-[2px]">
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                      
                      <div className="p-2 bg-white">
                        <h3 className="text-red-900 text-[10px] font-semibold mb-0.5 line-clamp-1">
                          {product.title}
                        </h3>
                        <p className="text-gray-700 text-[8px] line-clamp-2">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Product Showcase Section - Increased top spacing */}
        <section id="product-showcase" className="pt-16 pb-16 md:pt-20 md:pb-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white/50 backdrop-blur-sm" />
          <div className="container mx-auto px-4 relative">
            <div className="text-center mb-8 md:mb-12">
              <div className="inline-block">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-800 leading-tight pb-2">
                  <span className="block md:hidden">
                    LEAF SPRING MACHINERY<br />
                    PRODUCT RANGE
                  </span>
                  <span className="hidden md:block">
                    Leaf Spring Machinery Product Range
                  </span>
                </h2>
                <div className="h-1 bg-gradient-to-r from-red-600 to-red-800 mt-1 mx-auto w-[200px]">
                  <div className="h-px bg-red-600/20 transform translate-y-1"></div>
                </div>
              </div>
              <p className="text-base md:text-lg text-gray-600 mt-4">
                Engineered for Reliability and Performance
              </p>
            </div>

            {/* Product cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {[
                {
                  title: "High-Pressure Water Jet Descaler Machine",
                  specs: "Operates at 300 BAR, removing 95-99% of scale for better surface quality.",
                  benefits: "Provides clean and decarb free surfaces on the rolled leaf, loss of profile is avoided, Endurance life of the leaf improved.",
                  image: "/images/products/High Pressure De-scaler.webp",
                  link: "/products/high-pressure-de-scaler"
                },
                {
                  title: "Heavy-Duty Leaf Spring Shearing Machine",
                  specs: "250-ton capacity, robust scissor mechanism for precise and efficient shearing.",
                  benefits: "Thickness up to 32mm possible, Hydraulic shearing enables higher tooling life.",
                  image: "/images/products/Heavy Duty Shearing Machine.webp",
                  link: "/products/heavy-duty-shearing-machine"
                },
                {
                  title: "Hydraulic Endurance Testing",
                  specs: "20-ton capacity, CNC servo control for precise and efficient load testing.",
                  benefits: "Efficiently facilitates load and endurance testing with a durable custom cylinder.",
                  image: "/images/products/Hydraulic Endurance Testing.webp",
                  link: "/products/hydraulic-endurance-testing"
                }
              ].map((product, index) => (
                <Link href={product.link} key={index}>
                  <Card 
                    className="overflow-hidden bg-white border border-red-600/60 rounded-xl 
                              shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)]
                              transition-all duration-300 ease-out
                              hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)]
                              hover:border-red-600/40"
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
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* View All Products Button */}
        <div className="-mt-20 md:-mt-28 py-2 md:py-4 bg-gradient-to-b from-white to-gray-50 relative z-10">
          <div className="container mx-auto px-4">
            <div className="text-center mt-2 md:mt-4 mb-4 md:mb-8">
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

        {/* Why Choose Us Section - Adjusted spacing */}
        <section className="py-4 md:py-10 relative bg-black">
          <div className="absolute inset-0" style={subtlePattern} />
          <div className="absolute inset-0 bg-gradient-to-br from-black/90 to-black/80" />
          
          <div className="container mx-auto px-4 relative">
            <div className="max-w-5xl mx-auto text-center mb-4 mt-8 md:mt-8 md:mb-16">
              <div className="inline-block">
                <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-[28px] font-bold mb-2 sm:mb-3 text-white leading-tight pb-1 sm:pb-2 px-4 sm:px-6 text-center">
                  <span className="block sm:hidden text-[20px] leading-tight text-center mx-auto">
                    WHY CHOOSE OUR LEAF SPRING<br />
                    MANUFACTURING MACHINERY
                  </span>
                  <span className="hidden sm:block text-center mx-auto">
                    Why Choose Our Leaf Spring Manufacturing Machinery
                  </span>
                </h2>
                <div className="h-1 bg-gradient-to-r from-white to-white/80 mt-1 mx-auto w-[200px]">
                  <div className="h-px bg-white/20 transform translate-y-1"></div>
                </div>
              </div>
              <p className="text-xs sm:text-base md:text-lg text-gray-300 leading-relaxed mt-3 sm:mt-4 mx-auto text-center">
                Innovative, Durable, and Certified for Automotive Industries
              </p>
            </div>
            
            {/* Feature Cards */}
            <div className="relative mt-8">
              {/* Fading borders */}
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
        <section className="pt-12 pb-24 md:pt-16 md:pb-32 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="inline-block">
                <h2 className="text-4xl md:text-5xl font-bold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-700 leading-[1.3] pb-2">
                  TRUSTED BY INDUSTRY LEADERS
                </h2>
                <div className="h-1 bg-gradient-to-r from-red-600 to-red-800 mt-1 mx-auto w-[200px]">
                  <div className="h-px bg-red-600/20 transform translate-y-1"></div>
                </div>
              </div>
              <p className="text-xl mb-16 text-center text-gray-600 mt-4">
                Our clients rely on our machinery for reliable leaf spring manufacturing solutions
              </p>
              
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 hidden md:block" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 hidden md:block" />
                
                <InfiniteClientCarousel clients={clients} />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Refined mobile typography and buttons */}
        <section className="py-12 md:py-24 bg-gradient-to-br from-gray-900 to-red-900 text-white relative overflow-hidden">
          <div className="absolute inset-0" style={heroPattern} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/20" />
          
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="space-y-4 md:space-y-6">
                <span className="inline-block text-red-300 text-[11px] md:text-sm font-semibold tracking-wider uppercase px-2.5 py-1.5 bg-white/5 rounded-full backdrop-blur-sm border border-white/10">
                  Ready to Transform Your Manufacturing?
                </span>
                
                <h2 className="text-[22px] md:text-4xl font-bold text-white leading-[1.2] max-w-3xl mx-auto">
                  Explore Our Full Range of
                  <span className="block mt-1 text-[18px] md:text-3xl text-gray-100">Solutions for Leaf Spring Manufacturing</span>
                </h2>

                <div className="h-1 bg-gradient-to-r from-white to-white/80 mx-auto w-[200px]">
                  <div className="h-px bg-white/20 transform translate-y-1"></div>
                </div>
              </div>

              <p className="text-xs md:text-base text-gray-200 max-w-2xl mx-auto leading-relaxed mt-4 md:mt-6 mb-6 md:mb-8">
                Discover our comprehensive selection of high-quality machinery designed for optimal performance and reliability.
              </p>

              <div className="flex flex-col sm:flex-row gap-2.5 justify-center items-center mt-4 md:mt-6">
                <Button 
                  asChild
                  variant="outline"
                  className="w-full sm:w-auto bg-transparent hover:bg-white/5
                             border border-white/20 hover:border-white/30
                             transition-all duration-300 text-[11px] md:text-sm font-medium
                             px-4 py-1.5 md:px-5 md:py-2 h-auto rounded
                             shadow-lg shadow-black/5 hover:shadow-black/10
                             hover:translate-y-px group"
                >
                  <Link href="/products" className="flex items-center justify-center gap-1.5 md:gap-2">
                    Browse Our Products
                    <ChevronRight className="h-2.5 w-2.5 md:h-3 md:w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                </Button>
                <Button 
                  asChild
                  variant="outline"
                  className="w-full sm:w-auto bg-transparent hover:bg-white/5
                             border border-white/20 hover:border-white/30
                             transition-all duration-300 text-[11px] md:text-sm font-medium
                             px-4 py-1.5 md:px-5 md:py-2 h-auto rounded
                             shadow-lg shadow-black/5 hover:shadow-black/10
                             hover:translate-y-px group"
                >
                  <Link href="/contact" className="flex items-center justify-center gap-1.5 md:gap-2">
                    Contact Our Team
                    <ChevronRight className="h-2.5 w-2.5 md:h-3 md:w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                </Button>
              </div>
            </div>
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