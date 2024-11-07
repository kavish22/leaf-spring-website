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
            className="w-[400px] h-[250px] flex-shrink-0 bg-white hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
            <CardContent className="p-8 h-full flex flex-col">
              {/* Quote section */}
              <div className="relative mb-8">
                <div className="absolute -top-4 left-0 text-red-600 text-5xl opacity-20">"</div>
                <blockquote className="text-gray-700 text-base leading-relaxed line-clamp-4 pt-2 px-2">
                  {testimonial.quote}
                </blockquote>
                <div className="absolute bottom-0 right-0 text-red-600 text-5xl opacity-20">"</div>
              </div>

              {/* Profile section */}
              <div className="mt-auto flex items-center gap-4 border-t pt-6 border-gray-100">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-100">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={56}
                    height={56}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-base">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.position}</p>
                </div>
              </div>
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
    { name: "Gunalan Pallavarasu", position: "Chairman and Managing Director", image: "/images/team/Gunalan photo.webp", category: 'management' },
    { name: "Santhana Lakshmi", position: "Director", image: "/images/team/Santhana lakshmi photo.webp", category: 'management' },
    { name: "Pooja Abhirami", position: "Business Development", image: "/images/team/Pooja.webp", category: 'management' },
    { name: "Ashok Kushwah", position: "Engineering Head", image: "/images/team/Ashok.webp", category: 'engineering' },
    { name: "Md Shakil Khan", position: "Manufacturing & Quality Head", image: "/images/team/Shakil.webp", category: 'engineering' },
    { name: "Vivek Singh", position: "Technical Services Head", image: "/images/team/Vivek Singh.webp", category: 'engineering' },
    { name: "Basant Gurjar", position: "Marketing Manager", image: "/images/team/Basant.webp", category: 'management' },
    { name: "Tarun Kushwah", position: "Design Lead", image: "/images/team/Tarun.webp", category: 'design' },
    { name: "Pankaj Mahadik", position: "Production Supervisor", image: "/images/team/Pankaj.webp", category: 'engineering' },
  ];

  // Filter team members based on active filter
  const filteredTeamMembers = teamMembers.filter(member => 
    activeFilter === 'all' ? true : member.category === activeFilter
  );

  const testimonials: Testimonial[] = [
    {
      name: "Gunalan Pallavarasu",
      position: "Chairman and Managing Director",
      image: "/images/team/Gunalan photo.webp",
      quote: "Proud to lead a team that consistently pushes boundaries in leaf spring innovation. Together, we're building something extraordinary."
    },
    {
      name: "Santhana Lakshmi",
      position: "Director",
      image: "/images/team/Santhana lakshmi photo.webp",
      quote: "At Leaf Springs Machinery, we've created more than a company - we've built a family that shares a passion for excellence."
    },
    {
      name: "Pooja Abhirami",
      position: "Business Development",
      image: "/images/team/Pooja.webp",
      quote: "Every day brings new opportunities to connect with clients who share our vision for quality and innovation."
    },
    {
      name: "Ashok Kushwah",
      position: "Engineering Head",
      image: "/images/team/Ashok.webp",
      quote: "Working with cutting-edge technology and a talented team makes every engineering challenge exciting and rewarding."
    },
    {
      name: "Md Shakil Khan",
      position: "Manufacturing & Quality Head",
      image: "/images/team/Shakil.webp",
      quote: "The dedication to quality here is unmatched. We take pride in every product that leaves our facility."
    },
    {
      name: "Vivek Singh",
      position: "Technical Services Head",
      image: "/images/team/Vivek Singh.webp",
      quote: "Being part of a team that values innovation and customer satisfaction makes every day meaningful."
    },
    {
      name: "Basant Gurjar",
      position: "Marketing Manager",
      image: "/images/team/Basant.webp",
      quote: "It's inspiring to share our success stories and see the positive impact we make in the industry."
    },
    {
      name: "Tarun Kushwah",
      position: "Design Lead",
      image: "/images/team/Tarun.webp",
      quote: "The creative freedom and support here enable us to design solutions that truly make a difference."
    },
    {
      name: "Pankaj Mahadik",
      position: "Production Supervisor",
      image: "/images/team/Pankaj.webp",
      quote: "The collaborative spirit and commitment to excellence make Leaf Springs Machinery an amazing place to work."
    }
  ];

  return (
    <>
      <main>
        <section className="relative h-[60vh] sm:h-[calc(100vh-56px)] flex items-center justify-center overflow-hidden">
          <motion.div 
            className="absolute inset-0 z-0 bg-gray-900"
            style={{ opacity, scale }}
          >
            <Image
              src="https://placehold.co/1920x1080"
              alt="LEAFSPRINGS Team"
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
              Meet Our Team
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              The dedicated professionals behind LEAFSPRINGS' innovative leaf spring machinery solutions
            </motion.p>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
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
                  layout
                >
                  <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl">
                    <div className="relative bg-gray-50 h-72 p-4">
                      <div className="relative h-full w-full border border-gray-200 bg-white">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-contain p-2"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    </div>
                    <CardContent className="text-center p-4 bg-white">
                      <h3 className="text-xl font-semibold mb-1 text-gray-800">{member.name}</h3>
                      <p className="text-gray-600">{member.position}</p>
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