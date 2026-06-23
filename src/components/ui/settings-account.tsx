"use client";

import { useState, useEffect } from "react";
import type { AuthUser } from "@/lib/auth";

type SettingsAccountProps = {
  user: AuthUser | null;
};

export function SettingsAccount({ user }: SettingsAccountProps) {
  const [twoFactor, setTwoFactor] = useState(true);
  const [email, setEmail] = useState("oni.user@example.com");
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [tempEmail, setTempEmail] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("oni_settings");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.twoFactor !== undefined) setTwoFactor(!!parsed.twoFactor);
        if (parsed.email) {
          setEmail(parsed.email);
        } else if (user?.email) {
          setEmail(user.email);
        }
      } else if (user?.email) {
        setEmail(user.email);
      }
    } catch {
      // ignore
    }
  }, [user]);

  const updateSetting = (key: string, value: any, successMessage?: string) => {
    try {
      const saved = localStorage.getItem("oni_settings") || "{}";
      const parsed = JSON.parse(saved);
      parsed[key] = value;
      localStorage.setItem("oni_settings", JSON.stringify(parsed));
      
      window.dispatchEvent(new Event("oni_settings_change"));
      
      if (successMessage) {
        window.dispatchEvent(new CustomEvent("oni_toast", { detail: successMessage }));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handle2FAToggle = (checked: boolean) => {
    setTwoFactor(checked);
    updateSetting("twoFactor", checked, checked ? "Two-factor authentication enabled" : "Two-factor authentication disabled");
  };

  const handleSaveEmail = () => {
    const trimmed = tempEmail.trim();
    if (!trimmed || !trimmed.includes("@")) {
      window.dispatchEvent(new CustomEvent("oni_toast", { detail: "Please enter a valid email address" }));
      return;
    }
    setEmail(trimmed);
    setIsEditingEmail(false);
    updateSetting("email", trimmed, "Email address updated successfully");
  };

  const handleResetPassword = () => {
    window.dispatchEvent(new CustomEvent("oni_toast", { detail: `Password reset instructions sent to ${email}` }));
  };

  const handleDeleteAccount = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
      window.dispatchEvent(new CustomEvent("oni_toast", { detail: "Account successfully deleted" }));
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-full max-w-[896px]">
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
              <div className="flex-1">
                <div className="text-xs font-semibold tracking-wider text-text-tertiary uppercase mb-1">
                  Email Address
                </div>
                {isEditingEmail ? (
                  <div className="flex gap-2 max-w-md w-full mt-2">
                    <input
                      type="email"
                      value={tempEmail}
                      onChange={(e) => setTempEmail(e.target.value)}
                      className="flex-1 bg-surface border border-outline-variant text-primary rounded-lg px-3 py-1.5 text-sm focus:outline-none"
                      placeholder="Enter new email"
                    />
                    <button
                      onClick={handleSaveEmail}
                      className="px-3 py-1.5 bg-primary text-on-primary rounded-lg text-xs font-semibold hover:bg-surface-tint transition-all cursor-pointer"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditingEmail(false)}
                      className="px-3 py-1.5 bg-surface-container border border-surface-container-high rounded-lg text-text-secondary text-xs font-semibold hover:text-primary transition-all cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="text-primary text-base">{email}</div>
                )}
              </div>
              {!isEditingEmail && (
                <button
                  onClick={() => {
                    setTempEmail(email);
                    setIsEditingEmail(true);
                  }}
                  className="px-4 py-2 bg-surface border border-surface-container-high rounded-md text-text-secondary hover:text-primary hover:border-outline-variant transition-all text-xs font-semibold cursor-pointer"
                >
                  Change Email
                </button>
              )}
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
              <button
                onClick={handleResetPassword}
                className="px-4 py-2 bg-surface border border-surface-container-high rounded-md text-text-secondary hover:text-primary hover:border-outline-variant transition-all text-xs font-semibold cursor-pointer"
              >
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
                  onChange={(e) => handle2FAToggle(e.target.checked)}
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
              {showDeleteConfirm ? (
                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                  <button
                    onClick={handleDeleteAccount}
                    className="px-4 py-2 bg-error text-white rounded-md text-xs font-semibold hover:bg-red-700 transition-all cursor-pointer"
                  >
                    Confirm Delete
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-4 py-2 bg-surface-container border border-surface-container-high rounded-md text-text-secondary hover:text-primary transition-all text-xs font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-4 py-2 bg-error-container/20 border border-error-container rounded-md text-error hover:bg-error-container/40 transition-all text-xs font-semibold flex-shrink-0 cursor-pointer"
                >
                  Delete account
                </button>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
