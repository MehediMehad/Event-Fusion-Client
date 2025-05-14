"use client";

import * as React from "react";
import {
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings,
  Users2Icon,
  UsersIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import Link from "next/link";
import Logo from "@/assets/svgs/Logo";
import { MdOutlineReviews } from "react-icons/md";

import { LayoutDashboard, CalendarDays, Mail } from "lucide-react";
import { TbNotification } from "react-icons/tb";
import { useUser } from "@/context/UserContext";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  userRole?: "admin" | "user";
}

export function AppSidebar({ ...props }: AppSidebarProps) {
  const { user } = useUser();
  const userRole = user?.role.toLocaleLowerCase();

  const data = {
    navMain: [
      {
        title: "Dashboard",
        url: `/${userRole}/dashboard`,
        icon: LayoutDashboard,
        isActive: true,

      },
      {
        title: "Events",   // This Page can see only admin
        url: `/${userRole}/users`,
        icon: Users2Icon,
        adminOnly: true, // 👈 Admin-only
      },
      {
        title: "My Events",
        url: `/${userRole}/my-events`,
        icon: CalendarDays,
      },
      {
        title: "Participants",
        url: `/${userRole}/participants`,
        icon: UsersIcon,
        adminOnly: true, // 👈 Admin-only
      },
      {
        title: "Invitations",
        url: `/${userRole}/invitations`,
        icon: Mail,
      },
      {
        title: "Notification",
        url: `/${userRole}/notification`,
        icon: TbNotification,
      },
      {
        title: "Reviews", // This Page can see only admin
        url: `/${userRole}/reviews`,
        icon: MdOutlineReviews,
        adminOnly: true, // 👈 Admin-only
      },
      {
        title: "Setting",
        url: `/${userRole}/setting`,
        icon: Settings,
      },
    ],

  };

   // Filter out admin-only items if the user is not an admin
  const filteredNavItems = data.navMain.filter((item) => !item.adminOnly || userRole === "admin");
  


  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex items-center justify-center">
                  <Logo />
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={filteredNavItems} />
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser />
      </SidebarFooter> */}
    </Sidebar>
  );
}
