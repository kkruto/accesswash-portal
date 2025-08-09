// src/components/header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AWLogo } from "./AWLogo";

export function Header() {
  const pathname = usePathname();
  const isPortal = pathname?.startsWith("/portal");

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <AWLogo compact />
        </Link>

        <div className="flex items-center space-x-4">
          {isPortal ? (
            <nav className="hidden md:flex items-center space-x-4">
              <Link href="#" className="text-sm font-medium hover:text-primary">Support</Link>
              <Link href="#" className="text-sm font-medium hover:text-primary">Contact</Link>
            </nav>
          ) : (
            <nav className="hidden md:flex items-center space-x-4">
              <Link href="/portal" className="text-sm font-medium hover:text-primary">Portal</Link>
              <Link href="/about" className="text-sm font-medium hover:text-primary">About</Link>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
