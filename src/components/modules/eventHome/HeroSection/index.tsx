import { getUpcomingLastEvent } from "@/services/Event";
import FeaturedEvent from "./FeaturedEvent";
import NMContainer from "@/components/ui/core/NMContainer";

const HeroSection = async () => {
     const { data: featuredEvent  } = await getUpcomingLastEvent();
     if (!featuredEvent) {

       return <NMContainer>
        <h1 className="h-[80vh] bg-black/5 pt-10 text-center">featuredEvent not found</h1>
       </NMContainer>
     }
  return (
    <div>
      <FeaturedEvent event={featuredEvent} />
    </div>
  );
};

export default HeroSection;