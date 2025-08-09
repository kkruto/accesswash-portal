// src/app/portal/[tenant]/staff-dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { getDistroOverview } from "@/lib/api";
import { useParams } from "next/navigation";

export default function StaffDashboard({}: {}) {
  const params = useParams();
  const tenant = params?.tenant as string;
  const [overview, setOverview] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const d = await getDistroOverview(tenant);
        if (mounted) setOverview(d);
      } catch (e) {
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [tenant]);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Staff Dashboard — {tenant}</h1>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 border rounded bg-card">
              <h2 className="font-semibold">Distro Overview</h2>
              <pre className="text-xs">{JSON.stringify(overview, null, 2)}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
