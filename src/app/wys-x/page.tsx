'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Map, Share2, Shield, Smartphone } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function WysXPage() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-purple/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Wys <span className="text-neon-orange">X</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto mb-12"
          >
            The next generation of location-based social networking. Discover, connect, and share like never before.
          </motion.p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Live Map Interface</h2>
              <p className="text-gray-400 mb-6 text-lg">
                See your friends and communities on an interactive, real-time map. Filter by interests, activity, or proximity.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <Map className="text-neon-purple" />
                  <span>Real-time location updates</span>
                </li>
                <li className="flex items-center gap-3">
                  <Shield className="text-neon-purple" />
                  <span>Privacy-first location controls</span>
                </li>
              </ul>
            </motion.div>
            <div className="bg-black/40 p-8 rounded-2xl border border-white/10 h-[400px] flex items-center justify-center">
              <Map className="w-32 h-32 text-gray-600" />
              {/* Placeholder for App Screenshot */}
            </div>
          </div>
        </div>
      </section>

      {/* Social Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
            <div className="order-2 md:order-1 bg-black/40 p-8 rounded-2xl border border-white/10 h-[400px] flex items-center justify-center">
              <Smartphone className="w-32 h-32 text-gray-600" />
              {/* Placeholder for App Screenshot */}
            </div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 md:order-2"
            >
              <h2 className="text-3xl font-bold mb-6">Seamless Sharing</h2>
              <p className="text-gray-400 mb-6 text-lg">
                Share your current vibe, photos, or status with a single tap. Your network knows where the action is.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <Share2 className="text-neon-orange" />
                  <span>Instant status broadcasting</span>
                </li>
                <li className="flex items-center gap-3">
                  <Smartphone className="text-neon-orange" />
                  <span>Cross-platform compatibility</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neon-purple/10 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl font-bold mb-8">Ready to join the movement?</h2>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <a 
              href="#" 
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center gap-3 border border-white/10 hover:border-neon-purple"
            >
              <Smartphone className="w-6 h-6" />
              <span>Download for iOS</span>
            </a>
            <a 
              href="#" 
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center gap-3 border border-white/10 hover:border-neon-orange"
            >
              <Smartphone className="w-6 h-6" />
              <span>Download for Android</span>
            </a>
            <a 
              href="https://wysx1.vercel.app/home" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-neon-purple hover:bg-fuchsia-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(213,0,249,0.3)] hover:shadow-[0_0_40px_rgba(213,0,249,0.5)] flex items-center gap-3"
            >
              <span>Visit Wys X Web</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
