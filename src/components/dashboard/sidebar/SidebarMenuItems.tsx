import { LayoutDashboard, FolderKanban, Users } from "lucide-react"
import { Link } from "react-router-dom"
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"

interface SidebarMenuItemsProps {
  isSuperAdmin: boolean;
}

export const SidebarMenuItems = ({ isSuperAdmin }: SidebarMenuItemsProps) => {
  const mainMenuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      url: "/dashboard",
      showForAdmin: false
    },
    {
      title: "Projects",
      icon: FolderKanban,
      url: "/project",
      showForAdmin: false
    },
    {
      title: "Admin",
      icon: Users,
      url: "/admin",
      showForAdmin: true
    },
  ]

  const filteredMenuItems = mainMenuItems.filter(item => 
    isSuperAdmin ? item.showForAdmin : !item.showForAdmin
  )

  return (
    <SidebarMenu>
      {filteredMenuItems.map((item) => (
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
  )
}