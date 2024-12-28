import { LogOut } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import { useQuery } from "@tanstack/react-query"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

import { SidebarMenuItems } from "./sidebar/SidebarMenuItems"
import { ProjectsList } from "./sidebar/ProjectsList"

export function AppSidebar() {
  const navigate = useNavigate()
  const { toast } = useToast()

  const { data: profile } = useQuery({
    queryKey: ['current-profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return null

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
      
      if (error) throw error
      return data
    },
  })

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    toast({
      title: "Signed out successfully",
      description: "You have been logged out of your account.",
    })
    navigate("/")
  }

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <h2 className="text-xl font-semibold">MovementBrand</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenuItems isSuperAdmin={profile?.is_superadmin || false} />
        <ProjectsList />
      </SidebarContent>
      <SidebarFooter className="p-1 space-y-0.5">
        <SidebarMenuButton 
          onClick={handleSignOut}
          className="w-full hover:bg-red-50 text-red-600 hover:text-red-700 h-8"
        >
          <LogOut className="h-5 w-5" />
          <span>Sign Out</span>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  )
}