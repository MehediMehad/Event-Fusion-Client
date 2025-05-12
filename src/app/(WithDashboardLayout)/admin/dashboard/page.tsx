import DashboardCards from "@/components/modules/admin/Dashboard/DashboardCards";
import { getMyEvent } from "@/services/Event";
import { myPendingNotification } from "@/services/Invitation";
import { getAdminDashboardInfo } from "@/services/User";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const data = await getMyEvent();
  const notification = await myPendingNotification();
  const dashboardData = await getAdminDashboardInfo();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      <DashboardCards
        events={data.data}
        notification={notification.data}
        dashboardSummary={dashboardData.data.dashboardSummary}
      />
    </div>
  );
}
