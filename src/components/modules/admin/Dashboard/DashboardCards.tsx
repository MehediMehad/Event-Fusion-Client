"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CalendarDays, Users, Eye, UserPlus, Lock } from "lucide-react";
import DashboardMyEvents from "../../Dashboard/DashboardMyEvents/DashboardMyEvents";
import PendingNotification from "../../Dashboard/Dashboard/PendingNotification";
import { TInvitations } from "@/types/invitation";
import { DashboardSummaryProps } from "../../Dashboard/Dashboard/DashboardSummary";

interface DashboardSummary {
  totalEvents: number;
  totalPublicEvents: number;
  totalPrivateEvents: number;
  totalParticipants: number;
  totalOrganizers: number;
}

interface DashboardCardsProps {
  events: any;
  notification: TInvitations[];
  dashboardSummary: DashboardSummary;
}

export default function DashboardCards({
  events,
  notification,
  dashboardSummary,
}: DashboardCardsProps) {
  return (
    <div className="">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Total Events */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{dashboardSummary.totalEvents}</p>
            <p className="text-xs text-muted-foreground mt-1">
              All events created
            </p>
          </CardContent>
        </Card>

        {/* Public Events */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Public Events</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {dashboardSummary.totalPublicEvents}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Open to all users
            </p>
          </CardContent>
        </Card>

        {/* Private Events */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Private Events
            </CardTitle>
            <Lock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {dashboardSummary.totalPrivateEvents}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Require approval
            </p>
          </CardContent>
        </Card>

        {/* Participants */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Participants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {dashboardSummary.totalParticipants}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              People attending
            </p>
          </CardContent>
        </Card>

        {/* Organizers */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Organizers</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {dashboardSummary.totalOrganizers}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Event creators</p>
          </CardContent>
        </Card>

        {/* Organizers */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total User</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {dashboardSummary.totalOrganizers}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Event creators & participant
            </p>
          </CardContent>
        </Card>
      </div>

      <DashboardMyEvents events={events} className="hidden" />
      <PendingNotification notification={notification} />
    </div>
  );
}
