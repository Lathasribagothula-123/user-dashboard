const cardGradients = {
  "Total Users": "from-indigo-400/30 via-indigo-500/10 to-slate-900/40",
  "Active Users": "from-emerald-400/30 via-emerald-500/10 to-slate-900/40",
  "Inactive Users": "from-rose-400/30 via-rose-500/10 to-slate-900/40",
};

export default function StatCard({ title, value, accent = "text-cyan-300", subtitle }) {
  const gradient = cardGradients[title] || "from-cyan-400/30 via-cyan-500/10 to-slate-900/40";

  return (
    <div
      className={`rounded-2xl border border-white/15 bg-gradient-to-br ${gradient} p-4 shadow-lg shadow-black/25 backdrop-blur`}
    >
      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-300">{title}</p>
      <p className={`mt-2 text-[30px] leading-none font-bold ${accent}`}>{value}</p>
      {subtitle ? <p className="mt-1 text-xs text-slate-300/70">{subtitle}</p> : null}
    </div>
  );
}
