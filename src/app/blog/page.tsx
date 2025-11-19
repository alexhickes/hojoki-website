import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ArrowRight, Calendar } from 'lucide-react'

export const revalidate = 60 // Revalidate every minute

async function getPosts() {
  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  return posts || []
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <section className="pt-32 pb-12 container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-4">Hojoki <span className="text-neon-purple">Blog</span></h1>
        <p className="text-gray-400 text-xl">Updates, news, and stories from the team.</p>
      </section>

      <section className="pb-20 container mx-auto px-4">
        {posts.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
            <p className="text-gray-400 text-lg">No posts found. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link 
                href={`/blog/${post.slug}`} 
                key={post.id}
                className="group bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-neon-purple transition-all hover:-translate-y-1"
              >
                {post.image_url && (
                  <div className="h-48 bg-gray-800 relative">
                    {/* Ideally use Next.js Image, but simple img for now with external URLs */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={post.image_url} 
                      alt={post.title} 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.created_at).toLocaleDateString()}
                  </div>
                  <h2 className="text-xl font-bold mb-3 group-hover:text-neon-orange transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center text-neon-purple font-medium">
                    Read More <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}
