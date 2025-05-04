"use client";
import { Button } from "../ui/button";
import { Heart, LogOut } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { logout } from "@/services/AuthService";
import { useUser } from "@/context/UserContext";
import { usePathname, useRouter } from "next/navigation";
import { protectedRoutes } from "@/contacts";
import Logo from "./Logo";

export default function Navbar() {
  const { user, setIsLoading } = useUser();

  const pathname = usePathname();
  const router = useRouter();

  const handleLogOut = () => {
    logout();
    setIsLoading(true);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  return (
    <header className="border-b bg-background w-full sticky top-0 z-[99999]">
      <div className="container flex justify-between items-center mx-auto h-16 px-5">
        <Link href="/">
          <h1 className="text-2xl font-black flex items-center">
            <Logo />
          </h1>
        </Link>
        <div className="max-w-md  flex-grow"></div>
        <nav className="flex gap-2">
          {user?.email ? (
            <>
              <div className="flex gap-4 mr-5">
                <Link href="/create-shop">
                  <Button className="rounded-full">Join Event</Button>
                </Link>

                <Link href="/create-shop">
                  <Button
                    className="rounded-full border bg-white text-black hover:bg-gray-100"
                  >
                    Create Event
                  </Button>
                </Link>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>User</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={`/${user?.role}/dashboard`}>Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Event</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="bg-red-500 cursor-pointer"
                    onClick={handleLogOut}
                  >
                    <LogOut />
                    <span>Log Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link href="/login">
              <Button className="rounded-full" variant="outline">
                Login
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
