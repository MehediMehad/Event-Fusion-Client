import DashboardCards from "@/components/modules/admin/Dashboard/DashboardCards";
import { getAdminDashboardInfo } from "@/services/User";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const dashboardData = await getAdminDashboardInfo();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      <DashboardCards data={dashboardData.data.dashboardSummary} />
    </div>
  );
}