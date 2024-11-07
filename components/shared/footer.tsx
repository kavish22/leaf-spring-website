import Link from 'next/link'
import { Facebook, Twitter, Linkedin, Instagram, Phone, Mail, MapPin, Clock, Home, Package, Info, MessageSquare, LucideIcon } from 'lucide-react'

export default function Footer() {
  const getHref = (item: string) => {
    return item.toLowerCase() === 'home' ? '/' : `/${item.toLowerCase()}`
  }

  const quickLinks = [
    { icon: Home, text: 'Home' },
    { icon: Package, text: 'Products' },
    { icon: Info, text: 'About' },
    { icon: MessageSquare, text: 'Contact' }
  ] as const;

  type ContactItem = [LucideIcon, string];

  const contactItems: ContactItem[] = [
    [Phone, '+1 (555) 123-4567'],
    [Mail, 'info@leafsprings.com'],
    [MapPin, '123 Manufacturing St'],
    [Clock, '9am-5pm']
  ];

  return (
    <footer className="bg-gray-900 text-white py-6 md:py-12">
      <div className="container mx-auto px-4 md:px-4">
        {/* Mobile Company Info */}
        <div className="block sm:hidden text-center mb-6">
          <h3 className="text-lg font-bold mb-2 text-red-400">LEAF SPRING MACHINES</h3>
          <p className="text-gray-400 text-xs mb-3">Engineered for excellence</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Desktop Company Info */}
          <div className="hidden sm:block">
            <h3 className="text-2xl font-bold mb-4 text-red-400 text-left">LEAF SPRING MACHINES</h3>
            <p className="text-gray-400 mb-4 text-base text-left">Engineered for excellence in leaf spring machinery.</p>
            <div className="flex space-x-4 justify-start">
              <Link href="#" aria-label="Facebook" className="text-gray-400 hover:text-red-400 transition-colors">
                <Facebook size={14} className="md:w-5 md:h-5" />
              </Link>
              <Link href="#" aria-label="Twitter" className="text-gray-400 hover:text-red-400 transition-colors">
                <Twitter size={14} className="md:w-5 md:h-5" />
              </Link>
              <Link href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-red-400 transition-colors">
                <Linkedin size={14} className="md:w-5 md:h-5" />
              </Link>
              <Link href="#" aria-label="Instagram" className="text-gray-400 hover:text-red-400 transition-colors">
                <Instagram size={14} className="md:w-5 md:h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links - Updated for mobile */}
          <div className="col-span-1 px-4 sm:px-0">
            <h3 className="text-sm font-semibold mb-3 md:mb-6 md:text-2xl text-red-400 md:font-bold">Quick Links</h3>
            <ul className="space-y-2.5 md:space-y-4">
              {quickLinks.map(({ icon: Icon, text }) => (
                <li key={text}>
                  <Link 
                    href={getHref(text)} 
                    className="flex items-center text-gray-400 hover:text-red-400 transition-colors duration-200 group"
                  >
                    <Icon className="mr-2.5 text-red-400 md:w-5 md:h-5 group-hover:scale-110 transition-transform" size={14} />
                    <span className="text-sm md:text-lg md:tracking-wide">{text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="col-span-1 px-4 sm:px-0">
            <h3 className="text-sm font-semibold mb-3 md:mb-6 md:text-2xl text-red-400 md:font-bold">Contact</h3>
            <ul className="space-y-2.5 md:space-y-4 text-gray-400">
              {contactItems.map(([Icon, text], i) => (
                <li key={i} className="flex items-center group">
                  <Icon className="mr-2.5 text-red-400 md:w-5 md:h-5 group-hover:scale-110 transition-transform" size={14} />
                  <span className="text-sm md:text-lg md:tracking-wide">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Map - Hidden on mobile */}
          <div className="hidden lg:block col-span-2 lg:col-span-1">
            <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-4">Visit Our Facility</h3>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d-73.98731968459391!3d40.74844797932764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1635186714740!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Mobile Social Icons */}
        <div className="flex justify-center space-x-6 mt-6 mb-4 sm:hidden">
          {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
            <Link 
              key={i} 
              href="#" 
              className="text-gray-400 hover:text-red-400"
              aria-label={`Social link ${i + 1}`}
            >
              <Icon size={16} />
            </Link>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-800 text-center">
          <p className="text-[10px] md:text-sm text-gray-400">&copy; {new Date().getFullYear()} LEAF SPRING MACHINES</p>
        </div>
      </div>
    </footer>
  )
}