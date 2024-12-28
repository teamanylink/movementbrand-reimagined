import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Globe, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          // First try to get the existing profile
          const { data: profile } = await supabase
            .from('profiles')
            .select('email')
            .eq('id', user.id)
            .maybeSingle();
          
          if (!profile) {
            // If profile doesn't exist, create it
            const { error: insertError } = await supabase
              .from('profiles')
              .insert({
                id: user.id,
                email: user.email
              });

            if (insertError) {
              console.error('Error creating profile:', insertError);
              return;
            }
            
            if (user.email) {
              const username = user.email.split('@')[0];
              setUserEmail(username);
            }
          } else if (profile.email) {
            const username = profile.email.split('@')[0];
            setUserEmail(username);
          }
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load user profile",
        });
      }
    };

    fetchUserProfile();
  }, [toast]);

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
        <AppSidebar />
        <div className="flex-1">
          {/* Top Navigation Bar */}
          <nav className="bg-white border-gray-800 h-[72px]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex items-center">
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