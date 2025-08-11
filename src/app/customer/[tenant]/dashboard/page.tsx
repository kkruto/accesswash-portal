import { CustomerDashboard } from "@/src/components/customer-dashboard"

interface CustomerDashboardPageProps {
  params: {
    tenant: string
  }
}

export default function CustomerDashboardPage({ params }: CustomerDashboardPageProps) {
  return <CustomerDashboard tenant={params.tenant} />
}
