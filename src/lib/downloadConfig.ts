// downloadConfig — the single source of truth for what the "Download Wys X"
// buttons do. It is the hinge between Phase 1 (PWA install), the direct APK
// download (Android, no Play Store yet) and a future Phase 2 (native App
// Store / Play Store links): flipping a platform's mode upgrades the button
// with no UI changes. See epic alexhickes/hojoki-website#2, issue #8, and
// hojoki/wysx-app#490 for the APK pipeline.

export type DownloadMode = 'pwa' | 'store' | 'apk'
export type StorePlatform = 'ios' | 'android'

export interface PlatformDownload {
  /** `pwa` installs the web app; `store` links to a store listing; `apk`
   *  (Android only) offers the signed APK published to GitHub Releases. */
  mode: DownloadMode
  /** Only used when `mode === 'store'`. */
  storeUrl?: string
  /** Only used when `mode === 'apk'`: `latest.json` next to the newest APK. */
  manifestUrl?: string
  /** Only used when `mode === 'apk'`: always redirects to the newest APK. */
  apkUrl?: string
}

export interface DownloadConfig {
  /** The deployed WysX PWA that visitors install / open. */
  webAppUrl: string
  ios: PlatformDownload
  android: PlatformDownload
}

// The public assets-only repo the wysx-app release workflow publishes to.
// `releases/latest/download/<asset>` always resolves to the newest release.
export const androidReleasesRepoUrl = 'https://github.com/hojoki/wysx-releases'

// NOTE: `webAppUrl` mirrors the URL the marketing site already uses for the
// "Visit Wys X Web" button (wysx1.vercel.app). Confirm this is the canonical
// PWA origin before Phase 2 — the PWA `start_url` and any future universal
// links must agree with it.
export const downloadConfig: DownloadConfig = {
  webAppUrl: 'https://wysx1.vercel.app',
  ios: { mode: 'pwa' },
  android: {
    mode: 'apk',
    manifestUrl: `${androidReleasesRepoUrl}/releases/latest/download/latest.json`,
    apkUrl: `${androidReleasesRepoUrl}/releases/latest/download/wysx.apk`,
  },
}

export type ResolvedDownload =
  | { mode: 'pwa' }
  | { mode: 'store'; storeUrl: string }
  | { mode: 'apk'; manifestUrl: string; apkUrl: string }

/**
 * Resolve a platform's download behaviour, dead-link-proof: a `store` or
 * `apk` entry with a missing/blank URL safely falls back to `pwa` so a button
 * is never a broken link. This is what lets destinations be rolled out one
 * platform at a time.
 */
export function resolveDownload(platform: PlatformDownload): ResolvedDownload {
  if (platform.mode === 'store' && platform.storeUrl?.trim()) {
    return { mode: 'store', storeUrl: platform.storeUrl.trim() }
  }
  if (
    platform.mode === 'apk' &&
    platform.manifestUrl?.trim() &&
    platform.apkUrl?.trim()
  ) {
    return {
      mode: 'apk',
      manifestUrl: platform.manifestUrl.trim(),
      apkUrl: platform.apkUrl.trim(),
    }
  }
  return { mode: 'pwa' }
}
