import { UtilitySelector } from '@/components/utility-selector'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function SelectUtilityPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-blue-900/10 dark:to-gray-900">
        <div className="w-full max-w-4xl px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Select Your Utility Provider
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Choose from our network of trusted water service providers to access your customer portal
            </p>
          </div>
          <UtilitySelector />
        </div>
      </main>
      <Footer />
    </div>
  )
}