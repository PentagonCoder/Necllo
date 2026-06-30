// import { Link } from 'react-router-dom';

// function Sidebar() {
//   return (
//     <div>
//       <span>Sidebar</span>
//       <Link to="/">Dashboard</Link>
//       <Link to="/members">Members</Link>
//       <Link to="/settings">Settings</Link>
//     </div>
//   );
// }

// export default Sidebar;

// Sidebar.jsx
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const links = [
    { to: "/", label: "Dashboard" },
    { to: "/members", label: "Members" },
    { to: "/settings", label: "Settings" },
  ];

  return (
    <aside className="w-56 min-h-screen bg-[#171A21] border-r border-[#2A2E38] flex flex-col">
      <div className="px-5 py-5 border-b border-[#2A2E38]">
        <p className="text-xs font-mono tracking-widest text-[#5B7FFF] uppercase">
          Necllo
        </p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map((link) => {
          const isActive = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`block px-3 py-2 rounded-md text-sm font-medium transition ${
                isActive
                  ? "bg-[#5B7FFF]/10 text-[#5B7FFF]"
                  : "text-[#8A8F9C] hover:text-[#E8EAED] hover:bg-[#0F1115]"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;