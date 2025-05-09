"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const SendReviewAction = async ({
    eventId,
    rating,
    comment
}: {
  eventId: string;
  rating: string;
  comment: string
}) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/review`,
      {
        method: "POST",
        body: JSON.stringify({ eventId, rating, comment }),
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("REVIEW");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
