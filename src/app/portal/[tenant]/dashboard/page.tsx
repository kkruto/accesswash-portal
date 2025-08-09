// src/app/portal/[tenant]/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getDashboardData, fetchMyRequests, customerLogout } from "@/lib/api";

export default function CustomerDashboardPage() {
  const params = useParams();
  const tenant = params?.tenant as string;
  const router = useRouter();

  const [dashboard, setDashboard] = useState<any | null>(null);
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const d = await getDashboardData(tenant);
        if (mounted) setDashboard(d);
      } catch (e) {
        console.error(e);
      }
      try {
        const r = await fetchMyRequests(tenant);
        if (mounted) setRequests(r || []);
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

  const handleLogout = async () => {
    await customerLogout(tenant);
    router.push(`/portal/${tenant}/login`);
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="space-x-2">
            <button onClick={handleLogout} className="px-3 py-2 border rounded">
              Sign out
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="p-4 border rounded">
            <div className="text-sm text-muted-foreground">Current Balance</div>
            <div className="text-2xl font-bold">${dashboard?.currentBalance ?? "0.00"}</div>
          </div>
          <div className="p-4 border rounded">
            <div className="text-sm text-muted-foreground">Water Usage</div>
            <div className="text-2xl font-bold">{dashboard?.waterUsage ?? 0} gal</div>
          </div>
          <div className="p-4 border rounded">
            <div className="text-sm text-muted-foreground">Open Requests</div>
            <div className="text-2xl font-bold">{dashboard?.openRequests ?? requests.length}</div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">Recent Service Requests</h2>
          {loading ? (
            <div>Loading...</div>
          ) : requests.length === 0 ? (
            <div className="text-gray-600">No service requests found.</div>
          ) : (
            <div className="space-y-3">
              {requests.map((req) => (
                <div key={req.id} className="p-4 border rounded flex justify-between items-start">
                  <div>
                    <div className="font-semibold">{req.title ?? req.subject ?? `Request ${req.id}`}</div>
                    <div className="text-sm text-muted-foreground">{req.description ?? req.summary}</div>
                    <div className="text-xs text-gray-500 mt-2">{new Date(req.created_at || req.createdAt || req.created).toLocaleString()}</div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      (req.status === "completed" && "bg-green-100 text-green-800") ||
                      (req.status === "in_progress" && "bg-yellow-100 text-yellow-800") ||
                      "bg-gray-100 text-gray-800"
                    }`}>
                      {(req.status || "unknown").replace("_", " ")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-lg font-medium mb-2">Submit a new request</h2>
          <NewRequestForm tenant={tenant} onSuccess={async () => {
            const r = await fetchMyRequests(tenant);
            setRequests(r || []);
          }} />
        </div>
      </div>
    </div>
  );
}

/** New request form component */
function NewRequestForm({ tenant, onSuccess }: { tenant: string; onSuccess?: () => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`https://${tenant}.${process.env.NEXT_PUBLIC_API_DOMAIN}/api/support/requests/`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("aw_access_token") ?? localStorage.getItem("access") ?? ""}` },
        body: JSON.stringify({ title, description }),
        credentials: "include"
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to create request");
      }
      setTitle("");
      setDescription("");
      if (onSuccess) await onSuccess();
    } catch (err: any) {
      alert(err?.message || "Error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={submit} className="max-w-lg space-y-3">
      <input className="w-full p-2 border rounded" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <textarea className="w-full p-2 border rounded" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} required />
      <button type="submit" className="px-4 py-2 bg-primary text-white rounded" disabled={submitting}>
        {submitting ? "Submitting..." : "Submit Request"}
      </button>
    </form>
  );
}
