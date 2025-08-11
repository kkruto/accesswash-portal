import { Header } from "@/src/components/header"
import { Footer } from "@/src/components/footer"
import { Card } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { MapPin, Users, Droplets } from "lucide-react"

export default function CoveragePage() {
  const serviceAreas = [
    {
      name: "Metro Water District",
      location: "Metropolitan Area",
      customers: "45,000+",
      status: "Active",
      coverage: "Urban & Suburban",
    },
    {
      name: "Regional Utilities Co.",
      location: "Northern Region",
      customers: "28,500+",
      status: "Active",
      coverage: "Mixed Urban/Rural",
    },
    {
      name: "Coastal Water Authority",
      location: "Coastal Region",
      customers: "15,200+",
      status: "Active",
      coverage: "Coastal Communities",
    },
    {
      name: "Valley Water Services",
      location: "Central Valley",
      customers: "12,800+",
      status: "Expanding",
      coverage: "Agricultural & Residential",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-green-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Service Coverage Areas</h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                AccessWASH partners with water utilities across multiple regions to provide comprehensive WASH service
                management.
              </p>
            </div>
          </div>
        </section>

        {/* Coverage Map Placeholder */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="p-8 bg-gradient-to-br from-blue-100 to-green-100">
                <div className="text-center space-y-4">
                  <MapPin className="h-16 w-16 text-blue-600 mx-auto" />
                  <h3 className="text-2xl font-bold text-gray-900">Interactive Coverage Map</h3>
                  <p className="text-gray-600">Detailed coverage map showing all partner utilities and service areas</p>
                  <div className="h-64 bg-white/50 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Interactive map will be displayed here</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Service Areas List */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Partner Utilities</h2>
              <p className="text-lg text-gray-600">
                Water utilities currently using AccessWASH for customer service management
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {serviceAreas.map((area, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-gray-900">{area.name}</h3>
                        <p className="text-gray-600">{area.location}</p>
                      </div>
                      <Badge
                        variant={area.status === "Active" ? "default" : "secondary"}
                        className={area.status === "Active" ? "bg-green-100 text-green-700" : ""}
                      >
                        {area.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-blue-600" />
                        <span className="text-gray-600">Customers:</span>
                        <span className="font-medium">{area.customers}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Droplets className="h-4 w-4 text-cyan-600" />
                        <span className="text-gray-600">Coverage:</span>
                        <span className="font-medium">{area.coverage}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
