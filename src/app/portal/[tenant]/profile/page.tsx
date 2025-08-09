import { ProfileContent } from '@/components/profile-content'
import { DashboardLayout } from '@/components/dashboard-layout'

interface ProfilePageProps {
  params: { tenant: string }
}

export default function ProfilePage({ params }: ProfilePageProps) {
  return (
    <DashboardLayout tenant={params.tenant}>
      <ProfileContent tenant={params.tenant} />
    </DashboardLayout>
  )
}
