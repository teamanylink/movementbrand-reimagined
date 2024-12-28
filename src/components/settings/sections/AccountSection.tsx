import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function AccountSection() {
  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Account Settings</h2>
        
        <div className="space-y-2">
          <Label>Password</Label>
          <Button variant="secondary" className="w-auto">
            Change password
          </Button>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Privacy Settings</h3>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>New friend</Label>
              <p className="text-sm text-muted-foreground">
                Let your friend find your account
              </p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Channel's friend</Label>
              <p className="text-sm text-muted-foreground">
                Let your friend add you from channel
              </p>
            </div>
            <Switch />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Account Management</h3>
          
          <div className="space-y-2">
            <Label>Remove Account</Label>
            <p className="text-sm text-muted-foreground">
              You can "Disable account" to take a break.
            </p>
            <div className="flex gap-4">
              <Button variant="destructive">Disable account</Button>
              <Button variant="ghost" className="text-destructive hover:text-destructive">
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}