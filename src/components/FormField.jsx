export default function FormField({
  label,
  error,
  as = "input",
  className = "",
  children,
  ...props
}) {
  const baseClassName =
    "mt-1 w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2.5 text-sm text-slate-100 outline-none transition focus:border-cyan-400";

  return (
    <label className="block">
      <span className="text-xs font-medium uppercase tracking-wider text-slate-400">{label}</span>
      {as === "textarea" ? (
        <textarea className={`${baseClassName} min-h-24 resize-y ${className}`} {...props} />
      ) : as === "select" ? (
        <select className={`${baseClassName} ${className}`} {...props}>
          {children}
        </select>
      ) : (
        <input className={`${baseClassName} ${className}`} {...props} />
      )}
      {error ? <p className="mt-1 text-xs text-rose-400">{error}</p> : null}
    </label>
  );
}
