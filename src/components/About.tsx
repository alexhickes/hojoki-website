'use client'

import { motion } from 'framer-motion'
import { MapPin, Users, Share2 } from 'lucide-react'

const features = [
  {
    icon: <MapPin className="w-8 h-8 text-neon-orange" />,
    title: 'Real-Time Location',
    description: 'See where your friends are and what they are up to in real-time.'
  },
  {
    icon: <Users className="w-8 h-8 text-neon-purple" />,
    title: 'Connect Instantly',
    description: 'Join communities and groups based on your location and interests.'
  },
  {
    icon: <Share2 className="w-8 h-8 text-neon-orange" />,
    title: 'Share Moments',
    description: 'Broadcast your experiences to your network with a single tap.'
  }
]

export default function About() {
  return (
    <section id="about" className="py-20 bg-black/50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">About <span className="text-neon-purple">Hojoki</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We are building the future of social interaction. Our flagship product, <span className="text-neon-orange font-semibold">Wys X</span>, redefines how you connect with the world around you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-neon-purple/50 transition-colors"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
