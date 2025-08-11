import { Header } from "@/src/components/header"
import { PortalSelector } from "@/src/components/portal-selector"
import { Footer } from "@/src/components/footer"
import { KenyaCoverageMap } from "@/src/components/kenya-coverage-map"
import { BenefitsCarousel } from "@/src/components/benefits-carousel"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-white py-16">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">AccessWASH Portal</h1>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Kenya's leading digital platform connecting customers and utilities across Kenya. Manage water services, submit requests,
              and track service delivery efficiently.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto mb-12">
              <button className="w-full sm:w-56 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                <a href="#customer-portal" className="block">
                  Customer Portal Login
                </a>
              </button>
              <button className="w-full sm:w-56 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                <a href="#utility-login" className="block">
                  Utility Staff Login
                </a>
              </button>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Coverage Across Kenya</h2>
              <KenyaCoverageMap />
            </div>
          </div>
        </section>

        <BenefitsCarousel />

        <PortalSelector />
      </main>
      <Footer />
    </div>
  )
}
