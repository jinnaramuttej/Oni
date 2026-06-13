"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "./app-shell";
import { SettingsGeneral } from "./settings-general";
import { SettingsAccount } from "./settings-account";
import { SettingsPrivacy } from "./settings-privacy";
import { SettingsBilling } from "./settings-billing";
import { SettingsCapabilities } from "./settings-capabilities";
import type { AuthUser } from "@/lib/auth";
import { cn } from "@/lib/utils";

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [user, setUser] = useState<AuthUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    let active = true;

    fetch("/api/auth/me")
      .then(async (response) => {
        if (!response.ok) return null;
        const data = (await response.json().catch(() => null)) as { user?: AuthUser | null } | null;
        return data?.user ?? null;
      })
      .then((nextUser) => {
        if (active) setUser(nextUser);
      })
      .catch(() => {
        if (active) setUser(null);
      });

    return () => {
      active = false;
    };
  }, []);

  const tabs = [
    { id: "general", label: "General" },
    { id: "account", label: "Account" },
    { id: "privacy", label: "Privacy" },
    { id: "billing", label: "Billing" },
    { id: "capabilities", label: "Capabilities" },
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case "general":
        return <SettingsGeneral />;
      case "account":
        return <SettingsAccount user={user} />;
      case "privacy":
        return <SettingsPrivacy />;
      case "billing":
        return <SettingsBilling />;
      case "capabilities":
        return <SettingsCapabilities />;
      default:
        return <SettingsGeneral />;
    }
  };

  const activeTabLabel = tabs.find((t) => t.id === activeTab)?.label || "Settings";

  return (
    <AppShell activePage="settings">
      {/* TopAppBar for Settings (Desktop & Mobile) */}
      <header className="flex justify-between items-center w-full h-16 px-6 md:px-12 bg-surface border-b border-surface-container-high z-10 flex-shrink-0">
        <h1 className="font-serif text-2xl text-primary">Settings</h1>
        <button
          onClick={() => router.push("/")}
          className="text-text-tertiary hover:text-primary transition-colors cursor-pointer active:opacity-70 p-2 rounded-full hover:bg-surface-container flex items-center justify-center border-none"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </header>

      {/* Settings Sub-Nav */}
      <div className="w-full border-b border-surface-container-high bg-surface/80 backdrop-blur-sm sticky top-0 z-10 px-6 md:px-12 overflow-x-auto scrollbar-hide">
        <nav className="flex space-x-6 min-w-max">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "text-xs font-semibold tracking-wider py-4 uppercase border-b-2 cursor-pointer transition-colors",
                  isActive
                    ? "text-primary border-primary"
                    : "text-text-tertiary hover:text-primary border-transparent"
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Scrollable Workspace Canvas */}
      <main className="flex-1 overflow-y-auto px-6 md:px-12 py-8 w-full flex flex-col items-start pb-32">
        <div className="w-full max-w-[896px] mb-6">
          <h2 className="font-serif text-3xl md:text-[48px] leading-[1.2] tracking-[-0.02em] text-primary mb-2">
            {activeTabLabel}
          </h2>
        </div>
        {renderActiveTab()}
      </main>
    </AppShell>
  );
}
