'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { detectPlatform, type DetectedPlatform, type PlatformInfo } from '@/lib/platform'
import type { AndroidRelease } from '@/lib/androidRelease'
import IosInstall from './IosInstall'
import AndroidInstall from './AndroidInstall'
import DesktopFallback from './DesktopFallback'

interface DownloadClientProps {
  /** Server-detected platform used for the first paint (avoids a flash). */
  initialPlatform: DetectedPlatform
  /** Newest Android APK release (server-fetched), or null if none yet. */
  androidRelease: AndroidRelease | null
}

/**
 * Routes the visitor to the correct install flow. The server passes an initial
 * guess from the request User-Agent; on mount we re-detect with `navigator`
 * (incl. touch points for iPadOS) and render the matching branch. Each branch
 * component is enriched in its own issue: iOS #5, Android #6, desktop #7.
 */
export default function DownloadClient({
  initialPlatform,
  androidRelease,
}: DownloadClientProps) {
  const [info, setInfo] = useState<PlatformInfo>({
    platform: initialPlatform,
    isIOSSafari: initialPlatform === 'ios',
    isIOSNonSafari: false,
  })

  useEffect(() => {
    // Re-detect on the client (iPadOS reports a Mac UA; touch points settle
    // it). Deferred a tick so the effect does not set state synchronously.
    const id = window.setTimeout(() => {
      const hasTouch = navigator.maxTouchPoints > 1
      setInfo(detectPlatform(navigator.userAgent, hasTouch))
    }, 0)
    return () => window.clearTimeout(id)
  }, [])

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <section className="pt-32 pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-purple/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-4">
          {info.platform === 'ios' && <IosInstall info={info} />}
          {info.platform === 'android' && <AndroidInstall release={androidRelease} />}
          {info.platform === 'desktop' && <DesktopFallback />}
        </div>
      </section>
      <Footer />
    </main>
  )
}
