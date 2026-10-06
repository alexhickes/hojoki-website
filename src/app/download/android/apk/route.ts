import { NextResponse } from 'next/server'
import { downloadConfig, resolveDownload } from '@/lib/downloadConfig'

// Stable, branded link to the newest Android APK — the URL to put in QR
// codes, emails and the in-page button. It always redirects to the latest
// release in hojoki/wysx-releases (GitHub serves the file), so the site never
// has to be redeployed for a new build, and it is the one place to hook
// `download_click` analytics (#9) later.
export const dynamic = 'force-dynamic'

export function GET() {
  const target = resolveDownload(downloadConfig.android)
  if (target.mode !== 'apk') {
    // APK distribution switched off in config: never a dead link.
    return NextResponse.redirect(new URL('/download', 'https://hojoki.vercel.app'), 307)
  }
  return NextResponse.redirect(target.apkUrl, {
    status: 302,
    headers: { 'Cache-Control': 'no-store' },
  })
}
