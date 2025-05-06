"use-client";
import { CalendarDays, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MOCK_EVENTS } from "@/lib/fakedata";
import EventsGrid from "./EventsGrid";
import { EventType } from "@/types/event";

export default function EventsOverView({events}: {events: EventType[]}) {
  console.log("😎😎😎😎",events);


  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8 flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Discover Events
        </h1>
        <p className="text-muted-foreground">
          Browse and search for upcoming events
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search events..." className="pl-9" />
        </div>
        {/* TODO */}
        {/* <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </Button> */}
        <Button variant="outline" className="gap-2">
          <CalendarDays className="h-4 w-4" />
          <span>Date</span>
        </Button>
      </div>

      <Tabs defaultValue="all" className="mt-6">
        <TabsList className="mb-8 flex w-full justify-start overflow-auto">
          <TabsTrigger value="all">All Events</TabsTrigger>
          <TabsTrigger value="public-free">Public Free</TabsTrigger>
          <TabsTrigger value="public-paid">Public Paid</TabsTrigger>
          <TabsTrigger value="private-free">Private Free</TabsTrigger>
          <TabsTrigger value="private-paid">Private Paid</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <EventsGrid events={MOCK_EVENTS} />
        </TabsContent>
        <TabsContent value="public-free">
          <EventsGrid events={publicFreeEvents} />
        </TabsContent>
        <TabsContent value="public-paid">
          <EventsGrid events={publicPaidEvents} />
        </TabsContent>
        <TabsContent value="private-free">
          <EventsGrid events={privateFreeEvents} />
        </TabsContent>
        <TabsContent value="private-paid">
          <EventsGrid events={privatePaidEvents} />
        </TabsContent>
      </Tabs>
    </div>
  );
}






  
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