"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ErrorAlert } from '@/components/error-alert'
import { Loader2, User, Mail, Phone, MapPin } from 'lucide-react'
import { getProfile } from '@/lib/api'
import type { UserProfile } from '@/lib/types'

interface ProfileContentProps {
  tenant: string
}

export function ProfileContent({ tenant }: ProfileContentProps) {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfile(tenant)
        setProfile(profileData)
      } catch (err: any) {
        setError(err.message || 'Failed to load profile data')
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [tenant])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return <ErrorAlert message={error} />
  }

  if (!profile) {
    return <ErrorAlert message="No profile data available" />
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600">Manage your account information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              Personal Information
            </CardTitle>
            <CardDescription>Your basic account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <p className="text-gray-900">{profile.firstName} {profile.lastName}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="flex items-center">
                <Mail className="mr-2 h-4 w-4 text-gray-500" />
                <p className="text-gray-900">{profile.email}</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Phone</label>
              <div className="flex items-center">
                <Phone className="mr-2 h-4 w-4 text-gray-500" />
                <p className="text-gray-900">{profile.phone}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Service Address */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="mr-2 h-5 w-5" />
              Service Address
            </CardTitle>
            <CardDescription>Your primary service location</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-gray-900">{profile.serviceAddress.street}</p>
              <p className="text-gray-900">
                {profile.serviceAddress.city}, {profile.serviceAddress.state} {profile.serviceAddress.zipCode}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Account Details */}
        <Card>
          <CardHeader>
            <CardTitle>Account Details</CardTitle>
            <CardDescription>Your account information and status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Account Number</label>
              <p className="text-gray-900 font-mono">{profile.accountNumber}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Account Status</label>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                profile.accountStatus === 'active' 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {profile.accountStatus}
              </span>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Member Since</label>
              <p className="text-gray-900">
                {new Date(profile.memberSince).toLocaleDateString()}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Billing Information */}
        <Card>
          <CardHeader>
            <CardTitle>Billing Information</CardTitle>
            <CardDescription>Your billing preferences and history</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Billing Cycle</label>
              <p className="text-gray-900">{profile.billingCycle}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Payment Method</label>
              <p className="text-gray-900">{profile.paymentMethod}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Auto Pay</label>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                profile.autoPay 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {profile.autoPay ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
