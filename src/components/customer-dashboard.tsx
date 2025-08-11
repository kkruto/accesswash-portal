"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Badge } from "@/src/components/ui/badge"
import { Header } from "./header"
import {
  Droplets,
  AlertTriangle,
  FileText,
  Settings,
  Phone,
  Plus,
  Clock,
  CheckCircle,
  Home,
  User,
  History,
  CreditCard,
  HelpCircle,
  Menu,
} from "lucide-react"
import { useState } from "react"
import Link from "next/link"

interface CustomerDashboardProps {
  tenant: string
}

const kenyaCustomerData = {
  utility: "Nairobi City Water",
  accountNumber: "NCW-2024-15847",
  currentBill: "KSh 2,450",
  waterUsage: "18,500 L",
  serviceStatus: "Active",
  lastPayment: "15 Jan 2025",
  nextReading: "28 Jan 2025",
  customerName: "John Doe",
}

const recentRequests = [
  {
    id: "SR-001",
    type: "Water Pressure Low",
    status: "In Progress",
    date: "20 Jan 2025",
    priority: "Medium",
    location: "Westlands",
  },
  {
    id: "SR-002",
    type: "Billing Query",
    status: "Resolved",
    date: "18 Jan 2025",
    priority: "Low",
    location: "Westlands",
  },
  {
    id: "SR-003",
    type: "Meter Reading",
    status: "Scheduled",
    date: "15 Jan 2025",
    priority: "High",
    location: "Westlands",
  },
]

const sidebarItems = [
  { icon: Home, label: "Dashboard", active: true, href: "#dashboard" },
  { icon: Plus, label: "New Request", active: false, href: `/customer/new-request` },
  { icon: History, label: "Request History", active: false, href: `/customer/requests` },
  { icon: CreditCard, label: "Billing", active: false, href: `/customer/billing` },
  { icon: User, label: "Profile", active: false, href: `/customer/profile` },
  { icon: HelpCircle, label: "Help", active: false, href: `/support` },
]

export function CustomerDashboard({ tenant }: CustomerDashboardProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn={true} userType="customer" userName={kenyaCustomerData.customerName} />

      <div className="flex">
        {/* Sidebar */}
        <div
          className={`bg-white w-64 min-h-screen border-r border-gray-200 ${sidebarOpen ? "block" : "hidden"} lg:block`}
        >
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Customer Portal</h2>
            <nav className="space-y-2">
              {sidebarItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={`w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors block ${
                    item.active
                      ? "bg-teal-50 text-teal-700 border-l-4 border-teal-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-2">
                  Account: {kenyaCustomerData.accountNumber} • {kenyaCustomerData.utility}
                </p>
              </div>
              <Button className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
                <Menu className="w-4 h-4" />
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Current Bill</CardTitle>
                  <FileText className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{kenyaCustomerData.currentBill}</div>
                  <p className="text-xs text-muted-foreground">Due: {kenyaCustomerData.nextReading}</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-teal-500 hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Water Usage</CardTitle>
                  <Droplets className="h-4 w-4 text-teal-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-teal-600">{kenyaCustomerData.waterUsage}</div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Service Status</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{kenyaCustomerData.serviceStatus}</div>
                  <p className="text-xs text-muted-foreground">No issues</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Last Payment</CardTitle>
                  <CheckCircle className="h-4 w-4 text-purple-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">{kenyaCustomerData.lastPayment}</div>
                  <p className="text-xs text-muted-foreground">Payment received</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Service Requests */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Recent Service Requests</CardTitle>
                    <Button asChild size="sm" className="bg-teal-600 hover:bg-teal-700">
                      <Link href={`/customer/${tenant}/new-request`}>
                        <Plus className="w-4 h-4 mr-2" />
                        New Request
                      </Link>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentRequests.map((request) => (
                        <Link
                          key={request.id}
                          href={`/customer/${tenant}/request/${request.id}`}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors block"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                              {request.status === "Resolved" ? (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              ) : request.status === "In Progress" ? (
                                <Clock className="w-5 h-5 text-yellow-600" />
                              ) : (
                                <AlertTriangle className="w-5 h-5 text-blue-600" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{request.type}</p>
                              <p className="text-sm text-gray-600">
                                {request.location} • Request #{request.id} • {request.date}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge
                              variant={
                                request.priority === "High"
                                  ? "destructive"
                                  : request.priority === "Medium"
                                    ? "default"
                                    : "secondary"
                              }
                            >
                              {request.priority}
                            </Badge>
                            <Badge variant="outline">{request.status}</Badge>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button asChild className="w-full justify-start bg-teal-600 hover:bg-teal-700">
                      <Link href={`/customer/${tenant}/billing/pay`}>
                        <FileText className="w-4 h-4 mr-2" />
                        Pay Bill (M-Pesa)
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                      <Link href={`/customer/${tenant}/new-request`}>
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Report Issue
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                      <Link href={`/customer/${tenant}/usage`}>
                        <Droplets className="w-4 h-4 mr-2" />
                        View Usage History
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                      <Link href={`/customer/${tenant}/settings`}>
                        <Settings className="w-4 h-4 mr-2" />
                        Account Settings
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                      <Link href="/support">
                        <Phone className="w-4 h-4 mr-2" />
                        Contact Support
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
