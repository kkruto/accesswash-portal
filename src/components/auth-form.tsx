"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ErrorAlert } from '@/components/error-alert'
import { SuccessToast } from '@/components/success-toast'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { login, register, forgotPassword, resetPassword } from '@/lib/api'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+?1?\d{9,15}$/, 'Invalid phone number'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
})

const resetPasswordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

interface AuthFormProps {
  type: 'login' | 'register' | 'forgot-password' | 'reset-password'
  tenant: string
  token?: string
}

export function AuthForm({ type, tenant, token }: AuthFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const router = useRouter()

  const getSchema = () => {
    switch (type) {
      case 'login': return loginSchema
      case 'register': return registerSchema
      case 'forgot-password': return forgotPasswordSchema
      case 'reset-password': return resetPasswordSchema
    }
  }

  const form = useForm({
    resolver: zodResolver(getSchema()),
  })

  const onSubmit = async (data: any) => {
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      switch (type) {
        case 'login':
          await login(tenant, data)
          router.push(`/${tenant}/dashboard`)
          break
        case 'register':
          await register(tenant, data)
          setSuccess('Account created successfully! Please sign in.')
          setTimeout(() => router.push(`/${tenant}/login`), 2000)
          break
        case 'forgot-password':
          await forgotPassword(tenant, data)
          setSuccess('Password reset instructions sent to your email.')
          break
        case 'reset-password':
          if (!token) throw new Error('Reset token is required')
          await resetPassword(tenant, { ...data, token })
          setSuccess('Password reset successfully!')
          setTimeout(() => router.push(`/${tenant}/login`), 2000)
          break
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getTitle = () => {
    switch (type) {
      case 'login': return 'Sign In'
      case 'register': return 'Create Account'
      case 'forgot-password': return 'Reset Password'
      case 'reset-password': return 'Set New Password'
    }
  }

  const getDescription = () => {
    switch (type) {
      case 'login': return 'Enter your credentials to access your account'
      case 'register': return 'Create a new account to get started'
      case 'forgot-password': return 'Enter your email to receive reset instructions'
      case 'reset-password': return 'Enter your new password'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{getTitle()}</CardTitle>
        <CardDescription>{getDescription()}</CardDescription>
      </CardHeader>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          {error && <ErrorAlert message={error} />}
          {success && <SuccessToast message={success} />}

          {(type === 'login' || type === 'register' || type === 'forgot-password') && (
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...form.register('email')}
                disabled={loading}
              />
              {form.formState.errors.email && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.email.message as string}
                </p>
              )}
            </div>
          )}

          {type === 'register' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    {...form.register('firstName')}
                    disabled={loading}
                  />
                  {form.formState.errors.firstName && (
                    <p className="text-sm text-red-600">
                      {form.formState.errors.firstName.message as string}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    {...form.register('lastName')}
                    disabled={loading}
                  />
                  {form.formState.errors.lastName && (
                    <p className="text-sm text-red-600">
                      {form.formState.errors.lastName.message as string}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1234567890"
                  {...form.register('phone')}
                  disabled={loading}
                />
                {form.formState.errors.phone && (
                  <p className="text-sm text-red-600">
                    {form.formState.errors.phone.message as string}
                  </p>
                )}
              </div>
            </>
          )}

          {(type === 'login' || type === 'register' || type === 'reset-password') && (
            <div className="space-y-2">
              <Label htmlFor="password">
                {type === 'reset-password' ? 'New Password' : 'Password'}
              </Label>
              <Input
                id="password"
                type="password"
                {...form.register('password')}
                disabled={loading}
              />
              {form.formState.errors.password && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.password.message as string}
                </p>
              )}
            </div>
          )}

          {(type === 'register' || type === 'reset-password') && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...form.register('confirmPassword')}
                disabled={loading}
              />
              {form.formState.errors.confirmPassword && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.confirmPassword.message as string}
                </p>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {type === 'login' && 'Sign In'}
            {type === 'register' && 'Create Account'}
            {type === 'forgot-password' && 'Send Reset Email'}
            {type === 'reset-password' && 'Update Password'}
          </Button>

          <div className="text-center text-sm space-y-2">
            {type === 'login' && (
              <>
                <Link 
                  href={`/${tenant}/forgot-password`}
                  className="text-blue-600 hover:underline"
                >
                  Forgot your password?
                </Link>
                <div>
                  {"Don't have an account? "}
                  <Link 
                    href={`/${tenant}/register`}
                    className="text-blue-600 hover:underline"
                  >
                    Sign up
                  </Link>
                </div>
              </>
            )}
            {type === 'register' && (
              <div>
                Already have an account?{' '}
                <Link 
                  href={`/${tenant}/login`}
                  className="text-blue-600 hover:underline"
                >
                  Sign in
                </Link>
              </div>
            )}
            {(type === 'forgot-password' || type === 'reset-password') && (
              <Link 
                href={`/${tenant}/login`}
                className="text-blue-600 hover:underline"
              >
                Back to sign in
              </Link>
            )}
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}
