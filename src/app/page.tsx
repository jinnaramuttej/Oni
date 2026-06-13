import { cookies } from "next/headers";

import { HomePage } from "@/components/ui/home-page";
import { LandingPage } from "@/components/ui/landing-page";
import { getUserFromSession } from "@/lib/auth";

export default async function Home() {
  const cookieStore = await cookies();
  const session = cookieStore.get("oni_session")?.value;
  const user = await getUserFromSession(session);

  if (!user) {
    return <LandingPage />;
  }

  return <HomePage />;
}
