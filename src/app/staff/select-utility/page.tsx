import { UtilitySelector } from "@/src/components/utility-selector"
import { Header } from "@/src/components/header"
import { Footer } from "@/src/components/footer"

export default function StaffSelectUtilityPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Staff Portal Access</h1>
            <p className="text-xl text-gray-600">Select your organization to access the utility staff portal.</p>
          </div>
          <UtilitySelector portalType="staff" />
        </div>
      </main>
      <Footer />
    </div>
  )
}
