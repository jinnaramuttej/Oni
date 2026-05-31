import { Demo } from "@/app/signin-demo/demo";
import { DashboardShell } from "@/components/ui/dashboard-shell";

export default function Home() {
  return (
    <div className="dark">
      <DashboardShell>
        <Demo />
      </DashboardShell>
    </div>
  );
}
