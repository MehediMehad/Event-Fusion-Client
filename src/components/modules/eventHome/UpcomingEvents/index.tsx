import NMContainer from "@/components/ui/core/NMContainer";
import EventSlider from "./EventSlider";
import { getAllUpcomingEvent } from "@/services/Event";

const UpcomingEvents = async () => {
  const { data: events  } = await getAllUpcomingEvent();
  const top9Events = events?.slice(1, 10) || [];
  if (!top9Events) {

    return <NMContainer>
     <h1 className="h-[80vh] bg-black/5 pt-10 text-center">featuredEvent not found</h1>
    </NMContainer>
  }
  
  return (
<section className="container px-4 my-20">
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold tracking-tight">Upcoming Events</h2>
          {/* <p className="text-muted-foreground">
            Discover exciting events happening near you or online
          </p> */}
        </div>
        <EventSlider events={top9Events} />
      </section>
  );
};

export default UpcomingEvents;

