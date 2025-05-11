// app/actions/inviteAction.ts
"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";



export const inviteUserAction = async ({
    eventId,
    receiverId,
  }: {
    eventId: string;
    receiverId: string;
  }) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/invite/${eventId}/invite`, {
        method: "POST",
        body: JSON.stringify({ receiverId }),
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      });
    revalidateTag("INVITATION");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const myPendingNotification = async () => {
  try {
    const token = (await cookies()).get("accessToken")?.value;

    if (!token) {
      throw new Error("No access token found");
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/invite/my-pending-notification`,
      {
        headers: {
          Authorization: token,
        },
        // Optional: cache control
        cache: "no-store", // or "force-cache" based on your need
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch events");
    }

    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error("Error fetching my events:", error.message);
    return { error: error.message || "Something went wrong" };
  }
};

export const getNotification = async () => {
  try {
    const token = (await cookies()).get("accessToken")?.value;

    if (!token) {
      throw new Error("No access token found");
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/invite/get-notification`,
      {
        headers: {
          Authorization: token,
        },
        // Optional: cache control
        cache: "no-store", // or "force-cache" based on your need
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch events");
    }

    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error("Error fetching my events:", error.message);
    return { error: error.message || "Something went wrong" };
  }
};

export const acceptDeclineInvitation = async ({
  status,
  invitationId,
}: {
  status: string;
  invitationId: string;
}) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/invite/respond`, {
      method: "PUT",
      body: JSON.stringify({ status, invitationId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });
    revalidateTag("INVITATION");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
