"use client"

import { Card, CardContent } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { Droplets, MapPin, Users } from "lucide-react"

const kenyaUtilities = [
  { name: "Nairobi City Water", region: "Nairobi", customers: "4.2M", coverage: "85%", status: "active" },
  { name: "Mombasa Water", region: "Coast", customers: "1.3M", coverage: "78%", status: "active" },
  { name: "Eldoret Water", region: "Rift Valley", customers: "680K", coverage: "72%", status: "active" },
  { name: "Kisumu Water", region: "Nyanza", customers: "580K", coverage: "68%", status: "maintenance" },
  { name: "Nakuru Water", region: "Rift Valley", customers: "520K", coverage: "75%", status: "active" },
  { name: "Thika Water", region: "Central", customers: "340K", coverage: "82%", status: "active" },
]

export function KenyaWaterMap() {
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-6 mb-6">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Kenya Water Service Coverage</h3>
            <p className="text-sm text-gray-600">WASREB Regulated Utilities</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {kenyaUtilities.map((utility, index) => (
              <div key={index} className="bg-white rounded-lg p-3 shadow-sm border">
                <div className="flex items-center justify-between mb-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <Badge variant={utility.status === "active" ? "default" : "secondary"} className="text-xs">
                    {utility.status}
                  </Badge>
                </div>
                <h4 className="font-medium text-sm text-gray-900 mb-1">{utility.name}</h4>
                <p className="text-xs text-gray-600 mb-2">{utility.region}</p>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>{utility.customers}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Droplets className="w-3 h-3" />
                    <span>{utility.coverage}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">47</div>
            <div className="text-sm text-gray-600">Counties Served</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">8.2M</div>
            <div className="text-sm text-gray-600">People Connected</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">76%</div>
            <div className="text-sm text-gray-600">Average Coverage</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
