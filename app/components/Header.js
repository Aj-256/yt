'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Download, BookOpen } from 'lucide-react'

export default function Header({ onSidebarToggle }) {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl gradient-btn flex items-center justify-center animate-pulse-glow">
            <Download className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold gradient-text hidden sm:block">
            Gumite Downloader v1
          </span>
          <span className="text-xl font-bold gradient-text sm:hidden">
            Gumite v1
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link 
            href="/" 
            className={`flex items-center gap-2 transition-all hover:text-purple-400 ${pathname === '/' ? 'text-purple-400' : 'text-gray-300'}`}
          >
            <Download className="w-4 h-4" />
            Home
          </Link>
          <Link 
            href="/docs" 
            className={`flex items-center gap-2 transition-all hover:text-purple-400 ${pathname === '/docs' ? 'text-purple-400' : 'text-gray-300'}`}
          >
            <BookOpen className="w-4 h-4" />
            Docs
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={onSidebarToggle}
            className="gradient-btn px-4 py-2 text-sm flex items-center gap-2"
          >
            <Menu className="w-4 h-4" />
            <span className="hidden sm:inline">Developers</span>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className="md:hidden border-t border-white/10 flex">
        <Link 
          href="/" 
          className={`flex-1 py-3 text-center text-sm flex items-center justify-center gap-2 ${pathname === '/' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400'}`}
        >
          <Download className="w-4 h-4" />
          Home
        </Link>
        <Link 
          href="/docs" 
          className={`flex-1 py-3 text-center text-sm flex items-center justify-center gap-2 ${pathname === '/docs' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400'}`}
        >
          <BookOpen className="w-4 h-4" />
          Docs
        </Link>
      </div>
    </header>
  )
}