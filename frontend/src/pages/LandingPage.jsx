// LandingPage.jsx
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0F1115] text-[#E8EAED] flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-[#2A2E38] sticky top-0 bg-[#0F1115]/95 backdrop-blur-sm z-50">
        <span className="font-mono text-xs tracking-[0.12em] uppercase text-[#5B7FFF]">
          Necllo
        </span>
        <div className="flex items-center gap-6">
          <a href="#features" className="text-sm text-[#8A8F9C] hover:text-[#E8EAED] transition">
            Features
          </a>
          <a href="#how" className="text-sm text-[#8A8F9C] hover:text-[#E8EAED] transition">
            How it works
          </a>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm text-[#8A8F9C] hover:text-[#E8EAED] transition px-4 py-2"
          >
            Sign in
          </Link>
          <Link
            to="/register"
            className="text-sm font-medium bg-gradient-to-r from-[#5B7FFF] to-[#4A6EEE] text-white px-4 py-2 rounded-md shadow-md hover:opacity-90 transition-transform hover:scale-105"
          >
            Get started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24">
        <span className="inline-block mb-5 text-[11px] font-mono tracking-[0.15em] uppercase text-[#5B7FFF] px-3 py-1.5 border border-[#5B7FFF30] rounded bg-[#5B7FFF0D]">
          Multi-tenant workspace tool
        </span>
        <h1 className="text-[48px] font-bold leading-tight tracking-tight mb-5">
          Organize your team’s work,{" "}
          <span className="bg-gradient-to-r from-[#5B7FFF] to-[#4A6EEE] bg-clip-text text-transparent">
            without the noise
          </span>
        </h1>
        <p className="text-[16px] text-[#8A8F9C] leading-relaxed max-w-xl mx-auto mb-8">
          Necllo brings workspaces, projects, and tasks together — built for
          teams that care about structure and clarity.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Link
            to="/register"
            className="text-sm font-medium bg-gradient-to-r from-[#5B7FFF] to-[#4A6EEE] text-white px-6 py-2.5 rounded-md shadow-md hover:opacity-90 transition-transform hover:scale-105"
          >
            Start for free
          </Link>
          <Link
            to="/login"
            className="text-sm text-[#8A8F9C] hover:text-[#E8EAED] border border-[#2A2E38] hover:border-[#5B7FFF50] px-6 py-2.5 rounded-md transition"
          >
            Sign in to workspace
          </Link>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-5xl mx-auto px-6 py-24">
        <p className="text-[11px] font-mono tracking-[0.12em] uppercase text-[#5B7FFF] mb-3">
          Features
        </p>
        <h2 className="text-3xl font-semibold mb-2 tracking-tight">
          Everything your team needs
        </h2>
        <p className="text-sm text-[#8A8F9C] leading-relaxed mb-10">
          Built for structured, multi-tenant collaboration — not bolted onto a
          single-user tool.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: "📂",
              title: "Workspaces",
              desc: "Separate environments for every team or client. Invite members with role-based access.",
            },
            {
              icon: "📌",
              title: "Projects",
              desc: "Group related work under projects, scoped to their workspace. Track progress easily.",
            },
            {
              icon: "✅",
              title: "Tasks",
              desc: "Assign, prioritize, and complete tasks with full context. Keep everyone aligned.",
            },
            {
              icon: "✉️",
              title: "Invitations",
              desc: "Invite teammates by email. Roles enforced, tokens expire, access is workspace-scoped.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="bg-[#171A21] border border-[#2A2E38] rounded-xl p-6 hover:border-[#5B7FFF]/40 transition"
            >
              <div className="w-10 h-10 rounded-md bg-[#5B7FFF15] border border-[#5B7FFF30] flex items-center justify-center text-lg mb-4">
                {f.icon}
              </div>
              <p className="text-base font-medium mb-1">{f.title}</p>
              <p className="text-sm text-[#8A8F9C] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <div className="border border-[#2A2E38] rounded-xl p-12 text-center bg-[#171A21]">
          <h2 className="text-2xl font-semibold mb-3 tracking-tight">
            Ready to bring your team together?
          </h2>
          <p className="text-sm text-[#8A8F9C] mb-7">
            Start free, no credit card required. Your first workspace is ready
            in under two minutes.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link
              to="/register"
              className="text-sm font-medium bg-gradient-to-r from-[#5B7FFF] to-[#4A6EEE] text-white px-6 py-2.5 rounded-md shadow-md hover:opacity-90 transition-transform hover:scale-105"
            >
              Create your workspace
            </Link>
            <Link
              to="/login"
              className="text-sm text-[#8A8F9C] hover:text-[#E8EAED] border border-[#2A2E38] hover:border-[#5B7FFF50] px-6 py-2.5 rounded-md transition"
            >
              Sign in
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#2A2E38] px-8 py-5 flex items-center justify-between text-xs text-[#8A8F9C]">
        <span className="font-mono tracking-[0.1em] uppercase text-[#5B7FFF]">
          Necllo
        </span>
        <span>Built by Harsh · 2026</span>
      </footer>
    </div>
  );
}

export default LandingPage;
