import HomeOverview from "@/components/modules/eventHome/HomeOverview";
import { getAllUpcomingEvent } from "@/services/Event";


const HomePage = async () => {
  const { data: events  } = await getAllUpcomingEvent();

  if (!events) {
    return <h1>featuredEvent not found</h1>
  }
  return (
    <div>
      <HomeOverview events={events}/>
    </div>
  );
};

export default HomePage;