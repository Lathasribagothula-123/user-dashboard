import { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import StatCard from "../components/StatCard";
import { fetchUsers, removeUser } from "../services/userService";
import { getDashboardSettings } from "../services/settingsService";

export default function UsersPage() {
  const dashboardSettings = getDashboardSettings();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [toast, setToast] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = dashboardSettings.itemsPerPage;

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    fetchUsers()
      .then(setUsers)
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (location.state?.toastMessage) {
      setToast(location.state.toastMessage);
      setTimeout(() => setToast(""), 3000);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const filteredUsers = useMemo(() => {
    const term = search.trim().toLowerCase();
    const filtered = users.filter((user) => {
      const searchable = `${user.name} ${user.username} ${user.email} ${user.phone} ${user.company}`
        .toLowerCase();
      const isStatusMatch = statusFilter ? user.status === statusFilter : true;
      return searchable.includes(term) && isStatusMatch;
    });

    return filtered;
  }, [users, search, statusFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / recordsPerPage));
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const handleDelete = (id) => {
    const updated = users.filter((u) => u.id !== id);
    setUsers(updated);
    removeUser(id);

    setToast("User deleted successfully");
    setTimeout(() => setToast(""), 3000);
  };

  return (
    <div className="flex h-full min-h-0 flex-col gap-5 text-slate-100">
      {toast && (
        <div className="fixed right-6 top-5 z-50 rounded-lg border border-emerald-400/40 bg-emerald-500/20 px-4 py-2 text-sm text-emerald-200 backdrop-blur">
          {toast}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Total Users" value={users.length} accent="text-white" />
        <StatCard
          title="Active Users"
          value={users.filter((u) => u.status === "Active").length}
          accent="text-emerald-300"
        />
        <StatCard
          title="Inactive Users"
          value={users.filter((u) => u.status === "Inactive").length}
          accent="text-rose-300"
        />
      </div>

      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 backdrop-blur">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <div className="relative w-full max-w-md">
            <input
              className="w-full rounded-xl border border-slate-700 bg-slate-950/80 py-2 pl-3 pr-9 text-sm outline-none transition focus:border-cyan-400"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search ? (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-slate-400 transition hover:bg-slate-800 hover:text-slate-200"
                aria-label="Clear search"
              >
                x
              </button>
            ) : null}
          </div>
          <select
            className="rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2.5 text-sm outline-none transition focus:border-cyan-400"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <div className="xl:col-span-2 xl:justify-self-end">
            <button
              onClick={() => navigate("/add-user")}
              className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-900/40 transition hover:brightness-110 md:w-auto"
            >
              + Create User
            </button>
          </div>
        </div>
      </div>

      <div className="min-h-0 flex flex-1 flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur">
        <div className="min-h-0 flex-1 overflow-y-auto">
          <table className="w-full table-fixed text-sm text-slate-300">
            <thead className="bg-slate-950/70 text-xs uppercase tracking-wide text-slate-200">
              <tr className="[&>th]:px-4 [&>th]:py-3 [&>th]:text-left">
                <th>User Name</th>
                <th>Email</th>
                <th>City</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-t border-white/5 transition hover:bg-slate-800/60 [&>td]:px-4 [&>td]:py-3"
                >
                  <td>
                    <button
                      onClick={() => navigate(`/users/${user.id}`)}
                      className="w-full text-left hover:text-cyan-300"
                    >
                      <p className="truncate">{user.name}</p>
                    </button>
                  </td>
                  <td className="truncate">{user.email}</td>

                  <td className="truncate">{user.city}</td>
                  <td>
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${user.status === "Active"
                          ? "bg-emerald-400/15 text-emerald-300"
                          : "bg-rose-400/15 text-rose-300"
                        }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap">
                    <button
                      className="mr-3 text-cyan-300 hover:text-cyan-200"
                      onClick={() => navigate(`/edit-user/${user.id}`, { state: user })}
                    >
                      Edit
                    </button>
                    <button
                      className="text-rose-300 hover:text-rose-200"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {isLoading && (
                <tr>
                  <td className="px-4 py-8 text-center text-slate-400" colSpan={6}>
                    Loading users...
                  </td>
                </tr>
              )}
              {!isLoading && !paginatedUsers.length && (
                <tr>
                  <td className="px-4 py-8 text-center text-slate-400" colSpan={6}>
                    No Data Found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-4 py-3 text-sm text-slate-400">
          <p>
            Showing {filteredUsers.length ? (currentPage - 1) * recordsPerPage + 1 : 0} -{" "}
            {Math.min(currentPage * recordsPerPage, filteredUsers.length)} of {filteredUsers.length}
          </p>
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="rounded-lg border border-slate-700 px-3 py-1.5 disabled:opacity-40"
            >
              Prev
            </button>
            {[currentPage - 1, currentPage, currentPage + 1]
              .filter((page) => page > 0 && page <= totalPages)
              .map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`rounded-lg px-3 py-1.5 ${currentPage === page
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-800/90"
                    }`}
                >
                  {page}
                </button>
              ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="rounded-lg border border-slate-700 px-3 py-1.5 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}