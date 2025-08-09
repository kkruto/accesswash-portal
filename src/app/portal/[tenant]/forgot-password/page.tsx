import { AuthForm } from '@/components/auth-form'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

interface ForgotPasswordPageProps {
  params: { tenant: string }
}

export default function ForgotPasswordPage({ params }: ForgotPasswordPageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Reset Password
            </h1>
            <p className="text-gray-600">
              Enter your email to receive reset instructions
            </p>
          </div>
          <AuthForm type="forgot-password" tenant={params.tenant} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
