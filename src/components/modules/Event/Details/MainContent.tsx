"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { toast } from "@/hooks/use-toast";
import { formatCurrency, formatDate, formatTime } from "@/lib/format";
import { TEventResponse } from "@/types/event";
import {
  Calendar,
  Clock,
  DollarSign,
  Edit,
  Heart,
  Lock,
  MapPin,
  Share,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const MainContent = ({ event }: { event: TEventResponse }) => {
  const { user } = useUser();
  const router = useRouter();
  const isOrganizer = user?.userId === event.metadata.organizer.id;

  const [isJoining, setIsJoining] = useState(false);
  //TODO: Check if user has joined the event
  const hasJoined = false;
  // user &&
  // event.participation.userId.some(
  //   (p) => p.userId === user.userId && p.status === "approved"
  // );

  const handleDeleteEvent = () => {
    // In a real app, make an API call to delete the event
    toast({
      title: "Event Deleted",
      description: "The event has been successfully deleted.",
    });
    router.push("/dashboard/events");
  };

  const handleJoinEvent = () => {
    if (!user) {
      router.push("/auth/login");
      return;
    }
  };

  const getJoinButtonText = () => {
    if (!event.metadata.is_public && event.metadata.registration_fee > 0) {
      return "Request & Pay";
    } else if (!event.metadata.is_public) {
      return "Request to Join";
    } else if (event.metadata.registration_fee > 0) {
      return `Pay & Join • ${formatCurrency(event.metadata.registration_fee)}`;
    } else {
      return "Join for Free";
    }
  };

  return (
    <div className="md:col-span-2">
      <div className="mb-6 mt-[-20px] rounded-lg bg-card p-6 border">
        <div className="mb-4 flex flex-wrap gap-2">
          {!event.metadata.is_public && (
            <Badge variant="outline" className="gap-1">
              <Lock className="h-3 w-3" />
              <span>Private</span>
            </Badge>
          )}
          {event.metadata.registration_fee > 0 ? (
            <Badge variant="outline" className="gap-1">
              <DollarSign className="h-3 w-3" />
              <span>{event.metadata.registration_fee}</span>
            </Badge>
          ) : (
            <Badge variant="outline">Free</Badge>
          )}
        </div>

        <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
          {event.metadata.title}
        </h1>

        <div className="mb-6 flex flex-wrap gap-4 text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-5 w-5" />
            <span>{formatDate(event.metadata.date_time)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-5 w-5" />
            <span>{formatTime(event.metadata.date_time)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="h-5 w-5" />
            <span>{event.metadata.location}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {isOrganizer ? (
            <>
              <Button
                className="bg-chart-2 hover:bg-chart-2/90"
                onClick={() =>
                  router.push(`/dashboard/events/${event.metadata.id}/edit`)
                }
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Event
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    <Trash className="mr-2 h-4 w-4" />
                    Delete Event
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Event</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this event? This action
                      cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteEvent}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          ) : (
            <>
              <Button
                className={
                  event.metadata.registration_fee > 0
                    ? "bg-chart-1 hover:bg-chart-1/90"
                    : "bg-chart-2 hover:bg-chart-2/90"
                }
                onClick={handleJoinEvent}
                disabled={isJoining || hasJoined}
              >
                {isJoining
                  ? "Processing..."
                  : hasJoined
                  ? "Already Joined"
                  : getJoinButtonText()}
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon">
                <Share className="h-5 w-5" />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainContent;
