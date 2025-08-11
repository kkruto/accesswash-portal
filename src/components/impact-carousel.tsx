"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/src/components/ui/card"
import { Users, Droplets, Building, Globe } from "lucide-react"

const impactStats = [
  {
    icon: Users,
    number: "2.1B",
    label: "People lack safely managed drinking water",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    icon: Building,
    number: "3.6B",
    label: "People lack safely managed sanitation",
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    icon: Droplets,
    number: "2B",
    label: "People lack basic handwashing facilities",
    color: "text-pink-600",
    bgColor: "bg-pink-100",
  },
  {
    icon: Globe,
    number: "150+",
    label: "Countries using AccessWASH data",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
]

export function ImpactCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % impactStats.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="impact" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Global WASH Challenge</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Understanding the scale of the challenge helps us work together for solutions
          </p>
        </div>

        {/* Desktop: All cards visible */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {impactStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div
                    className={`w-16 h-16 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.number}</div>
                  <p className="text-gray-600 text-sm leading-tight">{stat.label}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Mobile: Carousel */}
        <div className="md:hidden">
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {impactStats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <Card className="text-center">
                      <CardContent className="pt-6">
                        <div
                          className={`w-20 h-20 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
                        >
                          <Icon className={`w-10 h-10 ${stat.color}`} />
                        </div>
                        <div className={`text-4xl font-bold ${stat.color} mb-2`}>{stat.number}</div>
                        <p className="text-gray-600 leading-tight">{stat.label}</p>
                      </CardContent>
                    </Card>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Carousel indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {impactStats.map((_, index) => (
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
