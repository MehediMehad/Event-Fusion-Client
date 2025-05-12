import { AppSidebar } from "@/components/modules/Dashboard/sidebar/app-sidebar";
import DashboardNavbar from "@/components/shared/DashboardNavbar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import UserProvider, { useUser } from "@/context/UserContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
        <UserProvider>
      <SidebarInset>
        <header className="flex shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4 ">
            <SidebarTrigger className="-ml-1 " />
          </div>
          <DashboardNavbar/>
        </header>
        <div className="p-0 pt-0 min-h-screen">{children}</div>
      </SidebarInset>
      </UserProvider>
    </SidebarProvider>
  );
}
