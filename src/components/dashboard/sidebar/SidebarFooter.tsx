import { HelpCircle, Settings, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { SidebarMenuButton } from "@/components/ui/sidebar";

interface SidebarFooterProps {
  onSignOut: () => Promise<void>;
}

export const SidebarFooter = ({ onSignOut }: SidebarFooterProps) => {
  return (
    <>
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
        onClick={onSignOut}
        className="w-full hover:bg-red-50 text-red-600 hover:text-red-700 h-8"
      >
        <LogOut className="h-5 w-5" />
        <span>Sign Out</span>
      </SidebarMenuButton>
    </>
  );
};