import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

const TopSection = () => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <Button className="gap-2" asChild>
        <Link href="/user/create-event">
          <Plus className="h-4 w-4" />
          <span>Create Event</span>
        </Link>
      </Button>
    </div>
  );
};

export default TopSection;
