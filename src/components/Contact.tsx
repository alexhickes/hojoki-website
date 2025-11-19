'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'

export default function Contact() {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    }

    try {
      const { error } = await supabase.from('contacts').insert([data])
      
      if (error) throw error

      setStatus('success')
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.error('Error submitting form:', error)
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
       {/* Background Gradient Blob */}
       <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-neon-orange/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
          <p className="text-gray-400">Have questions about Wys X? We'd love to hear from you.</p>
        </motion.div>

        <motion.form 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10 backdrop-blur-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                required
                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-purple transition-colors"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                required
                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-purple transition-colors"
                placeholder="john@example.com"
              />
            </div>
          </div>
          
          <div className="mb-8">
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
            <textarea 
              id="message" 
              name="message" 
              rows={4}
              required
              className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-purple transition-colors"
              placeholder="Tell us about your inquiry..."
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-neon-purple hover:bg-fuchsia-600 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Sending...' : (
              <>
                Send Message <Send className="w-5 h-5" />
              </>
            )}
          </button>

          {status === 'success' && (
            <p className="mt-4 text-green-400 text-center">Message sent successfully!</p>
          )}
          {status === 'error' && (
            <p className="mt-4 text-red-400 text-center">Something went wrong. Please try again.</p>
          )}
        </motion.form>
      </div>
    </section>
  )
}
