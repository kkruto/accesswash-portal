'use client';

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'

export function Header() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">AW</span>
            </div>
            <span className="text-xl font-bold">AccessWASH</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </Button>
            
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/select-utility" className="text-sm font-medium hover:text-primary">
                Select Utility
              </Link>
              <Link href="/support" className="text-sm font-medium hover:text-primary">
                Support
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}