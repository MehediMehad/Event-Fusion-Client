import EventForm from "@/components/modules/Event/CreateEvent/EventForm"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Create Event",
  description: "Create a new event for others to join",
}

export default function CreateEventPage() {
  return (
    <div className="container mx-auto max-w-4xl py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create New Event</h1>
        <p className="text-muted-foreground mt-2">
          Fill in the details below to create your event. You can make it public or private, and optionally set a
          registration fee.
        </p>
      </div>
      <EventForm />
    </div>
  )
}
