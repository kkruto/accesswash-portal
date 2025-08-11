import { StaffDashboard } from "@/src/components/staff-dashboard";

interface StaffDashboardPageProps {
  params: Promise<{
    tenant: string;
  }>;
}

export default async function StaffDashboardPage({ params }: StaffDashboardPageProps) {
  const { tenant } = await params; // Await the params object
  return <StaffDashboard tenant={tenant} />;
}