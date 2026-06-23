"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import type { AuthUser } from "@/lib/auth";
import { ProfileMenu } from "./profile-menu";
import { cn } from "@/lib/utils";

type StoredConversation = {
  id: string;
  title: string;
  updatedAt: number;
};

const STORAGE_KEY = "oni_conversations";
const SESSION_KEY = "oni_session";

type AppShellProps = {
  children: React.ReactNode;
  activePage?: string;
};

export function AppShell({ children, activePage }: AppShellProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [customDisplayName, setCustomDisplayName] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const [recentChats, setRecentChats] = useState<StoredConversation[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const router = useRouter();
  const pathname = usePathname();

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

  // Sync theme and custom display name from settings
  useEffect(() => {
    const applyTheme = (theme: string | null) => {
      if (typeof window === "undefined") return;
      const root = document.documentElement;
      root.classList.remove("light", "dark");
      
      let target = theme || "dark";
      if (target === "system") {
        target = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      }
      
      root.classList.add(target);
    };

    const loadSettings = () => {
      try {
        const saved = localStorage.getItem("oni_settings");
        if (saved) {
          const parsed = JSON.parse(saved);
          applyTheme(parsed.theme);
          if (parsed.displayName) {
            setCustomDisplayName(parsed.displayName);
          } else {
            setCustomDisplayName(null);
          }
        } else {
          applyTheme("dark");
          setCustomDisplayName(null);
        }
      } catch {
        applyTheme("dark");
        setCustomDisplayName(null);
      }
    };

    loadSettings();
    window.addEventListener("storage", loadSettings);
    window.addEventListener("oni_settings_change", loadSettings);
    
    return () => {
      window.removeEventListener("storage", loadSettings);
      window.removeEventListener("oni_settings_change", loadSettings);
    };
  }, []);

  // Load recent chats from localStorage
  useEffect(() => {
    const load = () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) setRecentChats(JSON.parse(raw) as StoredConversation[]);
      } catch { /* ignore */ }
      // Get active session id
      try {
        const raw = sessionStorage.getItem(SESSION_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as { id?: string };
          if (parsed?.id) setActiveSessionId(parsed.id);
        }
      } catch { /* ignore */ }
    };
    load();
    // Re-check on focus and storage events so sidebar stays in sync
    window.addEventListener("focus", load);
    window.addEventListener("storage", load);
    // Also poll every 2s while the page is active (catches same-tab writes)
    const interval = setInterval(load, 2000);
    return () => {
      window.removeEventListener("focus", load);
      window.removeEventListener("storage", load);
      clearInterval(interval);
    };
  }, []);

  const handleDeleteChat = (chatId: string) => {
    try {
      const updated = recentChats.filter((c) => c.id !== chatId);
      setRecentChats(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      localStorage.removeItem(`oni_chat_${chatId}`);
      if (chatId === activeSessionId) {
        sessionStorage.removeItem(SESSION_KEY);
        window.location.href = "/";
      }
    } catch { /* ignore */ }
  };

  const handleRenameChat = (chatId: string, newTitle: string) => {
    if (!newTitle.trim()) return;
    try {
      const updated = recentChats.map((c) => {
        if (c.id === chatId) {
          return { ...c, title: newTitle.trim() };
        }
        return c;
      });
      setRecentChats(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setRenamingId(null);
    } catch { /* ignore */ }
  };

  const handleLogout = async () => {
    setProfileOpen(false);
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/signin");
  };

  const displayNameToUse = customDisplayName || user?.name || "Oni User";
  const initials =
    displayNameToUse
      ?.split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("") || "OU";

  const navItems = [
    { id: "chats", label: "Chats", href: "/", icon: "chat_bubble" },
    { id: "projects", label: "Projects", href: "#", icon: "folder" },
    { id: "plugins", label: "Plugins", href: "#", icon: "extension" },
    { id: "customize", label: "Customize", href: "#", icon: "tune" },
  ];

  return (
    <div className="h-screen w-full flex overflow-hidden font-sans antialiased text-sm bg-surface text-text-primary">
      {/* Sidebar */}
      <aside
        className={cn(
          "h-full flex flex-col bg-surface-container-lowest border-r border-surface-container-high shrink-0 transition-all duration-300 z-30",
          sidebarOpen ? "w-[260px] translate-x-0" : "w-0 -translate-x-full md:w-0 overflow-hidden border-r-0"
        )}
      >
        {/* Sidebar Header */}
        <div className="h-14 flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-2">
            <span
              onClick={() => router.push("/")}
              className="text-xl font-bold tracking-tight text-primary cursor-pointer"
            >
              Oni
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              aria-label="Search"
              className="p-1.5 rounded-md text-text-secondary hover:text-primary hover:bg-surface-container-low transition-colors cursor-pointer"
            >
              <svg
                fill="none"
                height="16"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
            </button>
            <button
              onClick={() => setSidebarOpen(false)}
              aria-label="Collapse Sidebar"
              className="p-1.5 rounded-md text-text-secondary hover:text-primary hover:bg-surface-container-low transition-colors cursor-pointer"
            >
              <svg
                fill="none"
                height="16"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect height="18" rx="2" ry="2" width="18" x="3" y="3"></rect>
                <line x1="9" x2="9" y1="3" y2="21"></line>
              </svg>
            </button>
          </div>
        </div>

        {/* Sidebar Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-3 py-2 flex flex-col gap-6">
          {/* Primary Actions */}
          <div className="flex flex-col gap-0.5">
            <button
              onClick={() => {
                try {
                  sessionStorage.removeItem("oni_session");
                } catch { /* ignore */ }
                window.location.href = "/";
              }}
              className="flex items-center gap-3 px-2.5 py-2 rounded-md hover:bg-surface-container text-primary transition-colors group w-full text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-primary text-[20px]">add</span>
              <span className="font-medium">New chat</span>
            </button>

            {navItems.map((item) => {
              const isActive = activePage === item.id ||
                (item.id === "chats" && (pathname === "/" || pathname === "/chat" || pathname?.startsWith("/chat")));
              return (
                <button
                  key={item.id}
                  onClick={() => item.href !== "#" && router.push(item.href)}
                  className={cn(
                    "flex items-center gap-3 px-2.5 py-2 rounded-md transition-colors w-full text-left cursor-pointer",
                    isActive
                      ? "bg-surface-container-high text-primary"
                      : "text-text-secondary hover:text-primary hover:bg-surface-container-low"
                  )}
                >
                  <span
                    className={cn(
                      "material-symbols-outlined text-[20px]",
                      isActive ? "text-primary" : "text-text-secondary"
                    )}
                  >
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Recents */}
          <div className="flex flex-col gap-1 mt-2">
            <div className="flex items-center justify-between px-2.5 py-1 text-xs font-semibold text-text-tertiary mb-1">
              <span>Recents</span>
              <button aria-label="Filter Recents" className="hover:text-primary transition-colors cursor-pointer">
                <svg
                  fill="none"
                  height="12"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line x1="21" x2="14" y1="4" y2="4"></line>
                  <line x1="10" x2="3" y1="4" y2="4"></line>
                  <line x1="21" x2="12" y1="12" y2="12"></line>
                  <line x1="8" x2="3" y1="12" y2="12"></line>
                  <line x1="21" x2="16" y1="20" y2="20"></line>
                  <line x1="12" x2="3" y1="20" y2="20"></line>
                  <line x1="14" x2="14" y1="2" y2="6"></line>
                  <line x1="8" x2="8" y1="10" y2="14"></line>
                  <line x1="16" x2="16" y1="18" y2="22"></line>
                </svg>
              </button>
            </div>
            {recentChats.length === 0 ? (
              <div className="text-xs text-text-tertiary px-2.5 py-2 italic">
                No recent chats
              </div>
            ) : (
              recentChats.map((chat) => {
                const isActive = chat.id === activeSessionId;
                return (
                  <div
                    key={chat.id}
                    className={cn(
                      "group relative w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-left text-xs transition-colors cursor-pointer",
                      isActive
                        ? "bg-surface-container-high text-primary font-medium"
                        : "text-text-secondary hover:bg-surface-container-low hover:text-primary"
                    )}
                  >
                    <div
                      onClick={() => {
                        if (renamingId === chat.id) return;
                        try {
                          const rawChat = localStorage.getItem(`oni_chat_${chat.id}`);
                          if (rawChat) {
                            sessionStorage.setItem("oni_session", rawChat);
                          } else {
                            sessionStorage.setItem("oni_session", JSON.stringify({ id: chat.id, messages: [] }));
                          }
                        } catch { /* ignore */ }
                        router.push(`/chat?id=${chat.id}`);
                      }}
                      className="flex-1 min-w-0 flex items-center gap-2"
                    >
                      <svg fill="none" height="14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="14" className="shrink-0 text-text-secondary group-hover:text-primary">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      {renamingId === chat.id ? (
                        <input
                          type="text"
                          value={renameValue}
                          onChange={(e) => setRenameValue(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleRenameChat(chat.id, renameValue);
                            } else if (e.key === "Escape") {
                              setRenamingId(null);
                            }
                          }}
                          onBlur={() => handleRenameChat(chat.id, renameValue)}
                          onClick={(e) => e.stopPropagation()}
                          autoFocus
                          className="flex-1 bg-surface-container border border-primary text-primary px-1 py-0.5 rounded text-[11px] focus:outline-none"
                        />
                      ) : (
                        <span className="truncate flex-1">{chat.title}</span>
                      )}
                    </div>

                    {renamingId !== chat.id && (
                      <div className="relative shrink-0 flex items-center gap-1">
                        {isActive && !openMenuId && <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenuId(openMenuId === chat.id ? null : chat.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 focus:opacity-100 p-0.5 rounded hover:bg-surface-container-highest transition-opacity transition-colors cursor-pointer text-text-tertiary hover:text-primary flex items-center justify-center"
                        >
                          <span className="material-symbols-outlined text-[16px]">more_horiz</span>
                        </button>
                        {openMenuId === chat.id && (
                          <>
                            <div
                              className="fixed inset-0 z-40 cursor-default"
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenMenuId(null);
                              }}
                            />
                            <div className="absolute right-0 top-full mt-1 w-28 bg-surface-container-high border border-surface-container-highest rounded-md shadow-lg py-1 z-50 flex flex-col text-left">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setRenamingId(chat.id);
                                  setRenameValue(chat.title);
                                  setOpenMenuId(null);
                                }}
                                className="w-full px-3 py-1.5 text-left text-xs text-text-primary hover:bg-surface-container-highest flex items-center gap-2 transition-colors cursor-pointer"
                              >
                                <span className="material-symbols-outlined text-[14px]">edit</span>
                                Rename
                              </button>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteChat(chat.id);
                                  setOpenMenuId(null);
                                }}
                                className="w-full px-3 py-1.5 text-left text-xs text-error hover:bg-surface-container-highest flex items-center gap-2 transition-colors cursor-pointer"
                              >
                                <span className="material-symbols-outlined text-[14px] text-error">delete</span>
                                Delete
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Sidebar Footer / User Profile */}
        <div className="p-3 border-t border-surface-container-high shrink-0 relative">
          {profileOpen && (
            <ProfileMenu
              user={user}
              onClose={() => setProfileOpen(false)}
              onLogout={handleLogout}
            />
          )}
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className={cn(
              "w-full flex items-center justify-between p-2 rounded-lg transition-colors cursor-pointer",
              profileOpen ? "bg-surface-container-high border border-outline-variant" : "hover:bg-surface-container border border-transparent"
            )}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-primary font-medium shrink-0">
                {initials}
              </div>
              <div className="flex flex-col items-start text-left">
                <span className="font-medium text-primary text-sm leading-tight">
                  {customDisplayName || user?.name || "Oni User"}
                </span>
                <span className="text-xs text-text-tertiary">Free plan</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-text-tertiary">
              <svg
                className="ml-1"
                fill="none"
                height="16"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m7 15 5 5 5-5"></path>
                <path d="m7 9 5-5 5 5"></path>
              </svg>
            </div>
          </button>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col h-full relative overflow-hidden bg-surface">
        {/* Toggle Sidebar Button when collapsed */}
        {!sidebarOpen && (
          <div className="absolute top-4 left-4 z-20 pointer-events-auto">
            <button
              onClick={() => setSidebarOpen(true)}
              aria-label="Expand Sidebar"
              className="p-1.5 rounded-md text-text-secondary hover:text-primary hover:bg-surface-container-low transition-colors cursor-pointer bg-surface border border-surface-container-high"
            >
              <svg
                fill="none"
                height="16"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect height="18" rx="2" ry="2" width="18" x="3" y="3"></rect>
                <line x1="9" x2="9" y1="9" y2="9"></line>
                <path d="M9 3v18"></path>
              </svg>
            </button>
          </div>
        )}

        {children}
      </div>
    </div>
  );
}
