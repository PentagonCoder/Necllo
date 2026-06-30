import { useEffect, useState } from "react";
import { fetchProfile } from "../services/authService";
import { getMyWorkspaces, createWorkspace } from "../services/workspaceService";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function Dashboard() {
  const [userProfile, setUserProfile] = useState(null);
  const [workspaces, setWorkspaces] = useState([]);
  const [error, setError] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetchProfile();
        setUserProfile(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    const fetchMyWorkspaces = async () => {
      try {
        const response = await getMyWorkspaces();
        setWorkspaces(response.data.workspace);
      } catch (error) {
        console.error("Error fetching my workspaces:", error);
      }
    };

    fetchUserProfile();
    fetchMyWorkspaces();
  }, []);

  const handleCreateWorkspace = async (data) => {
    setError(null);
    try {
      const response = await createWorkspace(data);
      setWorkspaces((prev) => [...prev, response.data.workspace]);
    } catch (err) {
      setError(err.response?.data?.message || "Create workspace failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#0F1115] px-6 py-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-mono tracking-widest text-[#5B7FFF] uppercase mb-2">
            Dashboard
          </p>
          <h1 className="text-2xl font-semibold text-[#E8EAED]">
            {userProfile?.message || "Welcome back"}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-8">
          {/* Workspace list */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-medium text-[#8A8F9C] uppercase tracking-wide">
                Your workspaces
              </h2>
              <span className="text-xs font-mono text-[#8A8F9C]">
                {workspaces.length}
              </span>
            </div>

            {workspaces.length === 0 ? (
              <div className="border border-dashed border-[#2A2E38] rounded-lg p-8 text-center">
                <p className="text-sm text-[#8A8F9C]">
                  No workspaces yet. Create one to get started.
                </p>
              </div>
            ) : (
              <ul className="space-y-2">
                {workspaces.map((workspace) => (
                  <li key={workspace._id}>
                    <Link
                      to={`/workspace/${workspace._id}`}
                      className="group flex items-center justify-between bg-[#171A21] border border-[#2A2E38] hover:border-[#5B7FFF]/50 rounded-lg px-4 py-3 transition"
                    >
                      <span className="text-sm font-medium text-[#E8EAED] group-hover:text-[#5B7FFF] transition">
                        {workspace.name}
                      </span>
                      <span className="text-[#8A8F9C] group-hover:text-[#5B7FFF] transition">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Create workspace form */}
          <div>
            <h2 className="text-sm font-medium text-[#8A8F9C] uppercase tracking-wide mb-4">
              New workspace
            </h2>
            <form
              onSubmit={handleSubmit(handleCreateWorkspace)}
              className="bg-[#171A21] border border-[#2A2E38] rounded-lg p-5 space-y-3"
            >
              <div>
                <input
                  type="text"
                  placeholder="Workspace name"
                  {...register("name", { required: true })}
                  className="w-full bg-[#0F1115] border border-[#2A2E38] rounded-md px-3 py-2 text-[#E8EAED] text-sm placeholder:text-[#8A8F9C] focus:outline-none focus:ring-2 focus:ring-[#5B7FFF] focus:border-transparent transition"
                />
                {errors?.name && (
                  <p className="text-xs text-red-400 mt-1.5">Name is required</p>
                )}
              </div>

              <div>
                <textarea
                  placeholder="Description (optional)"
                  {...register("description")}
                  rows={2}
                  className="w-full bg-[#0F1115] border border-[#2A2E38] rounded-md px-3 py-2 text-[#E8EAED] text-sm placeholder:text-[#8A8F9C] focus:outline-none focus:ring-2 focus:ring-[#5B7FFF] focus:border-transparent transition resize-none"
                />
              </div>

              {error && (
                <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-md px-3 py-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-[#5B7FFF] hover:bg-[#4A6EEE] text-white text-sm font-medium rounded-md py-2.5 transition"
              >
                Create workspace
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;