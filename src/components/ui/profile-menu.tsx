"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import type { AuthUser } from "@/lib/auth";

type ProfileMenuProps = {
  user: AuthUser | null;
  onClose: () => void;
  onLogout: () => void;
};

export function ProfileMenu({ user, onClose, onLogout }: ProfileMenuProps) {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const initials =
    user?.name
      ?.split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("") || "OU";

  const handleNavigate = (path: string) => {
    router.push(path);
    onClose();
  };

  return (
    <div
      ref={menuRef}
      className="absolute bottom-full left-0 mb-2 w-64 bg-surface-container-low border border-outline-variant rounded-xl overflow-hidden shadow-none transition-all duration-200 ease-in-out opacity-100 translate-y-0 z-50"
      id="profile-popup"
    >
      {/* Header / User Info in Popup */}
      <div className="px-4 py-3 border-b border-surface-container-high bg-surface-container-low">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center overflow-hidden shrink-0">
            <span className="text-primary font-medium text-sm">{initials}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-label-sm font-label-sm text-primary">{user?.name || "Oni User"}</span>
            <span className="text-label-xs font-label-xs text-text-tertiary">Pro Plan</span>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="py-1">
        <button
          onClick={() => handleNavigate("/settings")}
          className="w-full flex items-center px-4 py-2.5 text-text-secondary hover:text-primary hover:bg-surface-container transition-colors group cursor-pointer text-left"
        >
          <span className="material-symbols-outlined mr-3 text-[18px] group-hover:text-primary transition-colors">
            settings
          </span>
          <span className="font-sans text-sm">Settings</span>
        </button>
        <button className="w-full flex items-center px-4 py-2.5 text-text-secondary hover:text-primary hover:bg-surface-container transition-colors group cursor-pointer text-left">
          <span className="material-symbols-outlined mr-3 text-[18px] group-hover:text-primary transition-colors">
            language
          </span>
          <span className="font-sans text-sm">Language</span>
        </button>
        <button className="w-full flex items-center px-4 py-2.5 text-text-secondary hover:text-primary hover:bg-surface-container transition-colors group cursor-pointer text-left">
          <span className="material-symbols-outlined mr-3 text-[18px] group-hover:text-primary transition-colors">
            help
          </span>
          <span className="font-sans text-sm">Get help</span>
        </button>
      </div>

      <div className="py-1 border-t border-surface-container-high">
        <button className="w-full flex items-center justify-between px-4 py-2.5 text-text-secondary hover:text-primary hover:bg-surface-container transition-colors group cursor-pointer text-left">
          <div className="flex items-center">
            <span className="material-symbols-outlined mr-3 text-[18px] group-hover:text-primary transition-colors">
              bolt
            </span>
            <span className="font-sans text-sm">Upgrade plan</span>
          </div>
          <span className="text-[11px] font-medium leading-[14px] text-text-tertiary">Pro</span>
        </button>
        <button className="w-full flex items-center px-4 py-2.5 text-text-secondary hover:text-primary hover:bg-surface-container transition-colors group cursor-pointer text-left">
          <span className="material-symbols-outlined mr-3 text-[18px] group-hover:text-primary transition-colors">
            info
          </span>
          <span className="font-sans text-sm">Learn more</span>
        </button>
      </div>

      <div className="py-1 border-t border-surface-container-high">
        <button
          onClick={onLogout}
          className="w-full flex items-center px-4 py-2.5 text-text-secondary hover:text-primary hover:bg-surface-container transition-colors group cursor-pointer text-left"
        >
          <span className="material-symbols-outlined mr-3 text-[18px] group-hover:text-primary transition-colors">
            logout
          </span>
          <span className="font-sans text-sm">Log out</span>
        </button>
      </div>
    </div>
  );
}
