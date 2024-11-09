'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Send, MessageSquare, Clock, ChevronDown, Search } from 'lucide-react'
import WhatsAppButton from '@/components/shared/whatsapp-button'
import { Card, CardContent } from "@/components/ui/card"
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

const contactInfo = [
  {
    icon: Phone,
    title: "Call Us",
    content: "+91-8120005961",
    detail: "Mon-Fri, 9:00 AM - 6:00 PM IST",
    action: "tel:+918120005961"
  },
  {
    icon: Mail,
    title: "Email Us",
    content: "engg@r-tech.in",
    detail: "24/7 support for urgent inquiries",
    action: "mailto:engg@r-tech.in"
  },
  {
    icon: MapPin,
    title: "Visit Us",
    content: "Sanwer Road, Indore",
    detail: "Madhya Pradesh, India"
  },
  {
    icon: Clock,
    title: "Business Hours",
    content: "Monday to Friday",
    detail: "9:00 AM - 6:00 PM IST"
  }
];

// Updated contact methods data structure
const contactMethods = [
  {
    icon: MessageSquare,
    title: "Chat with Sales",
    description: "Speak to our friendly team",
    contact: "sales@r-tech.in",
    callToAction: "Start chat",
    linkType: "chat"
  },
  {
    icon: Mail,
    title: "Email us",
    description: "We'll respond within 24 hours",
    contact: "engg@r-tech.in",
    callToAction: "Send email",
    linkType: "email"
  },
  {
    icon: Phone,
    title: "Call us",
    description: "Mon-Fri from 9am to 6pm IST",
    contact: "+91-8120005961",
    callToAction: "Call now",
    linkType: "phone"
  },
  {
    icon: MapPin,
    title: "Visit us",
    description: "Come say hello at our office",
    contact: "Sanwer Road, Indore, MP",
    callToAction: "Get directions",
    linkType: "map"
  }
];

// Updated FAQ data with more structured categories
const faqCategories = {
  all: "All Questions",
  product: "Product",
  shipping: "Shipping & Delivery",
  support: "Support",
  quality: "Quality & Warranty",
  orders: "Orders & Payment"
};

// Update the type definition
type FAQCategory = 'product' | 'shipping' | 'support' | 'quality' | 'orders' | 'all';
type StrictFAQCategory = Exclude<FAQCategory, 'all'>;

interface FAQ {
  question: string;
  answer: string;
  category: StrictFAQCategory;
}

// Remove the 'as const' assertion from the faqs array
const faqs: FAQ[] = [
  {
    question: "How quickly can you respond to inquiries?",
    answer: "We typically respond to all inquiries within 24 hours during business days. For urgent matters, please contact us by phone at +91-8120005961 for immediate assistance.",
    category: "support"
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we provide worldwide shipping services for our leaf springs. We have extensive experience in international logistics, customs documentation, and have established partnerships with reliable shipping providers to ensure safe and timely delivery to any global destination.",
    category: "shipping"
  },
  {
    question: "What are your quality certifications?",
    answer: "We maintain the highest quality standards in the industry with certifications including: ISO 9001:2015, IATF 16949:2016, and ISO 14001:2015. Our manufacturing processes are regularly audited and comply with international automotive quality management systems.",
    category: "quality"
  },
  {
    question: "Can you handle custom specifications?",
    answer: "Absolutely! Custom manufacturing is our specialty. We can produce leaf springs according to your exact specifications, including material grade, dimensions, load capacity, and performance characteristics. Our engineering team will work closely with you throughout the design and manufacturing process.",
    category: "product"
  },
  {
    question: "What is your minimum order quantity (MOQ)?",
    answer: "Our MOQ varies depending on the product specifications and complexity. We're flexible and can accommodate both small custom orders and large production runs. Contact our sales team for specific MOQ details for your requirements.",
    category: "orders"
  },
  {
    question: "Do you provide warranty on your products?",
    answer: "Yes, all our leaf springs come with a standard warranty against manufacturing defects. The warranty period varies by product type and application. We also offer extended warranty options for specific industrial applications.",
    category: "quality"
  }
];

interface FAQ {
  question: string;
  answer: string;
  category: Exclude<FAQCategory, 'all'>;
}

interface FAQItemProps {
  faq: FAQ;
  isOpen: boolean;
  onToggle: () => void;
  categoryLabel: string;
}

