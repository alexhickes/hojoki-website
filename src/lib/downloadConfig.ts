// downloadConfig — the single source of truth for what the "Download Wys X"
// buttons do. It is the hinge between Phase 1 (PWA install) and a future
// Phase 2 (native App Store / Play Store links): flipping a platform to
// `store` + a URL upgrades the button with no UI changes. See epic
// alexhickes/hojoki-website#2 and issue #8.

export type DownloadMode = 'pwa' | 'store'
export type StorePlatform = 'ios' | 'android'

export interface PlatformDownload {
  /** In Phase 1 both platforms are `pwa`. Set to `store` + `storeUrl` later. */
  mode: DownloadMode
  /** Only used when `mode === 'store'`. */
  storeUrl?: string
}

export interface DownloadConfig {
  /** The deployed WysX PWA that visitors install / open. */
  webAppUrl: string
  ios: PlatformDownload
  android: PlatformDownload
}

// NOTE: `webAppUrl` mirrors the URL the marketing site already uses for the
// "Visit Wys X Web" button (wysx1.vercel.app). Confirm this is the canonical
// PWA origin before Phase 2 — the PWA `start_url` and any future universal
// links must agree with it.
export const downloadConfig: DownloadConfig = {
  webAppUrl: 'https://wysx1.vercel.app',
  ios: { mode: 'pwa' },
  android: { mode: 'pwa' },
}

/**
 * Resolve a platform's download behaviour, dead-link-proof: a `store` entry
 * with a missing/blank URL safely falls back to `pwa` so a button is never a
 * broken link. This is what lets Phase 2 be rolled out one platform at a time.
 */
export function resolveDownload(
  platform: PlatformDownload,
): { mode: DownloadMode; storeUrl?: string } {
  if (platform.mode === 'store' && platform.storeUrl?.trim()) {
    return { mode: 'store', storeUrl: platform.storeUrl.trim() }
  }
  return { mode: 'pwa' }
}
