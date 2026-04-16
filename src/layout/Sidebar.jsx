import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const navClass = ({ isActive }) =>
    `block rounded-xl px-3 py-2.5 text-sm transition ${
      isActive
        ? "bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-lg shadow-indigo-900/40"
        : "text-slate-300 hover:bg-slate-800/70 hover:text-white"
    }`;

  return (
    <aside className="w-72 border-r border-white/10 bg-slate-950/70 p-5 backdrop-blur">
      <div className="mb-8 rounded-2xl border border-white/10 bg-slate-900/80 p-4">
        <h2 className="text-lg font-semibold text-white">User Management</h2>
        <p className="mt-1 text-xs text-slate-400">Dashboard Application</p>
      </div>

      <nav className="space-y-2">
        <NavLink to="/" end className={navClass}>
          Users
        </NavLink>

        <NavLink to="/add-user" className={navClass}>
          Create User
        </NavLink>

        <NavLink to="/settings" className={navClass}>
          Settings
        </NavLink>
      </nav>

      <div className="mt-8 rounded-2xl border border-cyan-400/30 bg-cyan-500/10 p-4 text-xs text-slate-200">
        Find users, filter list, and edit quickly.
      </div>
    </aside>
  );
}