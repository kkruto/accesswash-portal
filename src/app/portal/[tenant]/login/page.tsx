// src/app/portal/[tenant]/login/page.tsx
"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { customerLogin } from "@/lib/api";
import { AWLogo } from "@/components/AWLogo";

export default function LoginPage() {
  const params = useParams();
  const tenant = params?.tenant as string;
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await customerLogin(tenant, { email, password });
      router.push(`/portal/${tenant}/dashboard`);
    } catch (err: any) {
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-6 border-b">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <AWLogo />
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4">Customer sign in — {tenant}</h1>
          <form onSubmit={onSubmit} className="space-y-4">
            {error && <div className="text-red-600">{error}</div>}
            <input
              className="w-full p-3 border rounded"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="w-full p-3 border rounded"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="w-full bg-primary text-white py-3 rounded" disabled={loading}>
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
