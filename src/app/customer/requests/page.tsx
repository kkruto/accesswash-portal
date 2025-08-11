"use client"

import { Header } from "@/src/components/header"
import { Card, CardContent } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Badge } from "@/src/components/ui/badge"
import { Input } from "@/src/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { ArrowLeft, Search, Filter, Eye, MessageCircle } from "lucide-react"
import Link from "next/link"

const mockRequests = [
  {
    id: "SR-2025-001",
    type: "Water Pressure Low",
    status: "In Progress",
    priority: "Medium",
    date: "20 Jan 2025",
    location: "Westlands, Nairobi",
    description: "Water pressure has been very low for the past 3 days",
  },
  {
    id: "SR-2025-002",
    type: "Billing Query",
    status: "Resolved",
    priority: "Low",
    date: "18 Jan 2025",
    location: "Westlands, Nairobi",
    description: "Question about December bill amount",
  },
  {
    id: "SR-2025-003",
    type: "No Water Supply",
    status: "Scheduled",
    priority: "High",
    date: "15 Jan 2025",
    location: "Westlands, Nairobi",
    description: "Complete water outage since morning",
  },
]

export default function RequestsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn={true} userType="customer" userName="John Doe" />

      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-6">
          <Link
            href="/customer/demo-utility/dashboard"
            className="flex items-center text-teal-600 hover:text-teal-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Service Request History</h1>
              <p className="text-gray-600 mt-2">View and track all your service requests</p>
            </div>
            <Button asChild className="bg-teal-600 hover:bg-teal-700">
              <Link href="/customer/new-request">New Request</Link>
            </Button>
          </div>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input placeholder="Search requests..." className="pl-10" />
                </div>
              </div>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
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
                          request.status === "Resolved"
                            ? "default"
                            : request.status === "In Progress"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {request.status}
                      </Badge>
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
                    </div>
                    <p className="text-gray-600 mb-2">{request.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Request #{request.id}</span>
                      <span>{request.date}</span>
                      <span>{request.location}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Comment
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
