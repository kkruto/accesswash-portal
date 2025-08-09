// src/app/page.tsx
import Link from "next/link";
import { AWLogo } from "@/components/AWLogo";

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col">
      <header className="py-12">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <AWLogo />
          <nav>
            <Link href="/portal" className="text-sm font-medium hover:text-primary">
              Portal
            </Link>
          </nav>
        </div>
      </header>

      <section className="flex-1 flex items-center">
        <div className="container mx-auto px-4 py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">AccessWASH</h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl">
              Manage water and sanitation services for your home or utility. Customers and staff can access
              tools tailored to their role.
            </p>
            <div className="flex space-x-4">
              <Link href="/portal" className="inline-block bg-primary text-white px-6 py-3 rounded-md shadow">
                Open Portal
              </Link>
              <a href="/about" className="inline-block text-primary px-6 py-3 rounded-md border border-primary">
                Learn More
              </a>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg p-8 enterprise-shadow">
            <h3 className="text-xl font-semibold mb-4">Quick actions</h3>
            <ul className="space-y-3 text-gray-700">
              <li>Pay bills and view consumption</li>
              <li>Report issues and track service requests</li>
              <li>Utility staff: inspect and update assets from the field</li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="bg-gray-50 border-t">
        <div className="container mx-auto px-4 py-6 text-sm text-gray-600">
          © {new Date().getFullYear()} AccessWASH Technologies
        </div>
      </footer>
    </main>
  );
}
