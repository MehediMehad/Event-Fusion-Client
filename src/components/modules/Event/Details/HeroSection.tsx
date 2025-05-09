import { TEventResponse, EventType } from "@/types/event";
import Image from "next/image";

const HeroSection = ({ event }: { event: TEventResponse }) => {
  
  return (
    <div className="relative h-[40vh] w-full md:h-[40vh]">
      <Image
        src={event.metadata.coverPhoto}
        alt={event.metadata.title}
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
    </div>
  );
};

export default HeroSection;
