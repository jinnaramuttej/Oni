"use client";

import { useState, useEffect } from "react";
import type { AuthUser } from "@/lib/auth";

export function SettingsGeneral({ user }: { user: AuthUser | null }) {
  const [displayName, setDisplayName] = useState("Oni User");
  const [theme, setTheme] = useState("dark");
  const [chatFont, setChatFont] = useState("inter");
  const [compactMode, setCompactMode] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("oni_settings");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.displayName) {
          setDisplayName(parsed.displayName);
        } else if (user?.name) {
          setDisplayName(user.name);
        }
        if (parsed.theme) setTheme(parsed.theme);
        if (parsed.chatFont) setChatFont(parsed.chatFont);
        if (parsed.compactMode !== undefined) setCompactMode(!!parsed.compactMode);
      } else if (user?.name) {
        setDisplayName(user.name);
      }
    } catch {
      // ignore
    }
  }, [user]);

  const updateSetting = (key: string, value: any, successMessage?: string) => {
    try {
      const saved = localStorage.getItem("oni_settings") || "{}";
      const parsed = JSON.parse(saved);
      if (!parsed.displayName) {
        parsed.displayName = user?.name || displayName || "Oni User";
      }
      parsed[key] = value;
      localStorage.setItem("oni_settings", JSON.stringify(parsed));
      
      // Dispatch changes so other components (like app shell or chat) pick it up instantly
      window.dispatchEvent(new Event("oni_settings_change"));
      
      if (successMessage) {
        window.dispatchEvent(new CustomEvent("oni_toast", { detail: successMessage }));
      }
    } catch (e) {
      console.error("Failed to update setting:", e);
    }
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    updateSetting("theme", newTheme, `Theme changed to ${newTheme}`);
  };

  return (
    <div className="w-full max-w-[896px]">
      <div className="mb-6">
        <p className="text-text-secondary text-sm">Manage your workspace preferences and identity.</p>
      </div>

      <div className="flex flex-col gap-10">
        {/* Profile Section */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-surface-container-high pb-2">
            <h3 className="text-xs font-semibold tracking-widest text-text-tertiary uppercase">Profile</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 items-center">
            <div className="text-xs font-semibold tracking-wider text-primary uppercase">Display Name</div>
            <div className="max-w-md w-full">
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                onBlur={() => updateSetting("displayName", displayName, "Display name updated")}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    updateSetting("displayName", displayName, "Display name updated");
                    (e.target as HTMLInputElement).blur();
                  }
                }}
                className="w-full bg-surface-container-low border border-surface-container-high focus:border-outline-variant text-primary rounded-lg px-3.5 py-2 text-sm placeholder:text-text-tertiary outline-none transition-colors"
                placeholder="Enter your display name"
              />
            </div>
          </div>
        </section>

        {/* Appearance Section */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-surface-container-high pb-2">
            <h3 className="text-xs font-semibold tracking-widest text-text-tertiary uppercase">Appearance</h3>
          </div>

          {/* Theme selection */}
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 items-start">
            <div className="text-xs font-semibold tracking-wider text-primary uppercase pt-1">Theme</div>
            <div className="flex gap-4 flex-wrap">
              {/* System */}
              <label className="cursor-pointer group flex flex-col gap-2">
                <div
                  onClick={() => handleThemeChange("system")}
                  className={`w-20 h-14 rounded-lg border-2 bg-surface relative overflow-hidden transition-colors ${
                    theme === "system" ? "border-primary" : "border-outline-variant hover:border-text-secondary"
                  }`}
                >
                  <div className="absolute inset-x-2 top-2 h-1 bg-surface-container-high rounded-full w-1/2"></div>
                  <div className="absolute inset-x-2 top-4 h-1 bg-surface-container-high rounded-full w-3/4"></div>
                  <div className="absolute inset-x-2 bottom-1.5 h-3 bg-surface-container-low rounded border border-surface-container-high"></div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="theme"
                    checked={theme === "system"}
                    onChange={() => handleThemeChange("system")}
                    className="w-3.5 h-3.5 text-outline-variant bg-surface border-surface-container-high focus:ring-outline-variant focus:ring-offset-background cursor-pointer"
                  />
                  <span
                    className={`text-xs font-semibold transition-colors ${
                      theme === "system" ? "text-primary" : "text-text-secondary group-hover:text-primary"
                    }`}
                  >
                    System
                  </span>
                </div>
              </label>

              {/* Light */}
              <label className="cursor-pointer group flex flex-col gap-2">
                <div
                  onClick={() => handleThemeChange("light")}
                  className={`w-20 h-14 rounded-lg border bg-[#e3e2e6] relative overflow-hidden transition-colors ${
                    theme === "light" ? "border-2 border-primary" : "border-surface-container-high hover:border-outline-variant"
                  }`}
                >
                  <div className="absolute inset-x-2 top-2 h-1 bg-[#c4c7c8] rounded-full w-1/2"></div>
                  <div className="absolute inset-x-2 top-4 h-1 bg-[#c4c7c8] rounded-full w-3/4"></div>
                  <div className="absolute inset-x-2 bottom-1.5 h-3 bg-white rounded border border-[#c4c7c8]"></div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="theme"
                    checked={theme === "light"}
                    onChange={() => handleThemeChange("light")}
                    className="w-3.5 h-3.5 text-outline-variant bg-surface border-surface-container-high focus:ring-outline-variant focus:ring-offset-background cursor-pointer"
                  />
                  <span
                    className={`text-xs font-semibold transition-colors ${
                      theme === "light" ? "text-primary" : "text-text-secondary group-hover:text-primary"
                    }`}
                  >
                    Light
                  </span>
                </div>
              </label>

              {/* Dark */}
              <label className="cursor-pointer group flex flex-col gap-2">
                <div
                  onClick={() => handleThemeChange("dark")}
                  className={`w-20 h-14 rounded-lg border-2 bg-background relative overflow-hidden transition-colors ${
                    theme === "dark" ? "border-primary" : "border-surface-container-high hover:border-outline-variant"
                  }`}
                >
                  <div className="absolute inset-x-2 top-2 h-1 bg-surface-container-high rounded-full w-1/2"></div>
                  <div className="absolute inset-x-2 top-4 h-1 bg-surface-container-high rounded-full w-3/4"></div>
                  <div className="absolute inset-x-2 bottom-1.5 h-3 bg-surface-container-low rounded border border-surface-container-high"></div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="theme"
                    checked={theme === "dark"}
                    onChange={() => handleThemeChange("dark")}
                    className="w-3.5 h-3.5 text-primary bg-surface border-surface-container-high focus:ring-primary focus:ring-offset-background cursor-pointer"
                  />
                  <span
                    className={`text-xs font-semibold transition-colors ${
                      theme === "dark" ? "text-primary" : "text-text-secondary group-hover:text-primary"
                    }`}
                  >
                    Dark (Noir)
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* Chat Font */}
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 items-center">
            <div className="text-xs font-semibold tracking-wider text-primary uppercase">Chat Font</div>
            <div className="max-w-md w-full relative">
              <select
                value={chatFont}
                onChange={(e) => {
                  setChatFont(e.target.value);
                  updateSetting("chatFont", e.target.value, "Chat font updated");
                }}
                className="w-full bg-surface-container-low border border-surface-container-high focus:border-outline-variant text-primary rounded-lg px-3.5 py-2 text-sm appearance-none outline-none transition-colors cursor-pointer"
              >
                <option value="inter">Inter (System Default)</option>
                <option value="monospace">Monospace (Technical)</option>
                <option value="serif">Playfair (Editorial)</option>
              </select>
              <span className="material-symbols-outlined thin-icon absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none">
                expand_more
              </span>
            </div>
          </div>

          {/* Compact Mode */}
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 items-center pt-1">
            <div className="text-xs font-semibold tracking-wider text-primary uppercase">Compact Mode</div>
            <div className="max-w-md w-full flex items-center justify-between">
              <span className="text-text-secondary text-xs font-semibold tracking-wider">
                Reduces padding to show more content
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={compactMode}
                  onChange={(e) => {
                    setCompactMode(e.target.checked);
                    updateSetting("compactMode", e.target.checked, e.target.checked ? "Compact mode enabled" : "Compact mode disabled");
                  }}
                  className="sr-only peer cursor-pointer"
                />
                <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-text-secondary after:border-text-secondary after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-outline-variant peer-checked:after:bg-primary"></div>
              </label>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
