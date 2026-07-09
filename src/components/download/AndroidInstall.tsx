'use client'

import { useEffect, useState } from 'react'
import { Download } from 'lucide-react'
import { downloadConfig, resolveDownload } from '@/lib/downloadConfig'

// Minimal typing for the non-standard beforeinstallprompt event.
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

// Android install branch. Phase 1: capture beforeinstallprompt and offer a
// one-tap native install. Fallback copy for browsers that never fire it is
// enriched in issue alexhickes/hojoki-website#6.
export default function AndroidInstall() {
  const target = resolveDownload(downloadConfig.android)
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [installed, setInstalled] = useState(false)

  useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault()
      setPrompt(e as BeforeInstallPromptEvent)
    }
    const onInstalled = () => setInstalled(true)
    window.addEventListener('beforeinstallprompt', onPrompt)
    window.addEventListener('appinstalled', onInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  // Phase 2: real Play Store link takes precedence.
  if (target.mode === 'store' && target.storeUrl) {
    return (
      <div className="text-center max-w-xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Get Wys X for Android</h1>
        <a
          href={target.storeUrl}
          className="inline-block bg-neon-purple hover:bg-fuchsia-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all"
        >
          Get it on Google Play
        </a>
      </div>
    )
  }

  async function handleInstall() {
    if (!prompt) return
    await prompt.prompt()
    const { outcome } = await prompt.userChoice
    // TODO(#9): track download_click { platform: 'android', mode: 'pwa', outcome }
    if (outcome === 'accepted') setInstalled(true)
    setPrompt(null)
  }

  return (
    <div className="text-center max-w-xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">Install Wys X</h1>
      <p className="text-gray-400 text-lg mb-10">
        Install Wys X for a full-screen, app-like experience with notifications.
      </p>

      {installed ? (
        <p className="text-neon-purple font-semibold text-lg">
          Wys X is installed — check your Home Screen.
        </p>
      ) : prompt ? (
        <button
          onClick={handleInstall}
          className="inline-flex items-center gap-3 bg-neon-purple hover:bg-fuchsia-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(213,0,249,0.3)] hover:shadow-[0_0_40px_rgba(213,0,249,0.5)]"
        >
          <Download className="w-6 h-6" />
          Install Wys X
        </button>
      ) : (
        // Fallback: event not available (already installed, or unsupported
        // browser). Enriched with manual A2HS guidance in #6.
        <p className="text-gray-400">
          If you don&rsquo;t see an install button, open this page in{' '}
          <strong>Chrome</strong>, then use the menu &rarr;{' '}
          <strong>Add to Home screen</strong>.
        </p>
      )}
    </div>
  )
}
