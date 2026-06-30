"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import type { AuthUser } from "@/lib/auth";
import { motion } from "framer-motion";

type ProfileMenuProps = {
  user: AuthUser | null;
  onClose: () => void;
  onLogout: () => void;
  className?: string;
};

export function ProfileMenu({ user, onClose, onLogout, className }: ProfileMenuProps) {
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
    <motion.div
      ref={menuRef}
      initial={{ opacity: 0, scale: 0.95, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 8 }}
      transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute w-56 bg-surface-container-low border border-outline-variant rounded-xl overflow-hidden shadow-xl z-50 ${className || "bottom-full left-0 mb-2"}`}
      id="profile-popup"
    >
      {/* Header / User Info in Popup */}
      <div className="px-3 py-2 border-b border-surface-container-high bg-surface-container-low">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-full bg-surface-container-highest flex items-center justify-center overflow-hidden shrink-0">
            <span className="text-primary font-medium text-xs">{initials}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] font-semibold text-primary leading-tight">{user?.name || "Oni User"}</span>
            <span className="text-[10px] text-text-tertiary leading-none mt-0.5">Pro Plan</span>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="py-0.5">
        <button
          onClick={() => handleNavigate("/settings")}
          className="w-full flex items-center px-3 py-1.5 text-text-secondary hover:text-primary hover:bg-surface-container transition-colors group cursor-pointer text-left"
        >
          <span className="material-symbols-outlined mr-2 text-[16px] group-hover:text-primary transition-colors">
            settings
          </span>
          <span className="font-sans text-xs">Settings</span>
        </button>
        <button className="w-full flex items-center px-3 py-1.5 text-text-secondary hover:text-primary hover:bg-surface-container transition-colors group cursor-pointer text-left">
          <span className="material-symbols-outlined mr-2 text-[16px] group-hover:text-primary transition-colors">
            language
          </span>
          <span className="font-sans text-xs">Language</span>
        </button>
        <button className="w-full flex items-center px-3 py-1.5 text-text-secondary hover:text-primary hover:bg-surface-container transition-colors group cursor-pointer text-left">
          <span className="material-symbols-outlined mr-2 text-[16px] group-hover:text-primary transition-colors">
            help
          </span>
          <span className="font-sans text-xs">Get help</span>
        </button>
      </div>

      <div className="py-0.5 border-t border-surface-container-high">
        <button className="w-full flex items-center justify-between px-3 py-1.5 text-text-secondary hover:text-primary hover:bg-surface-container transition-colors group cursor-pointer text-left">
          <div className="flex items-center">
            <span className="material-symbols-outlined mr-2 text-[16px] group-hover:text-primary transition-colors">
              bolt
            </span>
            <span className="font-sans text-xs">Upgrade plan</span>
          </div>
          <span className="text-[9px] font-semibold leading-none text-text-tertiary px-1 py-0.5 rounded bg-surface-container-high">Pro</span>
        </button>
        <button className="w-full flex items-center px-3 py-1.5 text-text-secondary hover:text-primary hover:bg-surface-container transition-colors group cursor-pointer text-left">
          <span className="material-symbols-outlined mr-2 text-[16px] group-hover:text-primary transition-colors">
            info
          </span>
          <span className="font-sans text-xs">Learn more</span>
        </button>
      </div>

      <div className="py-0.5 border-t border-surface-container-high">
        <button
          onClick={onLogout}
          className="w-full flex items-center px-3 py-1.5 text-text-secondary hover:text-primary hover:bg-surface-container transition-colors group cursor-pointer text-left"
        >
          <span className="material-symbols-outlined mr-2 text-[16px] group-hover:text-primary transition-colors">
            logout
          </span>
          <span className="font-sans text-xs">Log out</span>
        </button>
      </div>
    </motion.div>
  );
}
