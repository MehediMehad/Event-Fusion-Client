"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { formatCurrency, formatDate, formatTime } from "@/lib/format";
import { joinEvent } from "@/services/Event";
import { TEventResponse } from "@/types/event";
import { TbUserShare } from "react-icons/tb";
import { Calendar, Clock, DollarSign, Lock, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import ManageEvent from "./Organizer/ManageEvent";
import InviteUsersModal from "../InviteUser/InviteUsersModal";

const MainContent = ({ event }: { event: TEventResponse }) => {
  const { user } = useUser();
  const router = useRouter();
  const [isJoining, setIsJoining] = useState(false);
  const isOrganizer = user?.userId === event.metadata.organizer.id;
  // ✅ Ensure this is always a boolean
  const participationStatus = event.participation?.find(
    (p) => p.userId === user?.userId
  )?.status;

  const isApproved = participationStatus === "APPROVED";
  const isRejected = participationStatus === "REJECTED";

  // Check if user has joined the event
  const handleJoinEvent = async () => {
    if (!user) {
      router.push("/auth/login");
      return;
    }

    setIsJoining(true);
    const payload = {
      eventId: event.metadata.id,
      payment_status: "FREE",
    };

    try {
      const response = await joinEvent(payload);
      if (response.success) {
        toast.success(response?.message);
        setIsJoining(false);

        // Optionally refresh or redirect
        router.refresh();
      } else {
        toast.error(response?.message || "Something went wrong.");
        setIsJoining(false);
      }
    } catch (err) {
      toast("Network Error");
    } finally {
      setIsJoining(false);
    }
  };

  const getJoinButtonText = () => {
    if (!event.metadata.is_public && event.metadata.registration_fee > 0) {
      return `Request & Pay ${formatCurrency(event.metadata.registration_fee)}`;
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
          {!event.metadata.is_public && event.metadata.registration_fee > 0 && (
            <>
              <Badge variant="outline" className="gap-1">
                <Lock className="h-3 w-3" />
                <span>Private</span>
              </Badge>
              <Badge variant="outline" className="gap-1">
                <Lock className="h-3 w-3" />
                <span>{event.metadata.registration_fee}</span>
              </Badge>
            </>
          )}
          {event.metadata.is_public && event.metadata.registration_fee > 0 ? (
            <>
              <Badge variant="outline" className="gap-1">
                <DollarSign className="h-3 w-3" />
                <span>Public</span>
              </Badge>
              <Badge variant="outline" className="gap-1">
                <DollarSign className="h-3 w-3" />
                <span>{event.metadata.registration_fee}</span>
              </Badge>
            </>
          ) : (
            <Badge variant="outline">Free</Badge>
          )}
        </div>

        <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
          {event.metadata.title}
        </h1>

        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-center gap-2 rounded-md bg-muted p-3">
            <Calendar className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium">Date</p>
              <p className="text-sm">{formatDate(event.metadata.date_time)}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-md bg-muted p-3">
            <Clock className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium">Time</p>
              <p className="text-sm">{formatTime(event.metadata.date_time)}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-md bg-muted p-3">
            <MapPin className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium">Location</p>
              <p className="text-sm">{event.metadata.location}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {isOrganizer ? (
            <ManageEvent event={event} />
          ) : (
            <>
              <Button
                className={
                  event.metadata.registration_fee > 0
                    ? "bg-primary hover:bg-primary/90"
                    : "bg-primary hover:bg-primary/90"
                }
                onClick={handleJoinEvent}
                disabled={isJoining || isApproved || isRejected}
              >
                {isJoining
                  ? "Processing..."
                  : isApproved
                  ? "Already Registered"
                  : isRejected
                  ? "Your Request Was Rejected"
                  : getJoinButtonText()}
              </Button>
              {/* <Button variant="outline" size="icon">
                <Heart className="h-5 w-5" />
              </Button> */}
              <InviteUsersModal eventId={event.metadata.id} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainContent;
