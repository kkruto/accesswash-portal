import { Card } from "@/src/components/ui/card"
import { Droplets, Wrench, MessageSquare, BarChart3, MapPin, Shield } from "lucide-react"

export function FeaturesSection() {
  const customerFeatures = [
    {
      icon: <MessageSquare className="h-6 w-6 text-blue-600" />,
      title: "Submit Service Requests",
      description: "Report water issues, leaks, or service problems with photo uploads",
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-green-600" />,
      title: "Track Request Status",
      description: "Monitor progress and receive updates on your service requests",
    },
    {
      icon: <MapPin className="h-6 w-6 text-purple-600" />,
      title: "Service History",
      description: "View your complete service history and past interactions",
    },
  ]

  const utilityFeatures = [
    {
      icon: <Wrench className="h-6 w-6 text-orange-600" />,
      title: "Asset Management",
      description: "Manage water infrastructure, inspections, and maintenance schedules",
    },
    {
      icon: <Droplets className="h-6 w-6 text-cyan-600" />,
      title: "Distribution Zones",
      description: "Monitor and manage water distribution zones with GeoJSON mapping",
    },
    {
      icon: <Shield className="h-6 w-6 text-red-600" />,
      title: "Customer Management",
      description: "Handle customer requests, communications, and service delivery",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Complete WASH Management Platform</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Streamline water, sanitation, and hygiene services for both customers and utility providers
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Customer Features */}
          <div className="space-y-6">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">For Customers</h3>
              <p className="text-gray-600">Manage your water services and stay connected</p>
            </div>

            <div className="space-y-4">
              {customerFeatures.map((feature, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">{feature.icon}</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Utility Features */}
          <div className="space-y-6">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">For Utilities</h3>
              <p className="text-gray-600">Optimize operations and customer service</p>
            </div>

            <div className="space-y-4">
              {utilityFeatures.map((feature, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">{feature.icon}</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
