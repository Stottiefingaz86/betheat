import type { Metadata, Viewport } from 'next'
import { Figtree } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import GlobalBetslip from '@/components/betslip/global-betslip'
import BrandSanitizer from '@/components/brand-sanitizer'
import { PreventOverscroll } from '@/components/prevent-overscroll'
import EsportsLinkFix from '@/components/navigation/esports-link-fix'
import './globals.css'

const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  title: 'Betheat',
  description: 'Betheat crypto casino Web3 experience',
  appleWebApp: {
    statusBarStyle: 'black-translucent',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={figtree.variable} suppressHydrationWarning>
      <body style={{ fontFamily: 'var(--font-figtree), sans-serif' }}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} storageKey="theme">
          <BrandSanitizer />
          <EsportsLinkFix />
          <PreventOverscroll />
          {children}
          <GlobalBetslip />
        </ThemeProvider>
      </body>
    </html>
  )
}
