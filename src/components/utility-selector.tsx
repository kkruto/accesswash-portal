"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ErrorAlert } from '@/components/error-alert'
import { Loader2 } from 'lucide-react'
import { getTenants } from '@/lib/api'
import type { Tenant } from '@/lib/types'

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
        setError('Failed to load utilities. Please try again.')
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
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Choose Your Utility</CardTitle>
        <CardDescription>
          Select your utility provider to access your customer portal
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && <ErrorAlert message={error} />}
        
        <div className="space-y-2">
          <label htmlFor="utility-select" className="text-sm font-medium">
            Utility Provider
          </label>
          <Select value={selectedTenant} onValueChange={setSelectedTenant}>
            <SelectTrigger>
              <SelectValue placeholder="Select your utility..." />
            </SelectTrigger>
            <SelectContent>
              {tenants.map((tenant) => (
                <SelectItem key={tenant.id} value={tenant.id}>
                  {tenant.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={handleContinue} 
          disabled={!selectedTenant}
          className="w-full"
        >
          Continue to Portal
        </Button>
      </CardContent>
    </Card>
  )
}
