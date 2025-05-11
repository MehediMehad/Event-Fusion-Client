"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FiStar } from "react-icons/fi";
import { ReviewData } from "@/types/review";
import { formatTimeAgo } from "@/lib/format";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deleteReview } from "@/services/Review";
import { ReviewUpdateDialog } from "@/components/ui/core/ReviewUpdateDialog";
import DeleteReviewDialog from "@/components/ui/core/DeleteReviewDialog";

export default function DashboardReviews({
  reviews,
}: {
  reviews: ReviewData[];
}) {

  return (
    <div className="grid gap-6 mt-10 mx-10">
      <h1 className="text-3xl font-bold tracking-tight">My Reviews</h1>

      {reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review: ReviewData) => (
            <div
              key={review.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <img
                  src={review.event.coverPhoto}
                  alt={review.event.title}
                  className="w-16 h-16 object-cover rounded-md"
                />

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <Link
                        href={`/events/${review.eventId}`}
                        className="hover:underline"
                      >
                        <h2 className="font-semibold">{review.event.title}</h2>
                      </Link>
                      <p className="text-sm text-gray-500">
                        {review.event.date_time}
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FiStar
                          key={i}
                          className={`${
                            i < review.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                          size={16}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="mt-2 text-gray-700">{review.comment}</p>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>{formatTimeAgo(review.created_at)}</span>
                    </div>

                    <div className="flex gap-2">
                      <ReviewUpdateDialog review={review}/>
                      <DeleteReviewDialog review={review}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <h3 className="mb-2 text-lg font-semibold">No reviews yet</h3>
          <p className="text-muted-foreground">
            You haven&apos;t written any reviews yet.
          </p>
          <Button className="mt-4" asChild>
            <Link href="/events">Browse Events</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
