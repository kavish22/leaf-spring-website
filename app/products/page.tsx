'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, ChevronDown, Download, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import WhatsAppButton from '@/components/shared/whatsapp-button'
import { motion, useScroll, useTransform } from 'framer-motion'

// Products array 
const products = [
  {
    title: "Heavy Duty Shearing Machine",
    specs: "250 Ton capacity, Scissor mechanism",
    benefits: "Hydraulic operation, ideal for heavy-duty shearing of large sections",
    image: "https://placehold.co/400x300",
    category: "Shearing",
    details: [
      "Capacity / Power: 250 Ton",
      "Key Mechanism / Design: Scissor mechanism, hydraulic clamping",
      "Operation Type: Hydraulic",
      "Applications: Heavy-duty shearing for large sections",
      "Additional Features: Robust and rugged design, reduces hydraulic force"
    ]
  },
  {
    title: "Heavy Assembly Line",
    specs: "50 Ton capacity, Dual piston telescopic press",
    benefits: "Automated operation for automotive suspension systems assembly",
    image: "https://placehold.co/400x300",
    category: "Assembly",
    details: [
      "Capacity / Power: 50 Ton",
      "Key Mechanism / Design: Dual piston telescopic press, batch code printing",
      "Operation Type: Automated",
      "Applications: Assembly of automotive suspension systems",
      "Additional Features: Integrated inspection, vibration-free conveyor, load/position sensors"
    ]
  },
  {
    title: "SSP Automation Line",
    specs: "15+5+15 Ton press, Low-cost automations",
    benefits: "Fully automatic operation for stress peening",
    image: "https://placehold.co/400x300",
    category: "Automation",
    details: [
      "Capacity / Power: 15+5+15 Ton (press)",
      "Key Mechanism / Design: Low-cost automations, ergonomic design",
      "Operation Type: Fully Automatic",
      "Applications: Stress peening",
      "Additional Features: Pneumatic systems, no manual interruptions"
    ]
  },
  {
    title: "High Pressure De-scaler",
    specs: "300 BAR pressure, Sophisticated hydraulic controls",
    benefits: "Cleans 95-99% scales, suitable for steel mills",
    image: "https://placehold.co/400x300",
    category: "Cleaning",
    details: [
      "Capacity / Power: 300 BAR pressure",
      "Key Mechanism / Design: Sophisticated hydraulic controls",
      "Operation Type: Hydraulic",
      "Applications: Hot rolling descaling",
      "Additional Features: Imported nozzles, cleans 95-99% scales, suitable for steel mills"
    ]
  },
  {
    title: "Hydraulic Endurance Testing",
    specs: "20 Ton load, CNC servo control machine",
    benefits: "Load and endurance testing with custom cylinder for long life",
    image: "https://placehold.co/400x300",
    category: "Testing",
    details: [
      "Capacity / Power: 20 Ton load",
      "Key Mechanism / Design: CNC servo control, special software for characteristics",
      "Operation Type: Hydraulic",
      "Applications: Load and endurance testing",
      "Additional Features: Custom cylinder for long life"
    ]
  },
  {
    title: "Z-bending Press-Inclined",
    specs: "400 Ton (4 cylinders), Multi-cylinder design",
    benefits: "Hot application for thickness bending up to 60mm",
    image: "https://placehold.co/400x300",
    category: "Bending",
    details: [
      "Capacity / Power: 400 Ton (4 cylinders)",
      "Key Mechanism / Design: Multi-cylinder, clamping and bending",
      "Operation Type: Hot Application",
      "Applications: Thickness bending up to 60mm",
      "Additional Features: Available in 2-cylinder design"
    ]
  },
  {
    title: "Z-bending Press-4 Cylinder",
    specs: "350 Ton (3 cylinders), Clamping and bending",
    benefits: "Hot application for thickness bending up to 60mm",
    image: "https://placehold.co/400x300",
    category: "Bending",
    details: [
      "Capacity / Power: 350 Ton (3 cylinders)",
      "Key Mechanism / Design: Clamping and bending",
      "Operation Type: Hot Application",
      "Applications: Thickness bending up to 60mm",
      "Additional Features: Available in 2-cylinder design"
    ]
  },
  {
    title: "Profile Checking Gauge",
    specs: "Max length 1600mm, Parabolic profile gauge",
    benefits: "Hot or cold profile checking with ±1 mm length tolerance",
    image: "https://placehold.co/400x300",
    category: "Measurement",
    details: [
      "Capacity / Power: Max length 1600mm",
      "Key Mechanism / Design: Parabolic profile gauge",
      "Operation Type: Manual / Automated",
      "Applications: Hot or cold profile checking",
      "Additional Features: ±1 mm length tolerance, 20 measuring points"
    ]
  },
  {
    title: "Straightening - Linear",
    specs: "50 Ton capacity, Precision sliding machine",
    benefits: "Hydraulic operation for lateral bend correction in hot conditions",
    image: "https://placehold.co/400x300",
    category: "Straightening",
    details: [
      "Capacity / Power: 50 Ton",
      "Key Mechanism / Design: Precision sliding",
      "Operation Type: Hydraulic",
      "Applications: Lateral bend correction",
      "Additional Features: Hot condition operation"
    ]
  },
  {
    title: "Straightening - Parallelogram",
    specs: "50 Ton capacity, Parallelogram mechanism",
    benefits: "Hydraulic operation for lateral bend correction in hot conditions",
    image: "https://placehold.co/400x300",
    category: "Straightening",
    details: [
      "Capacity / Power: 50 Ton",
      "Key Mechanism / Design: Parallelogram mechanism",
      "Operation Type: Hydraulic",
      "Applications: Lateral bend correction",
      "Additional Features: Suitable for hot conditions"
    ]
  },
  {
    title: "Eye Grinding Machine",
    specs: "Max eye dia: 120mm, 960 RPM Machine",
    benefits: "Hydraulic operation with magnetic separator and auto coolant",
    image: "https://placehold.co/400x300",
    category: "Grinding",
    details: [
      "Capacity / Power: Max eye dia: 120mm",
      "Key Mechanism / Design: Magnetic separator, auto coolant",
      "Operation Type: Hydraulic",
      "Applications: Eye grinding",
      "Additional Features: 960 RPM, 350mm grinding length"
    ]
  },
  {
    title: "Eye Rolling Machine",
    specs: "Max thickness: 25mm, Two-stage curling",
    benefits: "Hydraulic operation for 180-degree curling in hot applications",
    image: "https://placehold.co/400x300",
    category: "Rolling",
    details: [
      "Capacity / Power: Max thickness: 25mm",
      "Key Mechanism / Design: Two-stage curling",
      "Operation Type: Hydraulic",
      "Applications: Eye rolling and curling",
      "Additional Features: 180-degree curling, suitable for hot applications"
    ]
  },
  {
    title: "Eye Reaming Machine",
    specs: "Max eye dia: 60mm, VFD speed adjustment",
    benefits: "Hydraulic operation for bush reaming with separate coolant system",
    image: "https://placehold.co/400x300",
    category: "Reaming",
    details: [
      "Capacity / Power: Max eye dia: 60mm",
      "Key Mechanism / Design: VFD speed adjustment, hydraulic feed",
      "Operation Type: Hydraulic",
      "Applications: Bush reaming",
      "Additional Features: Separate coolant system, fixturing for applications"
    ]
  },
  {
    title: "Eye Boring Machine",
    specs: "Boring dia: 20-60mm, LHS spindle rotation",
    benefits: "Hydraulic operation with ±0.02 mm tolerance and 40 sec cycle time",
    image: "https://placehold.co/400x300",
    category: "Boring",
    details: [
      "Capacity / Power: Boring dia: 20-60mm",
      "Key Mechanism / Design: LHS spindle rotation",
      "Operation Type: Hydraulic",
      "Applications: Eye boring",
      "Additional Features: Tolerance ±0.02 mm, 40 sec cycle time"
    ]
  },
  {
    title: "Eye Milling Machine",
    specs: "Milling stock 0.5-2.0mm, 150mm diameter milling cutter",
    benefits: "Hydraulic operation for milling after parabolic rolling",
    image: "https://placehold.co/400x300",
    category: "Milling",
    details: [
      "Capacity / Power: Milling stock 0.5-2.0mm",
      "Key Mechanism / Design: 150mm diameter milling cutter",
      "Operation Type: Hydraulic",
      "Applications: After parabolic rolling",
      "Additional Features: Milling length 100-300mm"
    ]
  },
  {
    title: "Hockey Bending Machine",
    specs: "25+25+50 Ton, Precision sliding machine",
    benefits: "Hydraulic operation for lateral bend correction and hockey bending",
    image: "https://placehold.co/400x300",
    category: "Bending",
    details: [
      "Capacity / Power: 25+25+50 Ton",
      "Key Mechanism / Design: Precision sliding, robotic compatibility",
      "Operation Type: Hydraulic",
      "Applications: Lateral bend correction, hockey bending",
      "Additional Features: Hot condition application"
    ]
  },
  {
    title: "Mechanical Straightening Machine",
    specs: "Max 180 Ton, High stroke frequency machine",
    benefits: "Mechanical operation with 48 cycles per minute and 22 KW power",
    image: "https://placehold.co/400x300",
    category: "Straightening",
    details: [
      "Capacity / Power: Max 180 Ton",
      "Key Mechanism / Design: High stroke frequency",
      "Operation Type: Mechanical",
      "Applications: Straightening of parts",
      "Additional Features: 48 cycles per minute, 22 KW power"
    ]
  },
  {
    title: "Bush Pressing Machine",
    specs: "10 Ton capacity, Load/deflection control",
    benefits: "Hydraulic operation with 650mm daylight and 400mm stroke",
    image: "https://placehold.co/400x300",
    category: "Pressing",
    details: [
      "Capacity / Power: 10 Ton",
      "Key Mechanism / Design: Load/deflection control",
      "Operation Type: Hydraulic",
      "Applications: Bush pressing",
      "Additional Features: Daylight 650mm, 400mm stroke"
    ]
  },
  {
    title: "Multi Station Press",
    specs: "100T/200T/100T/100T, Common hydraulic powerpack",
    benefits: "Manual/Robotic loading for forming and cutting operations",
    image: "https://placehold.co/400x300",
    category: "Pressing",
    details: [
      "Capacity / Power: 100T/200T/100T/100T",
      "Key Mechanism / Design: Common hydraulic powerpack",
      "Operation Type: Manual / Robotic Loading",
      "Applications: Forming and cutting operations",
      "Additional Features: Fully customizable, pressure and stroke control"
    ]
  },
  {
    title: "Scragging Machine",
    specs: "5-50 Ton capacity, HMI-based system",
    benefits: "Manual/Hydraulic operation for pressing assemblies",
    image: "https://placehold.co/400x300",
    category: "Pressing",
    details: [
      "Capacity / Power: 5-50 Ton",
      "Key Mechanism / Design: HMI-based system",
      "Operation Type: Manual / Hydraulic",
      "Applications: Pressing assemblies",
      "Additional Features: 600mm stroke, 15 sec cycle time"
    ]
  },
  {
    title: "Short Taper Rolling Machine",
    specs: "200 Ton rolling station, Manual loading/unloading",
    benefits: "Manual operation for tapered rolling of leaf springs",
    image: "https://placehold.co/400x300",
    category: "Rolling",
    details: [
      "Capacity / Power: 200 Ton (rolling station)",
      "Key Mechanism / Design: Manual loading/unloading",
      "Operation Type: Manual",
      "Applications: Tapered rolling for leaf springs",
      "Additional Features: 6-45mm leaf thickness, max taper length 300mm"
    ]
  },
  {
    title: "Leaf Correction Press",
    specs: "15-60 Ton capacity, Hydraulically operated",
    benefits: "Hydraulic operation for re-cambering and bend correction",
    image: "https://placehold.co/400x300",
    category: "Pressing",
    details: [
      "Capacity / Power: 15-60 Ton",
      "Key Mechanism / Design: Hydraulically operated",
      "Operation Type: Hydraulic",
      "Applications: Re-cambering and bend correction",
      "Additional Features: Steel fabrication, robust design"
    ]
  },
  {
    title: "Magnetic Loader",
    specs: "500 kg lifting capacity, Magneto pneumatic manipulator",
    benefits: "Magnetic operation for stock manipulation",
    image: "https://placehold.co/400x300",
    category: "Loading",
    details: [
      "Capacity / Power: 500 kg lifting capacity",
      "Key Mechanism / Design: Magneto pneumatic manipulator",
      "Operation Type: Magnetic",
      "Applications: Stock manipulation",
      "Additional Features: Stock size range: 500x900 to 2500x900, 1000mm stroke"
    ]
  },
  {
    title: "Manual Leaf Spring Assembling Machine",
    specs: "5-20 Ton capacity, All steel fabrication",
    benefits: "Hydraulic operation for leaf spring assembly",
    image: "https://placehold.co/400x300",
    category: "Assembly",
    details: [
      "Capacity / Power: 5-20 Ton",
      "Key Mechanism / Design: All steel fabrication",
      "Operation Type: Hydraulic",
      "Applications: Leaf spring assembly",
      
      "Additional Features: Robust, steel-fabricated design"
    ]
  },
]

