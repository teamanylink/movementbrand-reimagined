import { LayoutDashboard, FolderKanban } from "lucide-react";
import { Link } from "react-router-dom";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

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
];

export const SidebarMainMenu = () => {
  return (
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
  );
};