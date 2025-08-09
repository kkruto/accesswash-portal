// src/app/portal/[tenant]/layout.tsx
import { notFound } from "next/navigation";
import { TenantProvider } from "@/components/tenant-provider";
import { getTenant } from "@/lib/api";

interface TenantLayoutProps {
  children: React.ReactNode;
  params: Promise<{ tenant: string }>;
}

export default async function TenantLayout({ children, params }: TenantLayoutProps) {
  const { tenant: tenantId } = await params;
  try {
    const tenantData = await getTenant(tenantId);
    if (!tenantData) {
      notFound();
    }

    return <TenantProvider tenant={tenantData}>{children}</TenantProvider>;
  } catch (err) {
    notFound();
  }
}
