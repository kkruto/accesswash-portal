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
        window.location.href = `https://${tenant.subdomain}.accesswash.org/${tenant.subdomain}/login`
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
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader className="border-b">
        <CardTitle className="text-2xl">Select Your Utility</CardTitle>
        <CardDescription>
          Choose your provider from the list below to access your account
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        {error && <ErrorAlert message={error} />}
        
        <div className="space-y-2">
          <label htmlFor="utility-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Utility Provider
          </label>
          <Select value={selectedTenant} onValueChange={setSelectedTenant}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select your utility provider..." />
            </SelectTrigger>
            <SelectContent className="max-h-96">
              {tenants.map((tenant) => (
                <SelectItem key={tenant.id} value={tenant.id} className="py-3">
                  <div className="flex items-center gap-3">
                    {tenant.logo ? (
                      <Image 
                        src={tenant.logo} 
                        alt={tenant.name} 
                        width={24} 
                        height={24} 
                        className="rounded-sm object-contain"
                      />
                    ) : (
                      <div className="w-6 h-6 rounded-sm bg-blue-100 flex items-center justify-center">
                        <span className="text-xs font-medium text-blue-600">AW</span>
                      </div>
                    )}
                    <span>{tenant.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={handleContinue} 
          disabled={!selectedTenant}
          className="w-full h-12 text-lg"
          size="lg"
        >
          Continue to Portal
        </Button>
      </CardContent>
    </Card>
  )
}