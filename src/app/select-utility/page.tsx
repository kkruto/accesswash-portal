import { UtilitySelector } from '@/components/utility-selector'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function SelectUtilityPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Select Your Utility
            </h1>
            <p className="text-gray-600">
              Choose your utility provider to access your customer portal
            </p>
          </div>
          <UtilitySelector />
        </div>
      </main>
      <Footer />
    </div>
  )
}
