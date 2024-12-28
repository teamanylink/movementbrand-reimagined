import { Settings2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";

export default function Settings() {
  const navigate = useNavigate();

  const settingsItems = [
    {
      title: "Profile",
      description: "Manage your personal information",
      icon: Settings2,
      path: "/dashboard/settings/profile"
    },
    {
      title: "Account",
      description: "Update your account settings",
      icon: Settings2,
      path: "/dashboard/settings/account"
    },
    {
      title: "Notifications",
      description: "Configure your notification preferences",
      icon: Settings2,
      path: "/dashboard/settings/notifications"
    },
    {
      title: "Billing",
      description: "Manage your subscription and billing",
      icon: Settings2,
      path: "/dashboard/settings/billing"
    },
    {
      title: "Security",
      description: "Update your security settings",
      icon: Settings2,
      path: "/dashboard/settings/security"
    },
    {
      title: "Integrations",
      description: "Manage your connected services",
      icon: Settings2,
      path: "/dashboard/settings/integrations"
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-500">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {settingsItems.map((item) => (
          <Card
            key={item.title}
            className="p-6 hover:shadow-lg transition-shadow cursor-pointer bg-white"
            onClick={() => navigate(item.path)}
          >
            <div className="flex items-start space-x-4">
              <div className="p-2 rounded-lg bg-blue-50">
                <item.icon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{item.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}