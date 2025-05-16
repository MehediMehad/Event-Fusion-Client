import TopSection from "./TopSection";
import DashboardMyEvents from "../DashboardMyEvents/DashboardMyEvents";
import { TInvitations } from "@/types/invitation";
import PendingNotification from "./PendingNotification";
import DashboardSummary, { DashboardSummaryProps } from "./DashboardSummary";

export default function DashboardOverview({
  events,
  notification,
  dashboardSummary
}: {
  events: any[];
  notification: TInvitations[];
  dashboardSummary: DashboardSummaryProps
}) {


  return (
    <div className="grid gap-2 mx-10 mt-10">
      <TopSection />
      <DashboardSummary dashboardSummary={dashboardSummary} />
      <DashboardMyEvents events={events} className="hidden" />
      {/* <PendingNotification notification={notification} /> */}
    </div>
  );
}
