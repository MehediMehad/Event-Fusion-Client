import EventsOverView from "@/components/modules/Events/EventsOverView";
import { getAllEventsDetailsPage } from "@/services/Event";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const EventsPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const query = await searchParams;
  const page = query.page?.toString() || "1";
  const limit = query.limit?.toString() || "10"; 

  const { data: events } = await getAllEventsDetailsPage(
    {
      searchTerm: query.searchTerm?.toString(),
      filterData: query.filterData?.toString()
    },
    {
      page,
      limit
    }
  );

  if (!events) {
    return <h1>Event not found</h1>;
  }

  return (
    <div>
      <EventsOverView events={events.data} />
    </div>
  );
};

export default EventsPage;