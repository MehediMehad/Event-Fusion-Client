import { MOCK_EVENTS } from "@/lib/fakedata";
import DetailsSidebar from "@/components/modules/Event/Details/DetailsSidebar";
import EventNotFound from "@/components/modules/Event/Details/EventNotFound";
import MainContent3 from "@/components/modules/Event/Details/MainContent3";
import HeroSection3 from "@/components/modules/Event/Details/HeroSection3";

export default function EventPage({ params }: { params: { id: string } }) {
  const { id } = params;
  console.log({ id });

  // In a real app, fetch event by ID from API
  const event = MOCK_EVENTS.find((e) => e.id === id);
  if (!event) {
    return <EventNotFound />;
  }

  return (
    <div className="pb-28">
      {/* Hero section */}
      <HeroSection3 event={event} />
      <div className="container px-4 md:px-6 mx-auto mt-10">
        <div className="grid gap-8 md:grid-cols-3">
          <MainContent3 event={event} />
          <DetailsSidebar event={event} />
        </div>
      </div>
    </div>
  );
}