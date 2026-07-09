import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { detectPlatform } from '@/lib/platform'
import DownloadClient from '@/components/download/DownloadClient'

// Basic metadata so the route is indexable and shareable. OG image + richer
// social tags are finalised in issue alexhickes/hojoki-website#9.
export const metadata: Metadata = {
  title: 'Download Wys X',
  description:
    'Install Wys X on your phone — automatic location check-ins to see where your friends are.',
}

export default async function DownloadPage() {
  // First-paint detection from the request User-Agent; the client re-detects on
  // mount to correct for iPadOS (which reports a Mac UA) and edge cases.
  const requestHeaders = await headers()
  const ua = requestHeaders.get('user-agent') ?? ''
  const initial = detectPlatform(ua)

  return <DownloadClient initialPlatform={initial.platform} />
}
