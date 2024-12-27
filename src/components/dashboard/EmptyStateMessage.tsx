import { Plus } from "lucide-react";

export const EmptyStateMessage = () => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-gray-50/50 rounded-lg">
      <div className="flex flex-col items-center space-y-4 -translate-y-12">
        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-2">
          <Plus className="h-6 w-6 text-accent" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-700">Start Your First Project!</h3>
        <p className="text-gray-500 max-w-md">
          Click the "Add Task" button above to begin your journey with MovementBrand.
        </p>
      </div>
    </div>
  );
};