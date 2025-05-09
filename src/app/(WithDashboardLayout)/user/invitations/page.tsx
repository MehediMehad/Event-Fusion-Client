import Invitations from "@/components/modules/dashboard/Invitations/Invitations";
import { geyMyNotification } from "@/services/Invitation";

const DashboardInvitationsPage = async () => {
      const data = await geyMyNotification();
      
      
      if (data.data.length === 0) {
          <h1>Data Not Found</h1>
        }
  return (
    <div className="p-10">
        <Invitations invitations={data.data}/>
    </div>
  );
};

export default DashboardInvitationsPage;