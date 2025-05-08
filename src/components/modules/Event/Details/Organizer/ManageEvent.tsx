"use client";
import UpcomingEvents from "@/components/modules/eventHome/UpcomingEvents";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { TEventResponse } from "@/types/event";
import { Edit, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { UpdateEvents } from "./UpdateEvents";

const ManageEvent = ({ event }: { event: TEventResponse }) => {
  const router = useRouter();

  const handleDeleteEvent = () => {
    router.push("/dashboard/events");
  };

  return (
    <>
      <Button
        className="bg-chart-2 hover:bg-chart-2/90"
        onClick={() =>
          router.push(`/user/events/${event.metadata.id}/edit`)
        }
      >
        <Edit className="mr-2 h-4 w-4" />
        Edit Event
      </Button>
      {/* <UpdateEvents event={event}/> */}
      {/* <UpdateEvents event={event}  /> */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">
            <Trash className="mr-2 h-4 w-4" />
            Delete Event
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Event</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this event? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteEvent}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ManageEvent;
