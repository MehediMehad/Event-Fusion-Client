"use client";
import { Button } from "../ui/button";
import { LogOut, Menu } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { logout } from "@/services/AuthService";
import { useUser } from "@/context/UserContext";
import { usePathname, useRouter } from "next/navigation";
import { protectedRoutes } from "@/contacts";
import Logo from "./Logo";
import { useEffect, useState } from "react";
import { getMyInfo } from "@/services/User";

export default function DashboardNavbar() {
  const { user, setIsLoading } = useUser();
  const [image, setImage] = useState("https://github.com/shadcn.png");
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const userRole = user?.role.toLocaleLowerCase();

    useEffect(() => {
      const fetchUserInfo = async () => {
        const userData = await getMyInfo();
        setImage(userData?.data?.profilePhoto)
      };
  
      fetchUserInfo();
    }, []);

  const handleLogOut = () => {
    logout();
    setIsLoading(true);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  return (
    <header className="border-b bg-background w-full sticky top-0">
      <div className="container flex justify-between items-center mx-auto h-16 px-5">
        <Link href="/">
          <h1 className="text-2xl font-black flex items-center sr-only">
            <Logo />
          </h1>
        </Link>

        {/* Desktop nav items */}
        <nav className="hidden md:flex gap-5 items-center">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <Link href="/events" className="hover:text-primary">
            Events
          </Link>
          <Link href="/about" className="hover:text-primary">
            About
          </Link>
          <Link href="/contact" className="hover:text-primary">
            Contact
          </Link>
        </nav>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          <Menu />
        </button>

        {/* Mobile nav dropdown */}
        {menuOpen && (
          <div className="absolute top-16 left-0 w-full bg-background shadow-md flex flex-col gap-3 p-4 md:hidden z-[99999]">
            <Link href="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link href="/events" onClick={() => setMenuOpen(false)}>
              Events
            </Link>
            <Link href="/about" onClick={() => setMenuOpen(false)}>
              About
            </Link>
          </div>
        )}

        <div className="flex items-center gap-2">
          {user?.email ? (
            <>
              <div className="hidden md:flex gap-4 mr-5">
                <Link href="/user/create-event">
                  <Button className="rounded-full ">Create Event</Button>
                </Link>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src={image || "https://github.com/shadcn.png"} />
                    <AvatarFallback>User</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href={`/${userRole}/dashboard`}>Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={`/${userRole}/my-events`}>My Event</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={`/${userRole}/invitations`}>Invitations</Link>
                  </DropdownMenuItem>
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
        </div>
      </div>
    </header>
  );
}
