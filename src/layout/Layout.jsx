import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-[#030a1f] to-[#07132f] text-slate-100">
      <Sidebar />

      <div className="flex min-h-0 flex-1 flex-col">
        <Navbar />
        <div className="min-h-0 flex-1 overflow-hidden p-6 lg:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}