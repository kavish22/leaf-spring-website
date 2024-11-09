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
        {/* Hero Section */}
        <section className="relative h-[60vh] sm:h-[calc(100vh-56px)] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800">
          <motion.div 
            className="absolute inset-0 z-0"
            style={{ opacity, scale }}
          >
            {/* Removed image and opacity overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900/50 via-black/80 to-black" />
          </motion.div>
          <div className="relative z-20 text-center text-white px-4">
            <motion.h1 
              className="text-4xl sm:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              About Leaf Spring Machines
            </motion.h1>
            <motion.p 
              className="text-xl sm:text-2xl mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Three decades of innovation in leaf spring manufacturing technology
            </motion.p>
          </div>
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-8 h-8 text-white" />
          </motion.div>
        </section>

        {/* Company Overview - Our Journey of Excellence */}
        <section className="py-16 sm:py-32 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-red-50/50 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-50/50 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <motion.span 
                className="inline-block text-red-600 font-semibold text-sm tracking-wider uppercase mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Our Journey of Excellence
              </motion.span>
              <motion.h2 
                className="text-3xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600"
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
                      <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                          src="/images/story-image.jpg"
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
                              icon: <Clock className="w-8 h-8 text-red-600" />,
                              title: "30+ Years Experience",
                              description: "Pioneering leaf spring manufacturing since 1990"
                            },
                            {
                              icon: <Globe className="w-8 h-8 text-red-600" />,
                              title: "Global Presence",
                              description: "Serving customers in over 50 countries worldwide"
                            },
                            {
                              icon: <Award className="w-8 h-8 text-red-600" />,
                              title: "1000+ Machines Delivered",
                              description: "Trusted by manufacturers globally"
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
                                <div className="p-3 bg-red-50 rounded-xl group-hover:bg-red-100 transition-colors">
                                  {item.icon}
                                </div>
                                <div>
                                  <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                                  <p className="text-gray-600">{item.description}</p>
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
                      <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                          src="/images/vision-image.jpg"
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
                                  <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
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

                        <div className="grid grid-cols-2 gap-6">
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
                            },
                            {
                              icon: <Truck className="w-10 h-10 text-purple-600" />,
                              title: "Integration",
                              value: "4.0",
                              subtitle: "Industry Ready"
                            }
                          ].map((item, idx) => (
                            <motion.div 
                              key={idx}
                              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all group"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.1 }}
                            >
                              <div className="p-3 bg-purple-50 rounded-xl w-fit group-hover:bg-purple-100 transition-colors mb-4">
                                {item.icon}
                              </div>
                              <h4 className="text-lg font-semibold mb-1">{item.title}</h4>
                              <div className="text-2xl font-bold text-purple-600 mb-1">{item.value}</div>
                              <p className="text-sm text-gray-600">{item.subtitle}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <div className="relative h-[300px] rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                          src="/images/innovation-image.jpg"
                          alt="Innovation"
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
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
                      <div className="relative h-[300px] rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                          src="/images/quality-image.jpg"
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
                <TabsList className="flex w-full overflow-x-auto gap-1 mb-4 pb-1 scrollbar-hide bg-transparent">
                  {[
                    { value: 'story', icon: <BookOpen className="w-3 h-3" />, label: 'Story' },
                    { value: 'vision', icon: <Eye className="w-3 h-3" />, label: 'Vision' },
                    { value: 'innovation', icon: <Lightbulb className="w-3 h-3" />, label: 'Innovation' },
                    { value: 'quality', icon: <Shield className="w-3 h-3" />, label: 'Quality' }
                  ].map((tab) => (
                    <TabsTrigger 
                      key={tab.value}
                      value={tab.value}
                      className="group inline-flex items-center gap-0.5 px-2 py-1 text-[10px] font-medium
                        bg-white border border-gray-200 shadow-sm whitespace-nowrap
                        data-[state=active]:bg-red-600 data-[state=active]:text-white data-[state=active]:border-red-600
                        data-[state=inactive]:hover:bg-red-50 data-[state=inactive]:hover:border-red-200
                        transition-all duration-300 rounded-md flex-shrink-0"
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
                    className="space-y-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="relative h-[300px] rounded-2xl overflow-hidden shadow-2xl">
                      <Image
                        src="/images/story-image.jpg"
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

                {/* Vision Tab */}
                <TabsContent value="vision">
                  <motion.div 
                    className="space-y-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="relative h-[300px] rounded-2xl overflow-hidden shadow-2xl">
                      <Image
                        src="/images/vision-image.jpg"
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
                            icon: <Target className="w-12 h-12 text-blue-600" />,
                            title: "Global Leadership",
                            description: "Setting worldwide standards in leaf spring manufacturing technology",
                            metric: "Industry Leader"
                          },
                          {
                            icon: <Globe className="w-12 h-12 text-blue-600" />,
                            title: "Sustainable Future",
                            description: "Pioneering eco-friendly manufacturing processes",
                            metric: "Eco-Friendly"
                          },
                          {
                            icon: <Lightbulb className="w-12 h-12 text-blue-600" />,
                            title: "Innovation Hub",
                            description: "Continuous research and development for breakthrough solutions",
                            metric: "R&D Focus"
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
                              <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
                                {item.icon}
                              </div>
                              <div>
                                <h4 className="text-xl font-semibold mb-1">{item.title}</h4>
                                <p className="text-gray-600 mb-2">{item.description}</p>
                                <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
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

                {/* Innovation Tab */}
                <TabsContent value="innovation">
                  <motion.div 
                    className="space-y-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="relative h-[300px] rounded-2xl overflow-hidden shadow-2xl">
                      <Image
                        src="/images/innovation-image.jpg"
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
                            icon: <Cog className="w-12 h-12 text-purple-600" />,
                            title: "Smart Automation",
                            description: "Fully automated manufacturing processes",
                            metric: "100% Automated"
                          },
                          {
                            icon: <Target className="w-12 h-12 text-purple-600" />,
                            title: "Precision Control",
                            description: "Industry-leading accuracy in production",
                            metric: "±0.1mm Precision"
                          },
                          {
                            icon: <Award className="w-12 h-12 text-purple-600" />,
                            title: "Patent Portfolio",
                            description: "Extensive portfolio of innovative technologies",
                            metric: "50+ Patents"
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
                                <p className="text-gray-600 mb-2">{item.description}</p>
                                <span className="inline-block px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">
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

                {/* Quality Tab */}
                <TabsContent value="quality">
                  <motion.div 
                    className="space-y-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="relative h-[300px] rounded-2xl overflow-hidden shadow-2xl">
                      <Image
                        src="/images/quality-image.jpg"
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
              </Tabs>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 sm:py-24 relative overflow-hidden">
          {/* Add subtle background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-repeat" style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zM22.344 0L13.858 8.485 15.272 9.9l9.9-9.9h-2.83zM32 0l-3.486 3.485 1.414 1.414L40.97 0H32zM0 5.373l.828-.83L2.243 5.96 0 8.2V5.374zm0 5.656l.828-.829 5.657 5.657-1.414 1.414L0 11.03v-2.83zm0 5.656l.828-.828 8.485 8.485-1.414 1.414L0 16.686v-2.83zm0 5.657l.828-.828 11.314 11.314-1.414 1.414L0 22.343v-2.83zM0 32l3.485-3.485 1.414 1.414L0 40.97V32zm0 5.657L5.657 32.3l1.414 1.414L0 46.686v-2.83zm0 5.657L8.485 35.15l1.414 1.414L0 52.343v-2.83zm0 5.657l11.314-11.314 1.414 1.414L0 58v-2.83zM60 5.373L59.172 4.54 57.757 5.957 60 8.2V5.374zm0 5.656L54.343 5.54l1.414-1.414L60 11.03v-2.83zm0 5.656L51.515 8.485l1.414-1.414L60 16.686v-2.83zm0 5.657L48.686 11.343l1.415-1.414L60 22.343v-2.83zM60 32L56.515 28.515l-1.414 1.414L60 40.97V32zm0 5.657L54.343 31.485l-1.414 1.414L60 46.686v-2.83zm0 5.657L51.515 34.343l-1.414 1.414L60 52.343v-2.83zm0 5.657L48.686 37.515l-1.414 1.414L60 58v-2.83zM39.88 0L0 39.88V32l32-32h7.88zm-7.88 0L0 32v-7.88L24.12 0h7.88zM15.8 0L0 15.8V8.2L8.2 0h7.6zm-7.8 0L0 8v-.627L5.373 0H8zm45.254 60L60 44.254V52l-8 8h-7.746zM52.12 60L60 52.12V60h-7.88zm7.88-7.88L45.254 60H37.6L60 37.6v7.654zm-31.88 7.88L60 29.12V37L37 60h-8.88zM37 60L60 37V45L45 60h-8zm-17.88 0L60 21.12V29L29 60h-9.88zM21 60L60 21v8L29 60h-8zm-9.88 0L60 13.12V21L21 60h-9.88zM13 60L60 13v8L21 60h-8zM5.12 60L60 5.12V13L13 60H5.12zm-4.494 0L60-2.627V5.373L2.627 60H.626zM0 52.627L52.627 0H60L0 60v-7.373zM0 44.747L44.747 0h7.88L0 52.627v-7.88zM0 37.093L37.093 0H45L0 45v-7.907z' fill='%23FFFFFF' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")` 
            }} />
          </div>

          {/* Update core values cards */}
          <div className="container mx-auto px-4 relative">
            <div className="text-center mb-12">
              <span className="text-red-600 font-semibold text-sm tracking-wider uppercase mb-2 block">What Drives Us</span>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Core Values</h2>
              <div className="w-24 h-1 bg-red-600 mx-auto mb-4"></div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                The principles that guide us in delivering excellence and innovation
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
              {coreValues.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <Card className="h-full border-none shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                    <CardContent className={`p-6 flex flex-col items-center text-center h-full ${value.bgClass} rounded-lg relative overflow-hidden`}>
                      {/* Add subtle pattern overlay */}
                      <div className="absolute inset-0 opacity-10 bg-grid-pattern" />
                      
                      <div className="mb-4 p-3 rounded-full bg-white shadow-sm relative z-10 group-hover:scale-110 transition-transform duration-300">
                        {value.icon}
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold mb-2 relative z-10">{value.title}</h3>
                      <p className="text-sm sm:text-base text-gray-600 relative z-10">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Company Timeline */}
        <section className="py-12 sm:py-24 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
          {/* Add decorative elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-red-50 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-50 rounded-full translate-x-1/2 translate-y-1/2 opacity-50" />
          
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
        <section className="py-16 sm:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-repeat" style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zM22.344 0L13.858 8.485 15.272 9.9l9.9-9.9h-2.83zM32 0l-3.486 3.485 1.414 1.414L40.97 0H32zM0 5.373l.828-.83L2.243 5.96 0 8.2V5.374zm0 5.656l.828-.829 5.657 5.657-1.414 1.414L0 11.03v-2.83zm0 5.656l.828-.828 8.485 8.485-1.414 1.414L0 16.686v-2.83zm0 5.657l.828-.828 11.314 11.314-1.414 1.414L0 22.343v-2.83zM0 32l3.485-3.485 1.414 1.414L0 40.97V32zm0 5.657L5.657 32.3l1.414 1.414L0 46.686v-2.83zm0 5.657L8.485 35.15l1.414 1.414L0 52.343v-2.83zm0 5.657l11.314-11.314 1.414 1.414L0 58v-2.83zM60 5.373L59.172 4.54 57.757 5.957 60 8.2V5.374zm0 5.656L54.343 5.54l1.414-1.414L60 11.03v-2.83zm0 5.656L51.515 8.485l1.414-1.414L60 16.686v-2.83zm0 5.657L48.686 11.343l1.415-1.414L60 22.343v-2.83zM60 32L56.515 28.515l-1.414 1.414L60 40.97V32zm0 5.657L54.343 31.485l-1.414 1.414L60 46.686v-2.83zm0 5.657L51.515 34.343l-1.414 1.414L60 52.343v-2.83zm0 5.657L48.686 37.515l-1.414 1.414L60 58v-2.83zM39.88 0L0 39.88V32l32-32h7.88zm-7.88 0L0 32v-7.88L24.12 0h7.88zM15.8 0L0 15.8V8.2L8.2 0h7.6zm-7.8 0L0 8v-.627L5.373 0H8zm45.254 60L60 44.254V52l-8 8h-7.746zM52.12 60L60 52.12V60h-7.88zm7.88-7.88L45.254 60H37.6L60 37.6v7.654zm-31.88 7.88L60 29.12V37L37 60h-8.88zM37 60L60 37V45L45 60h-8zm-17.88 0L60 21.12V29L29 60h-9.88zM21 60L60 21v8L29 60h-8zm-9.88 0L60 13.12V21L21 60h-9.88zM13 60L60 13v8L21 60h-8zM5.12 60L60 5.12V13L13 60H5.12zm-4.494 0L60-2.627V5.373L2.627 60H.626zM0 52.627L52.627 0H60L0 60v-7.373zM0 44.747L44.747 0h7.88L0 52.627v-7.88zM0 37.093L37.093 0H45L0 45v-7.907z' fill='%23FFFFFF' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")` 
            }} />
          </div>
          
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                What Our Clients Say
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Discover why leading manufacturers trust LEAFSPRINGS for their machinery needs
              </p>
            </div>
            
            <div className="relative">
              {/* Testimonials carousel */}
              <InfiniteTestimonialCarousel testimonials={testimonials} />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24 bg-gradient-to-br from-gray-900 to-red-900 text-white relative">
          {/* Add the pattern overlay */}
          <div className="absolute inset-0" style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
          }} />
          
          <div className="container mx-auto px-4 text-center relative">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-white">
              Ready to Transform Your Leaf Spring Manufacturing?
            </h2>
            <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-12 max-w-3xl mx-auto text-gray-100">
              Take the first step towards optimizing your manufacturing process with our innovative solutions.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                variant="default" 
                size="lg" 
                className="bg-white hover:bg-gray-100 text-red-600 transition-colors text-base sm:text-lg px-6 sm:px-8 py-2.5 sm:py-3"
                asChild
              >
                <Link href="/contact">
                  Contact Sales <ChevronRight className="ml-2 h-4 w-4" />
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