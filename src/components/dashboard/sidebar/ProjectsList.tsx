import { Plus } from "lucide-react"
import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { useSubscription } from "@/hooks/use-subscription"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"

export const ProjectsList = () => {
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

  const { data: projects } = useQuery({
    queryKey: ['projects', profile?.is_superadmin],
    queryFn: async () => {
      // If superadmin, fetch all projects, otherwise only user's projects
      const query = supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (!profile?.is_superadmin) {
        query.eq('user_id', profile?.id)
      }

      const { data, error } = await query
      
      if (error) throw error
      return data
    },
    enabled: !!profile,
  })

  const { data: subscriptionData } = useSubscription()

  const handleNewProjectClick = () => {
    if (!subscriptionData?.subscribed && !profile?.is_superadmin) {
      toast({
        title: "Subscription Required",
        description: "Please upgrade your account to create projects.",
        variant: "destructive",
      })
      return
    }
  }

  const getProjectColor = (index: number) => {
    const colors = ['bg-purple-100', 'bg-green-100', 'bg-blue-100', 'bg-yellow-100', 'bg-red-100']
    return colors[index % colors.length]
  }

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {projects?.map((project, index) => (
            <SidebarMenuItem key={project.id}>
              <SidebarMenuButton 
                asChild
                className="hover:bg-gray-100 h-10 px-3 text-sm font-medium text-gray-700"
              >
                <Link to={`/project/${project.id}`} className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${getProjectColor(index)}`} />
                  <span>{project.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}