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

  return (
    <div className="min-h-screen bg-[#0F1115] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <p className="text-xs font-mono tracking-widest text-[#5B7FFF] uppercase mb-2">
            Necllo
          </p>
          <h1 className="text-2xl font-semibold text-[#E8EAED]">
            Create your account
          </h1>
        </div>

        <form
          onSubmit={handleSubmit(handleRegister)}
          className="bg-[#171A21] border border-[#2A2E38] rounded-lg p-6 space-y-4"
        >
          <div>
            <label className="block text-xs font-medium text-[#8A8F9C] mb-1.5">
              Full name
            </label>
            <input
              type="text"
              placeholder="Harsh Sharma"
              {...register("fullname", { required: true })}
              className="w-full bg-[#0F1115] border border-[#2A2E38] rounded-md px-3 py-2 text-[#E8EAED] text-sm placeholder:text-[#8A8F9C] focus:outline-none focus:ring-2 focus:ring-[#5B7FFF] focus:border-transparent transition"
            />
            {errors.fullname && (
              <p className="text-xs text-red-400 mt-1.5">Full name is required</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-[#8A8F9C] mb-1.5">
              Email
            </label>
            <input
              type="email"
              placeholder="you@company.com"
              {...register("email", { required: true })}
              className="w-full bg-[#0F1115] border border-[#2A2E38] rounded-md px-3 py-2 text-[#E8EAED] text-sm placeholder:text-[#8A8F9C] focus:outline-none focus:ring-2 focus:ring-[#5B7FFF] focus:border-transparent transition"
            />
            {errors.email && (
              <p className="text-xs text-red-400 mt-1.5">Email is required</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-[#8A8F9C] mb-1.5">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              {...register("password", { required: true })}
              className="w-full bg-[#0F1115] border border-[#2A2E38] rounded-md px-3 py-2 text-[#E8EAED] text-sm placeholder:text-[#8A8F9C] focus:outline-none focus:ring-2 focus:ring-[#5B7FFF] focus:border-transparent transition"
            />
            {errors.password && (
              <p className="text-xs text-red-400 mt-1.5">Password is required</p>
            )}
          </div>

          {error && (
            <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-md px-3 py-2">
              {error}
            </p>
          )}

          {message && (
            <p className="text-xs text-green-400 bg-green-400/10 border border-green-400/20 rounded-md px-3 py-2">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#5B7FFF] hover:bg-[#4A6EEE] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-md py-2.5 transition"
          >
            {loading ? "Creating account…" : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;