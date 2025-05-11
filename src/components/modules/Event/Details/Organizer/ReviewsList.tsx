import DeleteReviewDialog from "@/components/ui/core/DeleteReviewDialog";
import { ReviewUpdateDialog } from "@/components/ui/core/ReviewUpdateDialog";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/context/UserContext";
import { formatTimeAgo } from "@/lib/format";
import { TEventResponse } from "@/types/event";
import { Star } from "lucide-react";
import Image from "next/image";

const ReviewsList = ({ event }: { event: TEventResponse }) => {
  const { user } = useUser();

  // created_at descending order (newest first)
  const reviews = [...event.review].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <div className="space-y-6">
      {reviews?.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative h-10 w-10 overflow-hidden rounded-full bg-muted">
                  <Image
                    src={
                      review.user.profilePhoto ||
                      `https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg `
                    }
                    alt={review.user.name}
                    fill
                  />
                </div>
                <div>
                  <p className="font-medium">{review.user.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatTimeAgo(review.created_at)}
                  </p>
                </div>
              </div>
              {user?.userId === review.user.id && (
                <div>
                  <ReviewUpdateDialog review={review} />
                  <DeleteReviewDialog review={review} />
                </div>
              )}
            </div>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < review.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm">{review.comment}</p>
            <Separator className="my-4" />
          </div>
        ))
      ) : (
        <p className="text-center text-muted-foreground">No reviews yet.</p>
      )}
    </div>
  );
};

export default ReviewsList;
