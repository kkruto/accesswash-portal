import axios, { AxiosError } from "axios";
import type { Tenant, User, DashboardData, UserProfile } from "./types";

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

/* --------------------- TENANTS --------------------- */

export async function getTenants(): Promise<Tenant[]> {
  // Mock data for development - replace with real API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "demo",
          name: "Nairobi Water and Sanitation Company",
          subdomain: "demo",
          logo: undefined,
          primaryColor: "#0066CC",
          secondaryColor: "#004499"
        },
        {
          id: "nakuru",
          name: "Nakuru City Water Services",
          subdomain: "nakuru",
          logo: undefined,
          primaryColor: "#0066CC",
          secondaryColor: "#004499"
        },
        {
          id: "riverside",
          name: "Riverside Utilities",
          subdomain: "riverside",
          logo: undefined,
          primaryColor: "#0066CC",
          secondaryColor: "#004499"
        },
        {
          id: "northshore",
          name: "North Shore Water Authority",
          subdomain: "northshore",
          logo: undefined,
          primaryColor: "#0066CC",
          secondaryColor: "#004499"
        }
      ]);
    }, 500);
  });
}

export async function validateTenant(tenant: string): Promise<Tenant> {
  // Mock validation - replace with real API call
  const tenants = await getTenants();
  const found = tenants.find(t => t.subdomain === tenant);
  if (!found) {
    throw new Error("Tenant not found");
  }
  return found;
}

/* --------------------- AUTH --------------------- */

export async function login(tenant: string, payload: { email: string; password: string }) {
  // Mock login for development
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (payload.email && payload.password) {
        resolve({ token: "mock-token", user: { id: "1", email: payload.email } });
      } else {
        reject(new Error("Invalid credentials"));
      }
    }, 1000);
  });
}

export async function register(tenant: string, payload: any) {
  // Mock registration
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (payload.email && payload.password && payload.firstName && payload.lastName) {
        resolve({ message: "Registration successful" });
      } else {
        reject(new Error("Missing required fields"));
      }
    }, 1000);
  });
}

export async function logout(tenant: string) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ message: "Logged out successfully" });
    }, 500);
  });
}

export async function forgotPassword(tenant: string, payload: { email: string }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (payload.email) {
        resolve({ message: "Reset instructions sent" });
      } else {
        reject(new Error("Email is required"));
      }
    }, 1000);
  });
}

export async function resetPassword(tenant: string, payload: { password: string; token: string }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (payload.password && payload.token) {
        resolve({ message: "Password reset successful" });
      } else {
        reject(new Error("Invalid reset token"));
      }
    }, 1000);
  });
}

/* --------------------- USER / PROFILE --------------------- */

export async function getCurrentUser(tenant: string): Promise<User> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: "1",
        email: "john.doe@example.com",
        firstName: "John",
        lastName: "Doe",
        phone: "+1234567890"
      });
    }, 500);
  });
}

export async function getProfile(tenant: string): Promise<UserProfile> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: "1",
        email: "john.doe@example.com",
        firstName: "John",
        lastName: "Doe",
        phone: "+1234567890",
        accountNumber: "AWP-001234",
        accountStatus: "active",
        memberSince: "2023-01-15T00:00:00Z",
        serviceAddress: {
          street: "123 Main Street",
          city: "Springfield",
          state: "CA",
          zipCode: "90210"
        },
        billingCycle: "Monthly",
        paymentMethod: "Auto Pay - Bank Account",
        autoPay: true
      });
    }, 500);
  });
}

/* --------------------- DASHBOARD --------------------- */

export async function getDashboardData(tenant: string): Promise<DashboardData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        currentBalance: 125.50,
        waterUsage: 2840,
        openRequests: 2,
        recentRequests: [
          {
            id: "1",
            title: "Water Pressure Issue",
            description: "Low water pressure in kitchen sink",
            status: "in_progress",
            createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
            updatedAt: new Date(Date.now() - 86400000 * 1).toISOString()
          },
          {
            id: "2", 
            title: "Billing Question",
            description: "Question about last month's bill",
            status: "completed",
            createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
            updatedAt: new Date(Date.now() - 86400000 * 5).toISOString()
          }
        ]
      });
    }, 800);
  });
}

/* --------------------- SERVICE REQUESTS --------------------- */

export async function submitServiceRequest(
  tenant: string,
  payload: { title: string; description: string; type?: string; files?: File[] }
) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (payload.title && payload.description) {
        resolve({ 
          id: Date.now().toString(),
          message: "Service request submitted successfully",
          status: "pending"
        });
      } else {
        reject(new Error("Title and description are required"));
      }
    }, 1500);
  });
}

export async function fetchMyRequests(tenant: string) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "1",
          title: "Water Pressure Issue",
          description: "Low water pressure in kitchen sink",
          status: "in_progress",
          createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
          attachments: []
        },
        {
          id: "2",
          title: "Billing Question", 
          description: "Question about last month's bill",
          status: "completed",
          createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
          attachments: []
        },
        {
          id: "3",
          title: "Leak in Basement",
          description: "Small leak detected near water heater",
          status: "pending",
          createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
          attachments: []
        }
      ]);
    }, 600);
  });
}

export async function getRequest(tenant: string, id: string | number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const requests = [
        {
          id: "1",
          title: "Water Pressure Issue",
          description: "Low water pressure in kitchen sink. The issue started about a week ago and has been getting progressively worse. Water flow is particularly slow during peak hours.",
          status: "in_progress",
          createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
          attachments: []
        },
        {
          id: "2",
          title: "Billing Question",
          description: "Question about last month's bill. There seems to be an unusual spike in usage that I'd like to understand better.",
          status: "completed",
          createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
          attachments: []
        }
      ];
      
      const found = requests.find(r => r.id === id.toString());
      if (found) {
        resolve(found);
      } else {
        reject(new Error("Request not found"));
      }
    }, 400);
  });
}

export default {
  getTenants,
  validateTenant,
  login,
  register,
  logout,
  forgotPassword,
  resetPassword,
  getCurrentUser,
  getProfile,
  getDashboardData,
  submitServiceRequest,
  fetchMyRequests,
  getRequest,
};