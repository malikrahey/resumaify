'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section className="container mx-auto px-4 py-20 text-center">
      <motion.h2 
        className="text-5xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Craft the Perfect Resume with AI
      </motion.h2>
      <motion.p 
        className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Resumaify uses advanced AI to tailor your resume for each job application, increasing your chances of landing your dream job.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Link href="/register">
          <Button size="lg" className="mr-4">
            Get Started for Free
          </Button>
        </Link>
        <Link href="#features">
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </Link>
      </motion.div>
    </section>
  )
}

