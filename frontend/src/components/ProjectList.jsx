  import { useEffect, useState } from "react";
  import api from "../api/axios";
  import { useForm } from "react-hook-form";
  import { Link } from "react-router-dom";
  import { createProject, getMyProjects } from "../services/projectService";

  function ProjectList({ workspaceId }) {
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {

      const fetchMyProjects = async () => {
        try {
          const response = await getMyProjects(workspaceId);
          setProjects(response.data.project);
          console.log("My projects fetched:", response.data.project);
        } catch (error) {
          console.error("Error fetching my projects:", error);
        }
      };

      
      fetchMyProjects();
    }, [workspaceId]);
    
    const handleCreateProject = async (data) => {
      setError(null);
      try {
        const response = await createProject(workspaceId, data);
        setProjects((prev) => [...prev, response.data.project]);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || "Create project failed");
      }
    };
    

    return (
      <div>

        {/* create project form */}
        <form onSubmit={handleSubmit(handleCreateProject)}>
          <h1>Create Project</h1>
          <input
            type="name"
            placeholder="name"
            {...register("name")}
          />
          {errors?.name && <span>Name is required</span>}
          <br />
          <input
            type="description"
            placeholder="Description"
            {...register("description")}
          />
          {errors?.description && <span>Description is required</span>}
          <button type="submit">
            "Create Project"
          </button>
        </form>

          <div>
            <ul>
              {projects.map((project) => (
                <li key={project._id}>
                  <Link to={`/workspace/${workspaceId}/project/${project._id}`}>
                    {project.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
      </div>
    );
  }

  

  export default ProjectList;


  