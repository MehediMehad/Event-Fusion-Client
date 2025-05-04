// import Category from "@/components/modules/home/Category";
// import FeaturedProducts from "@/components/modules/home/FeaturedProducts";
// import FlashSale from "@/components/modules/home/FlashSale";
// import HeroSection from "@/components/modules/home/HeroSection";
// import TopBrands from "@/components/modules/home/TopBrands";

import FeaturedEvent from "@/components/modules/eventHome/FeaturedEvent";
import { getUpcomingLastEvent } from "@/services/Event";

const HomePage = async () => {
    const { data: featuredEvent  } = await getUpcomingLastEvent();
    console.log({featuredEvent});
    
  return (
    <div>
      <FeaturedEvent event={featuredEvent} />
    </div>
  );
};

export default HomePage;
