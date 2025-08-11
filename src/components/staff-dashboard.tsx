"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Badge } from "@/src/components/ui/badge"
import { Header } from "./header"
import {
  Users,
  Wrench,
  AlertTriangle,
  BarChart3,
  MapPin,
  Clock,
  CheckCircle,
  Home,
  Settings,
  Calendar,
  Menu,
} from "lucide-react"
import { useState } from "react"
import Link from "next/link"

interface StaffDashboardProps {
  tenant: string
}

const kenyaStaffData = {
  utility: "Nairobi City Water",
  region: "Nairobi County",
  activeCustomers: "4.2M",
  dailyProduction: "850M L",
  systemUptime: "96.8%",
  openTickets: 47,
  highPriority: 12,
  staffName: "Admin User",
}

const recentServiceRequests = [
  {
    id: "SR-2025-001",
    customer: "Westlands Estate",
    issue: "No Water Supply",
    priority: "High",
    status: "Assigned",
    area: "Zone 3A",
    time: "2 hours ago",
  },
  {
    id: "SR-2025-002",
    customer: "Kibera Settlement",
    issue: "Low Water Pressure",
    priority: "Medium",
    status: "In Progress",
    area: "Zone 7B",
    time: "4 hours ago",
  },
  {
    id: "SR-2025-003",
    customer: "Karen Suburb",
    issue: "Billing Dispute",
    priority: "Low",
    status: "Resolved",
    area: "Zone 2C",
    time: "6 hours ago",
  },
]

const sidebarItems = [
  { icon: Home, label: "Dashboard", active: true, href: "#dashboard" },
  { icon: AlertTriangle, label: "Service Requests", active: false, href: "/staff/service-requests" },
  { icon: Wrench, label: "Asset Management", active: false, href: "/staff/assets" },
  { icon: Calendar, label: "Maintenance", active: false, href: "/staff/maintenance" },
  { icon: Users, label: "Customers", active: false, href: "/staff/customers" },
  { icon: BarChart3, label: "Reports", active: false, href: "/staff/reports" },
  { icon: MapPin, label: "Field Operations", active: false, href: "/staff/field-operations" },
  { icon: Settings, label: "Settings", active: false, href: "/staff/settings" },
]

export function StaffDashboard({ tenant }: StaffDashboardProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn={true} userType="staff" userName={kenyaStaffData.staffName} />

      <div className="flex">
        {/* Sidebar */}
        <div
          className={`bg-white w-64 min-h-screen border-r border-gray-200 ${sidebarOpen ? "block" : "hidden"} lg:block`}
        >
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Staff Portal</h2>
            <nav className="space-y-2">
              {sidebarItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={`w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors block ${
                    item.active
                      ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
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
                <h1 className="text-3xl font-bold text-gray-900">Operations Dashboard</h1>
                <p className="text-gray-600 mt-2">
                  {kenyaStaffData.utility} • {kenyaStaffData.region} Operations
                </p>
              </div>
              <Button className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
                <Menu className="w-4 h-4" />
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
                  <Users className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{kenyaStaffData.activeCustomers}</div>
                  <p className="text-xs text-muted-foreground">Nairobi County coverage</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Open Requests</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">{kenyaStaffData.openTickets}</div>
                  <p className="text-xs text-muted-foreground">{kenyaStaffData.highPriority} high priority</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
                  <Wrench className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{kenyaStaffData.systemUptime}</div>
                  <p className="text-xs text-muted-foreground">Above WASREB target</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Daily Production</CardTitle>
                  <BarChart3 className="h-4 w-4 text-purple-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">{kenyaStaffData.dailyProduction}</div>
                  <p className="text-xs text-muted-foreground">Meeting demand</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Service Requests */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Recent Service Requests</CardTitle>
                    <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Link href="/staff/service-requests">View All Requests</Link>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentServiceRequests.map((request) => (
                        <div
                          key={request.id}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                              {request.status === "Emergency" ? (
                                <AlertTriangle className="w-5 h-5 text-red-600" />
                              ) : request.status === "Resolved" ? (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              ) : (
                                <Clock className="w-5 h-5 text-yellow-600" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{request.issue}</p>
                              <p className="text-sm text-gray-600">
                                {request.customer} • {request.area} • {request.time}
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
                        </div>
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
                    <Button asChild className="w-full justify-start bg-red-600 hover:bg-red-700">
                      <Link href="/staff/service-requests?priority=high">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Emergency Response
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                      <Link href="/staff/assets">
                        <Wrench className="w-4 h-4 mr-2" />
                        Asset Inspections
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                      <Link href="/staff/field-operations">
                        <MapPin className="w-4 h-4 mr-2" />
                        Field Operations
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                      <Link href="/staff/reports">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        WASREB Reports
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                      <Link href="/staff/customers">
                        <Users className="w-4 h-4 mr-2" />
                        Customer Management
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
