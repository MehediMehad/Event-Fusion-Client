import DashboardMyEvents from "@/components/modules/Dashboard/DashboardMyEvents/DashboardMyEvents";
import { getMyEvent } from "@/services/Event";

// 🔁 Disable static generation for this page
export const dynamic = 'force-dynamic';

const DashboardMyEventPage = async () => {
  const data = await getMyEvent();

  return (
    <div className="p-10">
      <DashboardMyEvents events={data.data} />
    </div>
  );
};

export default DashboardMyEventPage;