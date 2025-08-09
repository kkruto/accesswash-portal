import { ProfileContent } from '@/components/profile-content'
import { DashboardLayout } from '@/components/dashboard-layout'

interface ProfilePageProps {
  params: Promise<{ tenant: string }>
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { tenant } = await params;
  return (
    <DashboardLayout tenant={tenant}>
      <ProfileContent tenant={tenant} />
    </DashboardLayout>
  )
}
