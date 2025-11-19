'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      {/* Background Gradient Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-purple/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 z-10 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
        >
          Share Your World with <span className="text-neon-purple text-glow">Wys X</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
        >
          The ultimate location-sharing social media experience by Hojoki. Connect, explore, and share moments in real-time.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col md:flex-row gap-4 justify-center items-center"
        >
          <button className="bg-neon-orange hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold text-lg transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,109,0,0.3)] hover:shadow-[0_0_30px_rgba(255,109,0,0.5)]">
            Get Started <ArrowRight className="w-5 h-5" />
          </button>
          <button className="border border-neon-purple text-neon-purple hover:bg-neon-purple/10 px-8 py-3 rounded-full font-semibold text-lg transition-all">
            Learn More
          </button>
        </motion.div>
      </div>
    </section>
  )
}
