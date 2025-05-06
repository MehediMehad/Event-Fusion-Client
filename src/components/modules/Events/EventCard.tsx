import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Users, DollarSign, Lock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { formatDate } from '@/lib/format';
import { EventType } from '@/types/event';
import { FakeEventType } from '@/lib/fakedata';

interface EventCardProps {
  event: FakeEventType;
  compact?: boolean;
}

export default function EventCard({ event, compact = false }: EventCardProps) {
  return (
    <Link href={`/events/${event.id}`}>
      <Card className="h-full overflow-hidden transition-all hover:shadow-md">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={event.coverImage}
            alt={event.title}
            fill
            className="object-cover"
          />
          <div className="absolute right-2 top-2 flex gap-1">
            {event.isPrivate && (
              <Badge variant="secondary" className="gap-1">
                <Lock className="h-3 w-3" />
                <span>Private</span>
              </Badge>
            )}
            {event.price > 0 && (
              <Badge variant="secondary" className="gap-1">
                <DollarSign className="h-3 w-3" />
                <span>${event.price.toFixed(2)}</span>
              </Badge>
            )}
          </div>
        </div>
        <CardContent className={compact ? "p-3" : "p-5"}>
          <h3 className={`line-clamp-1 font-bold ${compact ? "text-base" : "text-lg"}`}>
            {event.title}
          </h3>
          {!compact && (
            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
              {event.description}
            </p>
          )}
          <div className={`mt-2 flex items-center gap-2 text-xs text-muted-foreground ${compact ? "" : "mt-4"}`}>
            <Calendar className="h-3.5 w-3.5" />
            <span>{formatDate(event.date)}</span>
          </div>
        </CardContent>
        <CardFooter className={`border-t px-5 py-3 ${compact ? "p-3" : ""}`}>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-1.5 text-xs">
              <Users className="h-3.5 w-3.5" />
              <span>{event.participantsCount} attendees</span>
            </div>
            <p className="text-xs font-medium">
              {event.organizer}
            </p>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}