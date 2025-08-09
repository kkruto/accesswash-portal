// src/app/[tenant]/requests/page.tsx
"use client"

import { useEffect, useState } from "react";
import { fetchMyRequests } from "@/lib/api";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Link from "next/link";

export default function RequestsList({ params }: { params: { tenant: string } }) {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchMyRequests(params.tenant);
        setRequests(data);
      } catch (err: any) {
        setError(err?.response?.data?.detail || err.message || "Failed to load requests");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [params.tenant]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Your Service Requests</h1>
            <Link href={`/${params.tenant}/requests/new`} className="text-sm">
              Submit new request
            </Link>
          </div>

          {loading && <div>Loading...</div>}
          {error && <div className="text-red-600">{error}</div>}
          {!loading && !requests.length && <div className="text-muted-foreground">No requests found</div>}

          <div className="space-y-4 mt-4">
            {requests.map((r) => (
              <Link key={r.id} href={`/${params.tenant}/requests/${r.id}`} className="block">
                <div className="p-4 border rounded-lg bg-card hover:shadow-md transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{r.title}</h3>
                      <p className="text-sm text-muted-foreground">{r.description}</p>
                      <p className="text-xs text-muted-foreground mt-2">Created: {new Date(r.created_at || r.createdAt || r.createdAt).toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        r.status === "completed" ? "bg-green-100 text-green-800" :
                        r.status === "in_progress" ? "bg-yellow-100 text-yellow-800" :
                        "bg-gray-100 text-gray-800"
                      }`}>
                        {r.status?.replace("_", " ")}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
