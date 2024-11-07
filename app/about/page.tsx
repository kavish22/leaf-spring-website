'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, BookOpen, Clock, Cog, Eye, Globe, Heart, Lightbulb, Shield, Star, Target, Truck, Users } from 'lucide-react'
import WhatsAppButton from '@/components/shared/whatsapp-button'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Suspense } from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import { ErrorBoundary } from 'react-error-boundary'

const coreValues = [
  { icon: <Shield className="h-8 w-8 text-red-500" />, title: "Quality", description: "Uncompromising commitment to excellence in every machine we produce." },
  { icon: <Lightbulb className="h-8 w-8 text-red-500" />, title: "Innovation", description: "Constantly pushing the boundaries of leaf spring technology." },
  { icon: <Users className="h-8 w-8 text-red-500" />, title: "Customer Focus", description: "Tailoring our solutions to meet and exceed client expectations." },
  { icon: <Heart className="h-8 w-8 text-red-500" />, title: "Integrity", description: "Honesty and transparency in all our business dealings." },
]

const timelineEvents = [
  { year: 1990, title: "Foundation", description: "LEAFSPRINGS was established with a vision to revolutionize leaf spring manufacturing." },
  { year: 2000, title: "Global Expansion", description: "Expanded operations to serve international markets across 20 countries." },
  { year: 2010, title: "Innovation Milestone", description: "Launched our patented high-efficiency leaf spring forming technology." },
  { year: 2020, title: "Industry 4.0 Integration", description: "Implemented AI and IoT solutions in our manufacturing processes." },
]

// Define the testimonial type first
type Testimonial = {
  author: string;
  company: string;
  content: string;
}

// Update the testimonials array type
const testimonials: Testimonial[] = [
  { author: "Alex Thompson", company: "AutoTech Industries", content: "LEAFSPRINGS has been instrumental in optimizing our production line. Their innovative solutions have significantly improved our efficiency." },
  { author: "Maria Garcia", company: "Global Motors", content: "The quality and reliability of LEAFSPRINGS machinery are unmatched. They've been a crucial partner in our manufacturing success." },
  { author: "Chris Lee", company: "EcoVehicles", content: "Working with LEAFSPRINGS has helped us stay at the forefront of sustainable vehicle manufacturing. Their expertise is truly invaluable." },
  { author: "Sarah Johnson", company: "TruckPro Manufacturing", content: "The precision and durability of LEAFSPRINGS machines have revolutionized our production capabilities. Outstanding service and support." },
  { author: "David Chen", company: "Pacific Auto Parts", content: "We've seen a 40% increase in productivity since implementing LEAFSPRINGS solutions. Their technology is truly game-changing." },
  { author: "Emma Williams", company: "European Motors", content: "LEAFSPRINGS' commitment to innovation and quality has made them our go-to partner for all leaf spring manufacturing needs." },
  { author: "Michael Brown", company: "Advanced Auto", content: "The customer support from LEAFSPRINGS is exceptional. They're always available to help optimize our manufacturing processes." },
  { author: "Lisa Zhang", company: "Global Transport", content: "Since implementing LEAFSPRINGS machinery, our production efficiency has improved dramatically. A truly reliable partner." },
  { author: "James Wilson", company: "Elite Motors", content: "LEAFSPRINGS' innovative solutions have helped us maintain our competitive edge in the market. Excellent quality and service." },
]

const LoadingSkeleton = () => (
  <div className="space-y-4 p-6">
    <Skeleton className="h-8 w-1/3" />
    <Skeleton className="h-32 w-full" />
    <Skeleton className="h-32 w-full" />
  </div>
)

const ErrorFallback = () => (
  <div className="text-center py-10">
    <p>Something went wrong. Please try again later.</p>
  </div>
)

