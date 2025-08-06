import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import { TenantProvider } from '@/components/tenant-provider'
import { validateTenant } from '@/lib/api'

interface TenantLayoutProps {
  children: React.ReactNode
  params: { tenant: string }
}

export default async function TenantLayout({ 
  children, 
  params 
}: TenantLayoutProps) {
  const headersList = await headers()
  const tenant = headersList.get('x-tenant') || params.tenant

  // Validate tenant exists
  try {
    const tenantData = await validateTenant(tenant)
    
    return (
      <TenantProvider tenant={tenantData}>
        {children}
      </TenantProvider>
    )
  } catch (error) {
    notFound()
  }
}
