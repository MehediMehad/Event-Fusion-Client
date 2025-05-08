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
    revalidateTag("PRODUCT");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};