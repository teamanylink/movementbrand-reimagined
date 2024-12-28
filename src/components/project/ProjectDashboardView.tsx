import { ProjectTasks } from "./ProjectTasks";
import { ProjectHistory } from "./ProjectHistory";
import { ProjectDetails } from "./ProjectDetails";

export const ProjectDashboardView = ({ projectId }: { projectId: string }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
      {/* Left Column - Tasks */}
      <div className="lg:col-span-8 space-y-4 md:space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
          <ProjectTasks projectId={projectId} />
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
          <ProjectHistory projectId={projectId} />
        </div>
      </div>

      {/* Right Column - Project Details */}
      <div className="lg:col-span-4">
        <ProjectDetails projectId={projectId} />
      </div>
    </div>
  );
};