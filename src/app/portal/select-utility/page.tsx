// src/app/portal/select-utility/page.tsx
"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getTenants } from "@/lib/api";
import { AWLogo } from "@/components/AWLogo";

function SelectUtilityContent() {
  const [tenants, setTenants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useSearchParams();
  const type = params?.get("type") || "customer";

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const list = await getTenants();
        if (mounted) setTenants(list || []);
      } catch (e) {
        console.error("Failed to fetch tenants", e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const onSelect = (slug: string) => {
    if (type === "staff") {
      router.push(`/portal/${slug}/staff-login`);
    } else {
      router.push(`/portal/${slug}/login`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-6 border-b">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <AWLogo />
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Select your utility</h1>
          <p className="text-gray-600 mb-6">Choose from the utilities in our network.</p>

          {loading ? (
            <div>Loading utilities...</div>
          ) : (
            <div className="grid gap-3">
              {tenants.map((t: any) => (
                <button
                  key={t.slug ?? t.id}
                  onClick={() => onSelect(t.slug ?? t.id)}
                  className="text-left p-4 border rounded-md hover:shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{t.name}</div>
                      <div className="text-sm text-muted-foreground">{t.city || t.description}</div>
                    </div>
                    <div className="text-sm text-primary">Open</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function SelectUtilityPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SelectUtilityContent />
    </Suspense>
  );
}
