import NMContainer from "@/components/ui/core/NMContainer";
import EventSlider from "./EventSlider";
import { EventType } from "@/types/event";


const UpcomingEvents = ({top9Events}: {top9Events:  EventType[]}) => {
  if (!top9Events) {
    return <NMContainer>
     <h1 className="h-[80vh] bg-black/5 pt-10 text-center">Upcoming Events not found</h1>
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

