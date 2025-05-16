"use client";

import Image from "next/image";
import Link from "next/link";
import {
  formatTimeAgo,
  formatDate,
  formatTime,
  formatCurrency,
} from "@/lib/format";
import { Button } from "@/components/ui/button";
import { TInvitations } from "@/types/invitation";
import { acceptDeclineInvitation } from "@/services/Invitation";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

export default function Invitations({
  invitations,
  tittle,
}: {
  invitations: TInvitations[];
  tittle: "Notification" | "Invitations";
}) {
  const { user } = useUser();
  const router = useRouter();

  if (!user) return <h1>Loading..</h1>;

  const handleResponse = async (invitationId: string, status: string) => {
    const result = await acceptDeclineInvitation({ status, invitationId });

    if (result.error) {
      toast(result.error.message || "Failed to process invitation");
    }
  };

  const handleInitiatePayment = async (eventId: string) => {
    if (!user) {
      router.push("/login");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/payment/init-payment/${eventId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.userId,
          }),
        }
      );

      const data = await res.json();
      const paymentUrl = data?.data?.paymentUrl;

      if (res.ok && paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        toast.error(data?.message || "Payment initiation failed.");
      }
    } catch (error) {
      toast.error("Something went wrong during payment initiation.");
      console.error(error);
    }
  };

  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-bold tracking-tight">{tittle}</h1>

      {invitations.length > 0 ? (
        <div className="space-y-4">
          {invitations.map((invitation: TInvitations) => (
            <div
              key={invitation.id}
              className="flex flex-col items-start justify-between gap-4 rounded-lg border p-4 sm:flex-row sm:items-center"
            >
              <div className="flex items-center gap-4">
                <div className="relative aspect-video w-32 overflow-hidden rounded-lg">
                  <Image
                    src={invitation.event.coverPhoto}
                    alt={invitation.event.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">
                    <Link
                      href={`/events/${invitation.event.id}`}
                      className="hover:underline"
                    >
                      {invitation.event.title}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Hosted by{" "}
                    <span className="font-semibold">
                      {invitation.sender.name}
                    </span>
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Date: {formatDate(invitation.event.date_time)} at{" "}
                    {formatTime(invitation.event.date_time)}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Fee:{" "}
                    {invitation.event.registration_fee > 0
                      ? formatCurrency(invitation.event.registration_fee)
                      : "Free"}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Invited {formatTimeAgo(invitation.invited_at)}
                  </p>
                </div>
              </div>
              <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                {invitation.event.registration_fee === 0 ? (
                  <Button
                    onClick={() => handleResponse(invitation.id, "ACCEPTED")}
                    disabled={
                      invitation.status === "REJECTED" ||
                      invitation.status === "ACCEPTED"
                    }
                    className="sm:w-auto"
                  >
                    Join
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleInitiatePayment(invitation.event.id)}
                    disabled={
                      invitation.status === "REJECTED" ||
                      invitation.status === "ACCEPTED"
                    }
                    className="sm:w-auto"
                  >
                    Pay & Accept •{" "}
                    {formatCurrency(invitation.event.registration_fee)}
                  </Button>
                )}
                <Button
                  disabled={
                    invitation.status === "REJECTED" ||
                    invitation.status === "ACCEPTED"
                  }
                  variant="outline"
                  onClick={() => handleResponse(invitation.id, "REJECTED")}
                >
                  {invitation.status === "REJECTED" ? "Declined" : "Decline"}
                </Button>
                <Button variant="secondary">
                  <Link href={`/events/${invitation.event_id}`}>
                    View Details
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <h3 className="mb-2 text-lg font-semibold">No Notification</h3>
          <p className="text-muted-foreground">
            You don&apos;t have any pending Notification at the moment.
          </p>
        </div>
      )}
    </div>
  );
}















// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import {
//   formatTimeAgo,
//   formatDate,
//   formatTime,
//   formatCurrency,
// } from "@/lib/format";
// import { Button } from "@/components/ui/button";
// import { TInvitations } from "@/types/invitation";
// import { acceptDeclineInvitation } from "@/services/Invitation";
// import { toast } from "sonner";
// import { useUser } from "@/context/UserContext";
// import { useRouter } from "next/navigation";

// export default function Invitations({
//   invitations,
//   tittle,
// }: {
//   invitations: TInvitations[];
//   tittle: "Notification" | "Invitations";
// }) {


//   console.log("😭",invitations);
  

//   const {user} = useUser()
//   const router  = useRouter()
//   if (!user) {
//     return <h1>Loading..</h1>
//   }




//   const handleResponse = async (invitationId: string, status: string) => {
//     const result = await acceptDeclineInvitation({ status, invitationId });

//     if (result.error) {
//       toast(result.error.message || "Felid");
//     }
//   };

//   const handleInitiatePayment = async (eventId : string) => {
//     if (!user) {
//       router.push("/login");
//       return;
//     }

//     try {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_BASE_API}/payment/init-payment/${eventId}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             userId: user.userId, // Sending user.id in the body
//           }),
//         }
//       );

//       const data = await res.json();
//       const paymentUrl = data?.data?.paymentUrl;

//       if (res.ok && paymentUrl) {
//         window.location.href = paymentUrl;
//       } else {
//         toast.error(data?.message || "Payment initiation failed.");
//       }
//     } catch (error) {
//       toast.error("Something went wrong during payment initiation.");
//       console.error(error);
//     }
//   };

//   return (
//     <div className="grid gap-6">
//       <h1 className="text-3xl font-bold tracking-tight">{tittle}</h1>

//       {invitations.length > 0 ? (
//         <div className="space-y-4">
//           {invitations.map((invitation: TInvitations) => (
//             <div
//               key={invitation.id}
//               className="flex flex-col items-start justify-between gap-4 rounded-lg border p-4 sm:flex-row sm:items-center"
//             >
//               <div className="flex items-center gap-4">
//                 <div className="relative aspect-video w-32 overflow-hidden rounded-lg">
//                   <Image
//                     src={invitation.event.coverPhoto}
//                     alt={invitation.event.title}
//                     fill
//                     className="object-cover"
//                   />
//                 </div>
//                 <div>
//                   <h3 className="font-medium">
//                     <Link
//                       href={`/events/${invitation.event.id}`}
//                       className="hover:underline"
//                     >
//                       {invitation.event.title}
//                     </Link>
//                   </h3>
//                   <p className="mt-1 text-sm text-muted-foreground">
//                     {formatDate(invitation.event.date_time)} at{" "}
//                     {formatTime(invitation.event.date_time)}
//                   </p>
//                   <p className="text-sm text-muted-foreground">
//                     Invited {formatTimeAgo(invitation.invited_at)}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
//                 {invitation.event.registration_fee === 0 ? (
//                   <Button
//                     onClick={() => handleResponse(invitation.id, "ACCEPTED")}
//                     disabled={
//                       invitation.status === "REJECTED" ||
//                       invitation.status === "ACCEPTED"
//                     }
//                     className="sm:w-auto"
//                   >
//                     Join
//                   </Button>
//                 ) : (
//                   <Button
//                     onClick={() => handleInitiatePayment(invitation.event.id)}
//                     disabled={
//                       invitation.status === "REJECTED" ||
//                       invitation.status === "ACCEPTED"
//                     }
//                     className="sm:w-auto"
//                   >
//                     {invitation.event.registration_fee > 0
//                       ? `Pay & Accept • ${formatCurrency(
//                           invitation.event.registration_fee
//                         )}`
//                       : "Accept"}
//                   </Button>
//                 )}
//                 <Button
//                   disabled={
//                     invitation.status === "REJECTED" ||
//                     invitation.status === "ACCEPTED"
//                   }
//                   variant="outline"
//                   onClick={() => handleResponse(invitation.id, "REJECTED")}
//                 >
//                   {invitation.status === "REJECTED" ? "Declined" : "Decline"}
//                 </Button>
//                 <Button variant="secondary">
//                   <Link href={`/events/${invitation.event_id}`}>
//                     View Details
//                   </Link>
//                 </Button>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
//           <h3 className="mb-2 text-lg font-semibold">No Notification</h3>
//           <p className="text-muted-foreground">
//             You don&apos;t have any pending Notification at the moment.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }
