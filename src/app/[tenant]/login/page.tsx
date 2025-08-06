import { AuthForm } from '@/components/auth-form'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

interface LoginPageProps {
  params: { tenant: string }
}

export default function LoginPage({ params }: LoginPageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Sign In
            </h1>
            <p className="text-gray-600">
              Access your customer portal
            </p>
          </div>
          <AuthForm type="login" tenant={params.tenant} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
