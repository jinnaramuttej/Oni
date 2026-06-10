import { cookies } from "next/headers";

import { Demo } from "@/app/signin-demo/demo";
import { LandingPage } from "@/components/ui/landing-page";
import { DashboardShell } from "@/components/ui/dashboard-shell";
import { getUserFromSession } from "@/lib/auth";

export default async function Home() {
  const cookieStore = await cookies();
  const session = cookieStore.get("oni_session")?.value;
  const user = await getUserFromSession(session);

  if (!user) {
    return <LandingPage />;
  }

  return (
    <div className="dark">
      <DashboardShell>
        <Demo />
      </DashboardShell>
    </div>
  );
}
