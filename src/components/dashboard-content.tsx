"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ErrorAlert } from '@/components/error-alert'
import { 
  Loader2, 
  Droplets, 
  FileText, 
  CreditCard, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight
} from 'lucide-react'
import { getDashboardData } from '@/lib/api'
import type { DashboardData } from '@/lib/types'
import Link from 'next/link'

interface DashboardContentProps {
  tenant: string
}

export function DashboardContent({ tenant }: DashboardContentProps) {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dashboardData = await getDashboardData(tenant)
        setData(dashboardData)
      } catch (err: any) {
        setError(err.message || 'Failed to load dashboard data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [tenant])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center space-y-4">
          <div className="loading-spinner w-12 h-12 mx-auto"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return <ErrorAlert message={error} />
  }

  if (!data) {
    return <ErrorAlert message="No dashboard data available" />
  }

  // Mock data for enhanced demo
  const mockData = {
    ...data,
    currentBalance: data.currentBalance || 156.78,
    waterUsage: data.waterUsage || 2847,
    previousUsage: 2654,
    openRequests: data.openRequests || 2,
    recentRequests: data.recentRequests?.length > 0 ? data.recentRequests : [
      {
        id: '1',
        title: 'Low water pressure in kitchen',
        description: 'Water pressure has been consistently low in the kitchen sink for the past week',
        status: 'in_progress',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        location: 'Building A, Unit 204'
      },
      {
        id: '2', 
        title: 'Billing inquiry',
        description: 'Question about charges on last month\'s bill',
        status: 'completed',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        location: 'Account Services'
      }
    ]
  }

  const usageChange = ((mockData.waterUsage - mockData.previousUsage) / mockData.previousUsage) * 100
  const isUsageUp = usageChange > 0

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Welcome Back!
          </h1>
          <p className="text-muted-foreground text-lg">
            Here's an overview of your account and recent activity
          </p>
        </div>
        <div className="flex gap-3">
          <Button asChild variant="outline" className="gap-2">
            <Link href={`/portal/${tenant}/requests`}>
              <FileText className="w-4 h-4" />
              View All Requests
            </Link>
          </Button>
          <Button asChild className="gap-2 btn-primary">
            <Link href={`/portal/${tenant}/requests/new`}>
              <Plus className="w-4 h-4" />
              New Request
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="card-hover border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Current Balance</CardTitle>
            <div className="p-2 bg-primary/10 rounded-lg">
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-foreground">
                ${mockData.currentBalance.toFixed(2)}
              </div>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {mockData.currentBalance > 0 ? 'Due by end of month' : 'Credit balance'}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover border-l-4 border-l-secondary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Water Usage</CardTitle>
            <div className="p-2 bg-secondary/10 rounded-lg">
              <Droplets className="h-5 w-5 text-secondary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-foreground">
                {mockData.waterUsage.toLocaleString()} gal
              </div>
              <div className="flex items-center gap-2 text-sm">
                {isUsageUp ? (
                  <TrendingUp className="w-4 h-4 text-destructive" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-success" />
                )}
                <span className={isUsageUp ? 'text-destructive' : 'text-success'}>
                  {Math.abs(usageChange).toFixed(1)}% from last month
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover border-l-4 border-l-info">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Service Requests</CardTitle>
            <div className="p-2 bg-info/10 rounded-lg">
              <FileText className="h-5 w-5 text-info" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-foreground">
                {mockData.openRequests}
              </div>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Active requests
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Requests */}
        <Card className="card-hover">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Recent Requests</CardTitle>
                <CardDescription>Your latest service requests and their status</CardDescription>
              </div>
              <Button asChild variant="ghost" size="sm" className="gap-2">
                <Link href={`/portal/${tenant}/requests`}>
                  View All
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {mockData.recentRequests.length === 0 ? (
              <div className="text-center py-8 space-y-3">
                <FileText className="w-12 h-12 mx-auto text-muted-foreground/50" />
                <p className="text-muted-foreground">No recent service requests</p>
                <Button asChild size="sm" className="btn-primary">
                  <Link href={`/portal/${tenant}/requests/new`}>
                    Submit Your First Request
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {mockData.recentRequests.slice(0, 3).map((request) => (
                  <div key={request.id} className="p-4 rounded-lg border border-border hover:border-primary/30 transition-colors group">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                            {request.title}
                          </h4>
                          {request.status === 'completed' ? (
                            <CheckCircle className="w-4 h-4 text-success" />
                          ) : request.status === 'in_progress' ? (
                            <Clock className="w-4 h-4 text-warning" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-muted-foreground" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {request.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{new Date(request.createdAt).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>{(request as any).location || 'N/A'}</span>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <span className={`status-badge ${
                          request.status === 'completed' 
                            ? 'success'
                            : request.status === 'in_progress'
                            ? 'warning'
                            : 'info'
                        }`}>
                          {request.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Account Summary */}
        <Card className="card-hover">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">Account Summary</CardTitle>
            <CardDescription>Your account overview and important information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Next Payment */}
            <div className="p-4 bg-accent/30 rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Next Payment Due</h4>
                <Calendar className="w-4 h-4 text-primary" />
              </div>
              <div className="text-2xl font-bold text-primary mb-1">
                ${mockData.currentBalance.toFixed(2)}
              </div>
              <p className="text-sm text-muted-foreground">
                Due on {new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </p>
            </div>

            {/* Usage Comparison */}
            <div className="space-y-3">
              <h4 className="font-medium">Usage Comparison</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>This month</span>
                  <span className="font-medium">{mockData.waterUsage.toLocaleString()} gal</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Last month</span>
                  <span>{mockData.previousUsage.toLocaleString()} gal</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((mockData.waterUsage / (mockData.previousUsage * 1.2)) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3">
              <h4 className="font-medium">Quick Actions</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button asChild variant="outline" size="sm" className="justify-start">
                  <Link href={`/portal/${tenant}/profile`}>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Pay Bill
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm" className="justify-start">
                  <Link href={`/portal/${tenant}/requests/new`}>
                    <Plus className="w-4 h-4 mr-2" />
                    New Request
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
