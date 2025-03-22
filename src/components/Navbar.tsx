'use client'

import { useState } from 'react'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Briefcase, Clipboard, PaperclipIcon, PersonStanding, Star, Menu } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { SignOut } from "./ui/SignOut"
import { NavItem } from "./NavItem"

const SIDEBAR_ITEMS = [
  { name: "Personal", href: "/builder/personal", icon: PersonStanding },
  { name: "Experience", href: "/builder/experience", icon: Briefcase },
  { name: "Projects", href: "/builder/projects", icon: Clipboard },
  { name: "Skills", href: "/builder/skills", icon: Star },
  { name: "Create", href: "/builder/create", icon: PaperclipIcon },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(true)

  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar className="border-r">
        <SidebarHeader className="p-4">
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600" />
            </motion.div>
            <motion.h1 
              className="text-2xl font-bold"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              Resum<span className="text-blue-500">ai</span>fy
            </motion.h1>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <ScrollArea className="h-[calc(100vh-8rem)]">
            <nav className="flex flex-col gap-2 p-4">
              {SIDEBAR_ITEMS.map((item, index) => (
                <NavItem 
                  key={item.name}
                  item={item}
                  isActive={pathname === item.href}
                  index={index}
                />
              ))}
            </nav>
          </ScrollArea>
        </SidebarContent>
        <SidebarFooter className="p-4">
          <SignOut />
        </SidebarFooter>
      </Sidebar>
      <SidebarTrigger>
        <Button variant="outline" size="icon" className="fixed top-4 left-4 z-50 md:hidden">
          <Menu className="h-4 w-4" />
        </Button>
      </SidebarTrigger>
    </SidebarProvider>
  )
}

