"use client";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import EventSlider from "../../eventHome/UpcomingEvents/EventSlider";
import { cn } from "@/lib/utils";

export default function DashboardMyEvents({ events, className }: { events: any[], className?: string }) {
  
  return (
    <div className="grid ">
      <div className={cn(`flex items-center justify-between mt-5`)}>
        <h1 className="text-3xl font-bold tracking-tight">My Events</h1>
        <Button asChild className={cn(className)}>
          <Link href="/user/create-event">
            <Plus className="mr-2 h-4 w-4" />
            Create Event
          </Link>
        </Button>
      </div>

      {events.length > 0 ? (
        <EventSlider events={events} />
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center my-5">
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
