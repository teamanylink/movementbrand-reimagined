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
  const { data: projects } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data
    }
  })

  const { data: subscriptionData } = useSubscription()

  const handleNewProjectClick = () => {
    if (!subscriptionData?.subscribed) {
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
      <SidebarGroupLabel className="flex justify-between items-center px-4 py-2">
        <span>Projects</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="h-6 w-6"
                onClick={handleNewProjectClick}
                disabled={!subscriptionData?.subscribed}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            {!subscriptionData?.subscribed && (
              <TooltipContent>
                <p>Upgrade your account to create projects</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
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
  )
}