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

export const getAllEventsDetailsPage = async (
  filters: {
    searchTerm?: string;
    filterData?: string;
  },
  options: {
    page?: string;
    limit?: string;
  }
) => {
  const params = new URLSearchParams();

  if (options.page) params.append("page", options.page);
  if (options.limit) params.append("limit", options.limit);
  if (filters.filterData) params.append("filterData", filters.filterData);
  if (filters.searchTerm) params.append("searchTerm", filters.searchTerm);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/event/all-details?${params}`,
      {
        next: {
          tags: ["EVENT"],
        },
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data ?? { success: false, message: "No data received" };
  } catch (error: any) {
    console.error("❌ API Error:", error.message);
    return { success: false, message: error.message };
  }
};

export const getSingleEventDetails = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/event/${id}`);
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getMyEvent = async () => {
  try {
    const token = (await cookies()).get("accessToken")?.value;

    if (!token) {
      throw new Error("No access token found");
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/event/my-events`,
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

export const getNonParticipants = async (eventId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/non-participants/${eventId}`
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
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

export const updateEvent = async (
  eventData: FormData,
  eventId: string
): Promise<any> => {
  
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/event/${eventId}`,
      {
        method: "PUT",
        body: eventData,
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("EVENT");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const addToHeroSection = async (eventId: string) => {
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/event/add-to-hero-section`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: (await cookies()).get("accessToken")!.value,
    },
    body: JSON.stringify({ eventId }),
  });
  if (!res.ok) {
    throw new Error("Failed to update hero section");
  }
  return await res.json();
};

export const joinEvent = async (payload: {
  eventId: string;
  payment_status: string;
}) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/event/join-event`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// delete event
export const deleteEvent = async (eventId: string): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/event/${eventId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("EVENT");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
