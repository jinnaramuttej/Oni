"use client";

import { useState } from "react";
import { X, LayoutGrid } from "lucide-react";
import { AuthUser } from "@/lib/auth";
import { cn } from "@/lib/utils";

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

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-70 w-[95%] max-w-5xl rounded-2xl bg-white/[0.02] shadow-2xl">
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
                <button className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black">Save Changes</button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default SettingsModal;
