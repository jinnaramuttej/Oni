"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  CreditCard,
  KeyRound,
  LayoutGrid,
  Paintbrush2,
  ShieldAlert,
  Upload,
  UserCircle2,
  UserRound,
  Sparkles,
  Trash2,
} from "lucide-react";

type TabKey =
  | "account"
  | "profile"
  | "billing"
  | "api-keys"
  | "appearance"
  | "notifications"
  | "danger";

type ThemeMode = "Light" | "Dark" | "System";

type AccentColor = {
  name: string;
  value: string;
};

const tabs: Array<{
  key: TabKey;
  label: string;
  icon: typeof UserRound;
}> = [
  { key: "account", label: "Account", icon: UserRound },
  { key: "profile", label: "Profile", icon: UserCircle2 },
  { key: "billing", label: "Billing", icon: CreditCard },
  { key: "api-keys", label: "API Keys", icon: KeyRound },
  { key: "appearance", label: "Appearance", icon: Paintbrush2 },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "danger", label: "Danger Zone", icon: ShieldAlert },
];

const accentColors: AccentColor[] = [
  { name: "Indigo", value: "#6366f1" },
  { name: "Violet", value: "#8b5cf6" },
  { name: "Emerald", value: "#10b981" },
  { name: "Sky", value: "#0ea5e9" },
  { name: "Rose", value: "#f43f5e" },
  { name: "Amber", value: "#f59e0b" },
];

