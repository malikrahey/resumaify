'use client'

import { LogOut } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"

export function SignOut() {
  const router = useRouter()

  const handleSignOut = async () => {
    // Implement your sign out logic here
    // For example:
    // await signOut()
    router.push('/signin')
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Button 
          variant="ghost" 
          className="w-full justify-start text-red-500 hover:bg-red-100 hover:text-red-600"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

