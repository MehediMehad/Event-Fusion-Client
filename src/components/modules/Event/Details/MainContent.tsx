import { TEventResponse } from "@/types/event";
import TopSession from "./Organizer/TopSession";
import EventInfo from "./Organizer/EventInfo";

const MainContent = ({ event }: { event: TEventResponse }) => {
  return (
    <div>
      <div className="md:col-span-2">
        <TopSession event={event} />
        <EventInfo event={event} />
      </div>
    </div>
  );
};

export default MainContent;
