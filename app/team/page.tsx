'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image'
import Link from 'next/link'
import WhatsAppButton from '@/components/shared/whatsapp-button'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function TeamPage() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

  const teamMembers = [
    { name: "John Doe", position: "CEO", image: "https://placehold.co/300x300" },
    { name: "Jane Smith", position: "CTO", image: "https://placehold.co/300x300" },
    { name: "Mike Johnson", position: "Head of Engineering", image: "https://placehold.co/300x300" },
    { name: "Sarah Williams", position: "Lead Designer", image: "https://placehold.co/300x300" },
    { name: "Chris Brown", position: "Sales Director", image: "https://placehold.co/300x300" },
    { name: "Emily Davis", position: "Marketing Manager", image: "https://placehold.co/300x300" },
    { name: "David Wilson", position: "Product Manager", image: "https://placehold.co/300x300" },
    { name: "Lisa Taylor", position: "HR Manager", image: "https://placehold.co/300x300" },
    { name: "Robert Martinez", position: "Quality Assurance Lead", image: "https://placehold.co/300x300" },
    { name: "Jennifer Lee", position: "Customer Support Manager", image: "https://placehold.co/300x300" },
    { name: "Kevin Chen", position: "Software Engineer", image: "https://placehold.co/300x300" },
    { name: "Amanda White", position: "Financial Analyst", image: "https://placehold.co/300x300" },
  ]

  return (
    <>
      <main>
        <section className="relative h-[100svh] flex items-center justify-center overflow-hidden">
          <motion.div 
            className="absolute inset-0 z-0"
            style={{ opacity, scale }}
          >
            <Image
              src="https://placehold.co/1920x1080"
              alt="LEAFSPRINGS Team"
              width={1920}
              height={1080}
              className="object-cover"
              priority
            />
          </motion.div>
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
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center text-gray-800">Our Expert Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="overflow-hidden transition-all duration-300 hover:shadow-xl group">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <CardContent className="text-center p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 text-gray-800">{member.name}</h3>
                    <p className="text-sm sm:text-base text-gray-600">{member.position}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 md:py-24 bg-gray-100">
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
      </main>

      <WhatsAppButton />
    </>
  )
}