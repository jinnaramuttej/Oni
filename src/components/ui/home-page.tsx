"use client";

import { useEffect, useState } from "react";
import { AppShell } from "./app-shell";
import { OniChat } from "./v0-ai-chat";
import type { AuthUser } from "@/lib/auth";
import { ProfileMenu } from "./profile-menu";

export function HomePage() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [promptText, setPromptText] = useState("");
  // When chatStarted, show OniChat inline instead of navigating away
  const [chatStarted, setChatStarted] = useState(false);
  const [chatPrompt, setChatPrompt] = useState("");

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("oni_session");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.id && Array.isArray(parsed?.messages) && parsed.messages.length > 0) {
          setChatStarted(true);
        }
      }
    } catch { /* ignore */ }
  }, []);

  const handleSend = () => {
    const text = promptText.trim();
    if (!text) return;
    // Clear sessionStorage so OniChat starts a fresh session for this prompt
    try { sessionStorage.removeItem("oni_session"); } catch { /* ignore */ }
    setChatPrompt(text);
    setChatStarted(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

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

  const handleLogout = async () => {
    setProfileOpen(false);
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/signin";
  };

  const getGreeting = () => {
    const hr = new Date().getHours();
    if (hr < 12) return "Morning";
    if (hr < 17) return "Afternoon";
    return "Evening";
  };

  // When chat is started inline, show OniChat inside AppShell (sidebar stays put)
  if (chatStarted) {
    return (
      <AppShell activePage="chats">
        <OniChat initialPrompt={chatPrompt} hideSidebar />
      </AppShell>
    );
  }

  return (
    <AppShell activePage="chats">
      {/* Top Header Bar */}
      <header className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10 pointer-events-none">
        <div className="pointer-events-auto">
          {/* Optional left aligned elements */}
        </div>
        <div className="flex items-center gap-4 pointer-events-auto relative">
          <div className="text-xs text-text-tertiary px-3 py-1.5 rounded-full bg-surface-container-low border border-surface-container-high hidden md:flex items-center gap-1">
            <span>Free plan</span>
            <span className="text-text-secondary px-1">·</span>
            <button className="text-primary hover:underline font-medium bg-transparent border-none cursor-pointer">
              Upgrade
            </button>
          </div>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            aria-label="Profile Settings"
            className="w-8 h-8 rounded-full border border-surface-container-highest flex items-center justify-center text-text-secondary hover:text-primary hover:bg-surface-container-low transition-colors cursor-pointer"
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
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>
          {profileOpen && (
            <div className="absolute right-0 top-10 z-50">
              <ProfileMenu
                user={user}
                onClose={() => setProfileOpen(false)}
                onLogout={handleLogout}
              />
            </div>
          )}
        </div>
      </header>

      {/* Center Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 max-w-4xl mx-auto w-full mt-[-10vh]">
        {/* Greeting */}
        <div className="flex items-center gap-3 mb-10">
          <h1 className="text-4xl md:text-5xl font-sans font-bold text-primary tracking-wide">
            {getGreeting()}, {user?.name || "User"}
          </h1>
        </div>

        {/* Input Area */}
        <div className="w-full bg-surface-container-low rounded-2xl border border-surface-container-high p-4 flex flex-col gap-3 shadow-sm input-focus-ring transition-all">
          <div className="relative pr-12">
            <textarea
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent border-none text-primary placeholder-text-tertiary resize-none focus:ring-0 focus:outline-none p-0 text-base"
              placeholder="How can I help you today?"
              rows={1}
              style={{ minHeight: "24px" }}
            />
            <button
              onClick={handleSend}
              disabled={!promptText.trim()}
              aria-label="Send message"
              className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              style={{
                background: promptText.trim() ? "white" : "rgba(255,255,255,0.1)",
                color: promptText.trim() ? "black" : "rgba(255,255,255,0.3)",
                cursor: promptText.trim() ? "pointer" : "not-allowed",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
          </div>
          <div className="flex items-center justify-between mt-8">
            <button
              aria-label="Add attachment"
              className="p-1.5 rounded-md text-text-secondary hover:text-primary hover:bg-surface-container transition-colors cursor-pointer"
            >
              <svg
                fill="none"
                height="20"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5v14"></path>
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-text-secondary hover:bg-surface-container transition-colors text-xs font-medium cursor-pointer">
                <span>Oni 4.6</span>
                <span className="text-text-tertiary ml-1">Medium</span>
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
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </button>
              <button
                aria-label="Voice input"
                className="p-1.5 rounded-md text-text-secondary hover:text-primary hover:bg-surface-container transition-colors cursor-pointer"
              >
                <svg
                  fill="none"
                  height="18"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="18"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                  <line x1="12" x2="12" y1="19" y2="22"></line>
                </svg>
              </button>
              <button
                onClick={() => { window.location.href = "/settings"; }}
                aria-label="Settings"
                className="p-1.5 rounded-md text-text-secondary hover:text-primary hover:bg-surface-container transition-colors cursor-pointer"
              >
                <svg
                  fill="none"
                  height="18"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="18"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 12h4l2-9 4 18 2-9h6"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-container-high border border-surface-container-highest hover:bg-surface-container-highest transition-colors text-text-secondary hover:text-primary text-sm font-medium cursor-pointer">
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
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
            Code
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-container-high border border-surface-container-highest hover:bg-surface-container-highest transition-colors text-text-secondary hover:text-primary text-sm font-medium cursor-pointer">
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
              <path d="M3 3v18h18"></path>
              <path d="m19 9-5 5-4-4-3 3"></path>
            </svg>
            Strategize
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-container-high border border-surface-container-highest hover:bg-surface-container-highest transition-colors text-text-secondary hover:text-primary text-sm font-medium cursor-pointer">
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
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
              <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
            </svg>
            Learn
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-container-high border border-surface-container-highest hover:bg-surface-container-highest transition-colors text-text-secondary hover:text-primary text-sm font-medium cursor-pointer">
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
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
            </svg>
            Write
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-container-high border border-surface-container-highest hover:bg-surface-container-highest transition-colors text-text-secondary hover:text-primary text-sm font-medium cursor-pointer">
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
              <path d="M17 8h1a4 4 0 1 1 0 8h-1"></path>
              <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"></path>
              <line x1="6" x2="6" y1="2" y2="4"></line>
              <line x1="10" x2="10" y1="2" y2="4"></line>
              <line x1="14" x2="14" y1="2" y2="4"></line>
            </svg>
            Life stuff
          </button>
        </div>
      </div>
    </AppShell>
  );
}
