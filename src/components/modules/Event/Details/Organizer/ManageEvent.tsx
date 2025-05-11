"use client";
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
import { useUser } from "@/context/UserContext";
import { deleteEvent } from "@/services/Event";
import { TEventResponse } from "@/types/event";
import { Edit, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import InviteUsersModal from "../../InviteUser/InviteUsersModal";

const ManageEvent = ({ event }: { event: TEventResponse }) => {
  const router = useRouter();
  const { user } = useUser();
  const isAdmin = user?.role ==="admin" || "ADMIN"

  const handleDeleteEvent = async () => {
    const result = await deleteEvent(event.metadata.id);

    if (result.success) {
      toast.success(result.message);
      router.push("/events");
      router.refresh(); // Refresh page to remove deleted event
    } else {
      toast.error(result.message);
    }
  };

  return (
    <>
      {!isAdmin && (<>
        <Button
          className="bg-chart-2 hover:bg-chart-2/90"
          onClick={() => router.push(`/user/events/${event.metadata.id}/edit`)}
        >
          <Edit className="mr-2 h-4 w-4" />
          Edit Event
        </Button>
        </>
      )}


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
              Are you sure you want to delete this event permanently?
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
      {
        !isAdmin && (<InviteUsersModal event={event} eventId={event.metadata.id} />)
      }
    </>
  );
};

export default ManageEvent;
