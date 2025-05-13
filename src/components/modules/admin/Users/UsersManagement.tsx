"use client";
import { UsersManagementTable } from "./UsersManagementTable";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type Meta = {
  limit: number;
  page: number;
  total: number;
};

export interface TUser {
  id: string
  name: string
  email: string
  status: string
  profilePhoto: string
  totalJoinedEvents: number
  paidEventsCount: number
  publishedEventsCount: number
}


export function UsersManagement({ users, meta }: { users: TUser[]; meta: Meta }) {
//   const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold px-10">Product Management</h1>
        {/* 🔍 Search Bar */}
        {/* <div className="flex flex-wrap gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div> */}
      </div>
      <UsersManagementTable 
        users={users} 
        meta={meta} 
        onPageChange={(newPage) => {
          console.log("Page changed to:", newPage);
        }}
      />
    </div>
  );
}
