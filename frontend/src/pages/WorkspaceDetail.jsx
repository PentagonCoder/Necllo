import { useEffect, useState } from "react";
import { getWorkspaceById } from "../services/workspaceService";
import { useParams } from "react-router-dom";
import ProjectList from "../components/ProjectList";
import InviteForm from "../components/InviteForm";

function WorkspaceDetail() {
  const [workspace, setWorkspace] = useState(null);
  const [error, setError] = useState(null);
  const { workspaceId } = useParams();

  useEffect(() => {
    const fetchWorkspace = async () => {
      try {
        const response = await getWorkspaceById(workspaceId);
        setWorkspace(response.data.workspace);
      } catch (error) {
        console.error("Error fetching workspace:", error);
        setError("Failed to load workspace");
      }
    };
    fetchWorkspace();
  }, [workspaceId]);

  return (
    <div className="min-h-screen bg-[#0F1115] px-6 py-10">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Workspace header */}
        <div className="bg-[#171A21] p-6 rounded-lg shadow-md border border-[#2A2E38]">
          <h1 className="text-2xl font-bold text-[#E8EAED]">{workspace?.name}</h1>
          <p className="text-sm text-[#8A8F9C] mt-2">{workspace?.description}</p>
          <p className="text-xs text-[#8A8F9C] mt-1">
            Owner: <span className="font-medium text-[#5B7FFF]">{workspace?.owner?.name}</span>
          </p>
          {error && (
            <div className="mt-3 text-red-400 text-sm bg-red-900/30 border border-red-700 rounded p-2">
              {error}
            </div>
          )}
        </div>

        {/* Project list */}
        <ProjectList workspaceId={workspaceId} />

        {/* Members */}
        <div className="bg-[#171A21] p-6 rounded-lg shadow-md border border-[#2A2E38]">
          <h2 className="text-lg font-semibold text-[#E8EAED] mb-4">Members</h2>
          {workspace?.members?.length ? (
            <ul className="space-y-2">
              {workspace.members.map((member) => (
                <li
                  key={member._id}
                  className="flex items-center justify-between bg-[#1C1F26] px-4 py-2 rounded border border-[#2A2E38] hover:border-[#5B7FFF]/50 transition"
                >
                  <span className="text-sm text-[#E8EAED]">{member.user.name}</span>
                  <span className="text-xs px-2 py-1 rounded bg-[#2A2E38] text-[#8A8F9C]">
                    {member.role}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-[#8A8F9C]">No members yet.</p>
          )}
        </div>

        {/* Invite form */}
        <InviteForm workspaceId={workspaceId} />
      </div>
    </div>
  );
}

export default WorkspaceDetail;
