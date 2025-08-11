"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/src/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Textarea } from "@/src/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Label } from "@/src/components/ui/label"
import { ArrowLeft, Upload, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function NewRequestPage() {
  const [formData, setFormData] = useState({
    type: "",
    priority: "",
    description: "",
    location: "",
    phone: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    alert("Service request submitted successfully!")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn={true} userType="customer" userName="John Doe" />

      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <Link
            href="/customer/demo-utility/dashboard"
            className="flex items-center text-teal-600 hover:text-teal-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Submit New Service Request</h1>
          <p className="text-gray-600 mt-2">Report an issue or request service from your water utility</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-teal-600" />
              Service Request Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="type">Request Type</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select request type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no-water">No Water Supply</SelectItem>
                      <SelectItem value="low-pressure">Low Water Pressure</SelectItem>
                      <SelectItem value="water-quality">Water Quality Issue</SelectItem>
                      <SelectItem value="billing">Billing Query</SelectItem>
                      <SelectItem value="meter-reading">Meter Reading Request</SelectItem>
                      <SelectItem value="leak">Water Leak</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority Level</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) => setFormData({ ...formData, priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High - Emergency</SelectItem>
                      <SelectItem value="medium">Medium - Urgent</SelectItem>
                      <SelectItem value="low">Low - Normal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location/Address</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Enter your address or location"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Contact Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the issue in detail..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label>Attach Photos (Optional)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Click to upload photos or drag and drop</p>
                  <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
                  Submit Request
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href="/customer/demo-utility/dashboard">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
