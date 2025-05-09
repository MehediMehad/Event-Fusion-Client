"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/context/UserContext";
import { TEventResponse } from "@/types/event";
import { Ban, Check, X } from "lucide-react";
import Image from "next/image";
import { PSTATUS } from "../../CreateEvent/EventForm/utils";
import { participantStatus } from "@/services/Participant";
import { useRouter } from "next/navigation";

const Participants = ({ event }: { event: TEventResponse }) => {
  const router = useRouter();
  const { user } = useUser();
  const isOrganizer = user?.userId === event.metadata.organizer.id;

  // Helper functions
  const getPendingParticipants = () => {
    return event.participation.filter((p) => p.status === PSTATUS.PENDING );
  };
  const getApprovedParticipants = () => {
    return event.participation.filter((p) => p.status === "APPROVED");
  };
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );
    return `${diffInHours} hours ago`;
  };

  const handleParticipantAction = async (
    userId: string,
    status: string,
    eventId: string
  ) => {
    try {
      await participantStatus({ userId, status, eventId });
      router.refresh(); // Refresh page to get updated data
    } catch (error) {
      console.error("Failed to update participant status:", error);
    }
  };

  const isPastEvent = new Date(event.metadata.date_time) < new Date();

  const hasJoined = event.participation.some(
    (p) => p.userId === user?.userId && p.status === PSTATUS.APPROVED
  );

  return (
    <div className="rounded-lg border p-6">
      <h2 className="mb-4 text-xl font-semibold">
        {getApprovedParticipants().length} Participants
      </h2>
      {/* Pending Requests Section */}
      {isOrganizer && getPendingParticipants().length > 0 && (
        <div className="mb-8">
          <h3 className="mb-4 font-medium">Pending Requests</h3>
          <div className="space-y-4">
            {getPendingParticipants().map((participant) => (
              <div
                key={participant.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="relative h-14 w-14 overflow-hidden rounded-full bg-muted">
                    <Image
                      src={participant.user.profilePhoto}
                      alt={participant.user.name}
                      fill
                    />
                  </div>
                  <div>
                    <p className="font-medium">{participant.user.name}</p>
                    <p className="text-sm">{participant.user.email}</p>
                    <p className="text-sm text-muted-foreground">
                      Requested {formatTimeAgo(participant.joined_at)}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() =>
                      handleParticipantAction(participant.userId, PSTATUS.APPROVED, event.metadata.id)
                    }
                  >
                    <Check className="mr-2 h-4 w-4" /> Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      handleParticipantAction(participant.userId, PSTATUS.REJECTED, event.metadata.id)
                    }
                  >
                    <X className="mr-2 h-4 w-4" /> Reject
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() =>
                      handleParticipantAction(participant.userId, PSTATUS.BANNED, event.metadata.id)
                    }
                  >
                    <X className="mr-2 h-4 w-4" /> Banned
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Approved Participants */}
      <div className="space-y-4">
        {getApprovedParticipants().map((participant) => (
          <div
            key={participant.id}
            className="flex items-center justify-between rounded-lg border p-4"
          >
            <div className="flex items-center gap-3">
              <div className="relative h-14 w-14 overflow-hidden rounded-full bg-muted">
                <Image
                  src={participant.user.profilePhoto}
                  alt={participant.user.name}
                  fill
                />
              </div>
              <div>
                <p className="font-medium">{participant.user.name}</p>
                <p className="text-sm">{participant.user.email}</p>
                <p className="text-sm text-muted-foreground">
                  Joined {formatTimeAgo(participant.joined_at)}
                </p>
              </div>
            </div>
            {isOrganizer && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    •••
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={() =>
                      handleParticipantAction(participant.userId, PSTATUS.BANNED, event.metadata.id)
                    }
                  >
                    <Ban className="mr-2 h-4 w-4" /> Ban Participant
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Participants;