// Add this new component for mobile timeline item
const TimelineItem = ({ event, index }: { event: typeof timelineEvents[0], index: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="relative pl-8 pb-8 last:pb-0"
  >
    {/* Timeline line */}
    <div className="absolute left-[7px] top-0 bottom-0 w-[2px] bg-red-200" />
    
    {/* Timeline dot */}
    <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-red-600 shadow-md border-2 border-white" />
    
    {/* Content */}
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 border border-gray-100">
      <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold text-red-600 bg-red-50 mb-2">
        {event.year}
      </span>
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
        {event.title}
      </h3>
      <p className="text-gray-600 text-sm sm:text-base">
        {event.description}
      </p>
    </div>
  </motion.div>
);

// Add this component near the top of the file
const InfiniteTestimonialCarousel = ({ testimonials }: { testimonials: Testimonial[] }) => {
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
      const contentWidth = scrollContent.length * (384 + 24) // card width + gap
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
        {testimonials.map((testimonial: typeof testimonials[0], index: number) => (
          <Card 
            key={`testimonial-${index}`}
            className="w-[384px] flex-shrink-0 bg-white hover:shadow-xl transition-shadow duration-300"
          >
            <CardContent className="p-6 sm:p-8 flex flex-col h-full">
              {/* Quote Icon */}
              <div className="text-red-100 mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Rating Stars */}
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              
              {/* Testimonial Content */}
              <p className="text-gray-700 text-base leading-relaxed mb-6">
                "{testimonial.content}"
              </p>
              
              {/* Author Info */}
              <div className="mt-auto pt-4 border-t border-gray-100">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 font-bold text-lg">
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-red-600">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default function AboutPage() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])
  const [activeTab, setActiveTab] = useState("story")
  const [isLoading, setIsLoading] = useState(false)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [currentSet, setCurrentSet] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSet((prev) => (prev === 0 ? 1 : 0))
    }, 5000)
    
    return () => clearInterval(timer)
  }, [])

  const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false)
    
    useEffect(() => {
      const toggleVisibility = () => {
        window.pageYOffset > 500 ? setIsVisible(true) : setIsVisible(false)
      }
      window.addEventListener('scroll', toggleVisibility)
      return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])
    
    return isVisible && (
      <Button 
        className="fixed bottom-4 right-4 z-50"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ↑
      </Button>
    )
  }

  const handleImageLoad = () => {
    setImagesLoaded(true)
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <main>
        {/* Dynamic Hero Section */}
        <section className="relative h-[60vh] sm:h-[calc(100vh-56px)] flex items-center justify-center overflow-hidden">
          <motion.div 
            className="absolute inset-0 z-0 bg-gray-900"
            style={{ opacity, scale }}
          >
            <Image
              src="https://placehold.co/1920x1080"
              alt="LEAFSPRINGS Manufacturing Plant"
              fill
              className="object-cover opacity-60"
              priority
            />
          </motion.div>
          <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-8 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Shaping the Future of Leaf Spring Technology
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              With over three decades of innovation, LEAFSPRINGS continues to lead the industry in precision, efficiency, and reliability.
            </motion.p>
          </div>
        </section>

        {/* Company Overview - Our Journey of Excellence */}
        <section className="py-16 sm:py-24 bg-white" aria-labelledby="company-overview">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Our Journey of Excellence
              </h2>
              <p className="text-gray-600">
                Discover how we've been shaping the future of leaf spring manufacturing through innovation, 
                quality, and unwavering commitment to excellence.
              </p>
            </div>

            <Tabs defaultValue="story" className="w-full max-w-7xl mx-auto">
              {/* Tabs Navigation */}
              <TabsList className="flex justify-center mb-12 bg-transparent">
                {[
                  { value: 'story', icon: <BookOpen className="w-5 h-5" />, label: 'Our Story' },
                  { value: 'vision', icon: <Eye className="w-5 h-5" />, label: 'Vision' },
                  { value: 'innovation', icon: <Lightbulb className="w-5 h-5" />, label: 'Innovation' },
                  { value: 'quality', icon: <Shield className="w-5 h-5" />, label: 'Quality' }
                ].map((tab) => (
                  <TabsTrigger 
                    key={tab.value}
                    value={tab.value}
                    className="inline-flex items-center gap-3 px-8 py-4 text-base font-medium
                      data-[state=active]:bg-red-600 data-[state=active]:text-white
                      data-[state=inactive]:bg-gray-50 data-[state=inactive]:text-gray-600
                      hover:bg-red-50 transition-all duration-300"
                  >
                    {tab.icon}
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Common Tab Content Layout */}
              {['story', 'vision', 'innovation', 'quality'].map((tabValue) => (
                <TabsContent key={tabValue} value={tabValue}>
                  <div className="grid lg:grid-cols-12 gap-12 items-center">
                    {/* Content Column */}
                    <div className="lg:col-span-5 space-y-8">
                      {/* Dynamic Content based on tab */}
                      {tabValue === 'story' && (
                        <>
                          <div>
                            <h3 className="text-3xl font-bold mb-4">Three Decades of Excellence</h3>
                            <p className="text-gray-600 text-lg">
                              Since 1990, we've been pioneering innovations in leaf spring manufacturing, 
                              setting industry standards and delivering excellence worldwide.
                            </p>
                          </div>
                          <div className="grid grid-cols-2 gap-6">
                            {[
                              { number: "30+", label: "Years of Excellence" },
                              { number: "50+", label: "Countries Served" },
                              { number: "1000+", label: "Machines Delivered" },
                              { number: "24/7", label: "Customer Support" }
                            ].map((stat, index) => (
                              <div key={index} className="bg-gray-50 p-6 rounded-xl">
                                <div className="text-3xl font-bold text-red-600 mb-1">{stat.number}</div>
                                <div className="text-sm text-gray-600">{stat.label}</div>
                              </div>
                            ))}
                          </div>
                        </>
                      )}

                      {tabValue === 'vision' && (
                        <>
                          <div>
                            <h3 className="text-3xl font-bold mb-4">Shaping Tomorrow's Manufacturing</h3>
                            <p className="text-gray-600 text-lg mb-8">
                              Our vision extends beyond current capabilities, driving innovation 
                              and sustainability in global manufacturing.
                            </p>
                          </div>
                          <div className="space-y-6">
                            {[
                              { title: "Global Leadership", desc: "Setting worldwide standards in manufacturing excellence" },
                              { title: "Sustainable Future", desc: "Committed to eco-friendly manufacturing processes" },
                              { title: "Innovation Hub", desc: "Continuous development of cutting-edge technologies" }
                            ].map((item, index) => (
                              <div key={index} className="bg-gray-50 p-6 rounded-xl">
                                <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                                <p className="text-gray-600">{item.desc}</p>
                              </div>
                            ))}
                          </div>
                        </>
                      )}

                      {tabValue === 'innovation' && (
                        <>
                          <div>
                            <h3 className="text-3xl font-bold mb-4">Pioneering Smart Manufacturing</h3>
                            <p className="text-gray-600 text-lg mb-8">
                              Leveraging Industry 4.0 technologies to revolutionize manufacturing 
                              with unprecedented precision.
                            </p>
                          </div>
                          <div className="space-y-6">
                            {[
                              { title: "AI Integration", desc: "Smart manufacturing processes with real-time optimization" },
                              { title: "IoT Solutions", desc: "Connected systems for seamless operation monitoring" },
                              { title: "Automation", desc: "Advanced robotics for precision manufacturing" }
                            ].map((item, index) => (
                              <div key={index} className="bg-gray-50 p-6 rounded-xl border-l-4 border-red-600">
                                <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                                <p className="text-gray-600">{item.desc}</p>
                              </div>
                            ))}
                          </div>
                        </>
                      )}

                      {tabValue === 'quality' && (
                        <>
                          <div>
                            <h3 className="text-3xl font-bold mb-4">Uncompromising Quality Standards</h3>
                            <p className="text-gray-600 text-lg mb-8">
                              Our commitment to quality is reflected in every machine we produce, 
                              backed by rigorous testing.
                            </p>
                          </div>
                          <div className="grid grid-cols-2 gap-6">
                            {[
                              { icon: <Shield className="w-8 h-8" />, title: "ISO 9001:2015" },
                              { icon: <Award className="w-8 h-8" />, title: "100% Testing" },
                              { icon: <Users className="w-8 h-8" />, title: "Expert Team" },
                              { icon: <Target className="w-8 h-8" />, title: "Zero Defect" }
                            ].map((item, index) => (
                              <div key={index} className="bg-gray-50 p-6 rounded-xl text-center">
                                <div className="text-red-600 mb-3 flex justify-center">{item.icon}</div>
                                <h4 className="font-semibold text-gray-900">{item.title}</h4>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>

                    {/* Image Column */}
                    <div className="lg:col-span-7">
                      <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                          src={`/images/${tabValue}-image.jpg`} // Replace with your actual images
                          alt={`LEAFSPRINGS ${tabValue}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-700"
                          priority
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Our Core Values</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {coreValues.map((value, index) => (
                <Card key={index} className="bg-white">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div  className="mb-4">{value.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Company Timeline */}
        <section className="py-12 sm:py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.h2 
              className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Our Journey Through Time
            </motion.h2>

            {/* Desktop Timeline (hidden on mobile) */}
            <div className="hidden sm:block relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-red-200">
                {timelineEvents.map((_, index) => (
                  <div 
                    key={index}
                    className="absolute w-4 h-4 bg-red-600 rounded-full transform -translate-x-1/2 border-2 border-white shadow-md"
                    style={{ top: `${(index * 25) + 12}%` }}
                  />
                ))}
              </div>
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={index}
                  className={`flex flex-col sm:flex-row ${
                    index % 2 === 0 ? 'sm:justify-start' : 'sm:justify-end'
                  } mb-8 sm:mb-16`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className={`w-full sm:w-5/12 ${
                    index % 2 === 0 
                      ? 'sm:text-right sm:pr-8' 
                      : 'sm:text-left sm:pl-8'
                  }`}>
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                      <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold text-red-600 bg-red-50 mb-2">
                        {event.year}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {event.title}
                      </h3>
                      <p className="text-gray-600">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mobile Timeline (hidden on desktop) */}
            <div className="sm:hidden">
              {timelineEvents.map((event, index) => (
                <TimelineItem key={index} event={event} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 sm:py-20 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                What Our Clients Say
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Discover why leading manufacturers trust LEAFSPRINGS for their machinery needs
              </p>
            </div>
            
            <div className="relative">
              {/* Gradient overlays */}
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-100 to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-100 to-transparent z-10" />
              
              {/* Testimonials carousel */}
              <InfiniteTestimonialCarousel testimonials={testimonials} />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24 bg-red-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 px-4">
              Ready to Transform Your Leaf Spring Manufacturing?
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
              <Link 
                href="/contact" 
                className="inline-flex items-center bg-white text-red-600 border-2 border-red-600 hover:bg-red-600 hover:text-white hover:border-2 hover:border-white transition-colors px-8 py-3 rounded-md font-bold"
              >
                Contact Sales <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
              <Link 
                href="/products" 
                className="inline-flex items-center bg-white text-red-600 border-2 border-red-600 hover:bg-red-600 hover:text-white hover:border-2 hover:border-white transition-colors px-8 py-3 rounded-md font-bold"
              >
                View Products <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <WhatsAppButton />
      <ScrollToTop />
    </ErrorBoundary>
  )
}