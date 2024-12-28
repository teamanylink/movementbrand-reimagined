import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarFooter,
  SidebarSeparator
} from "@/components/ui/sidebar";
import { SidebarMainMenu } from "./sidebar/SidebarMainMenu";
import { SidebarProjectsList } from "./sidebar/SidebarProjectsList";
import { SidebarFooter as SidebarFooterContent } from "./sidebar/SidebarFooter";

const fetchUserProjects = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error('No session');
  
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export function AppSidebar() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: projects } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchUserProjects,
    retry: false
  });

  const handleSignOut = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/");
        return;
      }

      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out error:', error);
        if (error.message.includes('session_not_found')) {
          navigate("/");
          return;
        }
        throw error;
      }

      toast({
        title: "Signed out successfully",
        description: "You have been logged out of your account.",
      });
      navigate("/");
    } catch (error) {
      console.error('Sign out error:', error);
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: "There was a problem signing you out. Please try again.",
      });
    }
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <h2 className="text-xl font-semibold">MovementBrand</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMainMenu />
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarProjectsList projects={projects} />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-1 space-y-0.5">
        <SidebarFooterContent onSignOut={handleSignOut} />
      </SidebarFooter>
    </Sidebar>
  );
}