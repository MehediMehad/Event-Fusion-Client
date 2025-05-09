"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const participantStatus = async ({
  userId,
  status,
  eventId,
}: {
  userId: string;
  status: string;
  eventId: string;
}) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/participation/status-update`, {
      method: "PUT",
      body: JSON.stringify({ userId, status, eventId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });
    revalidateTag("PARTICIPANT");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
