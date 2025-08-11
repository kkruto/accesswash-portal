"use client"

import { useState } from "react"
import { Card } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { Droplets, Wrench, AlertTriangle, CheckCircle } from "lucide-react"

export function WaterInfrastructureMap() {
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null)

  const assets = [
    { id: "1", type: "treatment", name: "Main Treatment Plant", status: "operational", x: 20, y: 30 },
    { id: "2", type: "pump", name: "Pump Station A", status: "maintenance", x: 45, y: 25 },
    { id: "3", type: "valve", name: "Distribution Valve", status: "operational", x: 65, y: 40 },
    { id: "4", type: "pipe", name: "Main Distribution Line", status: "alert", x: 30, y: 60 },
    { id: "5", type: "reservoir", name: "Storage Tank", status: "operational", x: 75, y: 20 },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "bg-green-500"
      case "maintenance":
        return "bg-yellow-500"
      case "alert":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="h-3 w-3" />
      case "maintenance":
        return <Wrench className="h-3 w-3" />
      case "alert":
        return <AlertTriangle className="h-3 w-3" />
      default:
        return <Droplets className="h-3 w-3" />
    }
  }

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Water Infrastructure</h3>
          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
            Live Status
          </Badge>
        </div>

        {/* Interactive Map */}
        <div className="relative h-64 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg overflow-hidden">
          {/* Background grid */}
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%" className="text-blue-300">
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Water distribution zones */}
          <div className="absolute inset-0">
            <div className="absolute top-4 left-4 w-32 h-20 bg-blue-200/50 rounded-lg border-2 border-blue-300 border-dashed"></div>
            <div className="absolute top-8 right-8 w-28 h-24 bg-green-200/50 rounded-lg border-2 border-green-300 border-dashed"></div>
            <div className="absolute bottom-6 left-8 w-36 h-16 bg-cyan-200/50 rounded-lg border-2 border-cyan-300 border-dashed"></div>
          </div>

          {/* Infrastructure Assets */}
          {assets.map((asset) => (
            <button
              key={asset.id}
              className={`absolute w-4 h-4 rounded-full ${getStatusColor(asset.status)} 
                         border-2 border-white shadow-lg hover:scale-125 transition-transform
                         ${selectedAsset === asset.id ? "ring-2 ring-blue-500 ring-offset-2" : ""}`}
              style={{ left: `${asset.x}%`, top: `${asset.y}%` }}
              onClick={() => setSelectedAsset(selectedAsset === asset.id ? null : asset.id)}
            >
              <span className="sr-only">{asset.name}</span>
            </button>
          ))}

          {/* Connecting pipes */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <path d="M 20% 30% Q 45% 25% 65% 40%" stroke="#3b82f6" strokeWidth="3" fill="none" className="opacity-60" />
            <path d="M 65% 40% L 30% 60%" stroke="#3b82f6" strokeWidth="3" fill="none" className="opacity-60" />
          </svg>
        </div>

        {/* Asset Details */}
        {selectedAsset && (
          <Card className="p-3 bg-gray-50 border">
            {(() => {
              const asset = assets.find((a) => a.id === selectedAsset)
              return asset ? (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{asset.name}</p>
                    <p className="text-xs text-gray-600 capitalize">{asset.type}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(asset.status)}
                    <span className="text-xs capitalize">{asset.status}</span>
                  </div>
                </div>
              ) : null
            })()}
          </Card>
        )}

        {/* Legend */}
        <div className="flex flex-wrap gap-3 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Operational</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span>Maintenance</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span>Alert</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
