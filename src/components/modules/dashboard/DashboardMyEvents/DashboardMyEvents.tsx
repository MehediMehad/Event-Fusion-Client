"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import EventsGrid from "@/components/modules/Events/EventsGrid";

export default function DashboardMyEvents({ events }: { events: any[] }) {
  // Filter events created by the user
  //   const userEvents = MOCK_EVENTS.filter((event) => event.organizerId === user.id);

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">My Events</h1>
        <Button asChild>
          <Link href="/user/create-event">
            <Plus className="mr-2 h-4 w-4" />
            Create Event
          </Link>
        </Button>
      </div>

      {events.length > 0 ? (
        <EventsGrid
          events={events}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        />
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <h3 className="mb-2 text-lg font-semibold">No events yet</h3>
          <p className="mb-4 text-muted-foreground">
            You haven&apos;t created any events yet. Create your first event
            now!
          </p>
          <Button asChild>
            <Link href="/user/create-event">Create Event</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
