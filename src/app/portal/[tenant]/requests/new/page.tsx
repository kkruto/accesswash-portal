import { RequestForm } from '@/components/request-form'
import { DashboardLayout } from '@/components/dashboard-layout'

interface NewRequestPageProps {
  params: Promise<{ tenant: string }>
}

export default async function NewRequestPage({ params }: NewRequestPageProps) {
  const { tenant } = await params;
  return (
    <DashboardLayout tenant={tenant}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Submit Service Request</h1>
          <p className="text-gray-600">Report an issue or request assistance</p>
        </div>
        <RequestForm 
          tenant={tenant} 
        />
      </div>
    </DashboardLayout>
  )
}