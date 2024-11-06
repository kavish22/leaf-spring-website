'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, BookOpen, Clock, Cog, Globe, Heart, Lightbulb, Shield, Star, Truck, Users } from 'lucide-react'
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

const testimonials = [
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
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <motion.div 
            className="absolute inset-0 z-0"
            style={{ opacity, scale }}
          >
            <Image
              src="https://placehold.co/1920x1080"
              alt="LEAFSPRINGS Manufacturing Plant"
              fill
              className="object-cover"
            />
          </motion.div>
          <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Shaping the Future of Leaf Spring Technology
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              With over three decades of innovation, LEAFSPRINGS continues to lead the industry in precision, efficiency, and reliability.
            </motion.p>
          </div>
        </section>

        {/* Company Overview */}
        <Suspense fallback={<LoadingSkeleton />}>
          <section className="py-20 bg-white" aria-labelledby="company-overview">
            <h2 id="company-overview" className="text-4xl font-bold text-center mb-12">
              Our Journey of Excellence
            </h2>
            <div className="container mx-auto px-4">
              <Tabs defaultValue="story" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <TabsTrigger 
                    value="story" 
                    className="text-sm md:text-lg data-[state=active]:bg-red-600 data-[state=active]:text-white hover:bg-red-50 transition-all duration-300 ease-in-out"
                  >
                    <BookOpen className="mr-2 h-4 w-4" /> Our Story
                  </TabsTrigger>
                  <TabsTrigger 
                    value="vision" 
                    className="text-sm md:text-lg data-[state=active]:bg-red-600 data-[state=active]:text-white hover:bg-red-600 hover:text-white transition-colors"
                  >
                    <Globe className="mr-2 h-4 w-4" /> Vision & Mission
                  </TabsTrigger>
                  <TabsTrigger 
                    value="innovation" 
                    className="text-sm md:text-lg data-[state=active]:bg-red-600 data-[state=active]:text-white hover:bg-red-600 hover:text-white transition-colors"
                  >
                    <Lightbulb className="mr-2 h-4 w-4" /> Innovation
                  </TabsTrigger>
                  <TabsTrigger 
                    value="quality" 
                    className="text-sm md:text-lg data-[state=active]:bg-red-600 data-[state=active]:text-white hover:bg-red-600 hover:text-white transition-colors"
                  >
                    <Shield className="mr-2 h-4 w-4" /> Quality Assurance
                  </TabsTrigger>
                </TabsList>
                
                <div className="bg-white border rounded-lg">
                  <TabsContent value="story">
                    <div className="space-y-4 p-6">
                      <h3 className="text-2xl font-bold">Our Story</h3>
                      <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="w-full md:w-1/2">
                          <h3 className="text-3xl font-bold mb-4 text-gray-800">Pioneering Leaf Spring Excellence</h3>
                          <p className="text-lg text-gray-600 mb-6">
                            Since our inception in 1990, LEAFSPRINGS has been at the forefront of leaf spring manufacturing innovation. Our journey is marked by continuous improvement, technological advancements, and an unwavering commitment to quality.
                          </p>
                          <ul className="space-y-2">
                            <li className="flex items-center">
                              <Clock className="text-red-600 mr-2" />
                              <span>Over 30 years of industry experience</span>
                            </li>
                            <li className="flex items-center">
                              <Globe className="text-red-600 mr-2" />
                              <span>Serving clients in more than 50 countries</span>
                            </li>
                            <li className="flex items-center">
                              <Truck className="text-red-600 mr-2" />
                              <span>1000+ machines delivered worldwide</span>
                            </li>
                          </ul>
                        </div>
                        <div className="w-full md:w-1/2">
                          <Image
                            src="https://placehold.co/600x400"
                            alt="LEAFSPRINGS History"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="vision">
                    <div className="space-y-4 p-6">
                      <h3 className="text-2xl font-bold">Vision & Mission</h3>
                      <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="w-full md:w-1/2 order-2 md:order-1">
                          <Image
                            src="https://placehold.co/600x400"
                            alt="LEAFSPRINGS Vision"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            loading="lazy"
                          />
                        </div>
                        <div className="w-full md:w-1/2 order-1 md:order-2">
                          <h3 className="text-3xl font-bold mb-4 text-gray-800">Shaping the Future of Mobility</h3>
                          <div className="mb-6">
                            <h4 className="text-xl font-semibold mb-2 text-red-600">Our Vision</h4>
                            <p className="text-lg text-gray-600">
                              To be the global leader in leaf spring machinery, known for our dedication to quality, innovation, and customer success.
                            </p>
                          </div>
                          <div>
                            <h4 className="text-xl font-semibold mb-2 text-red-600">Our Mission</h4>
                            <p className="text-lg text-gray-600">
                              To deliver world-class solutions that empower manufacturers to enhance production efficiency, precision, and durability in the automotive and industrial sectors.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="innovation">
                    <div className="space-y-4 p-6">
                      <h3 className="text-2xl font-bold">Innovation</h3>
                      <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="w-full md:w-1/2">
                          <h3 className="text-3xl font-bold mb-4 text-gray-800">Driving Technological Advancements</h3>
                          <p className="text-lg text-gray-600 mb-6">
                            At LEAFSPRINGS, innovation is at the core of everything we do. We continuously invest in research and development to push the boundaries of leaf spring technology.
                          </p>
                          <ul className="space-y-4">
                            <li className="flex items-start">
                              <Cog className="text-red-600 mr-2 mt-1 flex-shrink-0" />
                              <div>
                                <strong className="text-gray-800">Advanced Automation:</strong>
                                <p className="text-gray-600">Implementing Industry 4.0 principles for smarter, more efficient manufacturing processes.</p>
                              </div>
                            </li>
                            <li className="flex items-start">
                              <Lightbulb className="text-red-600 mr-2 mt-1 flex-shrink-0" />
                              <div>
                                <strong className="text-gray-800">Patented Technologies:</strong>
                                <p className="text-gray-600">Developing unique solutions that set new industry standards for performance and efficiency.</p>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="w-full md:w-1/2">
                          <Image
                            src="https://placehold.co/600x400"
                            alt="LEAFSPRINGS Innovation"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="quality">
                    <div className="space-y-4 p-6">
                      <h3 className="text-2xl font-bold">Quality Assurance</h3>
                      <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="w-full md:w-1/2 order-2 md:order-1">
                          <Image
                            src="https://placehold.co/600x400"
                            alt="LEAFSPRINGS Quality Assurance"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            loading="lazy"
                          />
                        </div>
                        <div className="w-full md:w-1/2 order-1 md:order-2">
                          <h3 className="text-3xl font-bold mb-4 text-gray-800">Uncompromising Quality Standards</h3>
                          <p className="text-lg text-gray-600 mb-6">
                            Quality is the cornerstone of our operations. We adhere to rigorous quality control processes to ensure that every machine we produce meets the highest standards of performance and reliability.
                          </p>
                          <ul className="space-y-4">
                            <li className="flex items-start">
                              <Award className="text-red-600 mr-2 mt-1 flex-shrink-0" />
                              <div>
                                <strong className="text-gray-800">ISO 9001 Certified:</strong>
                                <p className="text-gray-600">Our processes adhere to rigorous international quality management standards.</p>
                              </div>
                            </li>
                            <li className="flex items-start">
                              <Shield className="text-red-600 mr-2 mt-1 flex-shrink-0" />
                              <div>
                                <strong className="text-gray-800">Comprehensive Testing:</strong>
                                <p className="text-gray-600">Every machine undergoes thorough testing for functionality, durability, and performance before shipment.</p>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </section>
        </Suspense>

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
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Our Journey Through Time</h2>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-red-200">
                {timelineEvents.map((_, index) => (
                  <div 
                    key={index}
                    className="absolute w-4 h-4 bg-red-600 rounded-full transform -translate-x-1/2"
                    style={{ top: `${(index * 25) + 12}%` }}
                  />
                ))}
              </div>
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={index}
                  className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'} mb-8`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className="bg-white p-4 rounded shadow-lg">
                      <h3 className="text-xl font-bold text-red-600 mb-2">{event.year}</h3>
                      <h4 className="text-lg font-semibold mb-2">{event.title}</h4>
                      <p className="text-gray-600">{event.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">What Our Clients Say</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Discover why leading manufacturers trust LEAFSPRINGS for their machinery needs
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {testimonials
                .slice(currentSet * 3, (currentSet * 3) + 3)
                .map((testimonial, index) => (
                  <Card key={index + (currentSet * 3)} className="h-[400px] bg-white hover:shadow-xl transition-shadow duration-300 relative overflow-hidden">
                    <CardContent className="p-8 flex flex-col h-full">
                      {/* Rating Stars */}
                      <div className="flex mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className="w-5 h-5 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                      
                      {/* Testimonial Content */}
                      <p className="text-gray-700 text-lg mb-auto relative z-10 leading-relaxed">
                        "{testimonial.content}"
                      </p>
                      
                      {/* Author Info */}
                      <div className="flex items-center border-t pt-6 mt-6">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                          <span className="text-red-600 font-bold text-xl">
                            {testimonial.author.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-4">
                          <p className="font-semibold text-gray-900">{testimonial.author}</p>
                          <p className="text-red-600">{testimonial.company}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
            
            {/* Update the navigation dots */}
            <div className="flex justify-center mt-12 gap-2">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSet(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === currentSet ? 'bg-red-600' : 'bg-red-200'
                  }`}
                  aria-label={`Go to testimonial set ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-red-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-8">Ready to Transform Your Leaf Spring Manufacturing?</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
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