import Link from "next/link"
import { AWLogo } from "./aw-logo"
import { Button } from "@/src/components/ui/button"

interface HeaderProps {
  isLoggedIn?: boolean
  userType?: "customer" | "staff"
  userName?: string
}

export function Header({ isLoggedIn = false, userType, userName }: HeaderProps) {
  if (isLoggedIn) {
    return (
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <AWLogo />
            </Link>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {userName}</span>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
              >
                <Link href={`/${userType}/settings`}>Settings</Link>
              </Button>
              <Button
                asChild
                size="sm"
                className={userType === "customer" ? "bg-teal-600 hover:bg-teal-700" : "bg-blue-600 hover:bg-blue-700"}
              >
                <Link href="/">Logout</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <AWLogo />
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/about" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
              About
            </Link>
            <Link href="/support" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
              Support
            </Link>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white bg-transparent"
            >
              <Link href="#customer-portal">Customer Portal</Link>
            </Button>
            <Button asChild size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
              <Link href="#utility-login">Utility Login</Link>
            </Button>
          </nav>

          <div className="md:hidden flex items-center space-x-2">
            <Button
              asChild
              size="sm"
              variant="outline"
              className="border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white bg-transparent"
            >
              <Link href="#customer-portal">Customer</Link>
            </Button>
            <Button asChild size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
              <Link href="#utility-login">Utility</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