// Update the FAQ Item component
const FAQItem = ({ faq, isOpen, onToggle, categoryLabel }: FAQItemProps) => {
  return (
    <div className="border-b border-red-100 last:border-none">
      <button
        onClick={onToggle}
        className="w-full px-6 py-5 flex items-center justify-between gap-4 hover:bg-red-50/50 transition-colors"
      >
        <div className="text-left">
          <span className="text-red-500 text-sm font-medium mb-1 block">
            {categoryLabel}
          </span>
          <h3 className="text-lg font-semibold text-gray-900">
            {faq.question}
          </h3>
        </div>
        <ChevronDown 
          className={`w-5 h-5 text-red-500 transition-transform duration-200
            ${isOpen ? 'transform rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="px-6 pb-5 text-gray-600">
          {faq.answer}
        </div>
      )}
    </div>
  );
};

// Update the Enhanced FAQ Section
const EnhancedFAQSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FAQCategory>('all');
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = !searchQuery || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-24 bg-gray-50 relative border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-red-600 font-semibold tracking-wider uppercase text-sm">FAQ</span>
            <h2 className="text-4xl md:text-5xl font-bold text-red-600 mt-3 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Everything you need to know about our products and services. Can't find what you're looking for? Just ask us.
            </p>
          </div>

          {/* Search Bar - Hidden on Mobile */}
          <div className="relative mb-8 hidden md:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-red-100"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Tabs - Hidden on Mobile */}
          <div className="mb-8 hidden md:flex flex-wrap gap-2">
            {Object.entries(faqCategories).map(([category, label]) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category as FAQCategory)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === category
                    ? 'bg-red-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-red-50'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="bg-white rounded-2xl shadow-xl border border-red-100">
            {/* Show all FAQs on mobile, filtered FAQs on desktop */}
            {(window.innerWidth < 768 ? faqs : filteredFAQs).map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                isOpen={openFAQIndex === index}
                onToggle={() => setOpenFAQIndex(openFAQIndex === index ? null : index)}
                categoryLabel={faqCategories[faq.category]}
              />
            ))}
            
            {/* No results message - only show on desktop */}
            {filteredFAQs.length === 0 && window.innerWidth >= 768 && (
              <div className="px-6 py-12 text-center">
                <Search className="h-12 w-12 text-red-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No results found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
              </div>
            )}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 text-center bg-gradient-to-br from-red-50 to-white p-8 rounded-2xl border border-red-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Can't find the answer you're looking for? Please chat to our friendly team.
            </p>
            <Button 
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 rounded-xl"
              onClick={() => window.location.href = 'mailto:engg@r-tech.in'}
            >
              Contact Support
              <Mail className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function ContactPage() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Add form submission logic
  }

  return (
    <>
      <main className="bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative h-[60vh] sm:h-[calc(100vh-56px)] flex items-center justify-center overflow-hidden bg-gradient-to-b from-black to-gray-900">
          <div className="absolute inset-0 z-0 opacity-50 scale-100" style={{ backgroundImage: `url('/patterns/grid.svg')` }} />
          <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-8 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              Let's Build Something Together
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-10">
              Get in touch with our experts to discuss your leaf spring manufacturing needs
            </p>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {/* Main Contact Section */}
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-5" />
          
          <div className="container mx-auto px-4 max-w-7xl relative">
            {/* Section Header */}
            <div className="text-center mb-20">
              <span className="text-red-600 font-semibold tracking-wider uppercase text-sm">Contact Us</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-4">
                Let's Start a Conversation
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Whether you have a question about our products, services, or just want to say hello, we're ready to answer all your questions
              </p>
            </div>

            {/* Contact Methods Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
              {contactMethods.slice(0, 3).map((method, index) => (
                <div key={index} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-transparent rounded-2xl transform rotate-1 group-hover:rotate-0 transition-transform duration-300" />
                  <div className="relative bg-white p-8 rounded-2xl border border-red-100 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-3 w-fit mb-6 text-white">
                      <method.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{method.title}</h3>
                    <p className="text-gray-600 mb-4">{method.description}</p>
                    <a 
                      href={`${method.linkType === 'email' ? 'mailto:' : method.linkType === 'phone' ? 'tel:' : ''}${method.contact}`}
                      className="inline-flex items-center text-red-600 hover:text-red-700 font-medium"
                    >
                      {method.contact}
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form and Map Section */}
            <div className="grid lg:grid-cols-5 gap-12 items-start">
              {/* Form Section */}
              <div className="lg:col-span-3 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-red-50/50 to-transparent rounded-3xl transform -rotate-1" />
                <div className="relative bg-white p-8 sm:p-12 rounded-2xl border border-red-100 shadow-xl">
                  <h3 className="text-2xl font-bold text-red-600 mb-2">Send us a message</h3>
                  <p className="text-gray-600 mb-8">Our team will get back to you within 24 hours</p>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-900">First name</label>
                        <Input 
                          className="border-gray-200 focus:border-red-400 focus:ring-red-400 rounded-xl" 
                          placeholder="John"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-900">Last name</label>
                        <Input 
                          className="border-gray-200 focus:border-red-400 focus:ring-red-400 rounded-xl"
                          placeholder="Doe"
                        />
                      </div>
                      <div className="sm:col-span-2 space-y-2">
                        <label className="text-sm font-medium text-gray-900">Email</label>
                        <Input 
                          type="email" 
                          className="border-gray-200 focus:border-red-400 focus:ring-red-400 rounded-xl"
                          placeholder="john@example.com"
                        />
                      </div>
                      <div className="sm:col-span-2 space-y-2">
                        <label className="text-sm font-medium text-gray-900">Message</label>
                        <Textarea 
                          rows={6} 
                          className="border-gray-200 focus:border-red-400 focus:ring-red-400 rounded-xl"
                          placeholder="Tell us about your requirements..."
                        />
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white rounded-xl py-6">
                      Send message
                      <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </div>

              {/* Map and Info Section */}
              <div className="lg:col-span-2 relative">
                <div className="sticky top-8 space-y-8">
                  <div className="bg-white rounded-2xl border border-red-100 shadow-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.332528666897!2d75.85344531496!3d22.75999998509083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd0b7d3c4c8f%3A0x4a3c91a1f5a6e0a!2sSanwer%20Rd%2C%20Indore%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1651234567890!5m2!1sen!2sin"
                      className="w-full h-[300px]"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>

                  <div className="bg-white p-8 rounded-2xl border border-red-100 shadow-lg">
                    <h4 className="font-bold text-gray-900 mb-6">Visit our office</h4>
                    <div className="space-y-6">
                      <div className="flex gap-4">
                        <div className="bg-red-50 rounded-lg p-2 h-fit">
                          <MapPin className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-1">Office Address</h5>
                          <p className="text-gray-600">Sanwer Road, Indore,<br />Madhya Pradesh, India</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="bg-red-50 rounded-lg p-2 h-fit">
                          <Clock className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-1">Working Hours</h5>
                          <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM IST<br />Saturday - Sunday: Closed</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <EnhancedFAQSection />

        <WhatsAppButton />
      </main>
    </>
  )
}