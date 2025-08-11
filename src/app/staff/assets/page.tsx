"use client"

import { Header } from "@/src/components/header"
import { Card, CardContent } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Badge } from "@/src/components/ui/badge"
import { Input } from "@/src/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { ArrowLeft, Search, Plus, Wrench, MapPin, Calendar, AlertTriangle } from "lucide-react"
import Link from "next/link"

const mockAssets = [
  {
    id: "AST-001",
    name: "Gigiri Pump Station",
    type: "Pump Station",
    location: "Gigiri, Nairobi",
    status: "Operational",
    lastMaintenance: "15 Jan 2025",
    nextMaintenance: "15 Feb 2025",
    condition: "Good",
    capacity: "500,000 L/day",
  },
  {
    id: "AST-002",
    name: "Westlands Distribution Main",
    type: "Pipeline",
    location: "Westlands, Nairobi",
    status: "Maintenance Required",
    lastMaintenance: "10 Dec 2024",
    nextMaintenance: "Overdue",
    condition: "Fair",
    capacity: "300mm diameter",
  },
  {
    id: "AST-003",
    name: "Kabete Treatment Plant",
    type: "Treatment Plant",
    location: "Kabete, Nairobi",
    status: "Operational",
    lastMaintenance: "20 Jan 2025",
    nextMaintenance: "20 Mar 2025",
    condition: "Excellent",
    capacity: "1,200,000 L/day",
  },
]

export default function AssetsPage() {
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
              <h1 className="text-3xl font-bold text-gray-900">Asset Management</h1>
              <p className="text-gray-600 mt-2">Monitor and maintain water infrastructure assets</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <MapPin className="w-4 h-4 mr-2" />
                Map View
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Asset
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Operational</p>
                  <p className="text-2xl font-bold text-green-600">156</p>
                </div>
                <Wrench className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-yellow-500">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Maintenance Due</p>
                  <p className="text-2xl font-bold text-yellow-600">23</p>
                </div>
                <Calendar className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-red-500">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Critical Issues</p>
                  <p className="text-2xl font-bold text-red-600">5</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Assets</p>
                  <p className="text-2xl font-bold text-blue-600">184</p>
                </div>
                <MapPin className="w-8 h-8 text-blue-500" />
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
                  <Input placeholder="Search assets by name, type, or location..." className="pl-10" />
                </div>
              </div>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="pump-station">Pump Station</SelectItem>
                  <SelectItem value="pipeline">Pipeline</SelectItem>
                  <SelectItem value="treatment-plant">Treatment Plant</SelectItem>
                  <SelectItem value="reservoir">Reservoir</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="operational">Operational</SelectItem>
                  <SelectItem value="maintenance">Maintenance Required</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {mockAssets.map((asset) => (
            <Card key={asset.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{asset.name}</h3>
                      <Badge variant="outline">{asset.type}</Badge>
                      <Badge
                        variant={
                          asset.status === "Operational"
                            ? "default"
                            : asset.status === "Maintenance Required"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {asset.status}
                      </Badge>
                      <Badge
                        variant={
                          asset.condition === "Excellent"
                            ? "default"
                            : asset.condition === "Good"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {asset.condition}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-2">
                      <span>
                        <MapPin className="w-4 h-4 inline mr-1" />
                        {asset.location}
                      </span>
                      <span>Capacity: {asset.capacity}</span>
                      <span>Last Maintenance: {asset.lastMaintenance}</span>
                      <span className={asset.nextMaintenance === "Overdue" ? "text-red-600 font-semibold" : ""}>
                        Next: {asset.nextMaintenance}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">Asset ID: {asset.id}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <MapPin className="w-4 h-4 mr-2" />
                      View on Map
                    </Button>
                    <Button variant="outline" size="sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule
                    </Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Wrench className="w-4 h-4 mr-2" />
                      Inspect
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
