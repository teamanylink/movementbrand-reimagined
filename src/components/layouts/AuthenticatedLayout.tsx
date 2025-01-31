import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Globe, LogOut, Settings, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: userResponse, error: userError } = await supabase.auth.getUser();
  
      if (userError) {
        console.error("Error fetching user:", userError.message);
        return;
      }
  
      const user = userResponse?.user;
  
      if (user && user.email) {
        const username = user.email.split("@")[0];
        setUserEmail(username);
      } else {
        console.warn("No user or email found.");
      }
    };
  
    fetchUserProfile();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-white">
        {/* Desktop sidebar */}
        <div className="hidden md:block">
          <AppSidebar />
        </div>
        
        {/* Mobile sidebar */}
        <div className="md:hidden fixed inset-0 z-[60] bg-white transition-transform duration-300 transform translate-x-[-100%] data-[state=open]:translate-x-0">
          <AppSidebar />
        </div>
        
        <div className="flex-1">
          <nav className="bg-white border-b border-gray-200 h-[72px]">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex items-center gap-4">
                  <SidebarTrigger />
                  <div className="flex items-center">
                    <span className="text-black font-semibold">MovementBrand</span>
                    <span className="text-gray-400 mx-2">/</span>
                    <span className="text-gray-400">{userEmail || 'Loading...'}</span>
                  </div>
                </div>

                {/* <div className="flex items-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Avatar className="h-8 w-8 cursor-pointer">
                        <AvatarFallback className="bg-accent text-accent-foreground">
                          {userEmail?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={() => navigate('/dashboard/settings')} className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div> */}
              </div>
            </div>
          </nav>
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};