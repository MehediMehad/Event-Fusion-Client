"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { formatCurrency, formatDate, formatTime } from "@/lib/format";
import { addToHeroSection, joinEvent } from "@/services/Event";
import { TEventResponse } from "@/types/event";
import { Calendar, Clock, DollarSign, Lock, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import ManageEvent from "./ManageEvent";

const TopSession = ({ event }: { event: TEventResponse }) => {
  const { user } = useUser();
  const userRole = user?.role.toLocaleLowerCase();

  const router = useRouter();
  const [isJoining, setIsJoining] = useState(false);
  const isOrganizer = user?.userId === event.metadata.organizer.id;
  // ✅ Ensure this is always a boolean
  // const participationStatus = event.participation?.find(
  //   (p) => p.userId === user?.userId
  // )?.status;

  const participation = event.participation?.find(
    (p) => p.userId === user?.userId
  );

  const participationStatus = participation?.status;
  // ✅ Ensure this is always a boolean
  const isApproved = participationStatus === "APPROVED";
  const isRejected = participationStatus === "REJECTED";
  const isPending = participationStatus === "PENDING";
  const isBanned = participationStatus === "BANNED";
  const isPublicEvent = event.metadata.is_public;
  const isFreeEvent = event.metadata.registration_fee === 0;

  // Check if user has joined the event
  const handleJoinEvent = async () => {
    if (!user) {
      router.push("/login");
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

  const handleInitiatePayment = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/payment/init-payment/${event.metadata.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.userId, // Sending user.id in the body
          }),
        }
      );

      const data = await res.json();
      const paymentUrl = data?.data?.paymentUrl;

      if (res.ok && paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        toast.error(data?.message || "Payment initiation failed.");
      }
    } catch (error) {
      toast.error("Something went wrong during payment initiation.");
      console.error(error);
    }
  };

  const handleAddToHeroSection = async (eventId: string) => {
    try {
      const result = await addToHeroSection(eventId);
      if (result.success) {
        toast.success("Added to hero section!");
      } else {
        throw new Error(result.error);
      }
    } catch (err: any) {
      toast.error(`Error: ${err.message}`);
    }
  };

  return (
    <div className="">
      <div className="mb-6 rounded-lg bg-card p-6 border">
        {/* Badges */}
        <div className="flex gap-1">
          {event.metadata.is_public !== undefined && (
            <Badge
              variant="secondary"
              className={`gap-1 ${
                event.metadata.is_public
                  ? "bg-green-100 text-green-700 border border-green-300 hover:bg-green-200"
                  : "bg-red-100 text-red-700 border border-red-300 hover:bg-red-200"
              } backdrop-blur-md transition-all`}
            >
              {event.metadata.is_public ? (
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
              event.metadata.registration_fee > 0
                ? "bg-yellow-100 text-yellow-700 border border-yellow-300 hover:bg-yellow-200"
                : "bg-green-100 text-green-700 border border-green-300 hover:bg-green-200"
            } backdrop-blur-md transition-all`}
          >
            {event.metadata.registration_fee > 0 ? (
              <>
                <DollarSign className="h-3 w-3" />$
                {event.metadata.registration_fee.toFixed(2)}
              </>
            ) : (
              "Free"
            )}
          </Badge>
        </div>

        <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
          {event.metadata.title}
        </h1>
        <h1 className="mb-4 text-xl tracking-tight md:text-base">
          {event.metadata.description}
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
          {isOrganizer || userRole === "admin" ? (
            <ManageEvent event={event} />
          ) : (
            <>
              {/* Paid Event Button */}
              {event.metadata.registration_fee > 0 && (
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  onClick={handleInitiatePayment}
                  disabled={isApproved || isRejected || isPending}
                >
                  {isApproved
                    ? "Already Registered"
                    : isPending
                    ? "Joining Pending"
                    : isRejected
                    ? "Your Request Was Rejected"
                    : `Pay & Join • ${formatCurrency(
                        event.metadata.registration_fee
                      )}`}
                </Button>
              )}

              {/* Free Public or Private Event Buttons */}
              {event.metadata.registration_fee === 0 && (
                <Button
                  className="bg-primary hover:bg-primary/90"
                  onClick={handleJoinEvent}
                  disabled={isJoining || isApproved || isRejected || isPending}
                >
                  {isJoining
                    ? "Processing..."
                    : isApproved
                    ? "Already Joined"
                    : isRejected
                    ? "Your Request Was Rejected"
                    : isPending
                    ? "Request Pending"
                    : event.metadata.is_public
                    ? "Join for Free"
                    : "Request to Join"}
                </Button>
              )}
            </>
          )}

          {userRole === "admin" && (
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={() => handleAddToHeroSection(event.metadata.id)}
            >
              Add to Hero Section
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopSession;
