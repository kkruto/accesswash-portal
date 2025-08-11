import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Users, Building2, ArrowRight } from "lucide-react"

export function PortalSelector() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Choose Your Portal</h2>
          <p className="text-xl text-gray-600">Login to manage your water services</p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <Card
            id="customer-portal"
            className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-teal-400 bg-white"
          >
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900 mb-3">Customer Portal</CardTitle>
              <p className="text-gray-600">
                Submit service requests, track repairs, view bills, and manage your water account
              </p>
            </CardHeader>
            <CardContent className="text-center">
              <Button asChild className="w-full bg-teal-600 hover:bg-teal-700 text-white text-lg py-6 font-semibold">
                <Link href="/customer/select-utility" className="flex items-center justify-center">
                  Login to Your Portal
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <p className="text-sm text-gray-500 mt-3">
                New customer?{" "}
                <Link href="/customer/register" className="text-teal-600 hover:underline">
                  Register here
                </Link>
              </p>
            </CardContent>
          </Card>

          <Card
            id="utility-login"
            className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-400 bg-white"
          >
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900 mb-3">Utility Staff Portal</CardTitle>
              <p className="text-gray-600">
                Manage customer requests, monitor assets, schedule maintenance, and oversee operations
              </p>
            </CardHeader>
            <CardContent className="text-center">
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-6 font-semibold">
                <Link href="/staff/select-utility" className="flex items-center justify-center">
                  Access Staff Portal
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <p className="text-sm text-gray-500 mt-3">
                New employee?{" "}
                <Link href="/staff/register" className="text-blue-600 hover:underline">
                  Request access
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
