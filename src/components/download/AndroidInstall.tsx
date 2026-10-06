'use client'

import { useEffect, useState } from 'react'
import { Download, ShieldCheck } from 'lucide-react'
import { downloadConfig, resolveDownload } from '@/lib/downloadConfig'
import { formatSize, type AndroidRelease } from '@/lib/androidRelease'

// Minimal typing for the non-standard beforeinstallprompt event.
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

interface AndroidInstallProps {
  /** Newest APK release from hojoki/wysx-releases, or null if none yet. */
  release: AndroidRelease | null
}

const primaryButton =
  'inline-flex items-center gap-3 bg-neon-purple hover:bg-fuchsia-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(213,0,249,0.3)] hover:shadow-[0_0_40px_rgba(213,0,249,0.5)]'

// Android install branch. Modes (see downloadConfig):
//   apk   — direct download of the signed APK (no Play Store yet), with a
//           sideload guide; the app then updates itself (hojoki/wysx-app#490).
//   store — real Play Store link (Phase 2).
//   pwa   — capture beforeinstallprompt and offer a one-tap install (#6).
export default function AndroidInstall({ release }: AndroidInstallProps) {
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
  if (target.mode === 'store') {
    return (
      <div className="text-center max-w-xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Get Wys X for Android</h1>
        <a href={target.storeUrl} className={primaryButton}>
          Get it on Google Play
        </a>
      </div>
    )
  }

  if (target.mode === 'apk' && release) {
    const size = formatSize(release.sizeBytes)
    // Fixed locale + zone so server and client render the same string
    // (a locale-dependent format caused a hydration mismatch).
    const released = release.releasedAt
      ? new Date(release.releasedAt).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          timeZone: 'UTC',
        })
      : ''
    return (
      <div className="text-center max-w-xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Get Wys X for Android</h1>
        <p className="text-gray-400 text-lg mb-8">
          Wys X isn&rsquo;t on Google Play yet, so it installs directly from
          here. Once installed, the app tells you when a new version is ready.
        </p>

        {/* Branded, stable link: always redirects to the newest APK. */}
        <a href="/download/android/apk" className={primaryButton} download>
          <Download className="w-6 h-6" />
          Download Wys X {release.versionName}
        </a>
        <p className="text-gray-500 text-sm mt-3">
          {[size && `APK · ${size}`, released && `Released ${released}`]
            .filter(Boolean)
            .join(' · ')}
        </p>

        <ol className="text-left text-gray-300 mt-10 space-y-4 list-decimal list-inside">
          <li>
            Tap <strong>Download</strong>, then open the finished download from
            Chrome&rsquo;s notification or the Downloads list.
          </li>
          <li>
            The first time, Android asks to allow Chrome to install unknown apps
            — tap <strong>Settings</strong>, turn it on, then go back.
          </li>
          <li>
            Tap <strong>Install</strong>. Wys X appears on your Home Screen.
          </li>
        </ol>

        <div className="mt-10 text-sm text-gray-500 flex items-start gap-2 text-left">
          <ShieldCheck className="w-5 h-5 shrink-0 text-neon-purple" />
          <p>
            Only install Wys X from this page. Builds are signed by Hojoki;
            the SHA-256 of this file is{' '}
            <code className="break-all text-gray-400">{release.sha256}</code>.
          </p>
        </div>

        <p className="text-gray-500 text-sm mt-8">
          Prefer not to install an APK?{' '}
          <a
            href={downloadConfig.webAppUrl}
            className="text-neon-purple hover:underline"
          >
            Use Wys X in your browser
          </a>
          .
        </p>
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

  // PWA path: `pwa` mode, or `apk` mode before the first release is published.
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
        <button onClick={handleInstall} className={primaryButton}>
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
