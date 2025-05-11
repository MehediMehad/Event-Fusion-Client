"use client"
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/context/UserContext";
import {
  formatCurrency,
  formatDate,
  formatTime,
  formatTimeAgo,
} from "@/lib/format";
import { acceptDeclineInvitation } from "@/services/Invitation";
import { TInvitations } from "@/types/invitation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

const PendingNotification = ({
  notification,
}: {
  notification: TInvitations[];
}) => {
  const { user } = useUser();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleResponse = async (invitationId: string, status: string) => {
    setLoadingId(invitationId);
    const result = await acceptDeclineInvitation({ status, invitationId });

    if (result.error) {
      toast(result.error.message || "Felid");
    }
    setLoadingId(null);
  };

  return (
    <div className="">
      <Card className="mb-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Pending Invitations</CardTitle>
          <Button variant="secondary" size="sm" asChild>
            <Link href={`/${user?.role.toLocaleLowerCase()}/invitations`}>
              View Invitations
            </Link>
          </Button>
        </CardHeader>
      </Card>
      {notification.length > 0 ? (
        <div className="space-y-4">
          {notification.map((invitation: TInvitations) => (
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
                  onClick={() => handleResponse(invitation.id, "ACCEPTED")}
                  disabled={loadingId === invitation.id}
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
                  onClick={() => handleResponse(invitation.id, "REJECTED")}
                  disabled={loadingId === invitation.id}
                >
                  {loadingId === invitation.id ? "Processing..." : "Decline"}
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
};

export default PendingNotification;
