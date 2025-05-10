"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CalendarPlus, Users, Clock, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TopSection from "./TopSection";
import DashboardMyEvents from "../DashboardMyEvents/DashboardMyEvents";
import { TInvitations } from "@/types/invitation";
import Image from "next/image";
import { formatCurrency, formatDate, formatTimeAgo } from "@/lib/format";
import PendingNotification from "./PendingNotification";

export default function DashboardOverview({
  events,
  notification,
}: {
  events: any[];
  notification: TInvitations[];
}) {
  // Get pending invitations for the user
  //   const pendingInvitations = MOCK_INVITATIONS.filter(
  //     (invitation) => invitation.userId === user.id && invitation.status === 'pending'
  //   );

  return (
    <div className="grid gap-2 mx-10 mt-10">
      <TopSection />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5 mt-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <CalendarPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">4</p>
            <p className="text-xs text-muted-foreground">
              Events you&apos;ve created
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Participants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {/* {userEvents.reduce((acc, event) => acc + event.participantsCount, 0)} */}{" "}
              52
            </p>
            <p className="text-xs text-muted-foreground">
              People attending your events
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Invitations
            </CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          {/* <CardContent>
              <p className="text-2xl font-bold">{pendingInvitations.length}</p>
              <p className="text-xs text-muted-foreground">
                Invitations waiting for response
              </p>
            </CardContent> */}
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Events
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {/* {userEvents.filter(event => new Date(event.date) > new Date()).length} */}
            </p>
            <p className="text-xs text-muted-foreground">
              Events in the future
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Events
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {/* {userEvents.filter(event => new Date(event.date) > new Date()).length} */}
            </p>
            <p className="text-xs text-muted-foreground">
              Events in the future
            </p>
          </CardContent>
        </Card>
      </div>

      <DashboardMyEvents events={events} className="hidden" />

      <PendingNotification notification={notification}/>
    </div>
  );
}
