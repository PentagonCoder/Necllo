  import { useEffect, useState } from "react";
  import { useForm } from "react-hook-form";
  import { Link } from "react-router-dom";
  import { inviteUser } from "../services/workspaceService";

  function InviteForm({ workspaceId }) {

    const [message, setMessage] = useState([]);
    const [error, setError] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const handleInviteUser = async (data) => {
      setError(null);
      try {
        const response = await inviteUser(workspaceId, data);
        setMessage(response?.data.message);
        console.log(response)
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || "Create project failed");
      }
    };
    

    return (
      <div>

        {/* create project form */}
        <form onSubmit={handleSubmit(handleInviteUser)}>
          <h1>Invite User</h1>
          <input
            type="email"
            placeholder="email"
            {...register("email")}
          />
          {errors?.email && <span>Name is required</span>}
          <br />

          <button type="submit">
            "send invitaion"
          </button>
        </form>

          <div> {message} </div>
      </div>
    );
  }

  export default InviteForm;