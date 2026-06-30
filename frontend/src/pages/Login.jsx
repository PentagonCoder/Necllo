import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { handleLogin, loading, error } = useAuth();

  return (
    <div className="min-h-screen bg-[#0F1115] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <p className="text-xs font-mono tracking-widest text-[#5B7FFF] uppercase mb-2">
            Necllo
          </p>
          <h1 className="text-2xl font-semibold text-[#E8EAED]">
            Sign in to your workspace
          </h1>
        </div>

        <form
          onSubmit={handleSubmit(handleLogin)}
          className="bg-[#171A21] border border-[#2A2E38] rounded-lg p-6 space-y-4"
        >
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#5B7FFF] hover:bg-[#4A6EEE] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-md py-2.5 transition"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
