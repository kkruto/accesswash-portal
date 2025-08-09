import { RequestForm } from '@/components/request-form'
import { DashboardLayout } from '@/components/dashboard-layout'

interface NewRequestPageProps {
  params: { tenant: string }
}

export default function NewRequestPage({ params }: NewRequestPageProps) {
  return (
    <DashboardLayout tenant={params.tenant}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Submit Service Request</h1>
          <p className="text-gray-600">Report an issue or request assistance</p>
        </div>
        <RequestForm 
          tenant={params.tenant} 
          onSuccess={() => window.location.href = `/${params.tenant}/requests`}
        />
      </div>
    </DashboardLayout>
  )
}