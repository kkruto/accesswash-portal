import { Header } from "@/src/components/header"
import { Footer } from "@/src/components/footer"
import { Card } from "@/src/components/ui/card"
import { Droplets, Users, Wrench, BarChart3 } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-green-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">About AccessWASH</h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                AccessWASH is a comprehensive digital platform that connects water utility customers with their service
                providers, streamlining WASH (Water, Sanitation, and Hygiene) service management for everyone.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                We believe that access to clean water, proper sanitation, and good hygiene should be seamless and
                reliable. AccessWASH bridges the gap between water utilities and their customers, making service
                management efficient, transparent, and user-friendly.
              </p>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Provide</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                  <Droplets className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Service Requests</h3>
                <p className="text-sm text-gray-600">Easy submission and tracking of water service issues</p>
              </Card>

              <Card className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Customer Portal</h3>
                <p className="text-sm text-gray-600">Dedicated interface for customers to manage their services</p>
              </Card>

              <Card className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto">
                  <Wrench className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Asset Management</h3>
                <p className="text-sm text-gray-600">Comprehensive infrastructure and maintenance tracking</p>
              </Card>

              <Card className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Analytics</h3>
                <p className="text-sm text-gray-600">Data-driven insights for better service delivery</p>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
