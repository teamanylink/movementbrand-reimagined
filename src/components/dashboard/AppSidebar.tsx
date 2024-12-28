import { LogOut, Search, Home, LayoutDashboard, FolderKanban, CheckSquare, PieChart, Users, LifeBuoy, Settings } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import { useQuery } from "@tanstack/react-query"
import { Input } from "@/components/ui/input"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

import { SidebarMenuItems } from "./sidebar/SidebarMenuItems"
import { ProjectsList } from "./sidebar/ProjectsList"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

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
    <Sidebar className="border-r border-gray-200 bg-white">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2 px-2">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500"></div>
          <h2 className="text-lg font-semibold">MovementBrand</h2>
        </div>
        <div className="px-2 mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search" 
              className="w-full pl-9 h-9 bg-gray-50 border-none text-sm" 
            />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <nav className="space-y-0.5">
          <SidebarMenuButton 
            asChild
            className="w-full justify-start text-gray-700 hover:bg-gray-100 h-10 px-3 text-sm font-medium"
          >
            <a href="/dashboard">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </a>
          </SidebarMenuButton>
          
          <SidebarMenuButton 
            asChild
            className="w-full justify-start text-gray-700 hover:bg-gray-100 h-10 px-3 text-sm font-medium"
          >
            <a href="/dashboard">
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </a>
          </SidebarMenuButton>
          
          <SidebarMenuButton 
            asChild
            className="w-full justify-start text-gray-700 hover:bg-gray-100 h-10 px-3 text-sm font-medium"
          >
            <a href="/projects">
              <FolderKanban className="h-4 w-4" />
              <span>Projects</span>
            </a>
          </SidebarMenuButton>
          
          <SidebarMenuButton 
            asChild
            className="w-full justify-start text-gray-700 hover:bg-gray-100 h-10 px-3 text-sm font-medium"
          >
            <a href="/tasks">
              <CheckSquare className="h-4 w-4" />
              <span>Tasks</span>
            </a>
          </SidebarMenuButton>
          
          <SidebarMenuButton 
            asChild
            className="w-full justify-start text-gray-700 hover:bg-gray-100 h-10 px-3 text-sm font-medium"
          >
            <a href="/reporting">
              <PieChart className="h-4 w-4" />
              <span>Reporting</span>
            </a>
          </SidebarMenuButton>
          
          <SidebarMenuButton 
            asChild
            className="w-full justify-start text-gray-700 hover:bg-gray-100 h-10 px-3 text-sm font-medium"
          >
            <a href="/users">
              <Users className="h-4 w-4" />
              <span>Users</span>
            </a>
          </SidebarMenuButton>
          
          <SidebarMenuButton 
            asChild
            className="w-full justify-start text-gray-700 hover:bg-gray-100 h-10 px-3 text-sm font-medium"
          >
            <a href="/support">
              <LifeBuoy className="h-4 w-4" />
              <span>Support</span>
            </a>
          </SidebarMenuButton>
          
          <SidebarMenuButton 
            asChild
            className="w-full justify-start text-gray-700 hover:bg-gray-100 h-10 px-3 text-sm font-medium"
          >
            <a href="/settings">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </a>
          </SidebarMenuButton>
        </nav>

        <div className="mt-4 mx-3 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <h3 className="text-sm font-medium">New features available!</h3>
              <p className="text-xs text-gray-500 mt-1">Check out the new dashboard view. Pages now load faster.</p>
            </div>
            <button className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Dismiss</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          </div>
          <div className="mt-4 flex gap-3">
            <button className="text-xs text-gray-600">Dismiss</button>
            <button className="text-xs text-purple-600 font-medium">What's new?</button>
          </div>
        </div>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-purple-100 text-purple-600">
              {profile?.email?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-700 truncate">
              {profile?.email?.split('@')[0]}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {profile?.email}
            </p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}