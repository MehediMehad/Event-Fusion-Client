"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TEventResponse } from "@/types/event";
import { useUser } from "@/context/UserContext";
import Participants from "./Participants";
import Reviews from "./Reviews";
import { PSTATUS } from "../../CreateEvent/EventForm/utils";
import { TReviewData } from "@/types/review";

const EventInfo = ({ event }: { event: TEventResponse }) => {
  const { user } = useUser();
  const isOrganizer = user?.userId === event.metadata.organizer.id;

  // Helper functions
  const getPendingParticipants = () => {
    return event.participation.filter((p) => p.status === PSTATUS.PENDING);
  };
  console.log(getPendingParticipants());
  

  return (
    <div className="w-[60%]">
    <Tabs defaultValue="participants" className="mb-8">
      <TabsList>
        <TabsTrigger value="participants">
          Participants
          {isOrganizer && getPendingParticipants().length > 0 && (
            <Badge variant="secondary" className="ml-2">
              {getPendingParticipants().length}
            </Badge>
          )}
        </TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
      </TabsList>

      <TabsContent value="participants" className="mt-6">
        <Participants event={event} />
      </TabsContent>

      <TabsContent value="reviews" className="mt-6">
        <Reviews event={event}/>
      </TabsContent>
    </Tabs>
    </div>
  );
};

export default EventInfo;
