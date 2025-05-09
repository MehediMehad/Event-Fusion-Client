import EventNotFound from "@/components/modules/Event/Details/EventNotFound";
import { UpdateEvents } from "@/components/modules/Event/Details/Organizer/UpdateEvents";
import { getSingleEventDetails } from "@/services/Event";

// Define reusable PageProps type (optional but clean)
type PageProps<Params = any> = {
  params: Promise<Params>;
};

export default async function UpdateEventPage({
  params,
}: PageProps<{ id: string }>) {
  const { id } = await params;
  const { data: event } = await getSingleEventDetails(id);

  if (!event) {
    return <EventNotFound />;
  }
  return (
    <div>
      <UpdateEvents event={event} />
    </div>
  );
}
