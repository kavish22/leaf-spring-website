import Link from 'next/link'
import { Facebook, Twitter, Linkedin, Instagram, Phone, Mail, MapPin, Clock } from 'lucide-react'

export default function Footer() {
  const getHref = (item: string) => {
    return item.toLowerCase() === 'home' ? '/' : `/${item.toLowerCase()}`
  }

  return (
    <footer className="bg-gray-900 text-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-red-400">LEAF SPRING MACHINES</h3>
            <p className="text-gray-400 mb-4 md:mb-6">Engineered for excellence in leaf spring machinery.</p>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Facebook" className="text-gray-400 hover:text-red-400 transition-colors">
                <Facebook />
              </Link>
              <Link href="#" aria-label="Twitter" className="text-gray-400 hover:text-red-400 transition-colors">
                <Twitter />
              </Link>
              <Link href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-red-400 transition-colors">
                <Linkedin />
              </Link>
              <Link href="#" aria-label="Instagram" className="text-gray-400 hover:text-red-400 transition-colors">
                <Instagram />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Products', 'About', 'Team', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href={getHref(item)} className="text-gray-400 hover:text-red-400 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center"><Phone className="mr-2 text-red-400" size={18} /> +1 (555) 123-4567</li>
              <li className="flex items-center"><Mail className="mr-2 text-red-400" size={18} /> info@leafsprings.com</li>
              <li className="flex items-center"><MapPin className="mr-2 text-red-400" size={18} /> 123 Manufacturing St, Industry City, IN 12345</li>
              <li className="flex items-center"><Clock className="mr-2 text-red-400" size={18} /> Mon-Fri: 9am-5pm</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Visit Our Facility</h3>
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
        <div className="mt-8 md:mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} LEAF SPRING MACHINES. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}