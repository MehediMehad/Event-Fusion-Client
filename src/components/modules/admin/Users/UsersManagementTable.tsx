"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ReusableTable } from "./ReusableTable";

// Types
export interface TUser {
  id: string;
  name: string;
  email: string;
  status: string;
  profilePhoto: string;
  totalJoinedEvents: number;
  paidEventsCount: number;
  publishedEventsCount: number;
}

interface UsersManagementTableProps {
  users: TUser[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  onPageChange: (newPage: number) => void;
}

export function UsersManagementTable({
  users,
  meta,
  onPageChange,
}: UsersManagementTableProps) {
  const itemsPerPage = meta.limit;
  const totalPages = Math.ceil(meta.total / itemsPerPage);

  const columns = [
    {
      header: "Name",
      cell: (user: TUser) => (
        <div className="flex items-center gap-3">
          <Image
            src={user.profilePhoto || "/placeholder.svg"}
            alt={user.name}
            width={40}
            height={40}
            className="rounded-full w-10 h-10"
          />
          <span>{user.name}</span>
        </div>
      ),
    },
    {
      header: "Email",
      cell: (user: TUser) => user.email,
    },
    {
      header: "Status",
      cell: (user: TUser) => (
        <span
          className={`inline-block px-2 py-1 rounded text-xs ${
            user.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {user.status}
        </span>
      ),
    },
    {
      header: "Joined Events",
      cell: (user: TUser) => user.totalJoinedEvents,
    },
    {
      header: "Paid Events",
      cell: (user: TUser) => user.paidEventsCount,
    },
    {
      header: "Published Events",
      cell: (user: TUser) => user.publishedEventsCount,
    },
    {
      header: "Action",
      cell: (user: TUser) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-blue-600 border-blue-200 hover:bg-blue-50"
          >
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <ReusableTable data={users} columns={columns} />

      <div className="flex items-center justify-end space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(meta.page - 1)}
          disabled={meta.page === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {[...Array(Math.min(5, totalPages))].map((_, i) => {
          let pageNumber: number;

          if (totalPages <= 5) {
            pageNumber = i + 1;
          } else if (meta.page <= 3) {
            pageNumber = i + 1;
            if (i === 4) pageNumber = totalPages;
          } else if (meta.page >= totalPages - 2) {
            pageNumber = totalPages - 4 + i;
            if (i === 0) pageNumber = 1;
          } else {
            pageNumber = meta.page - 2 + i;
            if (i === 0) pageNumber = 1;
            if (i === 4) pageNumber = totalPages;
          }

          const isEllipsis =
            (i === 0 && pageNumber !== 1) ||
            (i === 4 && pageNumber !== totalPages);

          if (isEllipsis) {
            return (
              <div key={i} className="px-3 py-2">
                ...
              </div>
            );
          }

          return (
            <Button
              key={i}
              variant={meta.page === pageNumber ? "default" : "outline"}
              size="icon"
              onClick={() => onPageChange(pageNumber)}
              className={
                meta.page === pageNumber
                  ? "bg-red-600 hover:bg-red-700"
                  : ""
              }
            >
              {pageNumber}
            </Button>
          );
        })}

        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(meta.page + 1)}
          disabled={meta.page === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}