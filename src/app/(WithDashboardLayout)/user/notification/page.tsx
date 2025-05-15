import Invitations from "@/components/modules/Dashboard/Invitations/Invitations";
import { getNotification } from "@/services/Invitation";

// 🔁 Opt out of static generation since this uses cookies or user-specific data
export const dynamic = "force-dynamic";

const NotificationPage = async () => {
  const data = await getNotification();
  

  // Handle error case
  if (!data || data.error) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-red-500">
          Error loading Notification: {data?.error || "Something went wrong"}
        </h1>
      </div>
    );
  }
  // Render component with valid data
  return (
    <div className="p-10">
      <Invitations tittle="Notification" invitations={data.data} />
    </div>
  );
};

export default NotificationPage;
