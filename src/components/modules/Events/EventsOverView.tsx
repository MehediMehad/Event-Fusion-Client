"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventType } from "@/types/event";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import EventsGrid from "./EventsGrid";

interface Props {
  events: EventType[];
  searchTerm?: string;
  filterData?: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  currentPage?: number;
}

export default function EventsOverView({
  events,
  searchTerm: initialSearch = "",
  filterData: initialFilter = "all",
  meta = { page: 1, limit: 6, total: 0 },
}: Props) {
  console.log(meta, "🤢🤢");

  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState(initialSearch || "");
  const [activeTab, setActiveTab] = useState(initialFilter || "all");

  // ✅ URL Sync
  useEffect(() => {
    const params = new URLSearchParams();

    if (searchTerm) params.set("searchTerm", searchTerm);
    if (activeTab && activeTab !== "all")
      params.set(
        "filterData",
        activeTab === "public-free"
          ? "PUBLIC_FREE"
          : activeTab === "public-paid"
            ? "PUBLIC_PAID"
            : activeTab === "private-free"
              ? "PRIVATE_FREE"
              : activeTab === "private-paid"
                ? "PRIVATE_PAID"
                : "",
      );

    router.push(`/events?${params.toString()}`);
  }, [searchTerm, activeTab]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Discover Events</h1>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search events..."
          className="pl-9"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-8 flex w-full justify-start overflow-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="public-free">Public Free</TabsTrigger>
          <TabsTrigger value="public-paid">Public Paid</TabsTrigger>
          <TabsTrigger value="private-free">Private Free</TabsTrigger>
          <TabsTrigger value="private-paid">Private Paid</TabsTrigger>
        </TabsList>
      </Tabs>

      <EventsGrid events={events} />
    </div>
  );
}
