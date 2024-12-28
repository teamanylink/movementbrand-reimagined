import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Globe, LogOut, Settings, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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

export const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userEmail, setUserEmail] = useState<string | null>(null);

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

  const getUserInitials = (email: string | null) => {
    if (!email) return '';
    return email.charAt(0).toUpperCase();
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-white">
        <div className="hidden md:block">
          <AppSidebar />
        </div>
        <div className="flex-1">
          <nav className="bg-white border-gray-800 h-[72px]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex items-center gap-4">
                  <Sheet>
                    <SheetTrigger asChild className="md:hidden">
                      <Button variant="ghost" size="icon">
                        <Menu className="h-5 w-5" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent 
                      side="left" 
                      className="p-0 w-72 block"
                      style={{ position: 'fixed', top: 0, bottom: 0, left: 0 }}
                    >
                      <div className="h-full overflow-y-auto bg-white">
                        <AppSidebar />
                      </div>
                    </SheetContent>
                  </Sheet>
                  <div className="flex items-center">
                    <span className="text-black font-semibold">MovementBrand</span>
                    <span className="text-gray-400 mx-2">/</span>
                    <span className="text-gray-400">{userEmail || 'Loading...'}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-gray-400 hover:bg-gray-800 hover:text-white"
                  >
                    <Globe className="h-5 w-5" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Avatar className="h-8 w-8 cursor-pointer">
                        <AvatarFallback className="bg-accent text-accent-foreground">
                          {getUserInitials(userEmail)}
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
                </div>
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