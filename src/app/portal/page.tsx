// src/app/portal/page.tsx
import Link from "next/link";
import { AWLogo } from "@/components/AWLogo";

export default function PortalEntry() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-6 border-b">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <AWLogo />
        </div>
      </header>

      <main className="flex-1 flex items-center">
        <div className="container mx-auto px-4 py-14">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold">AccessWASH Portal</h1>
            <p className="text-gray-600 mt-2">Choose your portal — Customer or Utility Staff</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-6 border rounded-lg card-hover">
              <h3 className="text-xl font-semibold mb-2">Customer Portal</h3>
              <p className="text-gray-600 mb-4">
                For residents and customers to pay bills, report problems and view service history.
              </p>
              <Link href="/portal/select-utility" className="inline-block text-primary hover:underline">
                Continue to Customer Portal →
              </Link>
            </div>

            <div className="p-6 border rounded-lg card-hover">
              <h3 className="text-xl font-semibold mb-2">Utility Staff Portal</h3>
              <p className="text-gray-600 mb-4">
                For utility staff to manage assets, complete inspections and respond to service requests.
              </p>
              <Link href="/portal/select-utility?type=staff" className="inline-block text-primary hover:underline">
                Continue to Staff Login →
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-50 border-t">
        <div className="container mx-auto px-4 py-6 text-sm text-gray-600">
          © {new Date().getFullYear()} AccessWASH Technologies
        </div>
      </footer>
    </div>
  );
}
