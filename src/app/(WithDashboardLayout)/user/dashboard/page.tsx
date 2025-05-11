import DashboardOverview from "@/components/modules/Dashboard/Dashboard/DashboardOverview";
import { getMyEvent } from "@/services/Event";
import { myPendingNotification } from "@/services/Invitation";
import { getMyDashboardInfo } from "@/services/User";

// 🔁 Disable static generation for this page
export const dynamic = 'force-dynamic';

export default async function UserDashboard() {
    const data = await getMyEvent();
    const notification = await myPendingNotification();
    const dashboardData = await getMyDashboardInfo();
    
  
  return (
    <div>
      <DashboardOverview events={data.data} notification={notification.data} dashboardSummary={dashboardData.data.dashboardSummary} />
    </div>
  );
}
