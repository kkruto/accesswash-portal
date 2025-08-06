export interface Tenant {
  id: string
  name: string
  subdomain: string
  logo?: string
  primaryColor?: string
  secondaryColor?: string
}

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone: string
}

export interface ServiceRequest {
  id: string
  title: string
  description: string
  status: 'pending' | 'in_progress' | 'completed'
  createdAt: string
  updatedAt: string
}

export interface DashboardData {
  currentBalance: number
  waterUsage: number
  openRequests: number
  recentRequests: ServiceRequest[]
}

export interface UserProfile {
  id: string
  email: string
  firstName: string
  lastName: string
  phone: string
  accountNumber: string
  accountStatus: 'active' | 'inactive' | 'suspended'
  memberSince: string
  serviceAddress: {
    street: string
    city: string
    state: string
    zipCode: string
  }
  billingCycle: string
  paymentMethod: string
  autoPay: boolean
}

// Request types
export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  firstName: string
  lastName: string
  phone: string
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ResetPasswordRequest {
  password: string
  token: string
}
