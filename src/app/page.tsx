// src/app/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Droplets, Globe, Users, TrendingUp, Shield, Zap } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative bg-gradient-to-br from-background via-accent/20 to-secondary/10 py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight">
                Accelerating sustainable access to{" "}
                <span className="text-primary">water</span>,{" "}
                <span className="text-secondary">sanitation</span>{" "}
                and{" "}
                <span className="text-pink-500">hygiene</span>.
              </h1>
              
              <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                AccessWASH is an open-access digital platform for mapping the status, gaps and impact in 
                water supply, sanitation and hygiene (WASH) globally, and sharing knowledge on best practices.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                <Button asChild size="lg" className="btn-primary text-lg px-8 py-4">
                  <Link href="/portal">Get Involved</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4">
                  <Link href="#features">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Comprehensive WASH Solutions</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our platform provides the tools and insights needed to improve water, sanitation, 
                and hygiene services worldwide.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="card card-hover p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Global Mapping</h3>
                <p className="text-muted-foreground">
                  Comprehensive mapping of WASH infrastructure and services across different regions and communities.
                </p>
              </div>
              
              <div className="card card-hover p-8 text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Impact Analysis</h3>
                <p className="text-muted-foreground">
                  Data-driven insights to measure progress and identify gaps in WASH service delivery.
                </p>
              </div>
              
              <div className="card card-hover p-8 text-center">
                <div className="w-16 h-16 bg-info/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-info" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Community Engagement</h3>
                <p className="text-muted-foreground">
                  Connect communities, organizations, and stakeholders to share knowledge and best practices.
                </p>
              </div>
              
              <div className="card card-hover p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Droplets className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Water Management</h3>
                <p className="text-muted-foreground">
                  Advanced tools for monitoring water quality, distribution, and conservation efforts.
                </p>
              </div>
              
              <div className="card card-hover p-8 text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Safety & Hygiene</h3>
                <p className="text-muted-foreground">
                  Comprehensive hygiene education and safety protocols for sustainable health outcomes.
                </p>
              </div>
              
              <div className="card card-hover p-8 text-center">
                <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-warning" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Innovation Hub</h3>
                <p className="text-muted-foreground">
                  Discover and share innovative solutions, technologies, and approaches in WASH services.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-secondary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="text-4xl font-bold">Join the AccessWASH Community</h2>
              <p className="text-xl opacity-90">
                Be part of the global effort to ensure sustainable access to water, sanitation, 
                and hygiene for everyone, everywhere.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="secondary" size="lg" className="text-lg px-8 py-4">
                  <Link href="/portal">Access Portal</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary">
                  <Link href="/portal">Submit a Request</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
