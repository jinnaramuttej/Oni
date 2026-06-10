import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { DashboardShell } from "@/components/ui/dashboard-shell";
import { getUserFromSession } from "@/lib/auth";

export default async function SettingsPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("oni_session")?.value;
  const user = await getUserFromSession(session);

  if (!user) {
    redirect("/signin");
  }

  return (
    <div className="dark">
      <DashboardShell>
        <div className="mx-auto w-full max-w-3xl space-y-6 p-4">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-white/45">Account</p>
            <h2 className="mt-2 text-3xl font-semibold text-foreground">Settings</h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 text-white shadow-xl shadow-black/20">
              <p className="text-sm font-medium text-white/70">Profile</p>
              <div className="mt-4 space-y-2">
                <p className="text-2xl font-semibold text-white">{user.name}</p>
                <p className="text-sm text-white/60">{user.email}</p>
                <p className="text-xs text-white/40">Joined {new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
            </section>

            <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 text-white shadow-xl shadow-black/20">
              <p className="text-sm font-medium text-white/70">Session</p>
              <div className="mt-4 space-y-3 text-sm text-white/60">
                <p>Manage your profile and sign out from the menu in the sidebar.</p>
                <p>Dashboard navigation now returns you to the main chat workspace.</p>
              </div>
            </section>
          </div>
        </div>
      </DashboardShell>
    </div>
  );
}