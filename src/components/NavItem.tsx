'use client'

import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"

interface NavItemProps {
  item: {
    name: string
    href: string
    icon: React.ElementType
  }
  isActive: boolean
  index: number
}

export function NavItem({ item, isActive, index }: NavItemProps) {
  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <SidebarMenuItem className="list-none">
        <SidebarMenuButton asChild isActive={isActive}>
          <Link 
            href={item.href}
            className={cn(
              "relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
              isActive && "bg-accent text-accent-foreground"
            )}
          >
            {isActive && (
              <motion.div
                className="absolute left-0 top-0 h-full w-1 rounded-r-full bg-blue-500"
                layoutId="activeNavIndicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
            <item.icon className="h-4 w-4" />
            <span>{item.name}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </motion.div>
  )
}

