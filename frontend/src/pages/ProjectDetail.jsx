import { useEffect, useState } from "react";
import {getProjectById} from "../services/projectService";
import { useParams } from "react-router-dom";

function ProjectDetail() {
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);
  const { workspaceId, projectId } = useParams();

  useEffect(() => {

    const fetchProject = async () => {
      try {
        const response = await getProjectById(workspaceId, projectId);
        setProject(response.data.project);
      } catch (error) {
        console.error("Error fetching project:", error);
        setError("Failed to load project");
      }
    };

    fetchProject();
  }, [workspaceId, projectId]);

  return (
    <div>
      <h1>{project?.name}</h1>
      <p>{project?.description}</p>
    </div>
  );
}

export default ProjectDetail; 

  