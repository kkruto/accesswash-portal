'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { User, LogOut, Settings, Home, Droplets, FileText, CreditCard } from 'lucide-react'
import Link from 'next/link'
import { logout, getCurrentUser } from '@/lib/api'
import type { User as UserType } from '@/lib/types'
import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'

interface DashboardLayoutProps {
  children: React.ReactNode
  tenant: string
}

export function DashboardLayout({ children, tenant }: DashboardLayoutProps) {
  const [user, setUser] = useState<UserType | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser(tenant)
        setUser(userData)
      } catch (error) {
        router.push(`/${tenant}/login`)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [tenant, router])

  const handleLogout = async () => {
    try {
      await logout(tenant)
      router.push(`/${tenant}/login`)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside className="w-64 bg-background border-r hidden md:block">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <p className="font-medium">{user.firstName} {user.lastName}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            
            <nav className="space-y-1">
              <Link href={`/${tenant}/dashboard`}>
                <Button variant="ghost" className="w-full justify-start">
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Link href={`/${tenant}/profile`}>
                <Button variant="ghost" className="w-full justify-start">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
              </Link>
              
              <div className="pt-4 mt-4 border-t">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-destructive hover:text-destructive"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
                
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                >
                  {theme === 'dark' ? (
                    <SunIcon className="mr-2 h-4 w-4" />
                  ) : (
                    <MoonIcon className="mr-2 h-4 w-4" />
                  )}
                  Toggle Theme
                </Button>
              </div>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}