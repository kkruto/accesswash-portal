"use client"

import { Header } from "@/src/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Badge } from "@/src/components/ui/badge"
import { ArrowLeft, MapPin, Users, Truck, Radio } from "lucide-react"
import Link from "next/link"

const fieldTeams = [
  {
    id: "TEAM-A",
    name: "Field Team Alpha",
    location: "Westlands Zone",
    status: "Active",
    members: 4,
    currentTask: "Water Main Repair",
    lastUpdate: "10 minutes ago",
  },
  {
    id: "TEAM-B",
    name: "Field Team Beta",
    location: "Kibera Zone",
    status: "En Route",
    members: 3,
    currentTask: "Customer Inspection",
    lastUpdate: "25 minutes ago",
  },
  {
    id: "TEAM-C",
    name: "Field Team Charlie",
    location: "Karen Zone",
    status: "Available",
    members: 5,
    currentTask: "Standby",
    lastUpdate: "1 hour ago",
  },
]

export default function FieldOperationsPage() {
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
              <h1 className="text-3xl font-bold text-gray-900">Field Operations</h1>
              <p className="text-gray-600 mt-2">Monitor and coordinate field team activities</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Radio className="w-4 h-4 mr-2" />
              Dispatch Team
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Teams</p>
                  <p className="text-2xl font-bold text-green-600">8</p>
                </div>
                <Users className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Available</p>
                  <p className="text-2xl font-bold text-blue-600">3</p>
                </div>
                <Truck className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-yellow-500">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">En Route</p>
                  <p className="text-2xl font-bold text-yellow-600">2</p>
                </div>
                <MapPin className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Personnel</p>
                  <p className="text-2xl font-bold text-purple-600">32</p>
                </div>
                <Users className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Field Team Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {fieldTeams.map((team) => (
                <div
                  key={team.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{team.name}</h3>
                      <Badge
                        variant={
                          team.status === "Active" ? "default" : team.status === "En Route" ? "secondary" : "outline"
                        }
                      >
                        {team.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {team.location}
                      </span>
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {team.members} members
                      </span>
                      <span>Task: {team.currentTask}</span>
                      <span>Updated: {team.lastUpdate}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <MapPin className="w-4 h-4 mr-2" />
                      Track
                    </Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Radio className="w-4 h-4 mr-2" />
                      Contact
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
