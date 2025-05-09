import DashboardMyEvents from "@/components/modules/dashboard/DashboardMyEvents/DashboardMyEvents";
import { getMyEvent } from "@/services/Event";

// 🔁 Disable static generation for this page
export const dynamic = 'force-dynamic';

const DashboardMyEventPage = async () => {
  const data = await getMyEvent();

  // Safely handle error or empty data
  if (!data || data.error || !data.data || data.data.length === 0) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-xl font-semibold">No events found.</h1>
      </div>
    );
  }

  return (
    <div className="p-10">
      <DashboardMyEvents events={data.data} />
    </div>
  );
};

export default DashboardMyEventPage;