import { UserMenu } from "./UserMenu";

interface TopNavigationProps {
  userEmail: string | null;
  onSignOut: () => Promise<void>;
}

export const TopNavigation = ({ userEmail, onSignOut }: TopNavigationProps) => {
  return (
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
          <UserMenu userEmail={userEmail} onSignOut={onSignOut} />
        </div>
      </div>
    </nav>
  );
};