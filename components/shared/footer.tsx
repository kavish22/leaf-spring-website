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
        {/* Mobile Layout */}
        <div className="sm:hidden">
          {/* Company Logo & Info */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-red-400">LEAF SPRING MACHINES</h3>
            <p className="text-gray-400 text-xs">Engineered for excellence</p>
          </div>

          {/* Mobile Navigation Cards */}
          <div className="space-y-4">
            {/* Quick Links Card */}
            <div className="bg-gray-800 rounded-lg p-3">
              <h3 className="text-red-400 font-bold text-sm mb-3 border-b border-gray-700 pb-2">
                Quick Links
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {quickLinks.map(({ icon: Icon, text }) => (
                  <Link
                    key={text}
                    href={getHref(text)}
                    className="flex items-center space-x-2 text-gray-400 hover:text-red-400 transition-colors duration-200"
                  >
                    <Icon size={14} className="text-red-400" />
                    <span className="text-xs font-medium">{text}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-gray-800 rounded-lg p-3">
              <h3 className="text-red-400 font-bold text-sm mb-3 border-b border-gray-700 pb-2">
                Contact Us
              </h3>
              <div className="grid gap-3">
                {contactItems.map(([Icon, text], i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-2 text-gray-400"
                  >
                    <div className="bg-gray-700 p-1.5 rounded-full">
                      <Icon size={14} className="text-red-400" />
                    </div>
                    <span className="text-xs font-medium">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Social Links */}
          <div className="mt-4 bg-gray-800 rounded-lg p-3">
            <h3 className="text-red-400 font-bold text-sm mb-3 border-b border-gray-700 pb-2">
              Connect With Us
            </h3>
            <div className="flex justify-center space-x-4">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="bg-gray-700 p-2 rounded-full text-gray-400 hover:text-red-400 transition-colors duration-200"
                  aria-label={`Social link ${i + 1}`}
                >
                  <Icon size={16} />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:block">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="col-span-1">
              <h3 className="text-3xl font-bold text-red-400 tracking-wide">LEAF SPRING</h3>
              <h4 className="text-2xl font-bold text-red-400 mb-4">MACHINES</h4>
              <p className="text-gray-400 mb-6 text-base leading-relaxed">Engineered for excellence</p>
              <div className="flex space-x-6">
                {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                  <Link
                    key={i}
                    href="#"
                    className="text-gray-400 hover:text-red-400 transition-all duration-300 hover:scale-110"
                  >
                    <Icon size={24} />
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-span-1">
              <h3 className="text-xl font-bold mb-6 text-red-400 tracking-wide">Quick Links</h3>
              <ul className="space-y-4">
                {quickLinks.map(({ icon: Icon, text }) => (
                  <li key={text}>
                    <Link
                      href={getHref(text)}
                      className="flex items-center group text-gray-400 hover:text-red-400 transition-colors duration-300"
                    >
                      <Icon size={20} className="mr-3 text-red-400 group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-base tracking-wide">{text}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Information */}
            <div className="col-span-1">
              <h3 className="text-xl font-bold mb-6 text-red-400 tracking-wide">Contact</h3>
              <ul className="space-y-4">
                {contactItems.map(([Icon, text], i) => (
                  <li key={i} className="flex items-center group text-gray-400">
                    <Icon size={20} className="mr-3 text-red-400 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-base tracking-wide">{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Map Section */}
            <div className="col-span-1">
              <h3 className="text-xl font-bold mb-6 text-red-400 tracking-wide">Location</h3>
              <div className="bg-gray-800 h-[160px] rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"></div>
            </div>
          </div>
        </div>

        {/* Copyright - Both Mobile & Desktop */}
        <div className="mt-8 pt-6 border-t border-gray-800 text-center">
          <p className="text-xs md:text-sm text-gray-400">
            &copy; {new Date().getFullYear()} LEAF SPRING MACHINES
          </p>
        </div>
      </div>
    </footer>
  );
}