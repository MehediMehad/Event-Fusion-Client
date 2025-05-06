"use client";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventType } from "@/types/event";
import { useState } from "react";
import EventsGrid from "./EventsGrid";

export default function EventsOverView({ events }: { events: EventType[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // 🔍 Search Filter
  const filteredBySearch = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.organizer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🎛️ Type Filter
  const getFilteredEvents = () => {
    switch (activeTab) {
      case "public-free":
        return filteredBySearch.filter(
          (e) => e.is_public && !e.is_paid
        );
      case "public-paid":
        return filteredBySearch.filter(
          (e) => e.is_public && e.is_paid
        );
      case "private-free":
        return filteredBySearch.filter(
          (e) => !e.is_public && !e.is_paid
        );
      case "private-paid":
        return filteredBySearch.filter(
          (e) => !e.is_public && e.is_paid
        );
      default:
        return filteredBySearch;
    }
  };

  const finalEvents = getFilteredEvents();

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-5">
      <div className="mb-4 flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Discover Events
        </h1>
        {/* <p className="text-muted-foreground">
          Browse and search for upcoming events
        </p> */}
      </div>

      {/* 🔍 Search Bar */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* 🎛️ Tabs for Filtering */}
      <Tabs defaultValue="all" className="mt-6" onValueChange={setActiveTab}>
        <TabsList className="mb-8 flex w-full justify-start overflow-auto">
          <TabsTrigger value="all">All Events</TabsTrigger>
          <TabsTrigger value="public-free">Public Free</TabsTrigger>
          <TabsTrigger value="public-paid">Public Paid</TabsTrigger>
          <TabsTrigger value="private-free">Private Free</TabsTrigger>
          <TabsTrigger value="private-paid">Private Paid</TabsTrigger>
        </TabsList>

        {/* All tabs show the same grid with different filters applied */}
        <TabsContent value="all">
          <EventsGrid events={finalEvents} />
        </TabsContent>
        <TabsContent value="public-free">
          <EventsGrid events={finalEvents} />
        </TabsContent>
        <TabsContent value="public-paid">
          <EventsGrid events={finalEvents} />
        </TabsContent>
        <TabsContent value="private-free">
          <EventsGrid events={finalEvents} />
        </TabsContent>
        <TabsContent value="private-paid">
          <EventsGrid events={finalEvents} />
        </TabsContent>
      </Tabs>
    </div>
  );
}




        // {/* TODO */}
        // {/* <Button variant="outline" className="gap-2">
        //   <Filter className="h-4 w-4" />
        //   <span>Filter</span>
        // </Button> */}
        // <Button variant="outline" className="gap-2">
        //   <CalendarDays className="h-4 w-4" />
        //   <span>Date</span>
        // </Button>

  
  // // Filter mock events - in a real app, you'd handle this server-side or with client state
  // const publicFreeEvents = MOCK_EVENTS.filter(
  //   (e) => !e.isPrivate && e.price === 0
  // );
  // const publicPaidEvents = MOCK_EVENTS.filter(
  //   (e) => !e.isPrivate && e.price > 0
  // );
  // const privateFreeEvents = MOCK_EVENTS.filter(
  //   (e) => e.isPrivate && e.price === 0
  // );
  // const privatePaidEvents = MOCK_EVENTS.filter(
  //   (e) => e.isPrivate && e.price > 0
  // );