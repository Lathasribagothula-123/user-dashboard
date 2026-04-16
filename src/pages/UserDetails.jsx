import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchUser } from "../services/userService";

export default function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(id).then(setUser);
  }, [id]);

  if (!user) return <p className="text-white">Loading user profile...</p>;

  return (
    <div className="mx-auto max-w-4xl text-white">
      <div className="mb-4 rounded-xl border border-cyan-400/25 bg-cyan-500/10 px-4 py-3">
        <p className="text-xs uppercase tracking-wider text-cyan-300">Profile</p>
        <h1 className="mt-1 text-lg font-semibold text-white">User Details</h1>
      </div>

      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur md:p-8">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/10 pb-5">
        <div>
          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <p className="mt-1 text-sm text-slate-400">{user.username || "user.profile"}</p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            user.status === "Active"
              ? "bg-emerald-400/15 text-emerald-300"
              : "bg-rose-400/15 text-rose-300"
          }`}
        >
          {user.status || "Active"}
        </span>
      </div>

      <div className="mt-6 grid gap-4 text-sm md:grid-cols-2">
        <Detail label="Email" value={user.email} />
        <Detail label="Phone" value={user.phone} />
        <Detail label="Company" value={user.company} />
        <Detail label="City" value={user.city} />
        <Detail label="Zip Code" value={user.zipcode || "-"} />
        <Detail label="Address" value={user.address || "-"} />
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={() => window.history.back()}
          className="rounded-xl border border-slate-600 px-4 py-2 text-sm transition hover:bg-slate-800"
        >
          Back
        </button>
      </div>
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/50 p-3">
      <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 text-sm text-slate-200">{value || "N/A"}</p>
    </div>
  );
}