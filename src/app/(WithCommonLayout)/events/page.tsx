import EventsOverView from "@/components/modules/Events/EventsOverView";
import { getAllEventsDetailsPage } from "@/services/Event";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const EventsPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const query = await searchParams;

  const page = query.page?.toString() || "1";
  const limit = query.limit?.toString() || "10";
  const searchTerm = query.searchTerm?.toString();
  const filterData = query.filterData?.toString();

  const events = await getAllEventsDetailsPage(
    {
      searchTerm,
      filterData,
    },
    {
      page,
      limit,
    },
  );
  if (!events?.data) {
    return <h1>Event not found</h1>;
  }

  return (
    <div>
      <EventsOverView events={events.data.data} meta={events.data.meta} />
    </div>
  );
};

export default EventsPage;
