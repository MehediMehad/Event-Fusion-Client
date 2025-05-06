import { FakeEventType } from "@/lib/fakedata";
import EventCard from "./EventCard";

interface EventsGridProps {
  events: FakeEventType[];
  compact?: boolean;
}

export default function EventsGrid({ events, compact = false }: EventsGridProps) {
  if (events.length === 0) {
    return (
      <div className="flex min-h-[200px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <h3 className="mb-2 text-lg font-semibold">No events found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event.id} event={event} compact={compact} />
      ))}
    </div>
  );
}