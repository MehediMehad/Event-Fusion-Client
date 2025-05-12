import HomeOverview from "@/components/modules/eventHome/HomeOverview";
import { getAllUpcomingEvent } from "@/services/Event";

const HomePage = async () => {
  const { data: events } = await getAllUpcomingEvent();
  const eventData = events?.filteredEvents;
  const heroSection = events?.heroEvent
  

  if (!eventData) {
    return <h1>featuredEvent not found</h1>;
  }
  return (
    <div>
      <HomeOverview events={eventData} heroSection={heroSection} />
    </div>
  );
};

export default HomePage;
