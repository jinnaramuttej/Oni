import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { SettingsPage } from "@/components/ui/settings-page";
import { getUserFromSession } from "@/lib/auth";

export default async function SettingsRoute() {
  const cookieStore = await cookies();
  const session = cookieStore.get("oni_session")?.value;
  const user = await getUserFromSession(session);

  if (!user) {
    redirect("/signin");
  }

  return <SettingsPage />;
}