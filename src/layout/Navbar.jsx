export default function Navbar() {
 

  return (
    <header className="flex items-center justify-between border-b border-white/10 bg-slate-950/70 px-6 py-4 backdrop-blur">
      <div>
        <h1 className="font-semibold text-white">User Management Dashboard</h1>
        
      </div>

      <div className="text-right">
        <p className="text-sm text-slate-300">Welcome</p>
     
      </div>
    </header>
  );
}