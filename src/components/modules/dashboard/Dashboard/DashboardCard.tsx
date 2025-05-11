import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icons from "./Icons";

interface DashboardCardProps {
  title: string;
  value: number;
  description: string;
  icon: string;
  formatter?: (value: number) => string;
}

const DashboardCard = ({ title, value, description, icon, formatter = (v) => v.toString() }: DashboardCardProps) => {
  const IconComponent = Icons[icon as keyof typeof Icons] || Icons.CalendarPlus;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <IconComponent className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{formatter(value)}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;