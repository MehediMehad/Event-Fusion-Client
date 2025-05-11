import ProfileUpdateForm from "@/components/modules/Dashboard/Setting/ProfileUpdateForm";
import { getMyInfo } from "@/services/User";


// 🔁 Disable static generation for this page
export const dynamic = "force-dynamic";

const ProfileUpdate = async () => {
  const data = await getMyInfo();
  if (!data.data) {
    return <h1>kk</h1>
  }

  return (
    <div className="">
      <ProfileUpdateForm userIfo={data.data} />
    </div>
  );
};

export default ProfileUpdate;
