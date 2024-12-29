import { Button } from "@/components/ui/button";
import { Loader2, Zap } from "lucide-react";

interface SubscriptionBannerProps {
  onUpgrade: () => void;
  isUpgrading: boolean;
}

export const SubscriptionBanner = ({ onUpgrade, isUpgrading }: SubscriptionBannerProps) => {
  return (
    <div className="p-4 md:p-6 bg-gray-50 rounded-lg space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="text-lg font-medium">Upgrade Your Account</h3>
          <p className="text-sm text-muted-foreground">
            Unlock the ability to create unlimited projects
          </p>
        </div>
        <Button
          onClick={onUpgrade}
          disabled={isUpgrading}
          className="bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:from-purple-600 hover:to-purple-800"
        >
          {isUpgrading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <Zap className="h-4 w-4 mr-2" />
              Upgrade Now
            </>
          )}
        </Button>
      </div>
    </div>
  );
};