const themeOptions: ThemeMode[] = ["Light", "Dark", "System"];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("account");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>("Dark");
  const [accent, setAccent] = useState(accentColors[0].value);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [joinedAt, setJoinedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const currentPlan = "Pro";
  const websitesGenerated = 8;
  const websitesLimit = 20;
  const usagePercent = Math.min((websitesGenerated / websitesLimit) * 100, 100);

  const activeTabMeta = useMemo(
    () => tabs.find((tab) => tab.key === activeTab) ?? tabs[0],
    [activeTab]
  );

  useEffect(() => {
    let mounted = true;
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (!mounted) return;
        const user = data?.user ?? null;
        if (user) {
          setFullName(user.name ?? "");
          setEmail(user.email ?? "");
          // derive a username if none exists
          const uname = (user.name || user.email || "").split("@")[0].replace(/\s+/g, "").toLowerCase();
          setUsername(uname ? `@${uname}` : "");
          setJoinedAt(user.createdAt ?? null);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm lg:hidden">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/35">Oni</p>
            <h1 className="text-lg font-semibold">Settings</h1>
          </div>
          <Sparkles className="h-5 w-5 text-white/50" />
        </div>

        <div className="flex flex-1 flex-col gap-6 lg:flex-row">
          <aside className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 lg:w-80 lg:p-6 backdrop-blur-sm">
            <div className="mb-4 hidden items-center justify-between px-2 lg:flex">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-white/35">Oni</p>
                <h1 className="text-2xl font-semibold">Settings</h1>
              </div>
              <LayoutGrid className="h-5 w-5 text-white/45" />
            </div>

            <nav className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.key;

                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={cn(
                      "flex min-w-max items-center gap-3 rounded-lg px-4 py-3 text-left text-sm transition-colors duration-150 lg:w-full lg:min-w-0",
                      isActive
                        ? "bg-white/5 text-white"
                        : "text-white/60 hover:bg-white/3 hover:text-white"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          <main className="flex-1">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-lg sm:p-6 lg:p-8">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-white/35">{activeTabMeta.label}</p>
                  <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">{getTitle(activeTab)}</h2>
                  <p className="mt-2 max-w-2xl text-sm text-white/45">{getDescription(activeTab)}</p>
                </div>
                <div className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/50 lg:inline-flex">
                  {currentPlan} workspace
                </div>
              </div>

              {activeTab === "account" && (
                <section className="space-y-6">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                    <p className="text-sm uppercase tracking-widest text-white/40">Account</p>
                    <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/10 text-xl font-semibold text-white">
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
                          <p className="text-sm text-white/45">Avatar</p>
                          <p className="mt-1 text-sm text-white/75">Upload a new profile image or keep your initials.</p>
                          {joinedAt && (
                            <p className="mt-1 text-xs text-white/40">Joined {new Date(joinedAt).toLocaleDateString()}</p>
                          )}
                        </div>
                      </div>

                      <button
                        type="button"
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition-colors hover:border-white/20 hover:bg-white/10"
                      >
                        <Upload className="h-4 w-4" />
                        Upload avatar
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Full name">
                      <input
                        value={fullName}
                        onChange={(event) => setFullName(event.target.value)}
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Email">
                      <input
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Username" className="md:col-span-2">
                      <input
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        className={inputClass}
                      />
                    </Field>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      disabled={loading}
                      className={cn(
                        "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
                        loading
                          ? "bg-white/6 text-white opacity-60 cursor-not-allowed"
                          : "bg-white text-black hover:bg-white/90"
                      )}
                    >
                      {loading ? "Loading..." : "Save Changes"}
                    </button>
                  </div>
                </section>
              )}

              {activeTab === "profile" && (
                <section className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <InfoCard title="Profile visibility" value="Public" note="Your profile is visible to teammates and shared workspace members." />
                    <InfoCard title="Workspace role" value="Founder" note="You control billing, permissions, and integrations for the workspace." />
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                    <p className="text-sm uppercase tracking-widest text-white/40">Profile details</p>
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <Field label="Display name">
                        <input value={fullName} onChange={(event) => setFullName(event.target.value)} className={inputClass} />
                      </Field>
                      <Field label="Website">
                        <input placeholder="https://" className={inputClass} />
                      </Field>
                      <Field label="Bio" className="md:col-span-2">
                        <textarea
                          rows={4}
                          placeholder="Tell people what you're building with Oni."
                          className={cn(inputClass, "resize-none")}
                        />
                      </Field>
                    </div>
                  </div>
                </section>
              )}

              {activeTab === "billing" && (
                <section className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    {(["Free", "Pro", "Team"] as const).map((plan) => (
                      <button
                        key={plan}
                        type="button"
                        className={cn(
                          "rounded-xl border p-5 text-left transition-all",
                          currentPlan === plan
                            ? "border-white/20 bg-white/10"
                            : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold">{plan}</h3>
                          {currentPlan === plan && (
                            <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-black">Current</span>
                          )}
                        </div>
                        <p className="mt-3 text-sm text-white/45">Best for builders shipping fast with Oni.</p>
                      </button>
                    ))}
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm uppercase tracking-widest text-white/40">Current plan</p>
                        <div className="mt-2 flex items-center gap-3">
                          <h3 className="text-2xl font-semibold">{currentPlan}</h3>
                          <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/70">Recommended</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-white/90"
                      >
                        Upgrade Plan
                      </button>
                    </div>

                    <div className="mt-6">
                      <div className="mb-2 flex items-center justify-between text-sm text-white/45">
                        <span>Websites generated this month</span>
                        <span>{websitesGenerated}/{websitesLimit}</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/10">
                        <div
                          className="h-2 rounded-full"
                          style={{ width: `${usagePercent}%`, background: accent }}
                        />
                      </div>
                      <p className="mt-3 text-sm text-white/45">You’re using {websitesGenerated} of {websitesLimit} monthly generation credits.</p>
                    </div>
                  </div>
                </section>
              )}

              {activeTab === "api-keys" && (
                <section className="space-y-6">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                    <p className="text-sm uppercase tracking-widest text-white/40">API Keys</p>
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <KeyCard title="Production key" value="oni_live_••••••••••••" />
                      <KeyCard title="Development key" value="oni_dev_••••••••••••" />
                    </div>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <button type="button" className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black">Create new key</button>
                      <button type="button" className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10">Rotate keys</button>
                    </div>
                  </div>
                </section>
              )}

              {activeTab === "appearance" && (
                <section className="space-y-6">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                    <p className="text-sm uppercase tracking-widest text-white/40">Theme</p>
                    <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl border border-white/10 bg-black/20 p-2">
                      {themeOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setTheme(option)}
                          className={cn(
                            "rounded-lg px-4 py-2 text-sm transition-colors",
                            theme === option ? "bg-white text-black" : "text-white/60 hover:bg-white/5 hover:text-white"
                          )}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                    <p className="text-sm uppercase tracking-widest text-white/40">Accent color</p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      {accentColors.map((color) => (
                        <button
                          key={color.value}
                          type="button"
                          onClick={() => setAccent(color.value)}
                          className={cn(
                            "group flex items-center gap-3 rounded-xl border px-3 py-3 transition-all",
                            accent === color.value ? "border-white/30 bg-white/10" : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                          )}
                        >
                          <span
                            className="h-5 w-5 rounded-full border border-white/20"
                            style={{ background: color.value }}
                          />
                          <span className="text-sm text-white/75 group-hover:text-white">{color.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {activeTab === "notifications" && (
                <section className="space-y-4">
                  <ToggleRow title="Product updates" description="Receive release notes and new feature announcements." />
                  <ToggleRow title="Build alerts" description="Get notified when a generation finishes or fails." />
                  <ToggleRow title="Billing reminders" description="Monthly invoices and payment notices." />
                </section>
              )}

              {activeTab === "danger" && (
                <section className="space-y-6">
                  <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6">
                    <p className="text-sm uppercase tracking-widest text-red-200/60">Danger Zone</p>
                    <h3 className="mt-2 text-xl font-semibold text-white">Delete account</h3>
                    <p className="mt-2 max-w-2xl text-sm text-white/45">
                      This permanently removes your Oni workspace, generated projects, and billing history.
                    </p>

                    <button
                      type="button"
                      onClick={() => setShowDeleteModal(true)}
                      className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-red-500 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete Account
                    </button>
                  </div>
                </section>
              )}
            </div>
          </main>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#111111] p-6 shadow-2xl shadow-black/40">
            <div className="flex items-start gap-4">
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-red-200">
                <Trash2 className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white">Delete your Oni account?</h3>
                <p className="mt-2 text-sm leading-6 text-white/45">
                  This action cannot be undone. All generated sites and account data will be removed.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white transition-colors hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="rounded-lg bg-red-500 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-400"
              >
                Yes, delete account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={cn("space-y-2", className)}>
      <span className="text-sm text-white/40 uppercase tracking-widest">{label}</span>
      {children}
    </label>
  );
}

function InfoCard({
  title,
  value,
  note,
}: {
  title: string;
  value: string;
  note: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6">
      <p className="text-sm uppercase tracking-widest text-white/40">{title}</p>
      <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
      <p className="mt-2 text-sm text-white/45">{note}</p>
    </div>
  );
}

function KeyCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-5">
      <p className="text-sm uppercase tracking-widest text-white/40">{title}</p>
      <div className="mt-3 flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3">
        <span className="font-mono text-sm text-white/75">{value}</span>
        <button type="button" className="text-xs text-white/45 transition-colors hover:text-white">
          Copy
        </button>
      </div>
    </div>
  );
}

function ToggleRow({ title, description }: { title: string; description: string }) {
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 p-5">
      <div>
        <h3 className="text-base font-medium text-white">{title}</h3>
        <p className="mt-1 text-sm text-white/45">{description}</p>
      </div>
      <button
        type="button"
        onClick={() => setEnabled((current) => !current)}
        className={cn(
          "relative h-8 w-14 rounded-full border transition-colors",
          enabled ? "border-white/20 bg-white/10" : "border-white/10 bg-white/5"
        )}
        aria-pressed={enabled}
      >
        <span
          className={cn(
            "absolute top-1 h-6 w-6 rounded-full transition-transform",
            enabled ? "translate-x-7 bg-white" : "translate-x-1 bg-white/35"
          )}
        />
      </button>
    </div>
  );
}

function getTitle(tab: TabKey) {
  switch (tab) {
    case "account":
      return "Manage your account";
    case "profile":
      return "Build your public profile";
    case "billing":
      return "Billing and plan usage";
    case "api-keys":
      return "Control your API access";
    case "appearance":
      return "Match the workspace to your taste";
    case "notifications":
      return "Choose what Oni should alert you about";
    case "danger":
      return "Irreversible actions";
  }
}

function getDescription(tab: TabKey) {
  switch (tab) {
    case "account":
      return "Update the core identity details tied to your Oni workspace.";
    case "profile":
      return "Control what teammates and collaborators see when they find you.";
    case "billing":
      return "Track usage, review your current plan, and upgrade when you're ready.";
    case "api-keys":
      return "Create and rotate keys for product integrations and automations.";
    case "appearance":
      return "Set a theme and accent that feels at home in a dark builder interface.";
    case "notifications":
      return "Quiet the noise or stay updated on the moments that matter.";
    case "danger":
      return "These controls affect account data and workspace history permanently.";
  }
}

const inputClass =
  "w-full rounded-lg border border-white/10 bg-transparent px-4 py-2 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30";
