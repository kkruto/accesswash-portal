import { AuthForm } from '@/components/auth-form'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

interface RegisterPageProps {
  params: Promise<{ tenant: string }>
}

export default async function RegisterPage({ params }: RegisterPageProps) {
  const { tenant } = await params;
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create Account
            </h1>
            <p className="text-gray-600">
              Register for your customer portal
            </p>
          </div>
          <AuthForm type="register" tenant={tenant} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
