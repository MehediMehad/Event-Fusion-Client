import EventForm from "@/components/modules/Event/CreateEvent/EventForm"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Create Event",
  description: "Create a new event for others to join",
}

export default function CreateEventPage() {
  return (
    <div className="container mx-auto max-w-4xl">
      <div className="mb-2 text-primary">
        <h1 className="text-3xl font-bold">Create New Event</h1>
      </div>
      <EventForm />
    </div>
  )
}
