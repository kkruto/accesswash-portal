// src/lib/api.ts
/**
 * Centralized API client for AccessWASH frontend.
 *
 * - Uses tenant subdomains for tenant-scoped requests: https://{tenant}.{NEXT_PUBLIC_API_DOMAIN}/api/...
 * - Supports JWT access/refresh tokens.
 * - Calls tenant-agnostic endpoints using NEXT_PUBLIC_API_BASE_URL.
 *
 * Environment:
 * - NEXT_PUBLIC_API_DOMAIN (e.g., accesswash.org)
 * - NEXT_PUBLIC_API_BASE_URL (e.g., https://demo.accesswash.org/api)
 */

const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN || "demo.accesswash.org";
const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || `https://${API_DOMAIN}/api`).replace(/\/$/, "");

type LoginResponse = { access: string; refresh?: string; [k: string]: any };

/** Build tenant subdomain base URL */
function tenantBase(tenant: string) {
  return `https://${tenant}.${API_DOMAIN}/api`;
}

/** TENANTS (global, not tenant-subdomain) */
export async function getTenants(): Promise<any[]> {
  try {
    const res = await fetch(`${API_BASE}/tenants/`);
    if (!res.ok) throw new Error("Failed to fetch tenants");
    return res.json();
  } catch (error) {
    // Fallback to dummy data if API is not available
    console.warn("API not available, using dummy tenant data");
    return [
      {
        id: "demo",
        slug: "demo", 
        name: "Demo Water Authority",
        city: "Demo City",
        description: "Demo utility for testing AccessWASH portal",
        subdomain: "demo",
        logo: null
      },
      {
        id: "springfield",
        slug: "springfield",
        name: "Springfield Water Department", 
        city: "Springfield",
        description: "Municipal water services for Springfield residents",
        subdomain: "springfield",
        logo: null
      },
      {
        id: "riverside",
        slug: "riverside",
        name: "Riverside Public Utilities",
        city: "Riverside", 
        description: "Providing reliable water and electric services",
        subdomain: "riverside",
        logo: null
      },
      {
        id: "lakewood",
        slug: "lakewood",
        name: "Lakewood Water District",
        city: "Lakewood",
        description: "Community-focused water utility services",
        subdomain: "lakewood", 
        logo: null
      }
    ];
  }
}

export async function getTenant(tenantId: string): Promise<any | null> {
  try {
    const res = await fetch(`${API_BASE}/tenants/${tenantId}/`);
    if (res.ok) return res.json();
  } catch {
    const list = await getTenants();
    return list.find((t: any) => (t.slug ?? String(t.id)) === tenantId) ?? null;
  }
}

/** Token helpers (localStorage) */
function getStoredAccess() {
  return typeof window === "undefined" ? null : localStorage.getItem("aw_access_token");
}
function getStoredRefresh() {
  return typeof window === "undefined" ? null : localStorage.getItem("aw_refresh_token");
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
 * - Attaches Authorization header if access token present
 * - Attempts refresh once on 401
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
          const newAccess = getStoredAccess();
          if (newAccess) headers["Authorization"] = `Bearer ${newAccess}`;
          res = await fetch(url, { ...opts, headers, credentials: "include" } as RequestInit);
        } else {
          clearStoredTokens();
        }
      } catch {
        clearStoredTokens();
      }
    }
  }

  if (!res.ok) throw new Error(`API request failed: ${res.statusText}`);
  return res.json();
}

/** CUSTOMER (portal) */
export async function customerLogin(tenant: string, creds: { email: string; password: string }) {
  const res = await fetch(`${tenantBase(tenant)}/portal/auth/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(creds),
    credentials: "include",
  });
  if (!res.ok) throw new Error(await res.text() || "Login failed");
  const data: LoginResponse = await res.json();
  if (typeof window !== "undefined") localStorage.setItem("aw_auth_scope", "portal");
  setStoredTokens(data);
  return data;
}

export async function customerRegister(tenant: string, payload: any) {
  const res = await fetch(`${tenantBase(tenant)}/portal/auth/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    credentials: "include",
  });
  if (!res.ok) throw new Error("Register failed");
  return res.json();
}

