import { DashboardContent } from '@/components/dashboard-content'
import { DashboardLayout } from '@/components/dashboard-layout'

interface DashboardPageProps {
  params: { tenant: string }
}

export default function DashboardPage({ params }: DashboardPageProps) {
  return (
    <DashboardLayout tenant={params.tenant}>
      <DashboardContent tenant={params.tenant} />
    </DashboardLayout>
  )
}
