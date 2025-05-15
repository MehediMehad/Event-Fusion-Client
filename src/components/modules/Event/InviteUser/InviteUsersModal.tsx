"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TbUserShare } from "react-icons/tb";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getNonParticipants } from "@/services/Event";
import { inviteUserAction } from "@/services/Invitation";
import { useUser } from "@/context/UserContext";
import { TEventResponse } from "@/types/event";
import Image from "next/image";

type TNonParticipant = {
  id: string;
  name: string;
  email: string;
  profilePhoto?: string;
};

export default function InviteUsersModal({
  event,
  eventId,
}: {
  event: TEventResponse;
  eventId: string;
}) {
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<TNonParticipant[]>([]);
  const [invitedUserIds, setInvitedUserIds] = useState<string[]>([]);
  const filteredData = users.filter((u) => u.id !== user?.userId);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getNonParticipants(eventId);
        setUsers(data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [eventId]);

  const handleInvite = async (receiverId: string, userName: string) => {
    try {
      const res = await inviteUserAction({ eventId, receiverId });

      if (res.success) {
        toast.success(`Invitation sent to ${userName}`);
        // ✅ Add user ID to invited list
        setInvitedUserIds((prev) => [...prev, receiverId]);
      } else {
        toast.error(res.message || "Failed to send invitation");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
      console.error("Error sending invitation:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <TbUserShare color="#333" className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Invite Users</DialogTitle>
        </DialogHeader>
        {loading ? (
          <p>Loading users...</p>
        ) : filteredData.length === 0 ? (
          <p>No users available to invite.</p>
        ) : (
          <div className="space-y-4 max-h-[400px] overflow-y-auto">
            {filteredData.map((user) => {
              const isInvited = invitedUserIds.includes(user.id);
              return (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-2 border rounded"
                >
                  <div className="flex items-center gap-3">
                    {user.profilePhoto ? (
                      <Image
                        width={50}
                        height={50}
                        src={user.profilePhoto}
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                        {user.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleInvite(user.id, user.name)}
                    disabled={isInvited} // ✅ disable button if already invited
                  >
                    {isInvited ? "Invited" : "Invite"}
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
