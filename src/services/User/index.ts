"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";


export const updateProfile2 = async (userData: FormData): Promise<any> => {
  console.log("😎😎", userData);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/update-profile`,
      {
        method: "PUT",
        body: userData,
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("USER");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const updateProfile = async (userData: FormData): Promise<any> => {
  try {
    const token = (await cookies()).get("accessToken")?.value;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/update-profile`,
      {
        method: "PUT",
        body: userData,
        headers: {
          Authorization: token || "",
          // Don't set Content-Type manually with FormData
        },
      }
    );

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getMyInfo = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/me`, {
      method: "GET",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
        "Content-Type": "application/json",
      },
      next: { tags: ["USER"] },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getMyDashboardInfo = async () => {
  try {
    const token = (await cookies()).get("accessToken")?.value;

    if (!token) {
      throw new Error("No access token found");
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/get-my-dashboard-info`,
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

export const getAdminDashboardInfo = async () => {
  try {
    const token = (await cookies()).get("accessToken")?.value;

    if (!token) {
      throw new Error("No access token found");
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/get-admin-dashboard-info`,
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

export const getAllUsersWithStats = async (
  filters: { searchTerm?: string },
  options: { page?: string; limit?: string }
) => {
  const params = new URLSearchParams();

  if (options.page) params.append("page", options.page);
  if (options.limit) params.append("limit", options.limit);
  if (filters.searchTerm) params.append("searchTerm", filters.searchTerm);

  const url = `${process.env.NEXT_PUBLIC_BASE_API}/user/admin/users?${params.toString()}`;
  console.log("Fetching from:", url); // 👈 Check this in terminal

  try {
    const res = await fetch(url, {
      next: { tags: ["USER"] },
      cache: "no-store"
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data ?? { success: false, message: "No data received" };
  } catch (error: any) {
    console.error("❌ Fetch Error:", error.message);
    return { success: false, message: error.message };
  }
};