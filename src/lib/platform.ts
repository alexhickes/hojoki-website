// Platform detection shared by the server (first paint via the request
// User-Agent) and the client (confirmation via navigator). Kept dependency-free
// so it runs in both environments. See issue alexhickes/hojoki-website#4.

export type DetectedPlatform = 'ios' | 'android' | 'desktop'

export interface PlatformInfo {
  platform: DetectedPlatform
  /** True only for real Safari on iOS — the one browser that can install a PWA on iOS. */
  isIOSSafari: boolean
  /** iOS but in Chrome/Firefox/Edge etc. — must be nudged to open in Safari. */
  isIOSNonSafari: boolean
}

/**
 * Detect the platform from a User-Agent string. Server-safe (no `navigator`).
 * `hasTouch` lets the client disambiguate iPadOS, which reports a Mac UA on
 * iOS 13+ — pass `navigator.maxTouchPoints > 1` from the client; omit on server.
 */
export function detectPlatform(ua: string, hasTouch = false): PlatformInfo {
  const s = (ua || '').toLowerCase()

  const isAndroid = s.includes('android')
  // iPadOS 13+ masquerades as macOS; a touch-capable "Mac" is really an iPad.
  const isIpadOS = s.includes('macintosh') && hasTouch
  const isIOS = /iphone|ipad|ipod/.test(s) || isIpadOS

  // iOS wrappers around WebKit that are NOT Safari.
  const isIOSChrome = s.includes('crios')
  const isIOSFirefox = s.includes('fxios')
  const isIOSEdge = s.includes('edgios')
  const isIOSNonSafari = isIOS && (isIOSChrome || isIOSFirefox || isIOSEdge)
  const isIOSSafari = isIOS && s.includes('safari') && !isIOSNonSafari

  let platform: DetectedPlatform = 'desktop'
  if (isIOS) platform = 'ios'
  else if (isAndroid) platform = 'android'

  return { platform, isIOSSafari, isIOSNonSafari }
}
