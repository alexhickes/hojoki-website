import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Calendar, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export const revalidate = 60

// Define the correct type for params in Next.js 15 App Router
type Props = {
  params: Promise<{ slug: string }>
}

async function getPost(slug: string) {
  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  return post
}

export default async function BlogPostPage({ params }: Props) {
  // Await the params object before accessing its properties
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <article className="pt-32 pb-20 container mx-auto px-4 max-w-3xl">
        <Link href="/blog" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
        
        <div className="flex items-center gap-4 text-gray-500 mb-8 border-b border-white/10 pb-8">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {new Date(post.created_at).toLocaleDateString()}
          </div>
          {/* Add author if available in schema later */}
        </div>

        {post.image_url && (
          <div className="mb-10 rounded-2xl overflow-hidden">
             {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.image_url} alt={post.title} className="w-full h-auto" />
          </div>
        )}

        <div className="prose prose-invert prose-lg max-w-none">
          {/* 
            For a real production app, use a markdown parser like 'react-markdown' or 'remark'.
            For now, assuming simple text or HTML content. 
            If HTML, use dangerouslySetInnerHTML (carefully).
            If Markdown, we'd need to install a parser. 
            Let's assume plain text with newlines for simplicity in this demo, 
            or basic HTML if the user inputs it.
          */}
          <div className="whitespace-pre-wrap font-sans text-gray-300 leading-relaxed">
            {post.content}
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
