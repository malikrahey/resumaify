"use client";

import { FeatureSection } from "@/components/landing/FeatureSection";
import { Footer } from "@/components/landing/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Resum<span className="text-blue-600">ai</span>fy
        </h1>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="#features" className="text-gray-600 hover:text-gray-900">Features</Link></li>
            <li><Link href="#testimonials" className="text-gray-600 hover:text-gray-900">Testimonials</Link></li>
            <li><Link href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link></li>
          </ul>
        </nav>
        <div className="space-x-4">
          <Link href="/sign-in">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link href="/register">
            <Button>Get Started</Button>
          </Link>
        </div>
      </header>

      <main>
        <HeroSection />
        <FeatureSection />
        {/* <TestimonialSection /> */}
        <PricingSection />
      </main>

      <Footer />
    </div>
  )
}


