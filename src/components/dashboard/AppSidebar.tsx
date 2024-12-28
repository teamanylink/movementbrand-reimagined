import { 
  LayoutDashboard, 
  FolderKanban,
  Settings,
  LogOut,
  Plus,
  Users
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarFooter,
  SidebarSeparator
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

const mainMenuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/dashboard",
  },
  {
    title: "Projects",
    icon: FolderKanban,
    url: "/project",
  },
]

const fetchUserProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

export function AppSidebar() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [isSuperAdmin, setIsSuperAdmin] = useState(false)
  const { data: projects } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchUserProjects
  })

  useEffect(() => {
    const checkSuperAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('is_superadmin')
          .eq('id', user.id)
          .single()
        
        setIsSuperAdmin(profile?.is_superadmin || false)
      }
    }

    checkSuperAdmin()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    toast({
      title: "Signed out successfully",
      description: "You have been logged out of your account.",
    })
    navigate("/")
  }

  const getProjectColor = (index: number) => {
    const colors = ['bg-purple-100', 'bg-green-100', 'bg-blue-100', 'bg-yellow-100', 'bg-red-100']
    return colors[index % colors.length]
  }

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <h2 className="text-xl font-semibold">MovementBrand</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    className="hover:bg-blue-50 h-12 data-[active=true]:bg-blue-100 data-[active=true]:text-blue-600"
                  >
                    <Link to={item.url}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              {isSuperAdmin && (
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild
                    className="hover:bg-blue-50 h-12 data-[active=true]:bg-blue-100 data-[active=true]:text-blue-600"
                  >
                    <Link to="/dashboard/admin">
                      <Users className="h-5 w-5" />
                      <span>Admin</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel className="flex justify-between items-center px-4 py-2">
            <span>Projects</span>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-6 w-6"
              onClick={() => navigate('/project')}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {projects?.map((project, index) => (
                <SidebarMenuItem key={project.id}>
                  <SidebarMenuButton 
                    asChild
                    className="hover:bg-blue-50 h-10 data-[active=true]:bg-blue-100 data-[active=true]:text-blue-600"
                  >
                    <Link to={`/project/${project.id}`}>
                      <div className={`h-2 w-2 rounded-full ${getProjectColor(index)}`} />
                      <span>{project.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-1 space-y-0.5">
        <SidebarMenuButton 
          asChild
          className="hover:bg-blue-50 h-8 data-[active=true]:bg-blue-100 data-[active=true]:text-blue-600"
        >
          <Link to="/dashboard/settings">
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>
        </SidebarMenuButton>
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