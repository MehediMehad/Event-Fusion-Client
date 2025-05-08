import EventNotFound from "@/components/modules/Event/Details/EventNotFound";
import { UpdateEvents } from "@/components/modules/Event/Details/Organizer/UpdateEvents";
import { getSingleEventDetails } from "@/services/Event";

export default async function UpdateEventPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
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
