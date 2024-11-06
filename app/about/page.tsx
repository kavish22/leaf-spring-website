'use client'

import { useState, useEffect } from 'react'
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

        {/* Company Overview */}
        <Suspense fallback={<LoadingSkeleton />}>
          <section className="py-8 sm:py-20 bg-white" aria-labelledby="company-overview">
            <div className="container mx-auto px-4">
              <h2 id="company-overview" className="text-2xl sm:text-4xl font-bold text-center mb-8 sm:mb-12">
                Our Journey of Excellence
              </h2>

              <Tabs defaultValue="story" className="w-full">
                {/* Tabs Container - Fixed spacing */}
                <div className="bg-gray-50 p-3 rounded-xl shadow-sm mb-6 sm:mb-8">
                  <TabsList className="w-full grid grid-cols-2 gap-3 sm:flex sm:gap-2">
                    {[
                      { value: 'story', icon: <BookOpen className="w-4 h-4" />, label: 'Our Story' },
                      { value: 'vision', icon: <Eye className="w-4 h-4" />, label: 'Vision' },
                      { value: 'innovation', icon: <Lightbulb className="w-4 h-4" />, label: 'Innovation' },
                      { value: 'quality', icon: <Shield className="w-4 h-4" />, label: 'Quality' }
                    ].map((tab) => (
                      <TabsTrigger 
                        key={tab.value}
                        value={tab.value}
                        className="flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-medium rounded-lg transition-all duration-300
                        data-[state=active]:bg-red-600 data-[state=active]:text-white data-[state=active]:shadow-md
                        data-[state=inactive]:bg-white data-[state=inactive]:text-gray-600
                        hover:bg-red-50 w-full"
                      >
                        {tab.icon}
                        <span className="capitalize">{tab.label}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                {/* Content Container */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  {/* Story Tab */}
                  <TabsContent value="story" className="focus-visible:outline-none">
                    <div className="p-6 space-y-6">
                      <div className="text-center sm:text-left max-w-3xl">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">
                          Pioneering Leaf Spring Excellence
                        </h3>
                        <p className="text-base text-gray-600">
                          Since our inception in 1990, LEAFSPRINGS has been at the forefront of leaf spring manufacturing innovation.
                        </p>
                      </div>

                      <div className="relative aspect-video w-full rounded-lg overflow-hidden shadow-md">
                        <Image
                          src="https://placehold.co/600x400"
                          alt="LEAFSPRINGS History"
                          fill
                          className="object-cover"
                          loading="lazy"
                        />
                      </div>

                      <div className="grid gap-4">
                        {[
                          { icon: <Clock className="w-5 h-5" />, text: "Over 30 years of industry experience" },
                          { icon: <Globe className="w-5 h-5" />, text: "Serving clients in more than 50 countries" },
                          { icon: <Truck className="w-5 h-5" />, text: "1000+ machines delivered worldwide" }
                        ].map((stat, index) => (
                          <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 border border-gray-100">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                              {stat.icon}
                            </div>
                            <p className="font-medium text-gray-700">{stat.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  {/* Vision Tab */}
                  <TabsContent value="vision" className="focus-visible:outline-none">
                    <div className="p-6 space-y-6">
                      <div className="text-center sm:text-left max-w-3xl">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">
                          Shaping the Future of Mobility
                        </h3>
                        <p className="text-base text-gray-600">
                          Leading the industry with innovative solutions and forward-thinking approaches.
                        </p>
                      </div>

                      <div className="grid gap-4">
                        {[
                          { icon: <Eye className="w-5 h-5" />, title: "Our Vision", text: "To be the global leader in leaf spring machinery, setting industry standards for innovation and excellence." },
                          { icon: <Target className="w-5 h-5" />, title: "Our Mission", text: "Delivering world-class manufacturing solutions that empower our clients to achieve unprecedented efficiency and quality." },
                          { icon: <Star className="w-5 h-5" />, title: "Our Goals", text: "Expanding our global footprint while maintaining our commitment to sustainability and innovation." }
                        ].map((item, index) => (
                          <div key={index} className="p-6 rounded-lg bg-gradient-to-br from-red-50 to-red-100/50 border border-red-100">
                            <h4 className="text-lg font-semibold mb-3 text-red-600 flex items-center gap-2">
                              {item.icon}
                              {item.title}
                            </h4>
                            <p className="text-gray-700">{item.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  {/* Innovation Tab */}
                  <TabsContent value="innovation" className="focus-visible:outline-none">
                    <div className="p-6 space-y-6">
                      <div className="text-center sm:text-left max-w-3xl">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">
                          Leading Through Innovation
                        </h3>
                        <p className="text-base text-gray-600">
                          Pioneering advanced manufacturing solutions with cutting-edge technology.
                        </p>
                      </div>

                      <div className="grid gap-4">
                        {[
                          { icon: <Cog className="w-5 h-5" />, title: "Smart Manufacturing", text: "Industry 4.0 integration with IoT capabilities for real-time monitoring and optimization" },
                          { icon: <Award className="w-5 h-5" />, title: "Patented Technology", text: "Proprietary solutions that deliver unprecedented efficiency and precision" },
                          { icon: <Target className="w-5 h-5" />, title: "Precision Control", text: "Advanced automation systems ensuring consistent quality and reduced waste" }
                        ].map((item, index) => (
                          <div key={index} className="p-6 rounded-lg bg-gray-50 border border-gray-100">
                            <h4 className="text-lg font-semibold mb-3 text-gray-800 flex items-center gap-2">
                              <div className="text-red-600">{item.icon}</div>
                              {item.title}
                            </h4>
                            <p className="text-gray-600">{item.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  {/* Quality Tab */}
                  <TabsContent value="quality" className="focus-visible:outline-none">
                    <div className="p-6 space-y-6">
                      <div className="text-center sm:text-left max-w-3xl">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">
                          Uncompromising Quality
                        </h3>
                        <p className="text-base text-gray-600">
                          Setting industry standards through rigorous quality control and testing.
                        </p>
                      </div>

                      <div className="grid gap-4">
                        {[
                          { icon: <Shield className="w-5 h-5" />, title: "ISO Certified", text: "Maintaining the highest international quality standards in manufacturing" },
                          { icon: <Target className="w-5 h-5" />, title: "100% Testing", text: "Comprehensive quality assurance at every stage of production" },
                          { icon: <Award className="w-5 h-5" />, title: "Industry Leading", text: "Setting benchmarks for performance and reliability in the industry" },
                          { icon: <Users className="w-5 h-5" />, title: "Expert Team", text: "Highly trained professionals ensuring quality at every step" }
                        ].map((item, index) => (
                          <div key={index} className="p-6 rounded-lg bg-gray-50 border border-gray-100">
                            <h4 className="text-lg font-semibold mb-3 text-gray-800 flex items-center gap-2">
                              <div className="text-red-600">{item.icon}</div>
                              {item.title}
                            </h4>
                            <p className="text-gray-600">{item.text}</p>
                          </div>
                        ))}
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

        {/* Testimonials */}
        <section className="py-20 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">What Our Clients Say</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Discover why leading manufacturers trust LEAFSPRINGS for their machinery needs
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto px-4">
              {testimonials
                .slice(currentSet * 3, (currentSet * 3) + 3)
                .map((testimonial, index) => (
                  <Card key={index + (currentSet * 3)} 
                    className="min-h-[350px] sm:h-[400px] bg-white hover:shadow-xl transition-shadow duration-300 relative overflow-hidden"
                  >
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