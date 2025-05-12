"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CalendarDays, Users, Eye, UserPlus, Lock } from "lucide-react";

interface DashboardSummary {
  totalEvents: number;
  totalPublicEvents: number;
  totalPrivateEvents: number;
  totalParticipants: number;
  totalOrganizers: number;
  totalUser: number;
}

interface DashboardCardsProps {
  data: DashboardSummary;
}

export default function DashboardCards({ data }: DashboardCardsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Total Events */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Events</CardTitle>
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{data.totalEvents}</p>
          <p className="text-xs text-muted-foreground mt-1">All events created</p>
        </CardContent>
      </Card>

      {/* Public Events */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Public Events</CardTitle>
          <Eye className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{data.totalPublicEvents}</p>
          <p className="text-xs text-muted-foreground mt-1">Open to all users</p>
        </CardContent>
      </Card>

      {/* Private Events */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Private Events</CardTitle>
          <Lock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{data.totalPrivateEvents}</p>
          <p className="text-xs text-muted-foreground mt-1">Require approval</p>
        </CardContent>
      </Card>

      {/* Participants */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Participants</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{data.totalParticipants}</p>
          <p className="text-xs text-muted-foreground mt-1">People attending</p>
        </CardContent>
      </Card>

      {/* Organizers */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Organizers</CardTitle>
          <UserPlus className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{data.totalOrganizers}</p>
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
          <p className="text-2xl font-bold">{data.totalOrganizers}</p>
          <p className="text-xs text-muted-foreground mt-1">Event creators & participant</p>
        </CardContent>
      </Card>
    </div>
  );
}