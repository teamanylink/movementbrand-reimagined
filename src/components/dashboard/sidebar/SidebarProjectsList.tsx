import { Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { Tables } from "@/integrations/supabase/types";

type Project = Tables<"projects">;

interface SidebarProjectsListProps {
  projects?: Project[];
}

export const SidebarProjectsList = ({ projects }: SidebarProjectsListProps) => {
  const navigate = useNavigate();

  const getProjectColor = (index: number) => {
    const colors = ['bg-purple-100', 'bg-green-100', 'bg-blue-100', 'bg-yellow-100', 'bg-red-100'];
    return colors[index % colors.length];
  };

  return (
    <>
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
    </>
  );
};