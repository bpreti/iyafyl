import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: { default: 'IYAFYL', template: '%s | IYAFYL' },
  description: 'If You Ain\'t First You\'re Last — Official Fantasy Football League Site',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <footer className="border-t py-6 text-center text-sm" style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
          © {new Date().getFullYear()} If You Ain&apos;t First You&apos;re Last. All rights reserved.
        </footer>
      </body>
    </html>
  )
}
