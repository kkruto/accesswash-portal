"use client"

import { Header } from "@/src/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Badge } from "@/src/components/ui/badge"
import { ArrowLeft, Calendar, Wrench, AlertTriangle, CheckCircle } from "lucide-react"
import Link from "next/link"

const maintenanceSchedule = [
  {
    id: "MAINT-001",
    asset: "Gigiri Pump Station",
    type: "Preventive Maintenance",
    scheduled: "25 Jan 2025",
    status: "Scheduled",
    priority: "Medium",
    technician: "Field Team A",
  },
  {
    id: "MAINT-002",
    asset: "Westlands Distribution Main",
    type: "Emergency Repair",
    scheduled: "22 Jan 2025",
    status: "Overdue",
    priority: "High",
    technician: "Field Team B",
  },
  {
    id: "MAINT-003",
    asset: "Kabete Treatment Plant",
    type: "Routine Inspection",
    scheduled: "28 Jan 2025",
    status: "Completed",
    priority: "Low",
    technician: "Field Team C",
  },
]

export default function MaintenancePage() {
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
              <h1 className="text-3xl font-bold text-gray-900">Maintenance Schedule</h1>
              <p className="text-gray-600 mt-2">Plan and track infrastructure maintenance activities</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Maintenance
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-green-600">15</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Scheduled</p>
                  <p className="text-2xl font-bold text-blue-600">8</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-red-500">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Overdue</p>
                  <p className="text-2xl font-bold text-red-600">3</p>
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
                  <p className="text-2xl font-bold text-yellow-600">5</p>
                </div>
                <Wrench className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Maintenance Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {maintenanceSchedule.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{item.asset}</h3>
                      <Badge variant="outline">{item.type}</Badge>
                      <Badge
                        variant={
                          item.status === "Completed"
                            ? "default"
                            : item.status === "Overdue"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {item.status}
                      </Badge>
                      <Badge
                        variant={
                          item.priority === "High"
                            ? "destructive"
                            : item.priority === "Medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {item.priority}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                      <span>Scheduled: {item.scheduled}</span>
                      <span>Assigned: {item.technician}</span>
                      <span>ID: {item.id}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Update Status
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
