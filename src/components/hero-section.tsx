"use client"

import { useEffect, useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Droplets, Zap, Heart } from "lucide-react"

export function HeroSection() {
  const [currentIcon, setCurrentIcon] = useState(0)
  const icons = [
    { icon: Droplets, color: "text-blue-500", label: "Water" },
    { icon: Zap, color: "text-green-500", label: "Sanitation" },
    { icon: Heart, color: "text-pink-500", label: "Hygiene" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % icons.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const scrollToPortals = () => {
    document.getElementById("portals")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-20 lg:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          {/* Animated icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              {icons.map((item, index) => {
                const Icon = item.icon
                return (
                  <Icon
                    key={index}
                    className={`w-16 h-16 absolute top-0 left-0 transition-all duration-500 ${
                      index === currentIcon ? `${item.color} opacity-100 scale-100` : "opacity-0 scale-75"
                    }`}
                  />
                )
              })}
              <div className="w-16 h-16"></div> {/* Spacer */}
            </div>
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
            Accelerating sustainable access to
          </h1>

          <div className="text-4xl lg:text-6xl font-bold mb-8 leading-tight">
            <span className="text-blue-500 animate-pulse">water</span>
            <span className="text-gray-900">, </span>
            <span className="text-green-500 animate-pulse animation-delay-200">sanitation</span>
            <span className="text-gray-900"> and </span>
            <span className="text-pink-500 animate-pulse animation-delay-400">hygiene</span>
            <span className="text-gray-900">.</span>
          </div>

          <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
            AccessWASH is an open-access digital platform for mapping the status, gaps and impact in water supply,
            sanitation and hygiene (WASH) globally, and sharing knowledge on best practices.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button onClick={scrollToPortals} size="lg" className="btn-primary text-lg px-8 py-4 h-auto">
              Get Started Today
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg px-8 py-4 h-auto border-2 hover:bg-gray-50 bg-transparent"
            >
              <a href="#impact">View Our Impact</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
