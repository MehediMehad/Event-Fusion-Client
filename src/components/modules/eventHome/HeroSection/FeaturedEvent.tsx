"use client";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
// import { formatDate, formatTime } from '@/lib/format';
import { formatDate, formatTime } from "@/lib/format";
import { useUser } from "@/context/UserContext";
import { EventType } from "@/types/event";
import NMContainer from "@/components/ui/core/NMContainer";

interface FeaturedEventProps {
  event: EventType;
}

export default function FeaturedEvent({ event }: FeaturedEventProps) {
  const { user } = useUser();
  const userRole = user?.role.toLocaleLowerCase()
  
  const getEventBadge = () => {
    if (event.is_public && event.registration_fee > 0) {
      return <Badge variant="secondary">Public & Paid</Badge>;
    } else if (!event.is_public && event.registration_fee > 0) {
      return <Badge variant="secondary">Private & Paid</Badge>;
    } else if (event.is_public && event.registration_fee === 0) {
      return <Badge variant="secondary">Public & Free </Badge>;
    } else if (!event.is_public && event.registration_fee === 0) {
      return <Badge variant="secondary">Private && Free</Badge>;
    } else if (event.registration_fee > 0) {
      return <Badge variant="secondary">Paid</Badge>;
    } else {
      return <Badge variant="secondary">Free</Badge>;
    }
  };

  const joinEvent = () => {
    if (event.is_public) {
      return (
        <Button
          size="lg"
          className={cn(
            "transition-all hover:shadow-lg",
            event.registration_fee > 0
              ? "bg-primary hover:bg-primary/90"
              : "bg-primary hover:bg-primary/90"
          )}
          asChild
        >
          <Link href={`/events/${event.id}`}>
            {event.registration_fee > 0
              ? `Register • $${event.registration_fee.toFixed(2)}`
              : "Register for Free"}
          </Link>
        </Button>
      );
    } else if (!event.is_public) {
      return (
        <Button
          size="lg"
          className={cn(
            "transition-all hover:shadow-lg",
            event.registration_fee > 0
              ? "bg-primary hover:bg-primary/90"
              : "bg-primary hover:bg-primary/90"
          )}
          asChild
        >
          <Link href={`/request/${event.id}`}>
            {event.registration_fee > 0
              // ? `Join Request • $${event.registration_fee.toFixed(2)}`
              ? `Join Request`
              : "Join Request"}
          </Link>
        </Button>
      );
    }
  };

  return (
    <NMContainer>
      <section className="relative">
        <div className="absolute inset-0 z-0">
          <div className="relative h-full w-full">
            <Image
              src={event.coverPhoto}
              alt={event.title}
              fill
              priority
              className="object-cover brightness-[0.4]"
            />
          </div>
        </div>
        <div className="container relative z-10 px-4 py-20 md:px-6 md:py-32 h-[80vh] flex items-center">
          <div className="flex max-w-3xl flex-col gap-[18px] pl-5">
            <div className="flex items-center gap-3">
              {getEventBadge()}
              <span className="text-sm font-medium text-white/90">
                Hosted by {event?.organizer?.name}
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              {event.title}
            </h1>
            <p className="text-xl text-white/90">{event.description}</p>
            <div className="flex flex-wrap gap-4 text-white/90">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-5 w-5" />
                <span>{formatDate(event.date_time)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-5 w-5" />
                <span>{formatTime(event.date_time)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="h-5 w-5" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                {/* <Users className="h-5 w-5" /> */}
                {/* <span>{event.participantsCount} attending</span> */}
                {/* <span>20 attending</span> */}
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              {/* <Button
                size="lg"
                className={cn(
                  "transition-all hover:shadow-lg",
                  event.registration_fee > 0
                    ? "bg-primary hover:bg-primary/90"
                    : "bg-primary hover:bg-primary/90"
                )}
                asChild
              >
                <Link href={`/events/${event.id}`}>
                  {event.registration_fee > 0
                    ? `Register • $${event.registration_fee.toFixed(2)}`
                    : "Register for Free"}
                </Link>
              </Button> */}
              {joinEvent()}
              {user && (
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-secondary hover:bg-secondary/90"
                  asChild
                >
                  <Link href={`/${userRole}/create-event`}>
                    Create Your Event
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </NMContainer>
  );
}
