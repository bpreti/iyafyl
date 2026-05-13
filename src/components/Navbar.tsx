'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Trophy } from 'lucide-react'

const navLinks = [
  { href: '/',                      label: 'Home' },
  { href: '/teams',                 label: 'Teams' },
  { href: '/regular-season-stats',  label: 'Regular Season' },
  { href: '/playoff-stats',         label: 'Playoffs' },
  { href: '/history',               label: 'History' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b" style={{ background: 'rgba(13,11,20,0.85)', backdropFilter: 'blur(12px)', borderColor: 'var(--border)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <Trophy size={22} style={{ color: 'var(--gold)' }} />
            <span className="gradient-text">IYAFYL</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => {
              const active = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                  style={{
                    color: active ? 'var(--accent-light)' : 'var(--text-secondary)',
                    background: active ? 'rgba(124,58,237,0.14)' : 'transparent',
                  }}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Mobile nav — simplified */}
          <nav className="flex md:hidden items-center gap-1 text-xs overflow-x-auto">
            {navLinks.map(link => {
              const active = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-2 py-1 rounded text-xs font-medium whitespace-nowrap"
                  style={{ color: active ? 'var(--accent-light)' : 'var(--text-secondary)' }}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </header>
  )
}
