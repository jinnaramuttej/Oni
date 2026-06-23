"use client";

import { useState, useEffect } from "react";

export function SettingsPrivacy() {
  const [improveAI, setImproveAI] = useState(true);
  const [locationMetadata, setLocationMetadata] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("oni_settings");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.improveAI !== undefined) setImproveAI(!!parsed.improveAI);
        if (parsed.locationMetadata !== undefined) setLocationMetadata(!!parsed.locationMetadata);
      }
    } catch {
      // ignore
    }
  }, []);

  const updateSetting = (key: string, value: any, successMessage?: string) => {
    try {
      const saved = localStorage.getItem("oni_settings") || "{}";
      const parsed = JSON.parse(saved);
      parsed[key] = value;
      localStorage.setItem("oni_settings", JSON.stringify(parsed));
      
      window.dispatchEvent(new Event("oni_settings_change"));
      
      if (successMessage) {
        window.dispatchEvent(new CustomEvent("oni_toast", { detail: successMessage }));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleImproveAIToggle = (checked: boolean) => {
    setImproveAI(checked);
    updateSetting(
      "improveAI",
      checked,
      checked ? "Allowed data usage for AI training" : "Opted out of AI training data usage"
    );
  };

  const handleLocationToggle = (checked: boolean) => {
    setLocationMetadata(checked);
    updateSetting(
      "locationMetadata",
      checked,
      checked ? "Location-aware personalization enabled" : "Location metadata disabled"
    );
  };

  const handleDownloadData = () => {
    if (downloading) return;
    setDownloading(true);
    window.dispatchEvent(new CustomEvent("oni_toast", { detail: "Preparing your workspace data archive..." }));
    
    setTimeout(() => {
      try {
        const settings = localStorage.getItem("oni_settings") || "{}";
        const conversations = localStorage.getItem("oni_conversations") || "[]";
        
        const archiveData = {
          exportDate: new Date().toISOString(),
          settings: JSON.parse(settings),
          conversations: JSON.parse(conversations),
          info: "Export of Oni Workspace Data"
        };
        
        const blob = new Blob([JSON.stringify(archiveData, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `oni_workspace_export_${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        window.dispatchEvent(new CustomEvent("oni_toast", { detail: "Workspace archive download started!" }));
      } catch (err) {
        console.error(err);
        window.dispatchEvent(new CustomEvent("oni_toast", { detail: "Failed to export data" }));
      } finally {
        setDownloading(false);
      }
    }, 1500);
  };

  const handleDeleteAccount = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
      window.dispatchEvent(new CustomEvent("oni_toast", { detail: "Account successfully deleted" }));
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-full max-w-[896px]">
      <div className="mb-6">
        <p className="text-text-secondary text-sm">Manage how Oni handles your data and personalizes your experience.</p>
      </div>

      <div className="flex flex-col gap-10">
        {/* Data Usage Section */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-3 border-b border-surface-container-high pb-3">
            <span className="material-symbols-outlined text-text-tertiary text-[20px]">database</span>
            <h3 className="text-lg font-semibold text-text-primary tracking-wide">Data Usage</h3>
          </div>

          <div className="flex items-start justify-between gap-6 p-4 rounded-xl bg-surface border border-outline-variant hover:border-surface-container-highest transition-colors">
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-primary">Improve AI models</h4>
              <p className="text-xs text-text-secondary leading-relaxed font-normal normal-case">
                Allow Oni to use your conversation history to train and improve our models. This helps us provide better,
                more accurate responses over time. Your data is anonymized before use.
              </p>
            </div>
            <div className="flex-shrink-0 mt-1">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={improveAI}
                  onChange={(e) => handleImproveAIToggle(e.target.checked)}
                  className="sr-only peer cursor-pointer"
                />
                <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-text-secondary after:border-text-secondary after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-outline-variant peer-checked:after:bg-primary"></div>
              </label>
            </div>
          </div>
        </section>

        {/* Personalization Section */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-3 border-b border-surface-container-high pb-3">
            <span className="material-symbols-outlined text-text-tertiary text-[20px]">person</span>
            <h3 className="text-lg font-semibold text-text-primary tracking-wide">Personalization</h3>
          </div>

          <div className="flex items-start justify-between gap-6 p-4 rounded-xl bg-surface border border-outline-variant hover:border-surface-container-highest transition-colors">
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-primary">Course location metadata</h4>
              <p className="text-xs text-text-secondary leading-relaxed font-normal normal-case">
                Permit Oni to analyze your geographic location data (city/region) to provide contextually relevant answers,
                local time conversions, and location-aware formatting.
              </p>
            </div>
            <div className="flex-shrink-0 mt-1">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={locationMetadata}
                  onChange={(e) => handleLocationToggle(e.target.checked)}
                  className="sr-only peer cursor-pointer"
                />
                <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-text-secondary after:border-text-secondary after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-outline-variant peer-checked:after:bg-primary"></div>
              </label>
            </div>
          </div>
        </section>

        {/* Data Export Section */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-3 border-b border-surface-container-high pb-3">
            <span className="material-symbols-outlined text-text-tertiary text-[20px]">download</span>
            <h3 className="text-lg font-semibold text-text-primary tracking-wide">Data Export</h3>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-surface-container-low border border-surface-container-high">
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-primary">Export Workspace Data</h4>
              <p className="text-xs text-text-secondary leading-relaxed font-normal normal-case max-w-md">
                Request an archive of your account information, chat history, and uploaded files. The export process may
                take several hours depending on your usage.
              </p>
            </div>
            <button
              onClick={handleDownloadData}
              disabled={downloading}
              className="flex items-center gap-2 px-4 py-2 bg-surface border border-outline-variant hover:border-primary text-primary rounded-lg transition-colors shrink-0 group focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[16px] group-hover:text-primary transition-colors">
                {downloading ? "autorenew" : "cloud_download"}
              </span>
              <span className="text-xs font-semibold tracking-wider uppercase">
                {downloading ? "Preparing..." : "Download your data"}
              </span>
            </button>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="space-y-4 pt-6 mt-8 border-t border-error-container/30">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#1a0a0b] border border-error-container/50">
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-error">Delete Account</h4>
              <p className="text-xs text-text-tertiary leading-relaxed font-normal normal-case max-w-md">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
            </div>
            {showDeleteConfirm ? (
              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <button
                  onClick={handleDeleteAccount}
                  className="px-3.5 py-2 bg-error text-white rounded-lg text-xs font-semibold hover:bg-red-700 transition-all cursor-pointer"
                >
                  Confirm Permanent Delete
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-3.5 py-2 bg-transparent border border-outline-variant text-text-secondary hover:text-primary rounded-lg transition-all text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-transparent border border-error/30 hover:border-error hover:bg-error/10 text-error rounded-lg transition-all shrink-0 focus:outline-none focus:ring-1 focus:ring-error cursor-pointer"
              >
                <span className="text-xs font-semibold tracking-wider uppercase">Delete Account</span>
              </button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
