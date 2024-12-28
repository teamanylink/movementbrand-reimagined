import { ProjectTasks } from "./ProjectTasks";
import { ProjectHistory } from "./ProjectHistory";
import { ProjectDetails } from "./ProjectDetails";

export const ProjectDashboardView = ({ projectId }: { projectId: string }) => {
  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Left Column - Tasks */}
      <div className="col-span-8">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <ProjectTasks projectId={projectId} />
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <ProjectHistory projectId={projectId} />
        </div>
      </div>

      {/* Right Column - Project Details */}
      <div className="col-span-4">
        <ProjectDetails projectId={projectId} />
      </div>
    </div>
  );
};