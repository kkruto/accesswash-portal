import { LoginForm } from "@/src/components/login-form"
import { Header } from "@/src/components/header"
import { Footer } from "@/src/components/footer"

interface StaffLoginPageProps {
  params: Promise<{ tenant: string }>
}

export default async function StaffLoginPage({ params }: StaffLoginPageProps) {
  const { tenant } = await params

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="flex items-center justify-center py-16">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Staff Login</h1>
            <p className="text-gray-600">Access the utility management portal</p>
          </div>
          <LoginForm tenant={tenant} portalType="staff" />
        </div>
      </main>
      <Footer />
    </div>
  )
}
