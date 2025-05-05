"use client";
import NMContainer from "@/components/ui/core/NMContainer";
import HeroSection from "./HeroSection";
import UpcomingEvents from "./UpcomingEvents";
import { EventType } from "@/types/event";
import { useUser } from "@/context/UserContext";

const HomeOverview = ({ events }: { events: EventType[] }) => {
  const { user } = useUser();
  let top9Events;
  let featuredEvent;

  if (user?.email) {
    top9Events = events?.slice(1, 10) || [];
    featuredEvent = top9Events[0];
  } else if (!user?.email) {
    top9Events = events?.filter((event) => event.is_public)?.slice(1, 9) || [];
    featuredEvent = top9Events[0];
  }

  return (
    <div>
      <HeroSection featuredEvent={featuredEvent || events[0]} />
      <NMContainer>
        <UpcomingEvents top9Events={top9Events || []} />
      </NMContainer>
    </div>
  );
};

export default HomeOverview;