export async function forgotPassword(tenant: string, email: string) {
  const res = await fetch(`${tenantBase(tenant)}/portal/auth/forgot-password/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
    credentials: "include",
  });
  if (!res.ok) throw new Error(await res.text() || "Forgot password request failed");
  return res.json();
}

export async function resetPassword(tenant: string, payload: { password: string; token: string }) {
  const res = await fetch(`${tenantBase(tenant)}/portal/auth/reset-password/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    credentials: "include",
  });
  if (!res.ok) throw new Error(await res.text() || "Reset password failed");
  return res.json();
}

export async function changePassword(tenant: string, payload: { password: string; new_password: string }) {
  const res = await clientFetch(tenant, "/portal/auth/change-password/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return res;
}

export async function getDashboardData(tenant: string) {
  try {
    return await clientFetch(tenant, "/portal/dashboard/", { method: "GET" });
  } catch (error) {
    // Fallback to dummy data if API is not available
    console.warn("Dashboard API not available, using dummy data");
    return {
      currentBalance: 156.78,
      waterUsage: 2847,
      openRequests: 2,
      recentRequests: [
        {
          id: '1',
          title: 'Low water pressure in kitchen',
          description: 'Water pressure has been consistently low in the kitchen sink for the past week',
          status: 'in_progress',
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '2', 
          title: 'Billing inquiry',
          description: 'Question about charges on last month\'s bill',
          status: 'completed',
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
        }
      ]
    };
  }
}

export async function getProfile(tenant: string) {
  try {
    return await clientFetch(tenant, "/portal/profile/", { method: "GET" });
  } catch (error) {
    // Fallback to dummy data if API is not available
    console.warn("Profile API not available, using dummy data");
    return {
      email: "demo@accesswash.org",
      name: "Demo User",
      tenant: tenant
    };
  }
}

/** SUPPORT / REQUESTS */
export async function fetchMyRequests(tenant: string) {
  try {
    return await clientFetch(tenant, "/support/requests/", { method: "GET" });
  } catch (error) {
    // Fallback to dummy data if API is not available
    console.warn("Requests API not available, using dummy data");
    return [
      {
        id: '1',
        title: 'Low water pressure in kitchen',
        description: 'Water pressure has been consistently low in the kitchen sink for the past week',
        status: 'in_progress',
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '2', 
        title: 'Billing inquiry',
        description: 'Question about charges on last month\'s bill',
        status: 'completed',
        created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '3',
        title: 'Water meter reading issue',
        description: 'Unable to access water meter for monthly reading due to overgrown vegetation',
        status: 'pending',
        created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];
  }
}

export async function getRequest(tenant: string, id: string) {
  return await clientFetch(tenant, `/support/requests/${id}/`, { method: "GET" });
}

export async function submitServiceRequest(tenant: string, payload: any) {
  const res = await clientFetch(tenant, "/support/requests/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return res;
}

/** STAFF (users + distro) */
export async function staffLogin(tenant: string, creds: { username: string; password: string }) {
  const res = await fetch(`${tenantBase(tenant)}/users/auth/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(creds),
    credentials: "include",
  });
  if (!res.ok) throw new Error(await res.text() || "Staff login failed");
  const data: LoginResponse = await res.json();
  if (typeof window !== "undefined") localStorage.setItem("aw_auth_scope", "users");
  setStoredTokens(data);
  return data;
}

export async function getDistroOverview(tenant: string) {
  return await clientFetch(tenant, "/distro/overview/", { method: "GET" });
}

export async function getAssets(tenant: string, params?: Record<string, any>) {
  const query = params ? "?" + new URLSearchParams(params as any).toString() : "";
  return await clientFetch(tenant, `/distro/assets/${query}`, { method: "GET" });
}

export async function getAssetsGeojson(tenant: string) {
  return await clientFetch(tenant, "/distro/assets/geojson/", { method: "GET" });
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
  customerRegister,
  forgotPassword,
  resetPassword,
  changePassword,
  getDashboardData,
  getProfile,
  fetchMyRequests,
  getRequest,
  submitServiceRequest,
  staffLogin,
  getDistroOverview,
  getAssets,
  getAssetsGeojson,
  customerLogout,
  staffLogout,
  clientFetch,
};