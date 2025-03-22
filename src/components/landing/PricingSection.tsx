'use client'

import { Button } from "@/components/ui/button"
import { Check } from 'lucide-react'
import { motion } from "framer-motion"

const plans = [
  {
    name: "Basic",
    price: "Free",
    features: [
      "1 AI-generated resume",
      "Basic templates",
      "Job matching",
      "Email support"
    ]
  },
  {
    name: "Pro",
    price: "$9.99/month",
    features: [
      "Unlimited AI-generated resumes",
      "Premium templates",
      "Advanced job matching",
      "Priority email support",
      "LinkedIn profile optimization"
    ]
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: [
      "All Pro features",
      "Custom branding",
      "API access",
      "Dedicated account manager",
      "Team collaboration tools"
    ]
  }
]

export function PricingSection() {
  return (
    <section id="pricing" className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Choose Your Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              <p className="text-3xl font-bold mb-4">{plan.price}</p>
              <ul className="mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center mb-2">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full">Choose Plan</Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

