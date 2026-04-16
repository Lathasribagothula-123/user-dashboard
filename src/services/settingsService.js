const SETTINGS_KEY = "dashboard_settings";

const defaultSettings = {
  itemsPerPage: 5,
};

export function getDashboardSettings() {
  const saved = JSON.parse(localStorage.getItem(SETTINGS_KEY) || "null");
  return { ...defaultSettings, ...(saved || {}) };
}

export function saveDashboardSettings(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}
