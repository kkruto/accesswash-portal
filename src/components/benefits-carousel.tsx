"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { ChevronLeft, ChevronRight, Droplets, Clock, Users, BarChart3, Shield } from "lucide-react"

const benefits = [
  {
    icon: Droplets,
    title: "What We Do",
    description:
      "AccessWASH connects water utilities and customers across Kenya, streamlining service delivery and improving water access for all.",
    stat: "Serving 90+ utilities nationwide",
  },
  {
    icon: Clock,
    title: "24/7 Service Management",
    description:
      "Submit and track water service requests anytime. Get real-time updates on repairs, maintenance, and service delivery.",
    stat: "95% faster issue resolution",
  },
  {
    icon: Users,
    title: "Customer-First Platform",
    description:
      "Easy-to-use portal for customers to manage water accounts, pay bills via M-Pesa, and communicate with utilities.",
    stat: "3.2M+ customers served",
  },
  {
    icon: BarChart3,
    title: "Data-Driven Operations",
    description:
      "Utilities get powerful analytics and reporting tools to optimize operations and improve service delivery across Kenya.",
    stat: "40% operational efficiency gain",
  },
  {
    icon: Shield,
    title: "WASREB Compliant",
    description: "Fully compliant with Water Services Regulatory Board standards and reporting requirements for Kenya.",
    stat: "100% regulatory compliance",
  },
]

export function BenefitsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % benefits.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % benefits.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + benefits.length) % benefits.length)
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose AccessWASH</h2>
          <p className="text-lg text-gray-600">Transforming water service delivery across Kenya</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon
                return (
                  <div key={index} className="w-full flex-shrink-0">
                    <Card className="mx-4 bg-white shadow-xl border-0">
                      <CardContent className="p-12 text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                        <p className="text-gray-600 text-lg leading-relaxed mb-6 max-w-2xl mx-auto">
                          {benefit.description}
                        </p>
                        <div className="inline-block bg-gradient-to-r from-teal-100 to-blue-100 px-6 py-3 rounded-full">
                          <span className="text-teal-700 font-semibold text-lg">{benefit.stat}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Navigation buttons */}
          <Button
            onClick={prevSlide}
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white shadow-lg hover:shadow-xl border-2 w-12 h-12 rounded-full"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            onClick={nextSlide}
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white shadow-lg hover:shadow-xl border-2 w-12 h-12 rounded-full"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* Dots indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {benefits.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-gradient-to-r from-teal-500 to-blue-500 w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">Ready to get started?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <Button asChild className="w-full sm:w-48 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3">
              <a href="#customer-portal">Login to Customer Portal</a>
            </Button>
            <Button asChild className="w-full sm:w-48 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3">
              <a href="#utility-login">Utility Staff Login</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
