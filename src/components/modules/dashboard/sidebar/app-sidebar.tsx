"use client";

import * as React from "react";
import {
  Bot,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings,
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
import { NavUser } from "./nav-user";
import Link from "next/link";
import Logo from "@/assets/svgs/Logo";
import { MdNotificationAdd, MdOutlineReviews } from "react-icons/md";


import {
  LayoutDashboard,
  CalendarDays,
  Mail,
} from 'lucide-react';
import { TbNotification } from "react-icons/tb";


const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/user/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "My Events",
      url: "/user/my-events",
      icon: CalendarDays,
    },
    {
      title: "Invitations",
      url: "/user/invitations",
      icon: Mail,
    },
    {
      title: "Notification",
      url: "/user/notification",
      icon: TbNotification,
    },
    {
      title: "Reviews",
      url: "/user/reviews",
      icon: MdOutlineReviews,
    },
    {
      title: "Setting",
      url: "/user/setting",
      icon: Settings,
    },
    // {
    //   title: "Shop",
    //   url: "/user/shop/products",
    //   icon: Bot,
    //   items: [
    //     {
    //       title: "Manage Products",
    //       url: "/user/shop/products",
    //     },
    //     {
    //       title: "Manage Categories",
    //       url: "/user/shop/category",
    //     },
    //     {
    //       title: "Manage Brands",
    //       url: "/user/shop/brand",
    //     },
    //     {
    //       title: "Manage Coupon",
    //       url: "/user/shop/manage-coupon",
    //     },
    //   ],
    // },

    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: Settings,
    //   items: [
    //     {
    //       title: "Profile",
    //       url: "/profile",
    //     },
    //   ],
    // },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
        <NavMain items={data.navMain} />
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser />
      </SidebarFooter> */}
    </Sidebar>
  );
}
