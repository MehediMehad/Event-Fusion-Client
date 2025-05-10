import NMContainer from "@/components/ui/core/NMContainer";
import HeroSection from "./HeroSection";
import UpcomingEvents from "./UpcomingEvents";
import { EventType } from "@/types/event";
import HowItWorksSection from "./HowItWorksSection";

const HomeOverview = ({ events, heroSection }: { events: EventType[], heroSection: EventType }) => {


  return (
    <div>
      <HeroSection featuredEvent={heroSection}/>
      <NMContainer>
        <UpcomingEvents top9Events={events || []} />
      </NMContainer>
      <HowItWorksSection/>
    </div>
  );
};

export default HomeOverview;
