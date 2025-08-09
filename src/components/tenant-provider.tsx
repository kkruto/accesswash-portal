// src/components/tenant-provider.tsx
"use client";

import React, { createContext, useContext } from "react";

const TenantContext = createContext<any | null>(null);

export function TenantProvider({ tenant, children }: { tenant: any; children: React.ReactNode }) {
  return <TenantContext.Provider value={tenant}>{children}</TenantContext.Provider>;
}

export function useTenant() {
  const ctx = useContext(TenantContext);
  if (!ctx) throw new Error("useTenant must be used within a TenantProvider");
  return ctx;
}
