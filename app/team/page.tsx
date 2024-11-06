'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image'
import Link from 'next/link'
import WhatsAppButton from '@/components/shared/whatsapp-button'
import { motion, useScroll, useTransform, useSpring, useAnimationFrame } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

interface Testimonial {
  name: string;
  position: string;
  image: string;
  quote: string;
}

// Add type for team member
interface TeamMember {
  name: string;
  position: string;
  image: string;
  category: 'management' | 'engineering' | 'design' | 'support';
}

const InfiniteCarousel = ({ testimonials }: { testimonials: Testimonial[] }) => {
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
      const contentWidth = scrollContent.length * (300 + 24) // card width + gap
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
        {testimonials.map((testimonial, index) => (
          <Card 
            key={`testimonial-${index}`}
            className="w-[300px] flex-shrink-0 bg-white hover:shadow-lg transition-shadow duration-300"
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.position}</p>
                </div>
              </div>
              <blockquote className="text-gray-700 italic">
                "{testimonial.quote}"
              </blockquote>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default function TeamPage() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

  // Add state for active filter
  const [activeFilter, setActiveFilter] = useState<string>('all');

  // Update team members with categories
  const teamMembers: TeamMember[] = [
    { name: "John Doe", position: "CEO", image: "https://placehold.co/300x300", category: 'management' },
    { name: "Jane Smith", position: "CTO", image: "https://placehold.co/300x300", category: 'management' },
    { name: "Mike Johnson", position: "Head of Engineering", image: "https://placehold.co/300x300", category: 'engineering' },
    { name: "Sarah Williams", position: "Lead Designer", image: "https://placehold.co/300x300", category: 'design' },
    { name: "Chris Brown", position: "Sales Director", image: "https://placehold.co/300x300", category: 'management' },
    { name: "Emily Davis", position: "Marketing Manager", image: "https://placehold.co/300x300", category: 'management' },
    { name: "David Wilson", position: "Product Manager", image: "https://placehold.co/300x300", category: 'management' },
    { name: "Lisa Taylor", position: "HR Manager", image: "https://placehold.co/300x300", category: 'support' },
    { name: "Robert Martinez", position: "Quality Assurance Lead", image: "https://placehold.co/300x300", category: 'engineering' },
    { name: "Jennifer Lee", position: "Customer Support Manager", image: "https://placehold.co/300x300", category: 'support' },
    { name: "Kevin Chen", position: "Software Engineer", image: "https://placehold.co/300x300", category: 'engineering' },
    { name: "Amanda White", position: "Financial Analyst", image: "https://placehold.co/300x300", category: 'support' },
  ];

  // Filter team members based on active filter
  const filteredTeamMembers = teamMembers.filter(member => 
    activeFilter === 'all' ? true : member.category === activeFilter
  );

  const testimonials: Testimonial[] = [
    {
      name: "John Doe",
      position: "Senior Engineer",
      image: "https://placehold.co/100x100",
      quote: "Working at LEAFSPRINGS has been an incredible journey of innovation and growth."
    },
    {
      name: "Sarah Smith",
      position: "Design Lead",
      image: "https://placehold.co/100x100",
      quote: "The collaborative environment here brings out the best in every team member."
    },
    {
      name: "Michael Chen",
      position: "Product Manager",
      image: "https://placehold.co/100x100",
      quote: "I'm proud to be part of a team that's revolutionizing the industry."
    },
    {
      name: "Emily Brown",
      position: "Quality Assurance",
      image: "https://placehold.co/100x100",
      quote: "The commitment to excellence here is unmatched in the industry."
    },
    {
      name: "David Wilson",
      position: "Technical Lead",
      image: "https://placehold.co/100x100",
      quote: "Every day brings new challenges and opportunities for growth."
    },
    {
      name: "Lisa Anderson",
      position: "Software Engineer",
      image: "https://placehold.co/100x100",
      quote: "The support and mentorship I've received here has been invaluable."
    },
    {
      name: "Robert Taylor",
      position: "Systems Architect",
      image: "https://placehold.co/100x100",
      quote: "Innovation is not just encouraged, it's part of our DNA."
    },
    {
      name: "Jennifer Lee",
      position: "Project Manager",
      image: "https://placehold.co/100x100",
      quote: "The team's dedication to quality is truly inspiring."
    },
    {
      name: "Kevin Martinez",
      position: "Development Lead",
      image: "https://placehold.co/100x100",
      quote: "We're constantly pushing the boundaries of what's possible."
    },
    {
      name: "Amanda White",
      position: "UX Designer",
      image: "https://placehold.co/100x100",
      quote: "The creative freedom here allows us to deliver exceptional results."
    },
    {
      name: "Thomas Johnson",
      position: "Research Engineer",
      image: "https://placehold.co/100x100",
      quote: "Being part of groundbreaking projects is incredibly rewarding."
    },
    {
      name: "Rachel Garcia",
      position: "Technical Architect",
      image: "https://placehold.co/100x100",
      quote: "The collaborative spirit here drives our success every day."
    }
  ];

  return (
    <>
      <main>
        <section className="relative h-[100svh] flex items-center justify-center overflow-hidden">
          <motion.div 
            className="absolute inset-0 z-0 bg-black/40"
            style={{ opacity, scale }}
          >
            <Image
              src="https://placehold.co/1920x1080"
              alt="LEAFSPRINGS Team"
              width={1920}
              height={1080}
              className="object-cover w-full h-full"
              priority
              sizes="100vw"
            />
          </motion.div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
          <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Meet Our Team
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              The dedicated professionals behind LEAFSPRINGS' innovative leaf spring machinery solutions
            </motion.p>
          </div>
        </section>

        <section className="py-12 sm:py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">Our Expert Team</h2>
              <p className="text-gray-600">Meet the talented individuals who make LEAFSPRINGS a leader in leaf spring machinery solutions.</p>
            </motion.div>

            <motion.div 
              className="flex flex-wrap gap-4 justify-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Button 
                variant={activeFilter === 'all' ? "default" : "outline"}
                onClick={() => setActiveFilter('all')}
                className={activeFilter === 'all' ? "bg-red-600 hover:bg-red-700 text-white" : ""}
              >
                All
              </Button>
              <Button 
                variant={activeFilter === 'management' ? "default" : "outline"}
                onClick={() => setActiveFilter('management')}
                className={activeFilter === 'management' ? "bg-red-600 hover:bg-red-700 text-white" : ""}
              >
                Management
              </Button>
              <Button 
                variant={activeFilter === 'engineering' ? "default" : "outline"}
                onClick={() => setActiveFilter('engineering')}
                className={activeFilter === 'engineering' ? "bg-red-600 hover:bg-red-700 text-white" : ""}
              >
                Engineering
              </Button>
              <Button 
                variant={activeFilter === 'design' ? "default" : "outline"}
                onClick={() => setActiveFilter('design')}
                className={activeFilter === 'design' ? "bg-red-600 hover:bg-red-700 text-white" : ""}
              >
                Design
              </Button>
              <Button 
                variant={activeFilter === 'support' ? "default" : "outline"}
                onClick={() => setActiveFilter('support')}
                className={activeFilter === 'support' ? "bg-red-600 hover:bg-red-700 text-white" : ""}
              >
                Support
              </Button>
            </motion.div>

            <motion.div 
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {filteredTeamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  layout  // Add this to handle smooth transitions when filtering
                >
                  <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl group">
                    <div className="relative">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={300}
                        height={300}
                        className="w-full h-56 md:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="text-center p-6">
                      <h3 className="text-xl font-semibold mb-2 text-gray-800">{member.name}</h3>
                      <p className="text-gray-600 mb-3">{member.position}</p>
                      <p className="text-sm text-gray-500 line-clamp-3">
                        Brief description about the team member's expertise and experience.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-12 sm:py-16 md:py-24 bg-gray-100 border-t-4 border-b-4 border-red-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-800">Join Our Team</h2>
            <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-12 max-w-3xl mx-auto text-gray-600">
              We're always looking for talented individuals to join our innovative team. Explore our current openings and be part of shaping the future of leaf spring machinery.
            </p>
            <Button 
              variant="default" 
              size="lg" 
              className="bg-red-600 hover:bg-red-700 text-white transition-colors text-base sm:text-lg px-6 sm:px-8 py-2.5 sm:py-3" 
              asChild
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">What Our Team Says</h2>
              <p className="text-gray-600">
                Hear directly from our team members about their experiences working at LEAFSPRINGS
              </p>
            </div>
            
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10" />
              
              <InfiniteCarousel testimonials={testimonials} />
            </div>
          </div>
        </section>
      </main>

      <WhatsAppButton />
    </>
  )
}