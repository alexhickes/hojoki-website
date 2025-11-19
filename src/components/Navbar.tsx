'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const links = [
  { name: 'Products', href: '/wys-x' }, // Direct link to product page
  { name: 'Blog', href: '/blog' },     // Direct link to blog
  { name: 'About', href: '/#about' },  // Anchor link to home
  { name: 'Contact', href: '/#contact' }, // Anchor link to home
  { name: 'Legal', href: '/#terms' },  // Anchor link to home
]

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      // Always show navbar on non-home pages or after scrolling on home
      if (pathname !== '/' || window.scrollY > window.innerHeight * 0.8) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    // Initial check
    handleScroll()

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  const handleNavigation = (href: string) => {
    setIsOpen(false)
    
    // If it's an anchor link
    if (href.startsWith('/#')) {
      const elementId = href.replace('/#', '')
      
      if (pathname === '/') {
        // If on home page, just scroll
        const element = document.getElementById(elementId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        // If on another page, route to home then scroll (handled by browser hash)
        router.push(href)
      }
    } else {
      // Standard route
      router.push(href)
    }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10"
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/"
            className="text-2xl font-bold cursor-pointer"
          >
            Hojoki
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-8">
            {links.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavigation(link.href)}
                className="text-sm font-medium text-gray-300 hover:text-neon-purple transition-colors"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex flex-col"
          >
            <div className="container mx-auto px-4 h-16 flex items-center justify-between border-b border-white/10">
              <div className="text-2xl font-bold">Hojoki</div>
              <button 
                className="text-white"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center gap-8">
              {links.map((link, index) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleNavigation(link.href)}
                  className="text-2xl font-bold text-white hover:text-neon-orange transition-colors"
                >
                  {link.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
