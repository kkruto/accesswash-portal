"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { MapPin, Users, Droplets } from "lucide-react"

const KENYA_UTILITIES = [
  { name: "Nairobi City Water", region: "Nairobi", customers: "1.2M", status: "active" },
  { name: "Mombasa Water", region: "Coast", customers: "450K", status: "active" },
  { name: "Nakuru Water", region: "Rift Valley", customers: "320K", status: "active" },
  { name: "Eldoret Water", region: "Rift Valley", customers: "280K", status: "active" },
  { name: "Kisumu Water", region: "Nyanza", customers: "250K", status: "active" },
  { name: "Thika Water", region: "Central", customers: "180K", status: "active" },
  { name: "Nyeri Water", region: "Central", customers: "150K", status: "active" },
  { name: "Machakos Water", region: "Eastern", customers: "140K", status: "active" },
  { name: "Meru Water", region: "Eastern", customers: "130K", status: "active" },
  { name: "Kitale Water", region: "Rift Valley", customers: "95K", status: "active" },
]

export function KenyaCoverageMap() {
  return (
    <Card className="bg-white shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-xl">
          <MapPin className="w-5 h-5 text-teal-600" />
          Kenya Water Utilities Network
        </CardTitle>
        <p className="text-gray-600">Serving over 3.2 million customers nationwide</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {KENYA_UTILITIES.slice(0, 9).map((utility, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{utility.name}</h4>
                <p className="text-sm text-gray-600">{utility.region}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Users className="w-3 h-3" />
                  {utility.customers}
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Active
                </Badge>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-blue-500" />
              <span>90+ Utilities</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-teal-500" />
              <span>3.2M+ Customers</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-green-500" />
              <span>47 Counties</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
