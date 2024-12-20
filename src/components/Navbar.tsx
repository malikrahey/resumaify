'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Briefcase, Clipboard, PaperclipIcon, PersonStanding, Star } from 'lucide-react'
import SignOut from "./custom-ui/SignOut"

const SIDEBAR_ITEMS = [
  { name: "Personal", href: "/builder/personal", icon: PersonStanding },
  { name: "Experience", href: "/builder/experience", icon: Briefcase },
  { name: "Projects", href: "/builder/projects", icon: Clipboard },
  { name: "Skills", href: "/builder/skills", icon: Star },
  { name: "Create", href: "/builder/create", icon: PaperclipIcon },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <div className="fixed flex h-screen w-52 flex-col border-r bg-background">

      <div className="flex items-center justify-between p-4">
        <Link href="/">
          <h1 className="text-2xl font-bold">Resum<span className="text-red-500">ai</span>fy</h1>
        </Link>
      </div>

      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-2 p-4">
          {SIDEBAR_ITEMS.map((item) => {
            const isActive = pathname === item.href
            return (
              <Button
                key={item.name}
                asChild
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "justify-start",
                  isActive && "bg-muted font-bold hover:bg-muted"
                )}
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Link>
              </Button>
            )
          })}
        </nav>
      </ScrollArea>
      <div className="p-6">
        <SignOut />
      </div>
      
    </div>
  )
}