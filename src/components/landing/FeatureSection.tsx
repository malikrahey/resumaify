'use client'

import { motion } from "framer-motion"
import { FileText, Zap, Target } from 'lucide-react'

const features = [
  {
    icon: FileText,
    title: "AI-Powered Resume Creation",
    description: "Our advanced AI analyzes job descriptions and tailors your resume to highlight the most relevant skills and experiences."
  },
  {
    icon: Zap,
    title: "Quick and Easy",
    description: "Create a professional resume in minutes, not hours. Our intuitive interface guides you through the process step by step."
  },
  {
    icon: Target,
    title: "Targeted Job Matching",
    description: "Resumaify matches your skills and experience with job requirements, helping you focus on the most suitable opportunities."
  }
]

export function FeatureSection() {
  return (
    <section id="features" className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Resumaify?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

