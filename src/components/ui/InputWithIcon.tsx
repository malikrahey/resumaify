import React from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface InputWithIconProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
}

export default function InputWithIcon({ icon, className, ...props }: InputWithIconProps) {
  return (
    <div className="relative">
      <Input
        className={cn(
          "pr-10", // Add right padding to accommodate the icon
          className
        )}
        {...props}
      />
      {icon && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          {icon}
        </div>
      )}
    </div>
  )
}