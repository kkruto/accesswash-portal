// src/lib/api.ts
import axios, { AxiosError } from "axios";

/**
 * Centralized API module for AccessWASH frontend.
 * Uses tenant-aware base url: https://{tenant}.{NEXT_PUBLIC_API_DOMAIN}/api
 */

const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN || "accesswash.org";

const axiosInstance = axios.create({
  withCredentials: true,
  timeout: 15000,
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (err: AxiosError) => {
    if (err.response?.status === 401) {
      // Optionally notify app about unauthenticated state:
      // window.dispatchEvent(new Event("aw:unauth"));
    }
    return Promise.reject(err);
  }
);

function baseUrlForTenant(tenant: string) {
  return `https://${tenant}.${API_DOMAIN}/api`;
}

/* --------------------- AUTH --------------------- */

export async function login(tenant: string, payload: { email: string; password: string }) {
  const url = `${baseUrlForTenant(tenant)}/auth/login/`;
  const res = await axiosInstance.post(url, payload);
  return res.data;
}

export async function register(tenant: string, payload: any) {
  const url = `${baseUrlForTenant(tenant)}/auth/register/`;
  const res = await axiosInstance.post(url, payload);
  return res.data;
}

export async function logout(tenant: string) {
  const url = `${baseUrlForTenant(tenant)}/auth/logout/`;
  const res = await axiosInstance.post(url);
  return res.data;
}

/* --------------------- USER / PROFILE --------------------- */

export async function getCurrentUser(tenant: string) {
  const url = `${baseUrlForTenant(tenant)}/users/me/`;
  const res = await axiosInstance.get(url);
  return res.data;
}

/* --------------------- DASHBOARD --------------------- */

export async function getDashboardData(tenant: string) {
  const url = `${baseUrlForTenant(tenant)}/dashboard/`;
  const res = await axiosInstance.get(url);
  return res.data;
}

/* --------------------- SERVICE REQUESTS --------------------- */

export async function submitServiceRequest(
  tenant: string,
  payload: { title: string; description: string; type?: string; files?: File[] }
) {
  const url = `${baseUrlForTenant(tenant)}/requests/`;
  const form = new FormData();
  form.append("title", payload.title);
  form.append("description", payload.description || "");
  if (payload.type) form.append("type", payload.type);
  if (payload.files && payload.files.length) {
    for (let i = 0; i < payload.files.length; i++) {
      form.append("files", payload.files[i]);
    }
  }
  const res = await axiosInstance.post(url, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function fetchMyRequests(tenant: string) {
  const url = `${baseUrlForTenant(tenant)}/requests/`;
  const res = await axiosInstance.get(url);
  return res.data;
}

/* --------------------- Single Request --------------------- */

export async function getRequest(tenant: string, id: string | number) {
  const url = `${baseUrlForTenant(tenant)}/requests/${id}/`;
  const res = await axiosInstance.get(url);
  return res.data;
}

export default {
  login,
  register,
  logout,
  getCurrentUser,
  getDashboardData,
  submitServiceRequest,
  fetchMyRequests,
  getRequest,
};
