import { MOCK_EVENTS } from "@/lib/fakedata";
import HeroSection from "@/components/modules/Event/Details/HeroSection";
import EventNotFound from "@/components/modules/Event/Details/EventNotFound";
import { getSingleEventDetails } from "@/services/Event";
import MainContent from "@/components/modules/Event/Details/MainContent";

export default async function EventPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const { data: event} = await getSingleEventDetails(id);

  if (!event) {
    return <EventNotFound />;
  }
  return (
    <div className="pb-16">
      {/* Hero section */}
      <HeroSection event={event} />
      <div className="container px-4 md:px-6 mx-auto mt-10">
        <div className="">
          {/* Main content */}
          <MainContent event={event} />
          {/* <DetailsSidebar event={event} /> */}
        </div>
      </div>
    </div>
  );
}
