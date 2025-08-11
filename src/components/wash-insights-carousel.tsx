"use client"

import { useState, useEffect } from "react"
import { Card } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { ChevronLeft, ChevronRight, Clock, Users, Wrench, Star } from "lucide-react"

export function WashInsightsCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const insights = [
    {
      icon: <Clock className="h-8 w-8 text-blue-600" />,
      title: "Average Response Time",
      value: "2.4 hours",
      description: "Service requests resolved faster than industry average",
      trend: "+15% improvement",
      color: "blue",
    },
    {
      icon: <Users className="h-8 w-8 text-green-600" />,
      title: "Active Customers",
      value: "12,847",
      description: "Households connected to our WASH services",
      trend: "+3.2% this month",
      color: "green",
    },
    {
      icon: <Wrench className="h-8 w-8 text-orange-600" />,
      title: "Infrastructure Assets",
      value: "1,234",
      description: "Pipes, valves, and treatment facilities managed",
      trend: "98.5% operational",
      color: "orange",
    },
    {
      icon: <Star className="h-8 w-8 text-purple-600" />,
      title: "Customer Satisfaction",
      value: "4.7/5",
      description: "Average rating from service request feedback",
      trend: "+0.3 this quarter",
      color: "purple",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % insights.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [insights.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % insights.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + insights.length) % insights.length)
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">WASH Service Insights</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real-time data from our water utility management platform
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Carousel Container */}
          <div className="overflow-hidden rounded-xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {insights.map((insight, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <Card className="mx-4 p-8 bg-gradient-to-br from-gray-50 to-white border-0 shadow-lg">
                    <div className="text-center space-y-6">
                      <div className="flex justify-center">{insight.icon}</div>

                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-gray-900">{insight.title}</h3>
                        <div className="text-4xl font-bold text-gray-900">{insight.value}</div>
                      </div>

                      <p className="text-gray-600 max-w-md mx-auto">{insight.description}</p>

                      <Badge
                        variant="secondary"
                        className={`bg-${insight.color}-100 text-${insight.color}-700 px-3 py-1`}
                      >
                        {insight.trend}
                      </Badge>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {insights.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