interface ProductCardProps {
  product: {
    title: string;
    specs: string;
    benefits: string;
    image: string;
    category: string;
    details: string[];
  };
  index: number;
  isSlideOpen: boolean;
  onSlideToggle: (index: number) => void;
}

const ProductCard = ({ product, index, isSlideOpen, onSlideToggle }: ProductCardProps) => {
  return (
    <div className="relative">
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl group flex flex-col h-full">
        <div className="relative h-64">
          <Image 
            src={product.image} 
            alt={product.title} 
            width={400} 
            height={300} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <Badge className="absolute top-2 right-2 bg-red-600 text-white">{product.category}</Badge>
        </div>
        
        <CardHeader className="p-6">
          <CardTitle className="text-xl text-gray-800 group-hover:text-red-600 transition-colors line-clamp-2">
            {product.title}
          </CardTitle>
          <CardDescription className="text-base text-gray-600 line-clamp-2 flex">
            <span className="mr-2">•</span> {product.specs}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-6 pt-0 flex-grow">
          <p className="text-base text-gray-700 line-clamp-3 flex">
            <span className="mr-2">•</span> {product.benefits}
          </p>
        </CardContent>
        
        <CardFooter className="p-6 pt-0">
          <div className="flex gap-4 w-full">
            <Button 
              className="flex-1 bg-red-600 text-white border-2 border-red-600 hover:bg-white hover:text-red-600 hover:border-red-600 transition-all duration-300"
              onClick={() => onSlideToggle(index)}
            >
              <span className="mr-2">Learn More</span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isSlideOpen ? 'rotate-180' : ''}`} />
            </Button>
            <Button 
              className="flex-1 bg-red-600 text-white border-2 border-red-600 hover:bg-white hover:text-red-600 hover:border-red-600 transition-all duration-300 mx-2"
            >
              <span className="mr-2">Brochure</span>
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>

        <div 
          className={`absolute left-0 right-0 top-0 bottom-0 bg-white shadow-lg transition-all duration-300 ease-in-out ${
            isSlideOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
          style={{
            transform: isSlideOpen ? 'translateY(0)' : 'translateY(-100%)',
            zIndex: 20
          }}
        >
          <div className="p-6 relative h-full overflow-y-auto">
            <button
              onClick={() => onSlideToggle(index)}
              className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close details"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
            <h3 className="text-xl font-bold mb-4 pr-8 text-gray-800">
              {product.title}
            </h3>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              {product.details.map((detail, i) => (
                <li key={i} className="text-base text-gray-700">{detail}</li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default function ProductsPage() {
  const [openSlide, setOpenSlide] = useState<number | null>(null);
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

  const handleSlideToggle = (index: number) => {
    setOpenSlide(openSlide === index ? null : index);
  };

  return (
    <>
      <main>
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <motion.div 
            className="absolute inset-0 z-0"
            style={{ opacity, scale }}
          >
            <Image
              src="https://placehold.co/1920x1080"
              alt="LEAFSPRINGS Products"
              layout="fill"
              objectFit="cover"
              priority
            />
          </motion.div>
          <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Our Product Range
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Discover our comprehensive range of high-performance leaf spring machinery, engineered for excellence in automotive and heavy industry applications.
            </motion.p>
          </div>
        </section>

        <section id="product-showcase" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product, index) => (
                <ProductCard
                  key={index}
                  product={product}
                  index={index}
                  isSlideOpen={openSlide === index}
                  onSlideToggle={handleSlideToggle}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-red-700">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8 text-white">
              Ready to Elevate Your Leaf Spring Manufacturing?
            </h2>
            <div className="flex justify-center gap-6">
              <Link 
                href="/contact" 
                className="inline-flex items-center bg-white text-red-600 border-2 border-red-600 hover:bg-red-600 hover:text-white hover:border-2 hover:border-white transition-colors px-8 py-3 rounded-md font-bold"
              >
                Get In Touch <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
              <Link 
                href="#" 
                className="inline-flex items-center bg-white text-red-600 border-2 border-red-600 hover:bg-red-600 hover:text-white hover:border-2 hover:border-white transition-colors px-8 py-3 rounded-md font-bold"
              >
                Download Company Profile <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <WhatsAppButton />
    </>
  );
}