// src/lib/api.ts
/**
 * Centralized API client for AccessWASH frontend.
 *
 * - Uses tenant subdomains for tenant-scoped requests:
 *   https://{tenant}.{NEXT_PUBLIC_API_DOMAIN}/api/...
 * - Supports JWT access/refresh tokens.
 * - Calls tenant-agnostic endpoints (tenants list) using NEXT_PUBLIC_API_BASE_URL.
 *
 * Environment:
 * - NEXT_PUBLIC_API_DOMAIN (e.g. accesswash.org)
 * - NEXT_PUBLIC_API_BASE_URL (e.g. https://demo.accesswash.org/api)
 */

const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN || "demo.accesswash.org";
const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || `https://${API_DOMAIN}/api`).replace(/\/$/, "");

type LoginResponse = { access: string; refresh?: string; [k: string]: any };

/** Build tenant subdomain base url */
function tenantBase(tenant: string) {
  return `https://${tenant}.${API_DOMAIN}/api`;
}

/** TENANTS (global, not tenant-subdomain) */
export async function getTenants(): Promise<any[]> {
  const res = await fetch(`${API_BASE}/tenants/`);
  if (!res.ok) {
    throw new Error("Failed to fetch tenants");
  }
  return res.json();
}

export async function getTenant(tenantId: string): Promise<any | null> {
  // Try detail endpoint first
  try {
    const res = await fetch(`${API_BASE}/tenants/${tenantId}/`);
    if (res.ok) return res.json();
  } catch (e) {
    // fallback to list
  }
  const list = await getTenants();
  return list.find((t: any) => (t.slug ?? String(t.id)) === tenantId) ?? null;
}

/** Token helpers (localStorage) */
function getStoredAccess() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("aw_access_token");
}
function getStoredRefresh() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("aw_refresh_token");
}
function setStoredTokens(data: LoginResponse) {
  if (typeof window === "undefined") return;
  if (data.access) localStorage.setItem("aw_access_token", data.access);
  if (data.refresh) localStorage.setItem("aw_refresh_token", data.refresh);
}
function clearStoredTokens() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("aw_access_token");
  localStorage.removeItem("aw_refresh_token");
  localStorage.removeItem("aw_auth_scope");
}

/**
 * clientFetch
 * - attaches Authorization header if access token present
 * - attempts refresh once on 401 (uses aw_auth_scope to choose endpoint)
 */
export async function clientFetch(tenant: string, path: string, opts: RequestInit = {}) {
  const base = tenantBase(tenant);
  const url = path.startsWith("/") ? `${base}${path}` : `${base}/${path}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(opts.headers ? (opts.headers as Record<string, string>) : {}),
  };

  const access = getStoredAccess();
  if (access) headers["Authorization"] = `Bearer ${access}`;

  let res = await fetch(url, { ...opts, headers, credentials: "include" } as RequestInit);

  if (res.status === 401) {
    // refresh using saved refresh token and scope
    const refresh = getStoredRefresh();
    const scope = typeof window !== "undefined" ? localStorage.getItem("aw_auth_scope") : null;
    if (refresh && scope) {
      const refreshEndpoint = scope === "users" ? "/users/auth/refresh/" : "/portal/auth/refresh/";
      try {
        const r = await fetch(`${base}${refreshEndpoint}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh }),
          credentials: "include",
        });
        if (r.ok) {
          const data: LoginResponse = await r.json();
          setStoredTokens(data);
          // retry original request with new access token
          const newAccess = getStoredAccess();
          if (newAccess) headers["Authorization"] = `Bearer ${newAccess}`;
          res = await fetch(url, { ...opts, headers, credentials: "include" } as RequestInit);
          return res;
        } else {
          clearStoredTokens();
        }
      } catch (e) {
        clearStoredTokens();
      }
    }
  }

  return res;
}

/** CUSTOMER (portal) */
export async function customerLogin(tenant: string, creds: { email: string; password: string }) {
  const base = tenantBase(tenant);
  const res = await fetch(`${base}/portal/auth/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(creds),
    credentials: "include",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Login failed");
  }
  const data: LoginResponse = await res.json();
  if (typeof window !== "undefined") localStorage.setItem("aw_auth_scope", "portal");
  setStoredTokens(data);
  return data;
}

export async function customerRegister(tenant: string, payload: any) {
  const base = tenantBase(tenant);
  const res = await fetch(`${base}/portal/auth/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    credentials: "include",
  });
  if (!res.ok) throw new Error("Register failed");
  return res.json();
}

export async function getDashboardData(tenant: string) {
  const res = await clientFetch(tenant, "/portal/dashboard/", { method: "GET" });
  if (!res.ok) throw new Error("Failed to load dashboard");
  return res.json();
}

export async function getProfile(tenant: string) {
  const res = await clientFetch(tenant, "/portal/profile/", { method: "GET" });
  if (!res.ok) throw new Error("Failed to load profile");
  return res.json();
}

/** SUPPORT / REQUESTS */
export async function fetchMyRequests(tenant: string) {
  const res = await clientFetch(tenant, "/support/requests/", { method: "GET" });
  if (!res.ok) throw new Error("Failed to load requests");
  return res.json();
}

export async function getRequest(tenant: string, id: string) {
  const res = await clientFetch(tenant, `/support/requests/${id}/`, { method: "GET" });
  if (!res.ok) throw new Error("Failed to load request");
  return res.json();
}

/** STAFF (users + distro) */
export async function staffLogin(tenant: string, creds: { username: string; password: string }) {
  const base = tenantBase(tenant);
  const res = await fetch(`${base}/users/auth/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(creds),
    credentials: "include",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Staff login failed");
  }
  const data: LoginResponse = await res.json();
  if (typeof window !== "undefined") localStorage.setItem("aw_auth_scope", "users");
  setStoredTokens(data);
  return data;
}

export async function getDistroOverview(tenant: string) {
  const res = await clientFetch(tenant, "/distro/overview/", { method: "GET" });
  if (!res.ok) throw new Error("Failed to load distro overview");
  return res.json();
}

export async function getAssets(tenant: string, params?: Record<string, any>) {
  const query = params ? "?" + new URLSearchParams(params as any).toString() : "";
  const res = await clientFetch(tenant, `/distro/assets/${query}`, { method: "GET" });
  if (!res.ok) throw new Error("Failed to load assets");
  return res.json();
}

export async function getAssetsGeojson(tenant: string) {
  const res = await clientFetch(tenant, "/distro/assets/geojson/", { method: "GET" });
  if (!res.ok) throw new Error("Failed to load assets geojson");
  return res.json();
}

/** Logout helpers */
export async function customerLogout(tenant: string) {
  const res = await fetch(`${tenantBase(tenant)}/portal/auth/logout/`, { method: "POST", credentials: "include" });
  clearStoredTokens();
  return res.ok;
}

export async function staffLogout(tenant: string) {
  const res = await fetch(`${tenantBase(tenant)}/users/auth/logout/`, { method: "POST", credentials: "include" });
  clearStoredTokens();
  return res.ok;
}

export default {
  getTenants,
  getTenant,
  customerLogin,
  staffLogin,
  clientFetch,
};
