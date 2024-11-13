'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, BookOpen, Clock, Cog, Eye, Globe, Heart, Lightbulb, Shield, Star, Target, Truck, Users, ChevronDown } from 'lucide-react'
import WhatsAppButton from '@/components/shared/whatsapp-button'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Suspense } from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import { ErrorBoundary } from 'react-error-boundary'

const coreValues = [
  { 
    icon: <Shield className="h-10 w-10 text-red-500" />, 
    title: "Quality", 
    description: "Uncompromising commitment to excellence in every machine we produce.",
    bgClass: "bg-red-50" 
  },
  { 
    icon: <Lightbulb className="h-10 w-10 text-blue-500" />, 
    title: "Innovation", 
    description: "Constantly pushing the boundaries of leaf spring technology.",
    bgClass: "bg-blue-50"
  },
  { 
    icon: <Users className="h-10 w-10 text-green-500" />, 
    title: "Customer Focus", 
    description: "Tailoring our solutions to meet and exceed client expectations.",
    bgClass: "bg-green-50"
  },
  { 
    icon: <Heart className="h-10 w-10 text-purple-500" />, 
    title: "Integrity", 
    description: "Honesty and transparency in all our business dealings.",
    bgClass: "bg-purple-50"
  },
]

const timelineEvents = [
  { year: 1990, title: "Foundation", description: "LEAFSPRINGS was established with a vision to revolutionize leaf spring manufacturing." },
  { year: 2000, title: "Global Expansion", description: "Expanded operations to serve international markets across 10 countries." },
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
            className="w-[384px] flex-shrink-0 bg-red-600 hover:bg-red-700 transition-colors duration-300 border-none"
          >
            <CardContent className="p-6 sm:p-8 flex flex-col h-full">
              {/* Quote Icon */}
              <div className="text-white/40 mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Rating Stars */}
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-5 h-5 text-yellow-300 fill-current"
                  />
                ))}
              </div>
              
              {/* Testimonial Content */}
              <p className="text-white/90 text-base leading-relaxed mb-6">
                "{testimonial.content}"
              </p>
              
              {/* Author Info */}
              <div className="mt-auto pt-4 border-t border-red-500/30">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center border-2 border-white/20">
                    <span className="text-white font-bold text-lg">
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-white">{testimonial.author}</p>
                    <p className="text-sm text-white/70">{testimonial.company}</p>
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

  // Update the image URLs for the tabs
  const tabImages = {
    story: "/images/a1-card.jpeg",
    vision: "/images/a2-card.jpeg",
    innovation: "/images/a3-card.jpeg",
    quality: "/images/a4-card.jpeg",
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <main>
        {/* Updated Hero Section */}
        <section className="relative h-[60vh] sm:h-[calc(100vh-56px)] flex items-center justify-center overflow-hidden">
          <Image
            src="/images/banner-2.png"
            alt="About Us Banner"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          
          <motion.div 
            className="absolute inset-0 z-0"
            style={{ opacity, scale }}
          />
          
          <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-8 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              About Leaf Spring Machines
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Three decades of innovation in leaf spring manufacturing technology
            </motion.p>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {/* Company Overview - Our Journey of Excellence */}
        <section className="py-8 sm:py-20 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-red-50/50 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-50/50 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <motion.span 
                className="inline-block text-red-600 font-semibold text-sm tracking-wider uppercase mb-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Our Journey of Excellence
              </motion.span>
              <motion.h2 
                className="text-3xl sm:text-5xl font-bold mb-8 pb-2 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Shaping the Future of Manufacturing
              </motion.h2>
              <motion.div 
                className="w-24 h-1 bg-red-600 mx-auto mb-6"
                initial={{ width: 0 }}
                whileInView={{ width: 96 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              />
              <motion.p 
                className="text-gray-600 text-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Discover how we've been pioneering innovations in leaf spring manufacturing 
                through dedication, expertise, and cutting-edge technology.
              </motion.p>
            </div>

            {/* Desktop Design */}
            <div className="hidden lg:block">
              <Tabs defaultValue="story" className="w-full max-w-7xl mx-auto">
                <TabsList className="flex justify-center mb-16 bg-transparent gap-4">
                  {[
                    { value: 'story', icon: <BookOpen className="w-5 h-5" />, label: 'Our Story' },
                    { value: 'vision', icon: <Eye className="w-5 h-5" />, label: 'Vision' },
                    { value: 'innovation', icon: <Lightbulb className="w-5 h-5" />, label: 'Innovation' },
                    { value: 'quality', icon: <Shield className="w-5 h-5" />, label: 'Quality' }
                  ].map((tab) => (
                    <TabsTrigger 
                      key={tab.value}
                      value={tab.value}
                      className="group inline-flex items-center gap-3 px-8 py-4 text-base font-medium
                        bg-white border border-gray-200 shadow-sm
                        data-[state=active]:bg-red-600 data-[state=active]:text-white data-[state=active]:border-red-600
                        data-[state=inactive]:hover:bg-red-50 data-[state=inactive]:hover:border-red-200
                        transition-all duration-300 rounded-xl"
                    >
                      <span className="group-data-[state=active]:text-white group-data-[state=inactive]:text-red-600">
                        {tab.icon}
                      </span>
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <div className="relative">
                  <TabsContent value="story">
                    <motion.div 
                      className="grid grid-cols-2 gap-16 items-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="relative h-[300px] sm:h-[400px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                          src={tabImages.story}
                          alt="Our Story"
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      </div>

                      <div className="space-y-8">
                        <div>
                          <h3 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-800">
                            Three Decades of Excellence
                          </h3>
                          <p className="text-gray-600 text-lg leading-relaxed">
                            Since 1990, we have been at the forefront of leaf spring manufacturing innovation,
                            consistently setting new industry standards and pushing the boundaries of what's possible.
                          </p>
                        </div>

                        <div className="space-y-6">
                          {[
                            {
                              icon: <Clock className="w-12 h-12 text-red-600" />,
                              title: "30+ Years Experience",
                              description: "Pioneering leaf spring manufacturing since 1990",
                              metric: "Since 1990"
                            },
                            {
                              icon: <Globe className="w-12 h-12 text-red-600" />,
                              title: "Global Presence",
                              description: "Serving customers in over 10 countries worldwide",
                              metric: "10+ Countries"
                            },
                            {
                              icon: <Award className="w-12 h-12 text-red-600" />,
                              title: "Industry Leader",
                              description: "Setting worldwide standards in manufacturing",
                              metric: "Top Rated"
                            }
                          ].map((item, idx) => (
                            <motion.div 
                              key={idx}
                              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all group"
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                            >
                              <div className="flex gap-6 items-center">
                                <div className="p-3 bg-red-50 rounded-xl group-hover:bg-red-100 transition-colors">
                                  {item.icon}
                                </div>
                                <div>
                                  <h4 className="text-xl font-semibold mb-1">{item.title}</h4>
                                  <p className="text-gray-600 mb-2">{item.description}</p>
                                  <span className="inline-block px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm font-medium">
                                    {item.metric}
                                  </span>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="vision">
                    <motion.div 
                      className="grid grid-cols-2 gap-16 items-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="relative h-[300px] sm:h-[400px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                          src={tabImages.vision}
                          alt="Our Vision"
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      </div>

                      <div className="space-y-8">
                        <div>
                          <h3 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
                            Shaping Tomorrow's Manufacturing
                          </h3>
                          <p className="text-gray-600 text-lg leading-relaxed">
                            Our vision goes beyond conventional manufacturing. We're creating a future where 
                            innovation, sustainability, and precision converge to transform the automotive industry.
                          </p>
                        </div>

                        <div className="space-y-6">
                          {[
                            {
                              icon: <Target className="w-8 h-8 text-blue-600" />,
                              title: "Global Leadership",
                              description: "Setting worldwide standards in leaf spring manufacturing technology"
                            },
                            {
                              icon: <Globe className="w-8 h-8 text-blue-600" />,
                              title: "Sustainable Future",
                              description: "Pioneering eco-friendly manufacturing processes"
                            },
                            {
                              icon: <Lightbulb className="w-8 h-8 text-blue-600" />,
                              title: "Innovation Hub",
                              description: "Continuous research and development for breakthrough solutions"
                            }
                          ].map((item, idx) => (
                            <motion.div 
                              key={idx}
                              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all group"
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                            >
                              <div className="flex gap-4 items-start">
                                <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
                                  {item.icon}
                                </div>
                                <div>
                                  <h4 className="text-lg sm:text-xl font-semibold mb-2">{item.title}</h4>
                                  <p className="text-gray-600">{item.description}</p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="innovation">
                    <motion.div 
                      className="grid grid-cols-2 gap-16 items-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="relative h-[300px] sm:h-[400px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                          src={tabImages.innovation}
                          alt="Innovation"
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      </div>

                      <div className="space-y-8">
                        <div>
                          <h3 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800">
                            Leading Through Innovation
                          </h3>
                          <p className="text-gray-600 text-lg leading-relaxed">
                            Our commitment to innovation drives us to continuously develop cutting-edge 
                            solutions that revolutionize leaf spring manufacturing processes.
                          </p>
                        </div>

                        <div className="space-y-6">
                          {[
                            {
                              icon: <Cog className="w-10 h-10 text-purple-600" />,
                              title: "Smart Automation",
                              value: "100%",
                              subtitle: "Process Automation"
                            },
                            {
                              icon: <Target className="w-10 h-10 text-purple-600" />,
                              title: "Precision",
                              value: "±0.1mm",
                              subtitle: "Accuracy Rate"
                            },
                            {
                              icon: <Award className="w-10 h-10 text-purple-600" />,
                              title: "Patents",
                              value: "50+",
                              subtitle: "Active Patents"
                            }
                          ].map((item, idx) => (
                            <motion.div 
                              key={idx}
                              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all group"
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                            >
                              <div className="flex gap-6 items-center">
                                <div className="p-3 bg-purple-50 rounded-xl group-hover:bg-purple-100 transition-colors">
                                  {item.icon}
                                </div>
                                <div>
                                  <h4 className="text-xl font-semibold mb-1">{item.title}</h4>
                                  <p className="text-gray-600 mb-2">{item.subtitle}</p>
                                  <span className="inline-block px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">
                                    {item.value}
                                  </span>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="quality">
                    <motion.div 
                      className="grid grid-cols-2 gap-16 items-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="relative h-[300px] sm:h-[400px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                          src={tabImages.quality}
                          alt="Quality"
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      </div>

                      <div className="space-y-8">
                        <div>
                          <h3 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-800">
                            Uncompromising Quality
                          </h3>
                          <p className="text-gray-600 text-lg leading-relaxed">
                            Quality isn't just a commitment—it's the foundation of everything we do. 
                            Our rigorous standards ensure excellence in every machine we produce.
                          </p>
                        </div>

                        <div className="space-y-6">
                          {[
                            {
                              icon: <Shield className="w-12 h-12 text-green-600" />,
                              title: "ISO 9001:2015 Certified",
                              description: "Internationally recognized quality management system",
                              metric: "100% Compliance"
                            },
                            {
                              icon: <Target className="w-12 h-12 text-green-600" />,
                              title: "Quality Control",
                              description: "Multi-stage inspection and testing protocols",
                              metric: "Zero Defect Policy"
                            },
                            {
                              icon: <Clock className="w-12 h-12 text-green-600" />,
                              title: "Continuous Monitoring",
                              description: "24/7 quality assurance throughout production",
                              metric: "Real-time Tracking"
                            }
                          ].map((item, idx) => (
                            <motion.div 
                              key={idx}
                              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all group"
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                            >
                              <div className="flex gap-6 items-center">
                                <div className="p-3 bg-green-50 rounded-xl group-hover:bg-green-100 transition-colors">
                                  {item.icon}
                                </div>
                                <div>
                                  <h4 className="text-xl font-semibold mb-1">{item.title}</h4>
                                  <p className="text-gray-600 mb-2">{item.description}</p>
                                  <span className="inline-block px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                                    {item.metric}
                                  </span>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>

            {/* Mobile Design */}
            <div className="lg:hidden">
              <Tabs defaultValue="story" className="w-full">
                {/* Mobile Tab List */}
                <TabsList className="flex w-full overflow-x-auto gap-2 mb-8 bg-transparent scrollbar-hide">
                  {[
                    { value: 'story', icon: <BookOpen className="w-3 h-3 sm:w-5 sm:h-5" />, label: 'Story' },
                    { value: 'vision', icon: <Eye className="w-3 h-3 sm:w-5 sm:h-5" />, label: 'Vision' },
                    { value: 'innovation', icon: <Lightbulb className="w-3 h-3 sm:w-5 sm:h-5" />, label: 'Innovation' },
                    { value: 'quality', icon: <Shield className="w-3 h-3 sm:w-5 sm:h-5" />, label: 'Quality' }
                  ].map((tab) => (
                    <TabsTrigger 
                      key={tab.value}
                      value={tab.value}
                      className="group inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-8 py-1.5 sm:py-4 text-xs sm:text-base font-medium
                        bg-white border border-gray-200 shadow-sm whitespace-nowrap
                        data-[state=active]:bg-red-600 data-[state=active]:text-white data-[state=active]:border-red-600
                        data-[state=inactive]:hover:bg-red-50 data-[state=inactive]:hover:border-red-200
                        transition-all duration-300 rounded-xl flex-shrink-0"
                    >
                      <span className="group-data-[state=active]:text-white group-data-[state=inactive]:text-red-600">
                        {tab.icon}
                      </span>
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {/* Story Tab */}
                <TabsContent value="story">
                  <motion.div 
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="relative h-[300px] sm:h-[400px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                      <Image
                        src={tabImages.story}
                        alt="Our Story"
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>

                    <div className="space-y-6 lg:space-y-8">
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-800">
                          Three Decades of Excellence
                        </h3>
                        <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                          Since 1990, we have been at the forefront of leaf spring manufacturing innovation,
                          consistently setting new industry standards and pushing the boundaries of what's possible.
                        </p>
                      </div>

                      <div className="space-y-4 sm:space-y-6">
                        {[
                          {
                            icon: <Clock className="w-12 h-12 text-red-600" />,
                            title: "30+ Years Experience",
                            description: "Pioneering leaf spring manufacturing since 1990",
                            metric: "Since 1990"
                          },
                          {
                            icon: <Globe className="w-12 h-12 text-red-600" />,
                            title: "Global Presence",
                            description: "Serving customers in over 50 countries worldwide",
                            metric: "50+ Countries"
                          },
                          {
                            icon: <Award className="w-12 h-12 text-red-600" />,
                            title: "Industry Leader",
                            description: "Setting worldwide standards in manufacturing",
                            metric: "Top Rated"
                          }
                        ].map((item, idx) => (
                          <motion.div 
                            key={idx}
                            className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-all group"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                          >
                            <div className="flex gap-4 sm:gap-6 items-center">
                              <div className="p-2 sm:p-3 bg-red-50 rounded-lg sm:rounded-xl group-hover:bg-red-100 transition-colors">
                                {item.icon}
                              </div>
                              <div>
                                <h4 className="text-lg sm:text-xl font-semibold mb-1">{item.title}</h4>
                                <p className="text-gray-600 text-sm sm:text-base mb-2">{item.description}</p>
                                <span className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 bg-red-50 text-red-700 rounded-full text-xs sm:text-sm font-medium">
                                  {item.metric}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>

                {/* Vision Tab */}
                <TabsContent value="vision">
                  <motion.div 
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="relative h-[300px] sm:h-[400px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                      <Image
                        src={tabImages.vision}
                        alt="Our Vision"
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>

                    <div className="space-y-6 lg:space-y-8">
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
                          Shaping Tomorrow's Manufacturing
                        </h3>
                        <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                          Our vision goes beyond conventional manufacturing. We're creating a future where 
                          innovation, sustainability, and precision converge to transform the automotive industry.
                        </p>
                      </div>

                      <div className="space-y-4 sm:space-y-6">
                        {[
                          {
                            icon: <Target className="w-8 h-8 text-blue-600" />,
                            title: "Global Leadership",
                            description: "Setting worldwide standards in leaf spring manufacturing technology"
                          },
                          {
                            icon: <Globe className="w-8 h-8 text-blue-600" />,
                            title: "Sustainable Future",
                            description: "Pioneering eco-friendly manufacturing processes"
                          },
                          {
                            icon: <Lightbulb className="w-8 h-8 text-blue-600" />,
                            title: "Innovation Hub",
                            description: "Continuous research and development for breakthrough solutions"
                          }
                        ].map((item, idx) => (
                          <motion.div 
                            key={idx}
                            className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-all group"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                          >
                            <div className="flex gap-4 items-start">
                              <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
                                {item.icon}
                              </div>
                              <div>
                                <h4 className="text-lg sm:text-xl font-semibold mb-2">{item.title}</h4>
                                <p className="text-gray-600 text-sm sm:text-base">{item.description}</p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>

                {/* Innovation Tab */}
                <TabsContent value="innovation">
                  <motion.div 
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="relative h-[300px] sm:h-[400px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                      <Image
                        src={tabImages.innovation}
                        alt="Innovation"
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>

                    <div className="space-y-6 lg:space-y-8">
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800">
                          Leading Through Innovation
                        </h3>
                        <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                          Our commitment to innovation drives us to continuously develop cutting-edge 
                          solutions that revolutionize leaf spring manufacturing processes.
                        </p>
                      </div>

                      <div className="space-y-4 sm:space-y-6">
                        {[
                          {
                            icon: <Cog className="w-10 h-10 text-purple-600" />,
                            title: "Smart Automation",
                            value: "100%",
                            subtitle: "Process Automation"
                          },
                          {
                            icon: <Target className="w-10 h-10 text-purple-600" />,
                            title: "Precision",
                            value: "±0.1mm",
                            subtitle: "Accuracy Rate"
                          },
                          {
                            icon: <Award className="w-10 h-10 text-purple-600" />,
                            title: "Patents",
                            value: "50+",
                            subtitle: "Active Patents"
                          }
                        ].map((item, idx) => (
                          <motion.div 
                            key={idx}
                            className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-all group"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                          >
                            <div className="flex gap-4 sm:gap-6 items-center">
                              <div className="p-2 sm:p-3 bg-purple-50 rounded-lg sm:rounded-xl group-hover:bg-purple-100 transition-colors">
                                {item.icon}
                              </div>
                              <div>
                                <h4 className="text-lg sm:text-xl font-semibold mb-1">{item.title}</h4>
                                <p className="text-gray-600 text-sm sm:text-base mb-2">{item.subtitle}</p>
                                <span className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 bg-purple-50 text-purple-700 rounded-full text-xs sm:text-sm font-medium">
                                  {item.value}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>

                {/* Quality Tab */}
                <TabsContent value="quality">
                  <motion.div 
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="relative h-[300px] sm:h-[400px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                      <Image
                        src={tabImages.quality}
                        alt="Quality"
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>

                    <div className="space-y-6 lg:space-y-8">
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-800">
                          Uncompromising Quality
                        </h3>
                        <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                          Quality isn't just a commitment—it's the foundation of everything we do. 
                          Our rigorous standards ensure excellence in every machine we produce.
                        </p>
                      </div>

                      <div className="space-y-4 sm:space-y-6">
                        {[
                          {
                            icon: <Shield className="w-12 h-12 text-green-600" />,
                            title: "ISO 9001:2015 Certified",
                            description: "Internationally recognized quality management system",
                            metric: "100% Compliance"
                          },
                          {
                            icon: <Target className="w-12 h-12 text-green-600" />,
                            title: "Quality Control",
                            description: "Multi-stage inspection and testing protocols",
                            metric: "Zero Defect Policy"
                          },
                          {
                            icon: <Clock className="w-12 h-12 text-green-600" />,
                            title: "Continuous Monitoring",
                            description: "24/7 quality assurance throughout production",
                            metric: "Real-time Tracking"
                          }
                        ].map((item, idx) => (
                          <motion.div 
                            key={idx}
                            className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-all group"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                          >
                            <div className="flex gap-4 sm:gap-6 items-center">
                              <div className="p-2 sm:p-3 bg-green-50 rounded-lg sm:rounded-xl group-hover:bg-green-100 transition-colors">
                                {item.icon}
                              </div>
                              <div>
                                <h4 className="text-lg sm:text-xl font-semibold mb-1">{item.title}</h4>
                                <p className="text-gray-600 text-sm sm:text-base mb-2">{item.description}</p>
                                <span className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 bg-green-50 text-green-700 rounded-full text-xs sm:text-sm font-medium">
                                  {item.metric}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* Core Values / Client Testimonials Section */}
        <section className="py-16 sm:py-24 bg-gray-900 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white text-center">
              WHAT OUR CLIENTS SAY
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto text-center mb-10 sm:mb-16">
              Discover why leading manufacturers trust LEAFSPRINGS for their machinery needs
            </p>
            
            <div className="relative">
              {/* Testimonials carousel */}
              <InfiniteTestimonialCarousel testimonials={testimonials} />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24 bg-gradient-to-br from-gray-900 to-red-900 text-white relative border-t-2 border-b-2 border-white">
          {/* Add the pattern overlay */}
          <div className="absolute inset-0" style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
          }} />
          
          <div className="container mx-auto px-4 text-center relative">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-white">
              Ready to Transform Your Leaf Spring Manufacturing?
            </h2>
            <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-12 max-w-3xl mx-auto text-gray-100">
              Take the first step towards optimizing your manufacturing process with our innovative and effective solutions.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                variant="default" 
                size="lg" 
                className="bg-white hover:bg-gray-100 text-red-600 transition-colors text-base sm:text-lg px-6 sm:px-8 py-2.5 sm:py-3"
                asChild
              >
                <Link href="/contact">
                  Contact Us <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button 
                variant="default" 
                size="lg" 
                className="bg-white hover:bg-gray-100 text-red-600 transition-colors text-base sm:text-lg px-6 sm:px-8 py-2.5 sm:py-3"
                asChild
              >
                <Link href="/products">
                  View Products <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <WhatsAppButton />
      <ScrollToTop />
    </ErrorBoundary>
  )
}