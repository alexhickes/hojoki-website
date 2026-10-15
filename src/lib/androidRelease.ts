// Server-side reader for the Android release manifest (`latest.json`) that
// the wysx-app release workflow publishes next to every APK in
// hojoki/wysx-releases. Shape is owned by wysx-app `scripts/build_android.sh`;
// the in-app updater reads the same file. See hojoki/wysx-app#490.

import {
  androidReleasesRepoUrl,
  downloadConfig,
  resolveDownload,
} from './downloadConfig'

/** CPU ABIs the release workflow builds one APK for (hojoki/wysx-app#519). */
export const ANDROID_ABIS = ['arm64-v8a', 'armeabi-v7a', 'x86_64'] as const
export type AndroidAbi = (typeof ANDROID_ABIS)[number]

/** One per-ABI APK from the manifest's additive `apks` map. */
export interface AndroidApkVariant {
  url: string
  sha256: string
  sizeBytes: number
}

export interface AndroidRelease {
  versionName: string
  versionCode: number
  apkUrl: string
  sha256: string
  sizeBytes: number
  releasedAt: string
  minSupportedVersionCode: number
  notes: string
  /** Per-ABI APKs. Empty when the manifest predates #519 (no `apks` map). */
  apks: Partial<Record<AndroidAbi, AndroidApkVariant>>
}

/** How long a rendered page may keep showing a previous release's details. */
export const ANDROID_RELEASE_REVALIDATE_SECONDS = 300

function isRelease(value: unknown): value is AndroidRelease {
  if (!value || typeof value !== 'object') return false
  const v = value as Record<string, unknown>
  return (
    typeof v.versionName === 'string' &&
    v.versionName.length > 0 &&
    typeof v.versionCode === 'number' &&
    typeof v.apkUrl === 'string' &&
    v.apkUrl.startsWith('https://') &&
    typeof v.sha256 === 'string' &&
    /^[0-9a-f]{64}$/i.test(v.sha256)
  )
}

// Only accept per-ABI links that point at the releases repo, so a malformed
// manifest can never turn a download link into an arbitrary URL.
const releaseAssetPrefix = `${androidReleasesRepoUrl}/releases/download/`

function parseApks(value: unknown): AndroidRelease['apks'] {
  const apks: AndroidRelease['apks'] = {}
  if (!value || typeof value !== 'object') return apks
  const map = value as Record<string, unknown>
  for (const abi of ANDROID_ABIS) {
    const entry = map[abi]
    if (!entry || typeof entry !== 'object') continue
    const e = entry as Record<string, unknown>
    if (
      typeof e.url === 'string' &&
      e.url.startsWith(releaseAssetPrefix) &&
      typeof e.sha256 === 'string' &&
      /^[0-9a-f]{64}$/i.test(e.sha256)
    ) {
      apks[abi] = {
        url: e.url,
        sha256: e.sha256,
        sizeBytes: typeof e.sizeBytes === 'number' ? e.sizeBytes : 0,
      }
    }
  }
  return apks
}

/**
 * Fetch the newest Android release, or `null` when none is published yet or
 * GitHub is unreachable — callers must render a sensible fallback rather than
 * a dead button.
 */
export async function fetchAndroidRelease(): Promise<AndroidRelease | null> {
  const target = resolveDownload(downloadConfig.android)
  if (target.mode !== 'apk') return null
  try {
    const res = await fetch(target.manifestUrl, {
      next: { revalidate: ANDROID_RELEASE_REVALIDATE_SECONDS },
      headers: { Accept: 'application/json' },
    })
    if (!res.ok) return null
    const json: unknown = await res.json()
    if (!isRelease(json)) return null
    return {
      ...json,
      sizeBytes: typeof json.sizeBytes === 'number' ? json.sizeBytes : 0,
      releasedAt: typeof json.releasedAt === 'string' ? json.releasedAt : '',
      minSupportedVersionCode:
        typeof json.minSupportedVersionCode === 'number'
          ? json.minSupportedVersionCode
          : 1,
      notes: typeof json.notes === 'string' ? json.notes : '',
      apks: parseApks((json as unknown as Record<string, unknown>).apks),
    }
  } catch {
    return null
  }
}

export function formatSize(bytes: number): string {
  if (!bytes) return ''
  const mb = bytes / (1024 * 1024)
  return `${mb >= 10 ? mb.toFixed(0) : mb.toFixed(1)} MB`
}
