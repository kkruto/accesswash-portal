'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ErrorAlert } from '@/components/error-alert'
import { Loader2 } from 'lucide-react'
import { getTenants } from '@/lib/api'
import type { Tenant } from '@/lib/types'
import Image from 'next/image'

export function UtilitySelector() {
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [selectedTenant, setSelectedTenant] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const data = await getTenants()
        setTenants(data)
      } catch (err) {
        setError('Failed to load utilities. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchTenants()
  }, [])

  const handleContinue = () => {
    if (selectedTenant) {
      const tenant = tenants.find(t => t.id === selectedTenant)
      if (tenant) {
        // Navigate to the local portal login page for development
        window.location.href = `/portal/${tenant.slug || tenant.id}/login`
      }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto card card-hover">
      <CardHeader className="pb-6">
        <CardTitle className="text-3xl font-bold text-center">Select Your Utility</CardTitle>
        <CardDescription className="text-center text-lg">
          Choose your provider from the list below to access your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {error && <ErrorAlert message={error} />}
        
        <div className="space-y-4">
          <label htmlFor="utility-select" className="block text-sm font-medium text-foreground">
            Utility Provider
          </label>
          <Select value={selectedTenant} onValueChange={setSelectedTenant}>
            <SelectTrigger className="h-14 text-lg border-2 hover:border-primary/50 transition-colors">
              <SelectValue placeholder="Select your utility provider..." />
            </SelectTrigger>
            <SelectContent className="max-h-96">
              {tenants.map((tenant) => (
                <SelectItem key={tenant.id} value={tenant.id} className="py-4 cursor-pointer hover:bg-accent">
                  <div className="flex items-center gap-3">
                    {tenant.logo ? (
                      <Image 
                        src={tenant.logo} 
                        alt={tenant.name} 
                        width={32} 
                        height={32} 
                        className="rounded-lg object-contain"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <span className="text-xs font-bold text-white">AW</span>
                      </div>
                    )}
                    <div className="flex flex-col">
                      <span className="font-medium">{tenant.name}</span>
                      {tenant.city && (
                        <span className="text-sm text-muted-foreground">{tenant.city}</span>
                      )}
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={handleContinue} 
          disabled={!selectedTenant}
          className="w-full h-14 text-lg btn-primary"
          size="lg"
        >
          Continue to Portal
        </Button>
      </CardContent>
    </Card>
  )
}