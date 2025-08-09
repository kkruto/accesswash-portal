import { AuthForm } from '@/components/auth-form'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

interface ResetPasswordPageProps {
  params: Promise<{ tenant: string }>
  searchParams: Promise<{ token?: string }>
}

export default async function ResetPasswordPage({ 
  params, 
  searchParams 
}: ResetPasswordPageProps) {
  const { tenant } = await params;
  const { token } = await searchParams;
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Set New Password
            </h1>
            <p className="text-gray-600">
              Enter your new password
            </p>
          </div>
          <AuthForm 
            type="reset" 
            tenant={tenant}
            token={token}
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}
