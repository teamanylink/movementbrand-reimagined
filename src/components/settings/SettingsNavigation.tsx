import { Button } from "@/components/ui/button";

interface SettingsNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function SettingsNavigation({ activeSection, onSectionChange }: SettingsNavigationProps) {
  return (
    <nav className="mb-8 border-b border-gray-200">
      <div className="flex space-x-4 -mb-px">
        <Button
          variant="ghost"
          onClick={() => onSectionChange("profile")}
          className={`px-4 py-2 font-medium text-sm rounded-none border-b-2 hover:bg-transparent ${
            activeSection === "profile"
              ? "border-primary text-primary"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          Profile
        </Button>
        <Button
          variant="ghost"
          onClick={() => onSectionChange("account")}
          className={`px-4 py-2 font-medium text-sm rounded-none border-b-2 hover:bg-transparent ${
            activeSection === "account"
              ? "border-primary text-primary"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          Account
        </Button>
      </div>
    </nav>
  );
}