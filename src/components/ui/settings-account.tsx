"use client";

import { useState } from "react";
import type { AuthUser } from "@/lib/auth";

type SettingsAccountProps = {
  user: AuthUser | null;
};

export function SettingsAccount({ user }: SettingsAccountProps) {
  const [twoFactor, setTwoFactor] = useState(true);

  return (
    <div className="flex-1 py-8 px-4 md:px-12 md:py-10 overflow-y-auto w-full max-w-[896px]">
      <div className="mb-12">
        <p className="text-text-secondary">Manage your profile identity, security preferences, and account status.</p>
      </div>

      <div className="flex flex-col gap-16">
        {/* Profile Section */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-surface-container-high pb-2">
            <h3 className="text-xs font-semibold tracking-widest text-text-tertiary uppercase">Profile</h3>
          </div>

          <div className="bg-surface-container-lowest border border-surface-container-high rounded-xl p-6 transition-colors hover:border-outline-variant">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-semibold tracking-wider text-text-tertiary uppercase mb-1">
                  Email Address
                </div>
                <div className="text-primary text-base">{user?.email || "oni.user@example.com"}</div>
              </div>
              <button className="px-4 py-2 bg-surface border border-surface-container-high rounded-md text-text-secondary hover:text-primary hover:border-outline-variant transition-all text-xs font-semibold cursor-pointer">
                Change Email
              </button>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-surface-container-high rounded-xl p-6 transition-colors hover:border-outline-variant">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-semibold tracking-wider text-text-tertiary uppercase mb-1">
                  Password
                </div>
                <div className="text-text-secondary text-base flex items-center space-x-1 py-1">
                  <span className="w-1.5 h-1.5 bg-text-secondary rounded-full"></span>
                  <span className="w-1.5 h-1.5 bg-text-secondary rounded-full"></span>
                  <span className="w-1.5 h-1.5 bg-text-secondary rounded-full"></span>
                  <span className="w-1.5 h-1.5 bg-text-secondary rounded-full"></span>
                  <span className="w-1.5 h-1.5 bg-text-secondary rounded-full"></span>
                  <span className="w-1.5 h-1.5 bg-text-secondary rounded-full"></span>
                  <span className="w-1.5 h-1.5 bg-text-secondary rounded-full"></span>
                  <span className="w-1.5 h-1.5 bg-text-secondary rounded-full"></span>
                </div>
              </div>
              <button className="px-4 py-2 bg-surface border border-surface-container-high rounded-md text-text-secondary hover:text-primary hover:border-outline-variant transition-all text-xs font-semibold cursor-pointer">
                Reset Password
              </button>
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-surface-container-high pb-2">
            <h3 className="text-xs font-semibold tracking-widest text-text-tertiary uppercase">Security</h3>
          </div>

          <div className="bg-surface-container-lowest border border-surface-container-high rounded-xl p-6 transition-colors hover:border-outline-variant">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <div className="text-primary text-base font-medium mb-1">Two-factor Authentication</div>
                <p className="text-text-secondary text-sm">Add an extra layer of security to your account.</p>
              </div>

              {/* Custom Toggle Switch */}
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={twoFactor}
                  onChange={(e) => setTwoFactor(e.target.checked)}
                  className="sr-only peer cursor-pointer"
                />
                <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-text-secondary after:border-text-secondary after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-outline-variant peer-checked:after:bg-primary"></div>
              </label>
            </div>
          </div>
        </section>

        {/* Account Management Section */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-surface-container-high pb-2">
            <h3 className="text-xs font-semibold tracking-widest text-error uppercase">Account Management</h3>
          </div>

          <div className="bg-surface-container-lowest border border-error-container/30 rounded-xl p-6 transition-colors hover:border-error-container/60">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="text-primary text-base font-medium mb-1">Delete Account</div>
                <p className="text-text-secondary text-sm max-w-md">
                  Permanently delete your account and all of your content. This action is not reversible.
                </p>
              </div>
              <button className="px-4 py-2 bg-error-container/20 border border-error-container rounded-md text-error hover:bg-error-container/40 transition-all text-xs font-semibold flex-shrink-0 cursor-pointer">
                Delete account
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
