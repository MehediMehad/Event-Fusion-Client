"use client";
import { EventType } from "@/types/event";
import EventCard from "../eventHome/UpcomingEvents/EventCard";
import NoDataFound from "@/components/shared/NoDataFound";

export default function EventsGrid({ events }: { events: EventType[] }) {
  if (!events || events.length === 0) {
    return <NoDataFound message="No events found matching your criteria." />;
  }


  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        events.map((event) => (
          <EventCard key={event.id} event={event}/>
        ))
      )}
    </div>
  );
}
