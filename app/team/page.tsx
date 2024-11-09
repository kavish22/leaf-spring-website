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
            className="w-[280px] sm:w-[400px] h-[200px] sm:h-[250px] flex-shrink-0 bg-white/95 backdrop-blur-sm hover:shadow-xl transition-all duration-300 border border-gray-200/50"
          >
            <CardContent className="p-4 sm:p-8 h-full flex flex-col justify-between relative">
              {/* Background accent */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-transparent opacity-40 rounded-lg" />
              
              {/* Quote section */}
              <div className="relative flex-1">
                <div className="absolute -top-1.5 -left-0.5 text-red-500 text-3xl sm:text-5xl opacity-20">"</div>
                <blockquote className="text-gray-700 text-[13px] sm:text-base leading-snug sm:leading-relaxed line-clamp-4 sm:line-clamp-4 px-3 pt-2">
                  {testimonial.quote}
                </blockquote>
                <div className="absolute -bottom-2 -right-0.5 text-red-500 text-3xl sm:text-5xl opacity-20 rotate-180">"</div>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-red-200/50 to-transparent my-2 sm:my-3" />

              {/* Profile section */}
              <div className="flex items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-red-500 to-red-600 rounded-full opacity-50 group-hover:opacity-70 blur-sm transition-opacity"></div>
                  <div className="relative w-10 h-10 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-white shadow-md">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={56}
                      height={56}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm sm:text-base leading-tight mb-0.5">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 leading-tight">
                    {testimonial.position}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Add a subtle pattern overlay to the hero section
const heroPattern = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
};

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
      <main className="bg-gradient-to-b from-gray-50 to-white">
        <section className="relative h-[60vh] sm:h-[calc(100vh-56px)] flex items-center justify-center overflow-hidden bg-gradient-to-b from-black to-gray-900">
          <motion.div 
            className="absolute inset-0 z-0"
            style={{ opacity, scale, ...heroPattern }}
          >
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
              The dedicated professionals behind Leaf Spring Machinery's innovative leaf spring machinery solutions.
            </motion.p>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        <section className="py-12 sm:py-16 md:py-24 bg-white relative">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-transparent" />
          <div className="container mx-auto px-4 relative">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">Our Expert Team</h2>
              <p className="text-gray-600">Meet the talented individuals who make Leaf Spring Machinery a leader in leaf spring machinery solutions.</p>
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

            <motion.div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-2 sm:gap-6 sm:px-4 md:gap-8 md:px-6">
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
                  <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl group">
                    <div className="relative bg-gradient-to-b from-gray-50 to-white h-36 sm:h-48 md:h-72 p-2 sm:p-4">
                      <div className="relative h-full w-full border border-gray-200 rounded-sm bg-white overflow-hidden">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-contain p-1 sm:p-2"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                      </div>
                    </div>
                    <CardContent className="text-center p-2 sm:p-3 md:p-4 bg-white relative">
                      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-600/20 to-transparent" />
                      <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-0.5 sm:mb-1 text-gray-800 truncate">
                        {member.name}
                      </h3>
                      <p className="text-xs sm:text-sm md:text-base text-gray-600 truncate">
                        {member.position}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-b from-gray-900 to-black relative">
          <div className="absolute inset-0 bg-grid-gray-100/40" />
          <div className="container mx-auto px-4 relative">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4 text-white">What Our Team Says</h2>
              <p className="text-gray-300">
                Hear directly from our team members about their experiences working at Leaf Springs Machinery.
              </p>
            </div>
            
            <div className="relative">
              <InfiniteCarousel testimonials={testimonials} />
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-br from-gray-900 to-red-900 text-white relative">
          <div className="absolute inset-0" style={heroPattern} />
          <div className="container mx-auto px-4 text-center relative">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-white">Join Our Team</h2>
            <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-12 max-w-3xl mx-auto text-gray-100">
              We're always looking for talented individuals to join our innovative team. Explore our current openings and be part of shaping the future of leaf spring machinery.
            </p>
            <Button 
              variant="default" 
              size="lg" 
              className="bg-white hover:bg-gray-100 text-red-600 transition-colors text-base sm:text-lg px-6 sm:px-8 py-2.5 sm:py-3" 
              asChild
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </section>
      </main>

      <WhatsAppButton />
    </>
  )
}