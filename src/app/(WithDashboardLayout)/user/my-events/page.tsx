import DashboardMyEvents from "@/components/modules/dashboard/DashboardMyEvents/DashboardMyEvents";
import { getMyEvent } from "@/services/Event";

const DashboardMyEventPage = async () => {
  const data = await getMyEvent();
  console.log("🐌🐌🐌🐌", data.data.data);
  

if (data.data.data.length === 0) {
    <h1>Data Not Found</h1>
}

  return (
    <div className="p-10">
      <DashboardMyEvents events={data.data.data} />
    </div>
  );
};

export default DashboardMyEventPage;