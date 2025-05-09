"use client";

import Image from "next/image";
import Link from "next/link";
import {
  formatTimeAgo,
  formatDate,
  formatTime,
  formatCurrency,
} from "@/lib/format";
import { Button } from "@/components/ui/button";
import { TInvitations } from "@/types/invitation";

export default function Invitations({
  invitations,
}: {
  invitations: TInvitations[];
}) {
  const handleAcceptInvitation = (invitationId: string) => {
    // In a real app, make API call to accept invitation
  };

  const handleDeclineInvitation = (invitationId: string) => {
    // In a real app, make API call to decline invitation
  };

  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-bold tracking-tight">Event Invitations</h1>

      {invitations.length > 0 ? (
        <div className="space-y-4">
          {invitations.map((invitation: TInvitations) => (
            <div
              key={invitation.id}
              className="flex flex-col items-start justify-between gap-4 rounded-lg border p-4 sm:flex-row sm:items-center"
            >
              <div className="flex items-center gap-4">
                <div className="relative aspect-video w-32 overflow-hidden rounded-lg">
                  <Image
                    src={invitation.event.coverPhoto}
                    alt={invitation.event.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">
                    <Link
                      href={`/events/${invitation.event.id}`}
                      className="hover:underline"
                    >
                      {invitation.event.title}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {formatDate(invitation.event.date_time)} at{" "}
                    {formatTime(invitation.event.date_time)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Invited {formatTimeAgo(invitation.invited_at)}
                  </p>
                </div>
              </div>
              <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                <Button
                  onClick={() => handleAcceptInvitation(invitation.id)}
                  className="sm:w-auto"
                >
                  {invitation.event.registration_fee > 0
                    ? `Pay & Accept • ${formatCurrency(
                        invitation.event.registration_fee
                      )}`
                    : "Accept"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleDeclineInvitation(invitation.id)}
                >
                  Decline
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <h3 className="mb-2 text-lg font-semibold">No invitations</h3>
          <p className="text-muted-foreground">
            You don&apos;t have any pending invitations at the moment.
          </p>
        </div>
      )}
    </div>
  );
}
