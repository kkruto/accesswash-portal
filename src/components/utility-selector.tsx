"use client"

import { useState, useEffect } from "react"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Loader2, Building2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface Tenant {
  id: string
  name: string
  city?: string
  logo?: string
}

interface UtilitySelectorProps {
  portalType: "customer" | "staff"
}

export function UtilitySelector({ portalType }: UtilitySelectorProps) {
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [selectedTenant, setSelectedTenant] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Mock data for demo - replace with actual API call
    const mockTenants: Tenant[] = [
      { id: "demo-utility", name: "Demo Water & Sanitation Authority", city: "Demo City" },
      { id: "metro-water", name: "Metropolitan Water District", city: "Metro City" },
      { id: "coastal-utilities", name: "Coastal Utilities Corporation", city: "Coastal Region" },
    ]

    setTimeout(() => {
      setTenants(mockTenants)
      setLoading(false)
    }, 1000)
  }, [])

  const handleContinue = () => {
    if (selectedTenant) {
      const tenant = tenants.find((t) => t.id === selectedTenant)
      if (tenant) {
        if (portalType === "customer") {
          router.push(`/customer/${tenant.id}/login`)
        } else {
          router.push(`/staff/${tenant.id}/login`)
        }
      }
    }
  }

  if (loading) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="flex items-center justify-center py-16">
          <div className="text-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto" />
            <p className="text-gray-600">Loading utility providers...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto card-hover bg-white">
      <CardHeader className="text-center pb-6">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Building2 className="w-8 h-8 text-blue-600" />
        </div>
        <CardTitle className="text-2xl font-bold text-gray-900">
          {portalType === "customer" ? "Customer Portal Access" : "Staff Portal Access"}
        </CardTitle>
        <CardDescription className="text-lg text-gray-600">Select your utility provider to continue</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <label htmlFor="utility-select" className="block text-sm font-medium text-gray-700">
            Utility Provider
          </label>
          <Select value={selectedTenant} onValueChange={setSelectedTenant}>
            <SelectTrigger className="h-14 text-lg border-2 hover:border-blue-300 transition-colors">
              <SelectValue placeholder="Choose your utility provider..." />
            </SelectTrigger>
            <SelectContent className="max-h-96">
              {tenants.map((tenant) => (
                <SelectItem key={tenant.id} value={tenant.id} className="py-4 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                      <span className="text-xs font-bold text-white">AW</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium">{tenant.name}</span>
                      {tenant.city && <span className="text-sm text-gray-500">{tenant.city}</span>}
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
          Continue to {portalType === "customer" ? "Customer" : "Staff"} Portal
        </Button>
      </CardContent>
    </Card>
  )
}
