"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const addEvent = async (eventData: FormData): Promise<any> => {
  try {
    const token = (await cookies()).get("accessToken")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/event`, {
      method: "POST",
      body: eventData,
      headers: {
        Authorization: token || "",
        // ✅ DO NOT set 'Content-Type' manually!
      },
    });

    revalidateTag("EVENT");

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to create event");
    }

    return res.json();
  } catch (error: any) {
    console.error("Fetch error:", error);
    return { success: false, message: error.message || "Unknown error" };
  }
};

export const getUpcomingLastEvent = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/event/upcoming`, {
      next: {
        tags: ["EVENT"],
      },
    });

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllUpcomingEvent = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/event`, {
      next: {
        tags: ["EVENT"],
      },
    });

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};