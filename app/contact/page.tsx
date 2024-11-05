'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, Building, Users } from 'lucide-react'
import WhatsAppButton from '@/components/shared/whatsapp-button'

export default function ContactPage() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('Form submitted')
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section with Background */}
      <section className="relative h-[40vh] bg-gradient-to-r from-red-600 to-red-800">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container h-full mx-auto px-4 flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Let's Connect</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            We're here to help you optimize your manufacturing process with our innovative leaf spring solutions
          </p>
        </div>
      </section>

      {/* Quick Contact Stats */}
      <section className="relative -mt-16 z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: MessageSquare,
                title: "24/7 Support",
                description: "Round-the-clock assistance for all your queries"
              },
              {
                icon: Building,
                title: "Global Presence",
                description: "Serving customers across multiple countries"
              },
              {
                icon: Users,
                title: "Expert Team",
                description: "Dedicated professionals at your service"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-xl p-6 transform hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="bg-red-50 p-3 rounded-full">
                    <item.icon className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Information */}
              <div className="space-y-12">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
                  <p className="text-gray-600 mb-8">
                    Whether you have a question about our products, pricing, or technical support, 
                    our team is ready to answer all your questions.
                  </p>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      icon: Phone,
                      title: "Call Us",
                      content: "+91-8120005961",
                      detail: "Monday to Friday, 9:00 AM - 6:00 PM IST",
                      action: "tel:+918120005961"
                    },
                    {
                      icon: Mail,
                      title: "Email Us",
                      content: "engg@r-tech.in",
                      detail: "We'll respond within 24 hours",
                      action: "mailto:engg@r-tech.in"
                    },
                    {
                      icon: MapPin,
                      title: "Visit Us",
                      content: "Sanwer Road, Indore",
                      detail: "Madhya Pradesh, India"
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="bg-red-50 p-3 rounded-full">
                        <item.icon className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{item.title}</h3>
                        {item.action ? (
                          <a href={item.action} className="text-red-600 hover:text-red-700 font-medium">
                            {item.content}
                          </a>
                        ) : (
                          <p className="text-gray-600">{item.content}</p>
                        )}
                        <p className="text-sm text-gray-500 mt-1">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Map */}
                <div className="bg-white p-2 rounded-lg shadow-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.332528666897!2d75.85344531496!3d22.75999998509083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd0b7d3c4c8f%3A0x4a3c91a1f5a6e0a!2sSanwer%20Rd%2C%20Indore%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1651234567890!5m2!1sen!2sin"
                    className="w-full h-[300px] rounded-lg"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <Input 
                        placeholder="John" 
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <Input 
                        placeholder="Doe" 
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                    <Input 
                      placeholder="Your Company Ltd." 
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <Input 
                      type="email" 
                      placeholder="john@company.com" 
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <Input 
                      type="tel" 
                      placeholder="+1 (555) 000-0000" 
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <Textarea 
                      placeholder="Tell us about your requirements..."
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent min-h-[150px]"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition-colors duration-300"
                  >
                    Send Message <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                {
                  q: "What are your typical response times?",
                  a: "We aim to respond to all inquiries within 24 hours during business days."
                },
                {
                  q: "Do you provide international shipping?",
                  a: "Yes, we ship our products globally and can provide shipping quotes upon request."
                },
                {
                  q: "Can you handle custom orders?",
                  a: "Absolutely! We specialize in custom leaf spring solutions tailored to your specific needs."
                }
              ].map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 text-left">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">{item.q}</h3>
                  <p className="text-gray-600">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <WhatsAppButton />
    </main>
  )
}