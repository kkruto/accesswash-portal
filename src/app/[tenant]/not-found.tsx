import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function TenantNotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Utility Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The utility you're looking for doesn't exist or is not available.
          </p>
          <Button asChild>
            <Link href="/select-utility">
              Select a Different Utility
            </Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  )
}
