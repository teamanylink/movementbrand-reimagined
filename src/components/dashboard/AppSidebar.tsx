import React, { useState } from 'react';
import { LogOut, Search, Home, FolderKanban, CheckSquare, Settings, ChevronDown, MessageSquare } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import { useQuery } from "@tanstack/react-query"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

import { ProjectsList } from "./sidebar/ProjectsList"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function AppSidebar() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [isProjectsOpen, setIsProjectsOpen] = useState(false)

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
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2 px-2">
          <div>
            <img 
              src="/lovable-uploads/06ebdf7c-e118-4380-b69a-9fcb3a5a21ff.png" 
              alt="MovementBrand Logo" 
              className="h-10 w-10 object-contain"
            />
          </div>
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
            <a href={profile?.is_superadmin ? "/admin" : "/dashboard"}>
              <Home className="h-4 w-4" />
              <span>{profile?.is_superadmin ? "Admin Dashboard" : "Home"}</span>
            </a>
          </SidebarMenuButton>
          
          <div>
            <SidebarMenuButton 
              onClick={() => setIsProjectsOpen(!isProjectsOpen)}
              className="w-full justify-between text-gray-700 hover:bg-gray-100 h-10 px-3 text-sm font-medium group"
            >
              <div className="flex items-center">
                <FolderKanban className="h-4 w-4 mr-2" />
                <span>Projects</span>
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform ${isProjectsOpen ? 'rotate-180' : ''}`} />
            </SidebarMenuButton>
            
            {isProjectsOpen && (
              <div className="mt-1">
                <ProjectsList />
              </div>
            )}
          </div>
          
          <SidebarMenuButton 
            asChild
            className="w-full justify-start text-gray-700 hover:bg-gray-100 h-10 px-3 text-sm font-medium"
          >
            <a href="/chat">
              <MessageSquare className="h-4 w-4" />
              <span>Chat</span>
            </a>
          </SidebarMenuButton>
          
          <SidebarMenuButton 
            asChild
            className="w-full justify-start text-gray-700 hover:bg-gray-100 h-10 px-3 text-sm font-medium"
          >
            <a href="/dashboard/settings">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </a>
          </SidebarMenuButton>
        </nav>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        <div className="flex items-center justify-between">
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
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSignOut}
            className="h-9 w-9 text-gray-500 hover:text-black hover:bg-primary/20"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}