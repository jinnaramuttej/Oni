"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import type { AuthUser } from "@/lib/auth";
import { ProfileMenu } from "./profile-menu";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

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
  const [pinnedChatsList, setPinnedChatsList] = useState<string[]>([]);
  const [sortMethod, setSortMethod] = useState("date_desc");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const router = useRouter();

  // Sync pins and sort settings
  useEffect(() => {
    const loadPinsAndSort = () => {
      try {
        const savedPins = localStorage.getItem("oni_pins");
        if (savedPins) setPinnedChatsList(JSON.parse(savedPins));
        else setPinnedChatsList([]);
      } catch {
        setPinnedChatsList([]);
      }
      try {
        const savedSort = localStorage.getItem("oni_recent_sort");
        if (savedSort) setSortMethod(savedSort);
        else setSortMethod("date_desc");
      } catch {
        setSortMethod("date_desc");
      }
    };
    loadPinsAndSort();
    window.addEventListener("storage", loadPinsAndSort);
    window.addEventListener("oni_pins_change", loadPinsAndSort);
    window.addEventListener("oni_sort_change", loadPinsAndSort);
    return () => {
      window.removeEventListener("storage", loadPinsAndSort);
      window.removeEventListener("oni_pins_change", loadPinsAndSort);
      window.removeEventListener("oni_sort_change", loadPinsAndSort);
    };
  }, []);

  const togglePin = (chatId: string) => {
    try {
      const savedPins = localStorage.getItem("oni_pins");
      let currentPins: string[] = savedPins ? JSON.parse(savedPins) : [];
      
      if (currentPins.includes(chatId)) {
        currentPins = currentPins.filter(id => id !== chatId);
        window.dispatchEvent(new CustomEvent("oni_toast", { detail: "Chat unpinned" }));
      } else {
        if (currentPins.length >= 3) {
          window.dispatchEvent(new CustomEvent("oni_toast", { detail: "Maximum of 3 pinned chats allowed" }));
          return;
        }
        currentPins.push(chatId);
        window.dispatchEvent(new CustomEvent("oni_toast", { detail: "Chat pinned to top" }));
      }
      
      localStorage.setItem("oni_pins", JSON.stringify(currentPins));
      window.dispatchEvent(new Event("oni_pins_change"));
    } catch (e) {
      console.error(e);
    }
  };

  const getSortedChats = () => {
    const pinned = recentChats.filter(c => pinnedChatsList.includes(c.id));
    const unpinned = recentChats.filter(c => !pinnedChatsList.includes(c.id));

    const sortFn = (a: StoredConversation, b: StoredConversation) => {
      if (sortMethod === "date_desc") {
        return b.updatedAt - a.updatedAt;
      } else if (sortMethod === "date_asc") {
        return a.updatedAt - b.updatedAt;
      } else if (sortMethod === "name_asc") {
        return a.title.localeCompare(b.title);
      } else if (sortMethod === "name_desc") {
        return b.title.localeCompare(a.title);
      }
      return 0;
    };

    pinned.sort(sortFn);
    unpinned.sort(sortFn);

    return [...pinned, ...unpinned];
  };

  const sortedRecentChats = getSortedChats();
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

  // Sync theme, custom font, and custom display name from settings
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

    const applyFont = (font: string | null) => {
      if (typeof window === "undefined") return;
      const root = document.documentElement;
      if (font === "monospace") {
        root.style.setProperty("font-family", "var(--font-geist-mono), monospace", "important");
        root.style.setProperty("--font-sans", "var(--font-geist-mono), monospace", "important");
      } else if (font === "serif") {
        root.style.setProperty("font-family", "var(--font-serif), serif", "important");
        root.style.setProperty("--font-sans", "var(--font-serif), serif", "important");
      } else {
        root.style.removeProperty("font-family");
        root.style.removeProperty("--font-sans");
      }
    };

    const loadSettings = () => {
      try {
        const saved = localStorage.getItem("oni_settings");
        if (saved) {
          const parsed = JSON.parse(saved);
          applyTheme(parsed.theme);
          applyFont(parsed.chatFont);
          if (parsed.displayName) {
            setCustomDisplayName(parsed.displayName);
          } else {
            setCustomDisplayName(null);
          }
        } else {
          applyTheme("dark");
          applyFont(null);
          setCustomDisplayName(null);
        }
      } catch {
        applyTheme("dark");
        applyFont(null);
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
    { id: "templates", label: "Templates", href: "/#templates", icon: "grid_view" },
  ];

  return (
    <div className="h-screen w-full flex overflow-hidden font-sans antialiased text-[13px] bg-surface text-text-primary">
      {/* Sidebar */}
      <motion.aside
        initial={{ width: sidebarOpen ? 240 : 0, opacity: sidebarOpen ? 1 : 0 }}
        animate={{ 
          width: sidebarOpen ? 240 : 0, 
          opacity: sidebarOpen ? 1 : 0
        }}
        transition={{ type: "spring", stiffness: 350, damping: 32 }}
        className="h-full flex flex-col bg-surface-container-lowest/70 backdrop-blur-md border-r border-surface-container-high shrink-0 z-30 overflow-hidden"
      >
        {/* Sidebar Header */}
        <div className="h-12 flex items-center justify-between px-4 shrink-0 border-b border-surface-container-high/50">
          <div className="flex items-center gap-2">
            <span
              onClick={() => router.push("/")}
              className="text-[15px] font-semibold tracking-tight text-primary cursor-pointer select-none"
            >
              Oni
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              aria-label="Search"
              className="p-1 rounded-md text-text-secondary hover:text-primary hover:bg-surface-container-low transition-colors cursor-pointer"
            >
              <svg
                fill="none"
                height="14"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="14"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
            </button>
            <button
              onClick={() => setSidebarOpen(false)}
              aria-label="Collapse Sidebar"
              className="p-1 rounded-md text-text-secondary hover:text-primary hover:bg-surface-container-low transition-colors cursor-pointer"
            >
              <svg
                fill="none"
                height="14"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="14"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect height="18" rx="2" ry="2" width="18" x="3" y="3"></rect>
                <line x1="9" x2="9" y1="3" y2="21"></line>
              </svg>
            </button>
          </div>
        </div>

        {/* Sidebar Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-3 py-3 flex flex-col gap-5">
          {/* Primary Actions */}
          <div className="flex flex-col gap-0.5">
            <button
              onClick={() => {
                try {
                  sessionStorage.removeItem("oni_session");
                } catch { /* ignore */ }
                window.location.href = "/";
              }}
              className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md hover:bg-surface-container text-primary transition-colors group w-full text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-primary text-[16px]">add</span>
              <span className="font-medium">New chat</span>
            </button>

            {navItems.map((item) => {
              const isActive = activePage === item.id ||
                (item.id === "chats" && (pathname === "/" || pathname === "/chat" || pathname?.startsWith("/chat")));
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === "templates") {
                      if (window.location.pathname !== "/") {
                        window.location.href = "/#templates";
                      } else {
                        const el = document.getElementById("templates");
                        if (el) {
                          el.scrollIntoView({ behavior: "smooth" });
                        }
                      }
                    } else if (item.href !== "#") {
                      router.push(item.href);
                    }
                  }}
                  className={cn(
                    "flex items-center gap-2.5 px-2.5 py-1.5 rounded-md transition-colors w-full text-left cursor-pointer",
                    isActive
                      ? "bg-surface-container-high text-primary"
                      : "text-text-secondary hover:text-primary hover:bg-surface-container-low"
                  )}
                >
                  <span
                    className={cn(
                      "material-symbols-outlined text-[16px]",
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
            <div className="flex items-center justify-between px-2.5 py-1 text-xs font-semibold text-text-tertiary mb-1 relative">
              <span>Recents</span>
              <button
                onClick={() => setShowSortMenu(!showSortMenu)}
                aria-label="Filter Recents"
                className="hover:text-primary transition-colors cursor-pointer flex items-center justify-center p-0.5 rounded hover:bg-surface-container text-text-secondary hover:text-primary"
              >
                <span className="material-symbols-outlined text-[12px] leading-none select-none">
                  tune
                </span>
              </button>
              {showSortMenu && (
                <>
                  <div
                    className="fixed inset-0 z-40 cursor-default"
                    onClick={() => setShowSortMenu(false)}
                  />
                  <div className="absolute right-0 top-full mt-1 w-44 bg-surface-container-high border border-surface-container-highest rounded-lg shadow-lg py-1.5 z-50 flex flex-col text-left">
                    <div className="px-2.5 py-1 text-[10px] font-bold text-text-tertiary uppercase tracking-wider border-b border-surface-container-highest mb-1">
                      Sort chats by
                    </div>
                    {[
                      { id: "date_desc", label: "Newest Modified" },
                      { id: "date_asc", label: "Oldest Modified" },
                      { id: "name_asc", label: "Name A-Z" },
                      { id: "name_desc", label: "Name Z-A" },
                    ].map((option) => (
                      <button
                        key={option.id}
                        onClick={() => {
                          setSortMethod(option.id);
                          localStorage.setItem("oni_recent_sort", option.id);
                          window.dispatchEvent(new Event("oni_sort_change"));
                          setShowSortMenu(false);
                        }}
                        className="w-full px-2.5 py-1.5 text-left text-xs text-text-primary hover:bg-surface-container-highest flex items-center justify-between transition-colors cursor-pointer font-normal"
                      >
                        <span>{option.label}</span>
                        {sortMethod === option.id && (
                          <span className="material-symbols-outlined text-[14px] text-primary">check</span>
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            {sortedRecentChats.length === 0 ? (
              <div className="text-xs text-text-tertiary px-2.5 py-2 italic">
                No recent chats
              </div>
            ) : (
              sortedRecentChats.map((chat) => {
                const isActive = chat.id === activeSessionId;
                return (
                  <div
                    key={chat.id}
                    className={cn(
                      "group relative w-full flex items-center gap-2 px-2 py-1 rounded-md text-left text-xs transition-colors cursor-pointer",
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
                      {pinnedChatsList.includes(chat.id) && (
                        <span className="material-symbols-outlined text-[12px] text-primary rotate-45 shrink-0">push_pin</span>
                      )}
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
                                  togglePin(chat.id);
                                  setOpenMenuId(null);
                                }}
                                className="w-full px-3 py-1.5 text-left text-xs text-text-primary hover:bg-surface-container-highest flex items-center gap-2 transition-colors cursor-pointer border-b border-surface-container-highest"
                              >
                                <span className="material-symbols-outlined text-[14px]">push_pin</span>
                                {pinnedChatsList.includes(chat.id) ? "Unpin" : "Pin"}
                              </button>
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
          <AnimatePresence>
            {profileOpen && (
              <ProfileMenu
                user={user}
                onClose={() => setProfileOpen(false)}
                onLogout={handleLogout}
              />
            )}
          </AnimatePresence>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className={cn(
              "w-full flex items-center justify-between p-1.5 rounded-lg transition-colors cursor-pointer",
              profileOpen ? "bg-surface-container-high border border-outline-variant" : "hover:bg-surface-container border border-transparent"
            )}
          >
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-surface-container-highest flex items-center justify-center text-primary text-xs font-semibold shrink-0">
                {initials}
              </div>
              <div className="flex flex-col items-start text-left">
                <span className="font-medium text-primary text-[13px] leading-tight">
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
      </motion.aside>

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
