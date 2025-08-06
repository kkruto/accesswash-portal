"use client"

import { createContext, useContext } from 'react'
import type { Tenant } from '@/lib/types'

interface TenantContextType {
  tenant: Tenant
}

const TenantContext = createContext<TenantContextType | null>(null)

export function useTenant() {
  const context = useContext(TenantContext)
  if (!context) {
    throw new Error('useTenant must be used within a TenantProvider')
  }
  return context
}

interface TenantProviderProps {
  tenant: Tenant
  children: React.ReactNode
}

export function TenantProvider({ tenant, children }: TenantProviderProps) {
  return (
    <TenantContext.Provider value={{ tenant }}>
      {children}
    </TenantContext.Provider>
  )
}
