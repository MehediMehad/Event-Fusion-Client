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

type TNonParticipant = {
  id: string;
  name: string;
  email: string;
  profilePhoto?: string;
};

export default function InviteUsersModal({ eventId }: { eventId: string }) {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<TNonParticipant[]>([]);
  const [loading, setLoading] = useState(true);
  console.log(users);
  

  // Fetch non participants
  useEffect(() => {
    const fetchNonParticipants = async () => {
      if (open && eventId) { 
        try {
          const data = await getNonParticipants(eventId);
          setUsers(data.data)
          setLoading(false)
        } catch (error) {
          console.error("Failed to fetch non-participants:", error);
        }
      }
    };
    fetchNonParticipants();

  }, [open, eventId]); 

  const handleInvite = async (userId: string) => {
    
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
        ) : users.length === 0 ? (
          <p>No users available to invite.</p>
        ) : (
          <div className="space-y-4 max-h-[400px] overflow-y-auto">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-2 border rounded"
              >
                <div className="flex items-center gap-3">
                  {user.profilePhoto ? (
                    <img
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
                <Button size="sm" onClick={() => handleInvite(user.id)}>
                  Invite
                </Button>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
