"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const updateProfile2 = async (userData: FormData): Promise<any> => {
    console.log("😎😎",userData);
    
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
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/user/me`,
        {
          method: "GET",
          headers: {
            Authorization: (await cookies()).get("accessToken")!.value,
            "Content-Type": "application/json",
          },
          next: { tags: ["USER"] },
        }
      );
      const data = await res.json();
      return data;
    } catch (error: any) {
      return Error(error.message);
    }
  };
