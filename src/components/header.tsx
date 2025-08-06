import Link from 'next/link'
import Image from 'next/image'

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AW</span>
            </div>
            <span className="text-xl font-bold text-gray-900">AccessWASH</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/select-utility" className="text-gray-600 hover:text-gray-900">
              Select Utility
            </Link>
            <Link href="/support" className="text-gray-600 hover:text-gray-900">
              Support
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
