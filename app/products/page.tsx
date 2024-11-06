'use client'

import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, ChevronDown, Download, ChevronRight, Search, Filter } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import WhatsAppButton from '@/components/shared/whatsapp-button'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useVirtualizer } from '@tanstack/react-virtual';
import { ErrorBoundary } from 'react-error-boundary';
import { useInView } from 'react-intersection-observer'
import { Skeleton } from "@/components/ui/skeleton"
import { debounce } from 'lodash';
import { cn } from "@/lib/utils"

interface Product {
  title: string;
  specs: string;
  benefits: string;
  image: string;
  category: string;
  details: string[];
  id?: string;
}

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
  product: Product;
  index: number;
  isSlideOpen: boolean;
  onLearnMore: (product: Product) => void;
  onSlideToggle: (index: number) => void;
}

const ProductCard = ({ product, index, isSlideOpen, onSlideToggle, onLearnMore }: ProductCardProps) => {
  return (
    <motion.div 
      className="relative w-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-2xl group flex flex-col h-full bg-white/80 backdrop-blur-sm border-0">
        <div className="relative h-24 xs:h-32 sm:h-48 lg:h-56">
          <Image 
            src={product.image} 
            alt={product.title} 
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <Badge className="absolute top-1 right-1 sm:top-3 sm:right-3 bg-red-600/90 backdrop-blur-sm text-white px-1.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-sm font-medium">
            {product.category}
          </Badge>
        </div>
        
        <CardHeader className="p-2 sm:p-4 lg:p-6 pb-1 sm:pb-2">
          <CardTitle className="text-xs sm:text-lg lg:text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2">
            {product.title}
          </CardTitle>
          <CardDescription className="hidden sm:block text-xs sm:text-sm lg:text-base text-gray-600 mt-0.5 sm:mt-2 line-clamp-2">
            {product.specs}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="hidden sm:block px-4 sm:px-6 py-2 sm:py-3 flex-grow">
          <p className="text-sm sm:text-base text-gray-700 line-clamp-3">
            {product.benefits}
          </p>
        </CardContent>
        
        <CardFooter className="p-2 sm:p-4 lg:p-6 pt-1 sm:pt-2 gap-1 sm:gap-3 flex-col">
          <Button 
            className="w-full h-7 sm:h-auto text-[10px] sm:text-sm lg:text-base bg-red-600 text-white border border-red-600 hover:bg-white hover:text-red-600 transition-all duration-300 shadow-sm"
            onClick={() => onSlideToggle(index)}
          >
            Details
            <ChevronDown className={`ml-1 sm:ml-2 h-2 w-2 sm:h-4 sm:w-4 transition-transform duration-300 ${isSlideOpen ? 'rotate-180' : ''}`} />
          </Button>
          <Button 
            className="hidden sm:flex w-full sm:h-auto text-[10px] sm:text-sm lg:text-base bg-white text-red-600 border border-red-600 hover:bg-red-600 hover:text-white transition-all duration-300"
          >
            Brochure
            <Download className="ml-1 sm:ml-2 h-2 w-2 sm:h-4 sm:w-4" />
          </Button>
        </CardFooter>

        {/* Add this sliding details panel */}
        <div 
          className={cn(
            "absolute left-0 right-0 bg-white/95 backdrop-blur-sm p-4 transition-all duration-300 shadow-lg",
            "transform",
            isSlideOpen ? "bottom-0" : "-bottom-full"
          )}
          style={{ maxHeight: '70vh', overflowY: 'auto' }}
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-bold text-gray-900">{product.title}</h3>
            <button 
              onClick={() => onSlideToggle(index)}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="h-4 w-4 text-gray-500" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Specifications:</h4>
              <p className="text-gray-600">{product.specs}</p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Benefits:</h4>
              <p className="text-gray-600">{product.benefits}</p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Details:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                {product.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            </div>
            
            <div className="flex gap-2 pt-4">
              <Button 
                className="flex-1 bg-red-600 text-white hover:bg-red-700"
                onClick={() => onLearnMore(product)}
              >
                Contact Us
              </Button>
              <Button 
                className="flex-1 bg-white text-red-600 border border-red-600 hover:bg-red-50"
              >
                Download Brochure
                <Download className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

// Add this component
const ProductSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-64 bg-gray-200 rounded-t-lg"></div>
    <div className="p-6">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
  </div>
);

const FilterButton = ({ 
  active, 
  label, 
  onClick,
  count 
}: { 
  active: boolean; 
  label: string; 
  onClick: () => void;
  count?: number;
}) => (
  <button
    onClick={onClick}
    className={cn(
      "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
      "border border-transparent",
      active 
        ? "bg-red-50 text-red-600 border-red-200" 
        : "bg-transparent hover:bg-gray-50 text-gray-600",
      "focus:outline-none focus:ring-2 focus:ring-red-500/20"
    )}
  >
    {label}
    {count && (
      <span className={cn(
        "text-xs px-2 py-0.5 rounded-full",
        active ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600"
      )}>
        {count}
      </span>
    )}
  </button>
);

// Add this new component for the floating filter bar
const FloatingFilterBar = ({ 
  searchQuery,
  selectedCategory,
  onSearch,
  onCategorySelect,
  categories,
  isVisible 
}: {
  searchQuery: string;
  selectedCategory: string | null;
  onSearch: (value: string) => void;
  onCategorySelect: (category: string | null) => void;
  categories: string[];
  isVisible: boolean;
}) => {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ 
        y: isVisible ? 0 : -20,
        opacity: isVisible ? 1 : 0
      }}
      transition={{ duration: 0.3 }}
      className={cn(
        "w-full bg-white/80 backdrop-blur-lg shadow-md py-4",
        isVisible ? "fixed top-[80px] z-30" : "relative"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white/95 backdrop-blur-lg rounded-full shadow-lg border border-gray-100 p-2 flex items-center gap-2">
          {/* Search Input */}
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-transparent text-sm focus:outline-none"
            />
          </div>

          {/* Divider */}
          <div className="h-6 w-px bg-gray-200" />

          {/* Category Filters */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-1">
            <button
              onClick={() => onCategorySelect(null)}
              className={cn(
                "text-sm px-3 py-1.5 rounded-full whitespace-nowrap transition-all",
                !selectedCategory 
                  ? "bg-red-50 text-red-600 font-medium" 
                  : "text-gray-600 hover:bg-gray-50"
              )}
            >
              All
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => onCategorySelect(category)}
                className={cn(
                  "text-sm px-3 py-1.5 rounded-full whitespace-nowrap transition-all",
                  selectedCategory === category 
                    ? "bg-red-50 text-red-600 font-medium" 
                    : "text-gray-600 hover:bg-gray-50"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function ProductsPage() {
  const [openSlide, setOpenSlide] = useState<number | null>(null);
  const [isSlideOpen, setIsSlideOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

  const handleSlideToggle = (index: number) => {
    setOpenSlide(openSlide === index ? null : index);
  };

  const parentRef = useRef<HTMLDivElement>(null);

  // Add category filtering
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const filteredProducts = selectedCategory 
    ? products.filter(p => p.category === selectedCategory)
    : products;

  // Add search functionality
  const [searchQuery, setSearchQuery] = useState('');
  const searchedProducts = filteredProducts.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Add loading states for buttons
  const [isDownloading, setIsDownloading] = useState(false);

  // Add loading states
  const [isLoading, setIsLoading] = useState(true);

  // Add error states for image loading
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/fallback-image.jpg';
  };

  // Add intersection observer for animation on scroll
  const [ref, firstInView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  // Add this useEffect
  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const [error, setError] = useState<string | null>(null);

  // In your data fetching logic
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        // Your fetch logic here
        setError(null);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const savedScroll = sessionStorage.getItem('productPageScroll');
    if (savedScroll) {
      window.scrollTo(0, parseInt(savedScroll));
      sessionStorage.removeItem('productPageScroll');
    }
  }, []);

  // Save scroll position when opening product details
  const handleLearnMore = (product: Product) => {
    sessionStorage.setItem('productPageScroll', window.scrollY.toString());
    setSelectedProduct(product);
    setIsSlideOpen(true);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSlideOpen) {
        setIsSlideOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSlideOpen]);

  // Separate immediate input update from debounced search
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      productsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 300),
    []
  );

  // Update the input handler
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);  // Immediate update
    debouncedSearch(e.target.value); // Debounced scroll
  };

  // Update the input element
  <input
    type="text"
    placeholder="Search products..."
    value={searchQuery}
    onChange={handleSearchInput}
    className={cn(
      "w-full pl-10 pr-4 py-2 rounded-full text-sm focus:outline-none transition-all duration-300",
      isSearchExpanded ? "bg-red-50 border border-red-100" : "bg-transparent"
    )}
    onFocus={() => setIsSearchExpanded(true)}
  />

  const [isFilterVisible, setIsFilterVisible] = useState(false);
  
  // Add intersection observer for products section
  const productsRef = useRef<HTMLDivElement>(null);
  const { ref: intersectionRef, inView } = useInView({
    threshold: 0,
    rootMargin: "-90% 0px 0px 0px"
  });

  // Update filter visibility based on scroll position
  useEffect(() => {
    setIsFilterVisible(inView);
  }, [inView]);

  // Get unique categories
  const categories = useMemo(() => 
    Array.from(new Set(products.map(p => p.category))).sort(),
    [products]
  );

  // Measure the actual header height (56px = py-4 * 2 + some buffer)
  const HEADER_HEIGHT = 56;

  // Update the intersection observers
  const { ref: heroEndRef, inView: isHeroVisible } = useInView({
    threshold: 0,
    rootMargin: `-${HEADER_HEIGHT}px 0px 0px 0px`
  });

  const { ref: productsEndRef, inView: isProductsVisible } = useInView({
    threshold: 1
  });

  const onCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    productsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isSearchExpanded && !(e.target as Element).closest('.search-container')) {
        setIsSearchExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSearchExpanded]);

  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative h-[60vh] sm:h-[calc(100vh-56px)] flex items-center justify-center overflow-hidden">
          <motion.div 
            className="absolute inset-0 z-0 bg-gray-900"
            style={{ opacity, scale }}
          >
            <Image
              src="https://placehold.co/1920x1080"
              alt="LEAFSPRINGS Products"
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
              Our Product Range
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Discover our comprehensive range of high-performance leaf spring machinery, engineered for excellence in automotive and heavy industry applications.
            </motion.p>
          </div>
        </section>

        {/* Observer at end of hero section */}
        <div ref={heroEndRef} className="h-1" />

        {/* Filter Section - Now positioned correctly */}
        <div className="sticky top-[56px] z-40 bg-white/80 backdrop-blur-lg shadow-md py-3 sm:py-4">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto bg-white/95 backdrop-blur-lg rounded-full shadow-lg border border-gray-100 p-1.5 sm:p-2 flex items-center gap-2">
              {/* Search Container */}
              <div className={cn(
                "relative flex-1 search-container transition-all duration-300",
                isSearchExpanded ? "flex-grow" : "w-full sm:w-48"
              )}>
                <div className="relative flex items-center">
                  <Search 
                    className={cn(
                      "absolute left-3 h-4 w-4 transition-all duration-300",
                      isSearchExpanded ? "text-red-500" : "text-gray-400"
                    )}
                    onClick={() => setIsSearchExpanded(true)}
                  />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={handleSearchInput}
                    className={cn(
                      "w-full pl-10 pr-4 py-2 rounded-full text-sm focus:outline-none transition-all duration-300",
                      isSearchExpanded ? "bg-red-50 border border-red-100" : "bg-transparent"
                    )}
                    onFocus={() => setIsSearchExpanded(true)}
                  />
                </div>
                {isSearchExpanded && searchQuery && (
                  <X 
                    className="absolute right-3 h-4 w-4 text-gray-400 hover:text-red-500 cursor-pointer"
                    onClick={() => {
                      setSearchQuery('');
                      setIsSearchExpanded(false);
                    }}
                  />
                )}
              </div>

              {/* Only show divider and categories when search is not expanded and screen is larger than mobile */}
              {!isSearchExpanded && (
                <>
                  <div className="hidden sm:block h-6 w-px bg-gray-200" />
                  <div className="hidden sm:flex items-center gap-2 overflow-x-auto scrollbar-hide py-1">
                    <button
                      onClick={() => onCategorySelect(null)}
                      className={cn(
                        "text-sm px-3 py-1.5 rounded-full whitespace-nowrap transition-all",
                        !selectedCategory 
                          ? "bg-red-50 text-red-600 font-medium" 
                          : "text-gray-600 hover:bg-gray-50"
                      )}
                    >
                      All
                    </button>
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => onCategorySelect(category)}
                        className={cn(
                          "text-sm px-3 py-1.5 rounded-full whitespace-nowrap transition-all",
                          selectedCategory === category 
                            ? "bg-red-50 text-red-600 font-medium" 
                            : "text-gray-600 hover:bg-gray-50"
                        )}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            
            {/* Mobile category filters */}
            {!isSearchExpanded && (
              <div className="sm:hidden mt-3 overflow-x-auto flex items-center gap-2 pb-2 scrollbar-hide">
                <button
                  onClick={() => onCategorySelect(null)}
                  className={cn(
                    "text-xs px-3 py-1.5 rounded-full whitespace-nowrap transition-all flex-shrink-0",
                    !selectedCategory 
                      ? "bg-red-50 text-red-600 font-medium" 
                      : "text-gray-600 hover:bg-gray-50"
                  )}
                >
                  All
                </button>
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => onCategorySelect(category)}
                    className={cn(
                      "text-xs px-3 py-1.5 rounded-full whitespace-nowrap transition-all flex-shrink-0",
                      selectedCategory === category 
                        ? "bg-red-50 text-red-600 font-medium" 
                        : "text-gray-600 hover:bg-gray-50"
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Products Section */}
        <section ref={productsRef} className="py-8 sm:py-16">
          <div className="container mx-auto px-2 sm:px-4">
            <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6">
              {searchedProducts.map((product, index) => (
                <ProductCard
                  key={index}
                  product={product}
                  index={index}
                  isSlideOpen={openSlide === index}
                  onLearnMore={() => handleLearnMore(product)}
                  onSlideToggle={handleSlideToggle}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-red-600 to-red-700 py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Need Help Choosing the Right Equipment?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Our team of experts is ready to assist you in selecting the perfect machinery for your specific requirements.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center bg-white text-red-600 border-2 border-red-600 hover:bg-red-600 hover:text-white hover:border-2 hover:border-white transition-colors px-8 py-3 rounded-md font-bold"
            >
              Contact Us <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <WhatsAppButton />
      {error && (
        <div className="text-red-500 p-4 text-center">
          {error}
        </div>
      )}
    </>
  );
}
