import Link from "next/link";
import Image from "next/image";
import { Calendar, Users, DollarSign, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatDate, formatTime } from "@/lib/format";
import { EventType } from "@/types/event";

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
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-100"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-black/10 to-transparent"></div>
          {/* Badges */}
          <div className="absolute right-2 top-2 flex gap-1">
            {event.is_public !== undefined && (
              <Badge
                variant="secondary"
                className={`gap-1 ${
                  event.is_public
                    ? "bg-green-100 text-green-700 border border-green-300 hover:bg-green-200"
                    : "bg-red-100 text-red-700 border border-red-300 hover:bg-red-200"
                } backdrop-blur-md transition-all`}
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
                  ? "bg-yellow-100 text-yellow-700 border border-yellow-300 hover:bg-yellow-200"
                  : "bg-green-100 text-green-700 border border-green-300 hover:bg-green-200"
              } backdrop-blur-md transition-all`}
            >
              {event.registration_fee > 0 ? (
                <>
                  <DollarSign className="h-3 w-3" />$
                  {event.registration_fee.toFixed(2)}
                </>
              ) : (
                "Free"
              )}
            </Badge>
          </div>
        </div>
        <CardContent className={compact ? "p-3" : "p-5"}>
          <h3
            className={`line-clamp-1 font-bold text-primary ${
              compact ? "text-base" : "text-lg"
            } text-base group-hover:text-primary transition-colors`}
          >
            {event.title}
          </h3>
          {!compact && (
            <p className="mt-2 line-clamp-2 text-sm text-base/80">
              {event.description}
            </p>
          )}
        </CardContent>
        <CardFooter
          className={`border-t px-5 py-3 ${
            compact ? "p-3" : ""
          } bg-white/5 backdrop-blur-sm group-hover:bg-white/10 transition-colors`}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-1.5 text-xs text-base/80">
              <div
                className={`flex items-center gap-2 text-xs text-base/70 ${
                  compact ? "" : ""
                }`}
              >
                <Calendar className="h-3.5 w-3.5" />
                <span>
                  {formatDate(event.date_time)} {formatTime(event.date_time)}
                </span>
              </div>
            </div>
            <p className="text-xs font-medium text-base/90 transition-colors">
              Hosted by {event.organizer?.name}
            </p>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
