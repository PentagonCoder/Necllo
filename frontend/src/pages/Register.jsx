import { useForm } from "react-hook-form";
import { useState } from "react";
import { registerRequest } from "../services/authService";


function Register() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
 

  const handleRegister = async (data) => {
    setLoading(true);
    setError(null);
    setMessage(null);
    
    try {
      const res = await registerRequest(data);
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };


  if(loading) {
    return <span>Registering...</span>
  }
  
  if(error) {
    return <span>{error}</span>
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleRegister)}>
        <h1>Register Page</h1>
        <input
          type="fullname"
          placeholder="Full Name"
          {...register("fullname")}
          />
        {errors.fullname && <span>Full Name is required</span>}
        <br />
        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          />
        {errors.email && <span>Email is required</span>}
        <br />
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          />
        {errors.password && <span>Password is required</span>}
        
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      <div> {message} </div>
    </>
  );
}

export default Register;

