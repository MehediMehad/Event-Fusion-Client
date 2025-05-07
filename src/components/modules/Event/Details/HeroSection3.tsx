import { TEventResponse } from "@/types/event";
import Image from "next/image";

const HeroSection3 = ({ event }: { event: any }) => {
  console.log({event});
  
  return (
    <div className="relative h-[40vh] w-full md:h-[40vh]">
      <Image
        src={event.coverImage}
        alt={event.title}
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
    </div>
  );
};

export default HeroSection3;
