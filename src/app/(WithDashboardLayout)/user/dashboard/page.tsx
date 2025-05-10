import DashboardOverview from "@/components/modules/Dashboard/Dashboard/DashboardOverview";
import { getMyEvent } from "@/services/Event";
import { myPendingNotification } from "@/services/Invitation";

// 🔁 Disable static generation for this page
export const dynamic = 'force-dynamic';

export default async function UserDashboard() {
    const data = await getMyEvent();
    const notification = await myPendingNotification();
  
  return (
    <div>
      <DashboardOverview events={data.data} notification={notification.data} />
    </div>
  );
}
