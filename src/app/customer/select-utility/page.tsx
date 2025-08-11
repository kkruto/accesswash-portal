import { UtilitySelector } from "@/src/components/utility-selector"
import { Header } from "@/src/components/header"
import { Footer } from "@/src/components/footer"

export default function CustomerSelectUtilityPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Select Your Utility Provider</h1>
            <p className="text-xl text-gray-600">
              Choose your water and sanitation provider to access your customer account.
            </p>
          </div>
          <UtilitySelector portalType="customer" />
        </div>
      </main>
      <Footer />
    </div>
  )
}
