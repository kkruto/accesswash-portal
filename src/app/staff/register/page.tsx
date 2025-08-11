import { Header } from "@/src/components/header"
import { Footer } from "@/src/components/footer"
import { StaffRegistrationForm } from "@/src/components/staff-registration-form"

export default function StaffRegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Request Staff Access</h1>
            <p className="text-lg text-gray-600">Apply for utility staff portal access</p>
          </div>
          <StaffRegistrationForm />
        </div>
      </main>
      <Footer />
    </div>
  )
}
