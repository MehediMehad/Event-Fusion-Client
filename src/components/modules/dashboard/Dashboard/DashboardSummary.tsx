import { dashboardCards } from "@/lib/utils/dashboardConfig";
import DashboardCard from "./DashboardCard";

export type DashboardSummaryProps = {
  dashboardSummary: {
    totalEvents: number;
    totalParticipants: number;
    pendingInvitations: number;
    totalReviews: number;
    totalEarnings: number;
  };
};

const DashboardSummary = ({ dashboardSummary }: any) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5 mt-5">
      {dashboardCards.map((card) => (
        <DashboardCard
          key={card.key}
          title={card.title}
          value={dashboardSummary[card.key as keyof typeof dashboardSummary]}
          description={card.description}
          icon={card.icon}
          formatter={card.formatter}
        />
      ))}
    </div>
  );
};

export default DashboardSummary;
