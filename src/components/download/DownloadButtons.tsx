'use client'

import Link from 'next/link'
import { Apple } from 'lucide-react'
import { downloadConfig, resolveDownload } from '@/lib/downloadConfig'

// A simple Android robot glyph — the standard platform indicator, kept inline so
// it inherits `currentColor`. Swapped for the official "Get it on Google Play"
// badge in Phase 2 (store mode), see below.
function AndroidGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.6 9.48l1.84-3.18a.4.4 0 0 0-.69-.4l-1.86 3.23a11.4 11.4 0 0 0-9.78 0L5.25 5.9a.4.4 0 1 0-.69.4L6.4 9.48A10.8 10.8 0 0 0 1 18h22a10.8 10.8 0 0 0-5.4-8.52zM7 15.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm10 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" />
    </svg>
  )
}

// Shared button styling — matches the site's CTA buttons.
const buttonClass =
  'flex items-center justify-center gap-3 min-w-[210px] px-8 py-4 rounded-xl font-bold text-lg transition-all bg-white/10 hover:bg-white/20 text-white border border-white/10 hover:border-neon-purple'

interface DownloadButtonsProps {
  className?: string
}

/**
 * The reusable "Download Wys X" buttons (issue alexhickes/hojoki-website#3).
 *
 * Routes through `/download` rather than hard-coding a destination — the actual
 * install/redirect behaviour is decided there from `downloadConfig`. In Phase 1
 * both platforms are in `pwa` mode, so these are styled platform buttons. When a
 * platform is flipped to `store` mode (Phase 2), swap the corresponding branch
 * for the official App Store / Google Play badge linking to `storeUrl` — the
 * official badges are intentionally not used until a real store listing exists,
 * per Apple/Google brand guidelines.
 */
export default function DownloadButtons({ className = '' }: DownloadButtonsProps) {
  const ios = resolveDownload(downloadConfig.ios)
  const android = resolveDownload(downloadConfig.android)

  return (
    <div
      className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${className}`}
    >
      {/* iOS */}
      {ios.mode === 'store' && ios.storeUrl ? (
        // TODO(Phase 2): replace with the official "Download on the App Store" badge.
        <a href={ios.storeUrl} className={buttonClass} data-platform="ios">
          <Apple className="w-6 h-6" />
          <span>Download on the App Store</span>
        </a>
      ) : (
        <Link href="/download" className={buttonClass} data-platform="ios">
          <Apple className="w-6 h-6" />
          <span>Download for iOS</span>
        </Link>
      )}

      {/* Android */}
      {android.mode === 'store' && android.storeUrl ? (
        // TODO(Phase 2): replace with the official "Get it on Google Play" badge.
        <a href={android.storeUrl} className={buttonClass} data-platform="android">
          <AndroidGlyph className="w-6 h-6" />
          <span>Get it on Google Play</span>
        </a>
      ) : (
        <Link href="/download" className={buttonClass} data-platform="android">
          <AndroidGlyph className="w-6 h-6" />
          <span>Download for Android</span>
        </Link>
      )}
    </div>
  )
}
