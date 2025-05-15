import { TEventResponse } from "@/types/event";
import TopSession from "./Organizer/TopSession";
import EventInfo from "./Organizer/EventInfo";
import { TReviewData } from "@/types/review";
import DetailsSidebar from "./DetailsSidebar";

const MainContent = ({ event }: { event: TEventResponse,}) => {
  return (
    <div className="grid grid-cols-3 gap-x-5">
      <div className="col-span-2">
        <TopSession event={event} />
        <EventInfo event={event} />
      </div>
      <div className="col-span-1">
        <DetailsSidebar event={event}/>
      </div>
    </div>
  );
};

export default MainContent;
