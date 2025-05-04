import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Users, DollarSign, Lock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { formatDate, formatTime } from '@/lib/format';
import { EventType } from '@/types/event';

interface EventCardProps {
  event: EventType;
  compact?: boolean;
}

export default function EventCard({ event, compact = false }: EventCardProps) {
  return (
    <Link href={`/events/${event.id}`} className="group">
      <Card className="h-full overflow-hidden transition-all duration-300 transform hover:bg-secondary/90 rounded-xl border border-border/50 backdrop-blur-sm">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={event.coverPhoto}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-100"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          {/* Badges */}
          <div className="absolute right-2 top-2 flex gap-1">
            {event.is_public !== undefined && (
              <Badge 
                variant="secondary" 
                className="gap-1 bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30 transition-all"
              >
                {event.is_public ? (
                  <>
                    <Lock className="h-3 w-3" /> Public
                  </>
                ) : (
                  <>
                    <Lock className="h-3 w-3" /> Private
                  </>
                )}
              </Badge>
            )}
            <Badge 
              variant="secondary" 
              className={`gap-1 ${
                event.registration_fee > 0 
                  ? "bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30" 
                  : "bg-green-500/20 text-green-300 border border-green-500/30"
              } transition-all`}
            >
              {event.registration_fee > 0 ? (
                <>
                  <DollarSign className="h-3 w-3" />
                  ${event.registration_fee.toFixed(2)}
                </>
              ) : (
                "Free"
              )}
            </Badge>
          </div>
        </div>
        <CardContent className={compact ? "p-3" : "p-5"}>
          <h3 className={`line-clamp-1 font-bold text-primary ${compact ? "text-base" : "text-lg"} text-base group-hover:text-primary transition-colors`}>
            {event.title}
          </h3>
          {!compact && (
            <p className="mt-2 line-clamp-2 text-sm text-base/80">
              {event.description}
            </p>
          )}
          <div className={`mt-2 flex items-center gap-2 text-xs text-base/70 ${compact ? "" : "mt-4"}`}>
            <Calendar className="h-3.5 w-3.5" />
            <span>{formatDate(event.date_time)} {formatTime(event.date_time)}</span>
          </div>
        </CardContent>
        <CardFooter className={`border-t px-5 py-3 ${compact ? "p-3" : ""} bg-white/5 backdrop-blur-sm group-hover:bg-white/10 transition-colors`}>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-1.5 text-xs text-base/80">
              <Users className="h-3.5 w-3.5" />
              <span>20 attendees</span>
            </div>
            <p className="text-xs font-medium text-base/90 transition-colors">
              Hosted by {event.organizer.name}
            </p>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}