"use client";

import { useState, useEffect } from "react";
import { X, LayoutGrid } from "lucide-react";
import { AuthUser } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type Props = {
  open: boolean;
  onClose: () => void;
  user?: AuthUser | null;
};

const inputClass =
  "w-full rounded-lg border border-white/10 bg-transparent px-4 py-2 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30";

export function SettingsModal({ open, onClose, user }: Props) {
  const [fullName, setFullName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("oni_settings");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.displayName) setFullName(parsed.displayName);
        if (parsed.email) setEmail(parsed.email);
      }
    } catch {
      // ignore
    }
  }, [user]);

  const handleSave = () => {
    try {
      const saved = localStorage.getItem("oni_settings") || "{}";
      const parsed = JSON.parse(saved);
      parsed.displayName = fullName;
      parsed.email = email;
      localStorage.setItem("oni_settings", JSON.stringify(parsed));
      
      window.dispatchEvent(new Event("oni_settings_change"));
      window.dispatchEvent(new CustomEvent("oni_toast", { detail: "Settings saved successfully" }));
      onClose();
    } catch (e) {
      console.error("Failed to save modal settings:", e);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-70 w-[95%] max-w-5xl rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md shadow-2xl overflow-hidden"
      >
        <div className="flex h-14 items-center justify-between border-b border-white/6 px-4">
          <div className="flex items-center gap-3">
            <div className="rounded-md bg-white/3 px-3 py-2 text-sm text-white/80">Oni</div>
            <h3 className="text-lg font-semibold text-white">Settings</h3>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="rounded-md p-2 text-white/80 hover:bg-white/5">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex min-h-[60vh]">
          <aside className="w-72 border-r border-white/6 p-4">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-white/35">Oni</p>
                <h4 className="text-lg font-semibold">Settings</h4>
              </div>
              <LayoutGrid className="h-5 w-5 text-white/45" />
            </div>

            <nav className="flex flex-col gap-2">
              {[
                "General",
                "Notifications",
                "Appearance",
                "Billing",
                "Security",
                "Account",
              ].map((label) => (
                <button key={label} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-white/70 hover:bg-white/3 text-left">
                  {label}
                </button>
              ))}
            </nav>
          </aside>

          <main className="flex-1 p-6">
            <div className="max-h-[60vh] overflow-y-auto pr-2">
              <h5 className="text-sm uppercase tracking-[0.25em] text-white/35">Account</h5>
              <h2 className="mt-2 text-2xl font-semibold">Manage your account</h2>

              <div className="mt-6 rounded-xl border border-white/6 bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/6 text-xl font-semibold text-white">
                      {fullName
                        ? fullName
                            .split(/\s+/)
                            .filter(Boolean)
                            .slice(0, 2)
                            .map((p) => p[0]?.toUpperCase() ?? "")
                            .join("")
                        : "ON"}
                    </div>
                    <div>
                      <p className="text-sm text-white/70">Avatar</p>
                      <p className="mt-1 text-sm text-white/50">Upload a new profile image or keep initials.</p>
                    </div>
                  </div>
                  <button className="rounded-lg border border-white/10 bg-white/6 px-3 py-2 text-sm text-white">Upload avatar</button>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-xs text-white/40 uppercase">Full name</label>
                  <input className={cn(inputClass, "mt-2")} value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>
                <div>
                  <label className="text-xs text-white/40 uppercase">Email</label>
                  <input className={cn(inputClass, "mt-2")} value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button onClick={handleSave} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black">Save Changes</button>
              </div>
            </div>
          </main>
        </div>
      </motion.div>
    </div>
  );
}

export default SettingsModal;
