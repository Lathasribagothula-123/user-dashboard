import { useState } from "react";
import { getDashboardSettings, saveDashboardSettings } from "../services/settingsService";

export default function Settings() {
  const [settings, setSettings] = useState(getDashboardSettings());
  const [saved, setSaved] = useState(false);

  const update = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    saveDashboardSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-xl text-white">
      <h2 className="text-2xl font-semibold">Dashboard Settings</h2>
     

  <div className="mt-5 rounded-2xl  p-6 backdrop-blur">    
        <SettingItem title="Items Per Page">
          <select
            value={settings.itemsPerPage}
            onChange={(e) => update("itemsPerPage", Number(e.target.value))}
            className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-slate-100 outline-none"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
        </SettingItem>
        <div className="mt-5 flex items-center justify-between  pt-4">
          {saved ? <p className="text-sm text-emerald-300">Settings saved</p> : <span />}
          <button
            onClick={handleSave}
            className="rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-4 py-2 text-sm text-white"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}

function SettingItem({ title, description, children }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/50 p-4">
      <p className="font-medium text-slate-200">{title}</p>
      <p className="mt-1 text-sm text-slate-400">{description}</p>
      {children}
    </div>
  );
}