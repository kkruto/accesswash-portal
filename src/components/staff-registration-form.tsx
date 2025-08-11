"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Textarea } from "@/src/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Loader2, User, Mail, Building, FileText } from "lucide-react"
import Link from "next/link"

export function StaffRegistrationForm() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    jobTitle: "",
    department: "",
    utility: "",
    employeeId: "",
    reason: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Mock registration
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Show success message
    alert("Access request submitted! You will receive an email when approved.")
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Staff Access Request</CardTitle>
        <p className="text-center text-gray-600">Request access to your utility's staff portal</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <User className="w-4 h-4" />
                First Name
              </label>
              <Input
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                placeholder="Enter first name"
                className="h-12"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Last Name</label>
              <Input
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                placeholder="Enter last name"
                className="h-12"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Work Email Address
            </label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Enter work email address"
              className="h-12"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Building className="w-4 h-4" />
              Utility Organization
            </label>
            <Select value={formData.utility} onValueChange={(value) => handleChange("utility", value)}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select your utility organization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="demo-utility">Demo Water & Sanitation Authority</SelectItem>
                <SelectItem value="metro-water">Metropolitan Water District</SelectItem>
                <SelectItem value="coastal-utilities">Coastal Utilities Corporation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Job Title</label>
              <Input
                value={formData.jobTitle}
                onChange={(e) => handleChange("jobTitle", e.target.value)}
                placeholder="e.g. Water Quality Technician"
                className="h-12"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Department</label>
              <Select value={formData.department} onValueChange={(value) => handleChange("department", value)}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="operations">Operations</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="customer-service">Customer Service</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="administration">Administration</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Employee ID (Optional)</label>
            <Input
              value={formData.employeeId}
              onChange={(e) => handleChange("employeeId", e.target.value)}
              placeholder="Enter employee ID if available"
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Reason for Access
            </label>
            <Textarea
              value={formData.reason}
              onChange={(e) => handleChange("reason", e.target.value)}
              placeholder="Briefly explain why you need access to the staff portal"
              className="min-h-[100px]"
              required
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full h-12 bg-green-600 hover:bg-green-700 text-white">
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Submitting Request...
              </>
            ) : (
              "Submit Access Request"
            )}
          </Button>

          <div className="text-center">
            <p className="text-gray-600">
              Already have access?{" "}
              <Link href="/staff/select-utility" className="text-green-600 hover:underline font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
