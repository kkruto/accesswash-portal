"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
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
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
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

  const form = useForm({
    resolver: zodResolver(
      type === 'login' ? loginSchema :
      type === 'register' ? registerSchema :
      type === 'forgot-password' ? forgotPasswordSchema :
      resetPasswordSchema
    ),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      phone: ''
    }
  })

  const onSubmit = async (values: any) => {
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      switch (type) {
        case 'login':
          await login(tenant, values)
          router.push(`/${tenant}/dashboard`)
          break
        case 'register':
          await register(tenant, values)
          setSuccess('Account created successfully! Please sign in.')
          setTimeout(() => router.push(`/${tenant}/login`), 2000)
          break
        case 'forgot-password':
          await forgotPassword(tenant, values)
          setSuccess('Password reset instructions sent to your email.')
          break
        case 'reset-password':
          if (!token) throw new Error('Reset token is required')
          await resetPassword(tenant, { ...values, token })
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

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">
          {type === 'login' ? 'Sign In' : 
           type === 'register' ? 'Create Account' :
           type === 'forgot-password' ? 'Reset Password' : 'Set New Password'}
        </CardTitle>
        <CardDescription>
          {type === 'login' ? 'Enter your credentials to access your account' :
           type === 'register' ? 'Create a new account to get started' :
           type === 'forgot-password' ? 'Enter your email to receive reset instructions' : 'Enter your new password'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {error && <ErrorAlert message={error} />}
            {success && <SuccessToast message={success} />}

            {(type === 'login' || type === 'register' || type === 'forgot-password') && (
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {type === 'register' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+1234567890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {(type === 'login' || type === 'register' || type === 'reset-password') && (
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {type === 'reset-password' ? 'New Password' : 'Password'}
                    </FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {(type === 'register' || type === 'reset-password') && (
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {type === 'login' && 'Sign In'}
              {type === 'register' && 'Create Account'}
              {type === 'forgot-password' && 'Send Reset Email'}
              {type === 'reset-password' && 'Update Password'}
            </Button>
          </form>
        </Form>

        <div className="mt-4 text-center text-sm">
          {type === 'login' && (
            <>
              <Link 
                href={`/${tenant}/forgot-password`}
                className="text-primary hover:underline"
              >
                Forgot your password?
              </Link>
              <div className="mt-2">
                {"Don't have an account? "}
                <Link 
                  href={`/${tenant}/register`}
                  className="text-primary hover:underline"
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
                className="text-primary hover:underline"
              >
                Sign in
              </Link>
            </div>
          )}
          {(type === 'forgot-password' || type === 'reset-password') && (
            <Link 
              href={`/${tenant}/login`}
              className="text-primary hover:underline"
            >
              Back to sign in
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  )
}