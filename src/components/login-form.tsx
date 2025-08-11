"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Eye, EyeOff, Mail, Lock, Loader2, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface LoginFormProps {
  tenant: string
  portalType: "customer" | "staff"
}

const DUMMY_USERS = {
  customer: [
    { email: "john.doe@gmail.com", password: "customer123", name: "John Doe" },
    { email: "mary.wanjiku@gmail.com", password: "customer123", name: "Mary Wanjiku" },
    { email: "peter.kamau@gmail.com", password: "customer123", name: "Peter Kamau" },
  ],
  staff: [
    { email: "admin@nairobiwater.co.ke", password: "staff123", name: "James Mwangi", role: "Operations Manager" },
    { email: "engineer@mombasawater.co.ke", password: "staff123", name: "Sarah Akinyi", role: "Field Engineer" },
    {
      email: "supervisor@nakuruwater.co.ke",
      password: "staff123",
      name: "David Kiprop",
      role: "Maintenance Supervisor",
    },
  ],
}

export function LoginForm({ tenant, portalType }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Check if credentials match dummy users
      const users = DUMMY_USERS[portalType]
      const user = users.find((u) => u.email === email && u.password === password)

      if (!user) {
        throw new Error("Invalid credentials")
      }

      // Store user info in localStorage for dashboard
      localStorage.setItem("currentUser", JSON.stringify({ ...user, tenant, portalType }))

      // Simulate successful login
      if (portalType === "customer") {
        router.push(`/customer/${tenant}/dashboard`)
      } else {
        router.push(`/staff/${tenant}/dashboard`)
      }
    } catch (err: any) {
      setError("Invalid email or password. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="card-hover bg-white shadow-lg">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-xl font-semibold text-gray-600">Welcome to</CardTitle>
          <div className="text-3xl font-bold">
            <span className="text-gray-900">Access</span>
            <span className="text-teal-600">WASH</span>
          </div>
          <p className="text-gray-500 capitalize">{portalType} Portal Login</p>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-blue-800 mb-2">Demo Credentials:</h4>
            <div className="text-sm text-blue-700 space-y-1">
              {portalType === "customer" ? (
                <>
                  <p>
                    <strong>Email:</strong> john.doe@gmail.com
                  </p>
                  <p>
                    <strong>Password:</strong> customer123
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>Email:</strong> admin@nairobiwater.co.ke
                  </p>
                  <p>
                    <strong>Password:</strong> staff123
                  </p>
                </>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="h-12 text-base border-2 focus:border-blue-500 transition-colors"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="h-12 text-base pr-12 border-2 focus:border-blue-500 transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300" />
                <span className="text-gray-600">Remember me</span>
              </label>
              <Link
                href={`/${portalType}/forgot-password`}
                className="text-blue-600 hover:text-blue-700 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full h-12 text-base btn-primary"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Signing In...
                </>
              ) : (
                "Log In"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Registration CTA */}
      <Card className="bg-gray-50 border-dashed border-2 border-gray-300">
        <CardContent className="text-center py-6">
          <p className="text-gray-600 mb-4">Don't have an account?</p>
          <Button asChild variant="outline" className="border-2 hover:bg-white bg-transparent">
            <Link href={`/${portalType}/register`}>Create New Account</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
