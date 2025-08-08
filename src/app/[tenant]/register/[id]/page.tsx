// src/app/[tenant]/requests/[id]/page.tsx
"use client"

import React, { useEffect, useState } from "react";
import { getRequest } from "@/lib/api";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AttachmentGallery } from "@/components/attachment-gallery";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function RequestDetailPage({ params }: { params: { tenant: string; id: string } }) {
  const { tenant, id } = params;
  const [request, setRequest] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await getRequest(tenant, id);
        setRequest(data);
      } catch (err: any) {
        setError(err?.response?.data?.detail || err.message || "Failed to load request");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [tenant, id]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Request Details</h1>
              <p className="text-sm text-muted-foreground">View attachments and status</p>
            </div>
            <Link href={`/${tenant}/requests`} className="text-sm">Back to requests</Link>
          </div>

          {loading && <div className="flex items-center justify-center py-8"><Loader2 className="h-6 w-6 animate-spin" /></div>}
          {error && <div className="text-red-600">{error}</div>}
          {!loading && request && (
            <div className="space-y-6">
              <div className="p-4 border rounded-lg bg-card">
                <h2 className="font-semibold text-lg">{request.title}</h2>
                <p className="text-sm text-muted-foreground mt-2">{request.description}</p>
                <div className="mt-3 text-xs text-muted-foreground">
                  <div>Created: {new Date(request.created_at || request.createdAt || request.createdAt).toLocaleString()}</div>
                  <div>Status: <span className="font-medium">{request.status}</span></div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Attachments</h3>
                {(!request.attachments || request.attachments.length === 0) ? (
                  <div className="text-muted-foreground">No attachments</div>
                ) : (
                  <AttachmentGallery remoteAttachments={request.attachments.map((a: any) => ({
                    id: a.id || a.pk || a.uuid || a.name,
                    url: a.url || a.file || a.path,
                    filename: a.filename || a.name,
                    content_type: a.content_type || a.mime || a.type,
                  }))} />
                )}
              </div>

              {/* Future: comments, timeline, staff interactions */}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
