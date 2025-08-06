import axios from 'axios'
import type { 
  Tenant, 
  User, 
  DashboardData, 
  UserProfile, 
  LoginRequest, 
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest 
} from './types'

// Create axios instance with default config
const createApiClient = (tenant?: string) => {
  const baseURL = tenant 
    ? `https://${tenant}.accesswash.org/api`
    : 'https://accesswash.org/api'
    
  return axios.create({
    baseURL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

// Tenant APIs
export async function getTenants(): Promise<Tenant[]> {
  const api = createApiClient()
  const response = await api.get('/tenants/')
  return response.data
}

export async function validateTenant(tenantId: string): Promise<Tenant> {
  const api = createApiClient()
  const response = await api.get(`/tenants/${tenantId}/`)
  return response.data
}

// Auth APIs
export async function login(tenant: string, data: LoginRequest): Promise<void> {
  const api = createApiClient(tenant)
  await api.post('/portal/auth/login/', data)
}

export async function register(tenant: string, data: RegisterRequest): Promise<void> {
  const api = createApiClient(tenant)
  await api.post('/portal/auth/register/', data)
}

export async function forgotPassword(tenant: string, data: ForgotPasswordRequest): Promise<void> {
  const api = createApiClient(tenant)
  await api.post('/portal/auth/forgot-password/', data)
}

export async function resetPassword(tenant: string, data: ResetPasswordRequest): Promise<void> {
  const api = createApiClient(tenant)
  await api.post('/portal/auth/reset-password/', data)
}

export async function logout(tenant: string): Promise<void> {
  const api = createApiClient(tenant)
  await api.post('/portal/auth/logout/')
}

// User APIs
export async function getCurrentUser(tenant: string): Promise<User> {
  const api = createApiClient(tenant)
  const response = await api.get('/portal/auth/user/')
  return response.data
}

export async function getDashboardData(tenant: string): Promise<DashboardData> {
  const api = createApiClient(tenant)
  const response = await api.get('/portal/dashboard/')
  return response.data
}

export async function getProfile(tenant: string): Promise<UserProfile> {
  const api = createApiClient(tenant)
  const response = await api.get('/portal/profile/')
  return response.data
}
