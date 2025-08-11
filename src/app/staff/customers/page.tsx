"use client"

import { Header } from "@/src/components/header"
import { Card, CardContent } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Badge } from "@/src/components/ui/badge"
import { Input } from "@/src/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { ArrowLeft, Search, Plus, User, Phone, Mail, MapPin } from "lucide-react"
import Link from "next/link"

const mockCustomers = [
  {
    id: "CUST-001",
    name: "John Doe",
    accountNumber: "NCW-2024-15847",
    email: "john.doe@gmail.com",
    phone: "+254 712 345 678",
    address: "Westlands, Nairobi",
    status: "Active",
    balance: "KSh 2,450",
    lastPayment: "15 Jan 2025",
    serviceArea: "Zone 3A",
  },
  {
    id: "CUST-002",
    name: "Mary Wanjiku",
    accountNumber: "NCW-2024-15848",
    email: "mary.wanjiku@gmail.com",
    phone: "+254 722 987 654",
    address: "Kibera, Nairobi",
    status: "Active",
    balance: "KSh 0",
    lastPayment: "20 Jan 2025",
    serviceArea: "Zone 7B",
  },
  {
    id: "CUST-003",
    name: "Peter Kamau",
    accountNumber: "NCW-2024-15849",
    email: "peter.kamau@gmail.com",
    phone: "+254 733 456 789",
    address: "Karen, Nairobi",
    status: "Suspended",
    balance: "KSh 5,670",
    lastPayment: "10 Dec 2024",
    serviceArea: "Zone 2C",
  },
]

export default function CustomersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn={true} userType="staff" userName="Admin User" />

      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <Link
            href="/staff/demo-utility/dashboard"
            className="flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Customer Management</h1>
              <p className="text-gray-600 mt-2">Manage customer accounts and service information</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Export List</Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Customer
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Customers</p>
                  <p className="text-2xl font-bold text-green-600">4,156</p>
                </div>
                <User className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-red-500">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Suspended</p>
                  <p className="text-2xl font-bold text-red-600">23</p>
                </div>
                <User className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-yellow-500">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Outstanding Bills</p>
                  <p className="text-2xl font-bold text-yellow-600">156</p>
                </div>
                <User className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">New This Month</p>
                  <p className="text-2xl font-bold text-blue-600">45</p>
                </div>
                <User className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input placeholder="Search by name, account number, or phone..." className="pl-10" />
                </div>
              </div>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="disconnected">Disconnected</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Areas</SelectItem>
                  <SelectItem value="zone-1">Zone 1</SelectItem>
                  <SelectItem value="zone-2">Zone 2</SelectItem>
                  <SelectItem value="zone-3">Zone 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {mockCustomers.map((customer) => (
            <Card key={customer.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{customer.name}</h3>
                      <Badge
                        variant={
                          customer.status === "Active"
                            ? "default"
                            : customer.status === "Suspended"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {customer.status}
                      </Badge>
                      {customer.balance !== "KSh 0" && (
                        <Badge variant="outline" className="text-red-600">
                          Balance: {customer.balance}
                        </Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-2">
                      <span className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        Account: {customer.accountNumber}
                      </span>
                      <span className="flex items-center">
                        <Phone className="w-4 h-4 mr-1" />
                        {customer.phone}
                      </span>
                      <span className="flex items-center">
                        <Mail className="w-4 h-4 mr-1" />
                        {customer.email}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {customer.address}
                      </span>
                      <span>Service Area: {customer.serviceArea}</span>
                      <span>Last Payment: {customer.lastPayment}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                    <Button variant="outline" size="sm">
                      Billing History
                    </Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Contact
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
