"use client";

import { useState } from "react";
import {
  BookText,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Ellipsis,
  FolderPlus,
  Grid2X2,
  Hexagon,
  MessageSquarePlus,
  Search,
  User,
} from "lucide-react";

import { cn } from "@/lib/utils";

type DashboardShellProps = {
  children: React.ReactNode;
};

const navItems = [
  { label: "New chat", icon: MessageSquarePlus, active: true },
  { label: "Search chats", icon: Search },
  { label: "Library", icon: BookText },
  { label: "Projects", icon: FolderPlus },
  { label: "Apps", icon: Grid2X2 },
  { label: "More", icon: Ellipsis },
];

const recents: string[] = [];

export function DashboardShell({ children }: DashboardShellProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        <aside
          className={cn(
            "relative flex h-screen flex-col border-r border-white/10 bg-black text-white transition-all duration-300 ease-out",
            collapsed ? "w-[84px]" : "w-[320px]"
          )}
        >
          <div className="flex items-center justify-between gap-3 px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                <Hexagon className="h-5 w-5 text-white" />
              </div>
              {!collapsed && (
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/50">Oni</p>
                  <p className="text-lg font-semibold text-white">Workspace</p>
                </div>
              )}
            </div>
            {!collapsed && (
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="scrollbar-hidden flex-1 overflow-y-auto px-3 pb-4">
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    type="button"
                    className={cn(
                      "flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm transition-colors",
                      item.active
                        ? "bg-white/12 text-white"
                        : "text-white/85 hover:bg-white/8 hover:text-white",
                      collapsed && "justify-center px-0"
                    )}
                  >
                    <Icon className="h-5 w-5 shrink-0 text-white/85" />
                    {!collapsed && <span className="font-medium">{item.label}</span>}
                  </button>
                );
              })}
            </nav>

            {!collapsed && recents.length > 0 && (
              <>
                <div className="mt-5 px-3 pb-2">
                  <p className="text-sm font-semibold text-white/85">Previous chats</p>
                </div>

                <div className="space-y-1">
                  {recents.map((item) => (
                    <button
                      key={item}
                      type="button"
                      className="flex w-full items-center justify-between gap-3 rounded-2xl px-3 py-2.5 text-left text-sm text-white/85 transition-colors hover:bg-white/8 hover:text-white"
                    >
                      <span className="truncate">{item}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="border-t border-white/10 p-3">
            {!collapsed ? (
              <div className="flex items-center justify-between rounded-2xl px-2 py-2 hover:bg-white/8">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 text-sm font-semibold text-white">
                    JU
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Jinnaram Uttej</p>
                  </div>
                </div>
                <button type="button" className="rounded-full p-2 text-white/55 transition-colors hover:bg-white/10 hover:text-white">
                  <User className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 text-sm font-semibold text-white">
                  JU
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setCollapsed((current) => !current)}
            className="absolute right-[-14px] top-6 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black text-white shadow-lg shadow-black/40 transition-colors hover:bg-white hover:text-black"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </aside>

        <main className="flex-1 overflow-hidden bg-background">
          <div className="flex h-full flex-col">
            <header className="flex items-center justify-between border-b border-white/10 px-4 py-4 md:px-8">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-semibold text-foreground">Oni</h1>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto px-4 py-8 md:px-8 lg:px-10">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
