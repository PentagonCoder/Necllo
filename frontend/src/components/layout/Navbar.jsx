// import { useAuth } from "../../hooks/useAuth";

// function Navbar() {
//   const { handleLogout, loading, error } = useAuth();

//   return (
//     <div>
//       {error && <span style={{ color: "red" }}>{error}</span>}
//       <button onClick={handleLogout} disabled={loading}>
//         {loading ? "Logging out..." : "Logout"}
//       </button>
//     </div>
//   );
// }

// export default Navbar;

// Navbar.jsx
import { useAuth } from "../../hooks/useAuth";

function Navbar() {
  const { handleLogout, loading, error } = useAuth();

  return (
    <header className="h-14 border-b border-[#2A2E38] bg-[#0F1115] flex items-center justify-end px-6 gap-3">
      {error && (
        <span className="text-xs text-red-400">{error}</span>
      )}
      <button
        onClick={handleLogout}
        disabled={loading}
        className="text-sm font-medium text-[#8A8F9C] hover:text-[#E8EAED] disabled:opacity-50 transition"
      >
        {loading ? "Logging out…" : "Log out"}
      </button>
    </header>
  );
}

export default Navbar;