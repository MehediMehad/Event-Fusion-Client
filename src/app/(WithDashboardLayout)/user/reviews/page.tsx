import DashboardReviews from "@/components/modules/dashboard/Reviews";
import { getMyReview } from "@/services/Review";

// 🔁 Disable static generation for this page
export const dynamic = "force-dynamic";

const DashboardReviewsPage = async () => {
  const data = await getMyReview();

  return (
    <div>
      <DashboardReviews reviews={data.data} />
    </div>
  );
};

export default DashboardReviewsPage;
