'use client'

import { Share, Plus } from 'lucide-react'
import { downloadConfig, resolveDownload } from '@/lib/downloadConfig'
import type { PlatformInfo } from '@/lib/platform'

// iOS install branch. Phase 1: guide the user through Add to Home Screen
// (iOS has no programmatic install API). Enriched in issue
// alexhickes/hojoki-website#5 (animated steps + polished non-Safari nudge).
export default function IosInstall({ info }: { info: PlatformInfo }) {
  const target = resolveDownload(downloadConfig.ios)

  // Phase 2: if a real App Store link is configured, send them there instead.
  if (target.mode === 'store' && target.storeUrl) {
    return (
      <div className="text-center max-w-xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Get Wys X for iPhone</h1>
        <a
          href={target.storeUrl}
          className="inline-block bg-neon-purple hover:bg-fuchsia-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all"
        >
          Download on the App Store
        </a>
      </div>
    )
  }

  // Non-Safari iOS browsers can't install a PWA — nudge to Safari.
  if (info.isIOSNonSafari) {
    return (
      <div className="text-center max-w-xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Open in Safari to install</h1>
        <p className="text-gray-400 text-lg">
          Wys X installs to your Home Screen from <strong>Safari</strong>. Copy
          this page&rsquo;s link and open it in Safari, then follow the steps to
          add Wys X.
        </p>
      </div>
    )
  }

  return (
    <div className="text-center max-w-xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">Install Wys X</h1>
      <p className="text-gray-400 text-lg mb-10">
        Add Wys X to your Home Screen for a full-screen, app-like experience.
      </p>
      <ol className="text-left space-y-6 max-w-sm mx-auto">
        <li className="flex items-start gap-4">
          <Share className="text-neon-purple shrink-0 mt-1" />
          <span>
            Tap the <strong>Share</strong> button in Safari&rsquo;s toolbar.
          </span>
        </li>
        <li className="flex items-start gap-4">
          <Plus className="text-neon-purple shrink-0 mt-1" />
          <span>
            Choose <strong>Add to Home Screen</strong>, then tap{' '}
            <strong>Add</strong>.
          </span>
        </li>
      </ol>
    </div>
  )
}
