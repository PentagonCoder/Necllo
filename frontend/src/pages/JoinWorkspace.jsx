  import { useEffect, useState } from "react";
  import { useForm } from "react-hook-form";
  import { Link } from "react-router-dom";
  import { joinWorkspace } from "../services/workspaceService";
  import { useParams } from "react-router-dom";

  function JoinWorkspace() {

    const [message, setMessage] = useState([]);
    const [error, setError] = useState(null);
    const { invitationToken } = useParams();
    useEffect(() => {

      const fetchMyProjects = async () => {
        try {
          const response = await joinWorkspace(invitationToken);
          setMessage(response.data.message)
          console.log("You have join the workspace:", response.data.message);
        } catch (error) {
          setMessage(error.response?.data?.message || "Something went wrong");
          console.error("Error fetching my projects:", error);
        }
      };

      
      fetchMyProjects();
    }, []); 

    return (
      <div>

        {/* create project form */}
        
          <div> {message} </div>
      </div>
    );
  }

  export default JoinWorkspace;