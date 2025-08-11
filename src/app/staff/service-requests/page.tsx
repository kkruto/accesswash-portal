"use client"

import { Header } from "@/src/components/header"
import { Card, CardContent } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Badge } from "@/src/components/ui/badge"
import { Input } from "@/src/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { ArrowLeft, Search, Filter, Eye, UserCheck, Clock, AlertTriangle } from "lucide-react"
import Link from "next/link"

const mockRequests = [
  {
    id: "SR-2025-001",
    customer: "John Doe",
    type: "No Water Supply",
    priority: "High",
    status: "Assigned",
    area: "Westlands Zone 3A",
    assignedTo: "Field Team A",
    created: "2 hours ago",
    description: "Complete water outage reported in Westlands estate",
  },
  {
    id: "SR-2025-002",
    customer: "Mary Wanjiku",
    type: "Low Water Pressure",
    priority: "Medium",
    status: "In Progress",
    area: "Kibera Zone 7B",
    assignedTo: "Field Team B",
    created: "4 hours ago",
    description: "Reduced water pressure affecting multiple units",
  },
  {
    id: "SR-2025-003",
    customer: "Peter Kamau",
    type: "Billing Query",
    priority: "Low",
    status: "Resolved",
    area: "Karen Zone 2C",
    assignedTo: "Customer Service",
    created: "6 hours ago",
    description: "Question about December billing amount",
  },
]

export default function ServiceRequestsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn={true} userType="staff" userName="Admin User" />

      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <Link
            href="/staff/demo-utility/dashboard"
            className="flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Service Requests Management</h1>
              <p className="text-gray-600 mt-2">Monitor and manage customer service requests</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">Assign Bulk</Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="border-l-4 border-l-red-500">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">High Priority</p>
                  <p className="text-2xl font-bold text-red-600">12</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-yellow-500">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">In Progress</p>
                  <p className="text-2xl font-bold text-yellow-600">23</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Unassigned</p>
                  <p className="text-2xl font-bold text-blue-600">8</p>
                </div>
                <UserCheck className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Resolved Today</p>
                  <p className="text-2xl font-bold text-green-600">15</p>
                </div>
                <UserCheck className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input placeholder="Search by customer, request ID, or area..." className="pl-10" />
                </div>
              </div>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="unassigned">Unassigned</SelectItem>
                  <SelectItem value="assigned">Assigned</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {mockRequests.map((request) => (
            <Card key={request.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{request.type}</h3>
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
                      <Badge
                        variant={
                          request.status === "Resolved"
                            ? "default"
                            : request.status === "In Progress"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {request.status}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-2">{request.description}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500">
                      <span>Request #{request.id}</span>
                      <span>Customer: {request.customer}</span>
                      <span>Area: {request.area}</span>
                      <span>Assigned: {request.assignedTo}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Created: {request.created}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <UserCheck className="w-4 h-4 mr-2" />
                      Assign
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
