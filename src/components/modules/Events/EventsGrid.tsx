"use client";
import { EventType } from "@/types/event";
import EventCard from "../eventHome/UpcomingEvents/EventCard";
import NoDataFound from "@/components/shared/NoDataFound";
import { cn } from "@/lib/utils";

export default function EventsGrid({ events, className }: { events: EventType[], className?: string }) {
  if (!events || events.length === 0) {
    return <NoDataFound message="No events found matching your criteria." />;
  }


  return (
    <div className={cn("grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3", className)}>
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
