// src/components/header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AWLogo } from "./AWLogo";
import { Button } from "./ui/button";
import { Menu, X, Phone, Mail } from "lucide-react";
import { useState } from "react";

export function Header() {
  const pathname = usePathname();
  const isPortal = pathname?.startsWith("/portal");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-background/95 backdrop-blur-md border-b border-border/50 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center group">
            <AWLogo compact />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {isPortal ? (
              <nav className="flex items-center space-x-6">
                <Link href="#" className="nav-link flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Support
                </Link>
                <Link href="#" className="nav-link flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Contact
                </Link>
              </nav>
            ) : (
              <nav className="flex items-center space-x-6">
                <Link href="/portal" className="nav-link">Portal</Link>
                <Link href="/about" className="nav-link">About</Link>
                <Button asChild variant="outline" size="sm">
                  <Link href="/portal">Get Started</Link>
                </Button>
              </nav>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-border animate-fade-in">
            {isPortal ? (
              <nav className="flex flex-col space-y-3">
                <Link href="#" className="nav-link flex items-center gap-2 py-2">
                  <Phone className="w-4 h-4" />
                  Support
                </Link>
                <Link href="#" className="nav-link flex items-center gap-2 py-2">
                  <Mail className="w-4 h-4" />
                  Contact
                </Link>
              </nav>
            ) : (
              <nav className="flex flex-col space-y-3">
                <Link href="/portal" className="nav-link py-2">Portal</Link>
                <Link href="/about" className="nav-link py-2">About</Link>
                <Button asChild variant="outline" size="sm" className="w-fit">
                  <Link href="/portal">Get Started</Link>
                </Button>
              </nav>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
