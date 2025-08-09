import { UtilitySelector } from '@/components/utility-selector'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function SelectUtilityPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-gradient-to-br from-background via-accent/20 to-secondary/10">
        <div className="w-full max-w-4xl px-4 py-12">
          <div className="text-center mb-12 space-y-4">
            <h1 className="text-5xl font-bold tracking-tight mb-6">
              Select Your Utility Provider
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Choose from our network of trusted water service providers to access 
              your customer portal
            </p>
          </div>
          <UtilitySelector />
        </div>
      </main>
      <Footer />
    </div>
  )
}