'use client';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { EventType } from "@/types/event";
import EventCard from "./EventCard";

interface EventSliderProps {
  events: EventType[];
}

export default function EventSlider({ events }: EventSliderProps) {
  return (
    <div className="mt-8 relative">
      <Carousel>
        <CarouselContent>
          {events.map((event) => (
            <CarouselItem
              key={event.id}
              className="sm:basis-1/2 lg:basis-1/3"
            >
              <EventCard event={event} />
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious  />
        <CarouselNext /> */}
      </Carousel>
    </div>
  );
}
