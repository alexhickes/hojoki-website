'use client'

import { ArrowRight } from 'lucide-react'
import { downloadConfig } from '@/lib/downloadConfig'

// Desktop branch. Desktop can't install the mobile PWA, so point users to their
// phone (QR) or the web app. The QR code is added in issue
// alexhickes/hojoki-website#7; this is the functional shell.
export default function DesktopFallback() {
  return (
    <div className="text-center max-w-xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">Wys X is a mobile app</h1>
      <p className="text-gray-400 text-lg mb-10">
        Open this page on your phone to install Wys X, or use it right now in
        your browser.
      </p>

      {/* TODO(#7): QR code encoding this /download URL for phone hand-off. */}

      <a
        href={`${downloadConfig.webAppUrl}/home`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 bg-neon-purple hover:bg-fuchsia-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all"
      >
        Use Wys X in your browser
        <ArrowRight className="w-5 h-5" />
      </a>
    </div>
  )
}
