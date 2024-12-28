import { User, Settings, MessageCircle, Video, Palette, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SettingsNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navigationItems = [
  { id: "profile", label: "Profile", icon: User },
  { id: "account", label: "Account", icon: Settings },
  { id: "chat", label: "Chat", icon: MessageCircle },
  { id: "voice", label: "Voice & video", icon: Video },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "notification", label: "Notification", icon: Bell },
];

export function SettingsNavigation({ activeSection, onSectionChange }: SettingsNavigationProps) {
  return (
    <nav className="w-64 space-y-1">
      {navigationItems.map((item) => {
        const Icon = item.icon;
        return (
          <Button
            key={item.id}
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3 h-11",
              activeSection === item.id && "bg-accent text-accent-foreground"
            )}
            onClick={() => onSectionChange(item.id)}
          >
            <Icon className="h-5 w-5" />
            {item.label}
          </Button>
        );
      })}
    </nav>
  );
}