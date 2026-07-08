"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BookText,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LogOut,
  FolderPlus,
  Hexagon,
  MessageSquarePlus,
  Search,
  Settings,
  User,
} from "lucide-react";

import type { AuthUser } from "@/lib/auth";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";

const SettingsModal = dynamic(() => import("./settings-modal").then((m) => m.SettingsModal), { ssr: false });

type DashboardShellProps = {
  children: React.ReactNode;
};

const navItems = [
  { label: "New chat", icon: MessageSquarePlus, active: true },
  { label: "Search chats", icon: Search },
  { label: "Library", icon: BookText },
  { label: "Projects", icon: FolderPlus },
];

const recents: string[] = [];

export function DashboardShell({ children }: DashboardShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    let active = true;

    fetch("/api/auth/me", { cache: "no-store" })
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

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!profileMenuRef.current?.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setProfileOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleLogout = async () => {
    try {
      setProfileOpen(false);

      // Clear local storage and session data
      if (typeof window !== "undefined") {
        // Clear all chats from local storage
        try {
          const raw = localStorage.getItem("oni_conversations");
          if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) {
              parsed.forEach((c: any) => {
                if (c?.id) localStorage.removeItem(`oni_chat_${c.id}`);
              });
            }
          }
        } catch { /* ignore */ }

        localStorage.removeItem("oni_conversations");
        localStorage.removeItem("oni_pins");
        localStorage.removeItem("oni_recent_sort");
        localStorage.removeItem("oni_visitor_id");
        localStorage.removeItem("oni_settings");
        sessionStorage.removeItem("oni_session");
      }

      await fetch("/api/auth/logout", { method: "POST" }).catch((err) => console.error("Logout request failed:", err));
      
      window.location.href = "/signin";
    } catch {
      window.location.href = "/signin";
    }
  };

  const initials =
    user?.name
      ?.split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("") || "ON";

  return (
    <div className="dark h-screen overflow-hidden bg-[#0a0a0a] text-foreground">
      <div className="flex h-screen min-h-0">
        <aside
          className={cn(
            "relative flex h-screen flex-col border-r border-white/10 bg-black text-white transition-all duration-300 ease-out",
            collapsed ? "w-[84px]" : "w-[320px]"
          )}
        >
          <div className="px-4 py-4">
            <Link
              href="/"
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition-colors hover:bg-white/10"
              aria-label="Dashboard"
            >
              <Hexagon className="h-5 w-5 text-white" />
            </Link>
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
              <>
                <div className="relative" ref={profileMenuRef}>
                <button
                  type="button"
                  onClick={() => setProfileOpen((current) => !current)}
                  className="flex w-full items-center justify-between rounded-2xl px-2 py-2 text-left transition-colors hover:bg-white/8"
                  aria-haspopup="menu"
                  aria-expanded={profileOpen}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 text-sm font-semibold text-white">
                      {initials}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{user?.name ?? "Signed in user"}</p>
                      {user?.email && <p className="text-xs text-white/50">{user.email}</p>}
                    </div>
                  </div>
                  <ChevronDown className="h-4 w-4 text-white/55" />
                </button>

                {profileOpen && (
                  <div
                    className="absolute bottom-full right-0 mb-3 w-56 rounded-2xl border border-white/10 bg-zinc-950 p-2 shadow-2xl shadow-black/50"
                    role="menu"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setProfileOpen(false);
                        setShowSettingsModal(true);
                      }}
                      className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-white/85 transition-colors hover:bg-white/8 hover:text-white"
                      role="menuitem"
                    >
                      <Settings className="h-4 w-4" />
                      Settings
                    </button>
                    <Link
                      href="/"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-white/85 transition-colors hover:bg-white/8 hover:text-white"
                      role="menuitem"
                    >
                      <User className="h-4 w-4" />
                      Dashboard
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-white/85 transition-colors hover:bg-white/8 hover:text-white"
                      role="menuitem"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                )}
                </div>

                <AnimatePresence>
                  {showSettingsModal && (
                    <SettingsModal open={showSettingsModal} onClose={() => setShowSettingsModal(false)} user={user} />
                  )}
                </AnimatePresence>
              </>
            ) : (
              <div className="relative flex justify-center" ref={profileMenuRef}>
                <button
                  type="button"
                  onClick={() => setProfileOpen((current) => !current)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 text-sm font-semibold text-white transition-transform hover:scale-105"
                  aria-haspopup="menu"
                  aria-expanded={profileOpen}
                >
                  {initials}
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute bottom-full right-0 mb-3 w-56 rounded-2xl border border-white/10 bg-zinc-950 p-2 shadow-2xl shadow-black/50"
                      role="menu"
                    >
                    <button
                      type="button"
                      onClick={() => {
                        setProfileOpen(false);
                        setShowSettingsModal(true);
                      }}
                      className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-white/85 transition-colors hover:bg-white/8 hover:text-white"
                      role="menuitem"
                    >
                      <Settings className="h-4 w-4" />
                      Settings
                    </button>
                    <Link
                      href="/"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-white/85 transition-colors hover:bg-white/8 hover:text-white"
                      role="menuitem"
                    >
                      <User className="h-4 w-4" />
                      Dashboard
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-white/85 transition-colors hover:bg-white/8 hover:text-white"
                      role="menuitem"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                    </motion.div>
                  )}
                </AnimatePresence>
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

        <main className="min-w-0 flex-1 overflow-hidden bg-[#0a0a0a]">
          <div className="flex h-full min-h-0 flex-col">
            <header className="flex items-center justify-between px-4 py-4 md:px-8">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-semibold text-foreground">Oni</h1>
              </div>
            </header>

            <div className="flex min-h-0 flex-1 overflow-hidden">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
