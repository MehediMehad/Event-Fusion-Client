import HeroSection from "@/components/modules/eventHome/HeroSection";
import UpcomingEvents from "@/components/modules/eventHome/UpcomingEvents";
import NMContainer from "@/components/ui/core/NMContainer";

const HomePage = async () => {
  return (
    <div>
      <HeroSection />
      <NMContainer>
        <UpcomingEvents />
      </NMContainer>
    </div>
  );
};

export default HomePage;
