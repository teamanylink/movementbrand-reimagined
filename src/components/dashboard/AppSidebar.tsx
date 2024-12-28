import { 
  LayoutDashboard, 
  FolderKanban,
  Settings,
  LogOut,
  HelpCircle,
  Plus
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import { useQuery } from "@tanstack/react-query"

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
  const { data: projects } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchUserProjects
  })

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of your account.",
      })
      navigate("/")
    } catch (error) {
      console.error('Sign out error:', error)
      toast({
        title: "Error signing out",
        description: "Please try again later.",
        variant: "destructive"
      })
    }
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
          <Link to="/help">
            <HelpCircle className="h-5 w-5" />
            <span>Help & Support</span>
            <span className="ml-auto bg-green-100 text-green-800 px-2 py-0.5 text-xs rounded-full">8</span>
          </Link>
        </SidebarMenuButton>
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