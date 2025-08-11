"use client"

import { Header } from "@/src/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Badge } from "@/src/components/ui/badge"
import { ArrowLeft, Download, CreditCard, Smartphone, Calendar } from "lucide-react"
import Link from "next/link"

const billingData = {
  currentBill: "KSh 2,450",
  dueDate: "28 Jan 2025",
  status: "Unpaid",
  accountBalance: "KSh 2,450",
  lastPayment: "15 Dec 2024",
  lastPaymentAmount: "KSh 1,890",
}

const billingHistory = [
  { month: "January 2025", amount: "KSh 2,450", status: "Unpaid", dueDate: "28 Jan 2025" },
  { month: "December 2024", amount: "KSh 1,890", status: "Paid", dueDate: "28 Dec 2024" },
  { month: "November 2024", amount: "KSh 2,100", status: "Paid", dueDate: "28 Nov 2024" },
  { month: "October 2024", amount: "KSh 1,750", status: "Paid", dueDate: "28 Oct 2024" },
]

export default function BillingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn={true} userType="customer" userName="John Doe" />

      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-6">
          <Link
            href="/customer/demo-utility/dashboard"
            className="flex items-center text-teal-600 hover:text-teal-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Billing & Payments</h1>
          <p className="text-gray-600 mt-2">Manage your water service bills and payment history</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="border-l-4 border-l-red-500">
            <CardHeader>
              <CardTitle className="text-lg">Current Bill</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600 mb-2">{billingData.currentBill}</div>
              <p className="text-sm text-gray-600">Due: {billingData.dueDate}</p>
              <Badge variant="destructive" className="mt-2">
                {billingData.status}
              </Badge>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardHeader>
              <CardTitle className="text-lg">Account Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600 mb-2">{billingData.accountBalance}</div>
              <p className="text-sm text-gray-600">Outstanding amount</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader>
              <CardTitle className="text-lg">Last Payment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600 mb-2">{billingData.lastPaymentAmount}</div>
              <p className="text-sm text-gray-600">{billingData.lastPayment}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Payment Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full justify-start bg-green-600 hover:bg-green-700 h-12">
                <Smartphone className="w-5 h-5 mr-3" />
                Pay with M-Pesa
              </Button>
              <Button variant="outline" className="w-full justify-start h-12 bg-transparent">
                <CreditCard className="w-5 h-5 mr-3" />
                Pay with Card
              </Button>
              <Button variant="outline" className="w-full justify-start h-12 bg-transparent">
                <Calendar className="w-5 h-5 mr-3" />
                Set Up Auto-Pay
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Billing History</CardTitle>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {billingHistory.map((bill, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{bill.month}</p>
                      <p className="text-sm text-gray-600">Due: {bill.dueDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{bill.amount}</p>
                      <Badge variant={bill.status === "Paid" ? "default" : "destructive"}>{bill.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
