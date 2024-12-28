import { Button } from "@/components/ui/button";
import { Plus, Share2 } from "lucide-react";
import { useSubscription } from "@/hooks/use-subscription";
import { useToast } from "@/components/ui/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface DashboardHeaderProps {
  onNewProject: () => void;
}

export const DashboardHeader = ({ onNewProject }: DashboardHeaderProps) => {
  const { data: subscriptionData } = useSubscription();
  const { toast } = useToast();

  const handleNewProjectClick = () => {
    if (!subscriptionData?.subscribed) {
      toast({
        title: "Subscription Required",
        description: "Please upgrade your account to create new projects.",
        variant: "destructive",
      });
      return;
    }
    onNewProject();
  };

  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">Welcome to your dashboard</p>
      </div>
      <div className="flex space-x-4">
        <Button variant="outline" className="flex items-center gap-2">
          <Share2 className="h-4 w-4" />
          Share
        </Button>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <Button 
                  variant="default"
                  size="sm"
                  className="flex items-center gap-2 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:opacity-90 transition-opacity"
                  onClick={handleNewProjectClick}
                  disabled={!subscriptionData?.subscribed}
                >
                  <Plus className="h-4 w-4" />
                  New Project
                </Button>
              </span>
            </TooltipTrigger>
            {!subscriptionData?.subscribed && (
              <TooltipContent>
                <p>Upgrade your account to create projects</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};