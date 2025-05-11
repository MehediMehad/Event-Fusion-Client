"use client";

import React from "react";
import { TEventResponse } from "@/types/event";
import { useUser } from "@/context/UserContext";
import { Star } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { SendReviewAction } from "@/services/Review";
import { toast } from "sonner";
import ReviewsList from "./ReviewsList";

const PSTATUS = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  BANNED: "BANNED",
} as const;

type ReviewType = {
  id: string;
  userId: string;
  eventId: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: {
    name: string;
    image?: string;
  };
};

const Reviews = ({ event }: { event: TEventResponse }) => {
  const { user } = useUser();
  const [rating, setRating] = React.useState<number>(0);
  const [newReview, setNewReview] = React.useState<string>("");
  // const [reviews, setReviews] = React.useState<ReviewType[]>([]);

  const isOrganizer = user?.userId === event.metadata.organizer.id;
  const isPastEvent = true; // new Date(event.metadata.date_time) < new Date();

  const hasJoined = event.participation.some(
    (p) => p.userId === user?.userId && p.status === PSTATUS.APPROVED
  );
  const hasReviewed = event.review.some(
    (r) => r.user.id === user?.userId
  );

  console.log("😂😂",event);

  const handleSubmitReview = async () => {
    if (!rating) return toast.warning("Add Rating")
    if (!newReview.trim()) return toast.warning("Wright Review")

    try {
      const res = await SendReviewAction({
        eventId: event.metadata.id,
        rating: rating.toString(),
        comment: newReview,
      });
      if (res.success) {
        toast.success(`Thanks For FeedBack`);
        setRating(0);
      } else {
        toast.error(res.message || "Failed to send invitation");
      }
    } catch (error) {
      console.error("Failed to submit review");
    }
  };

  // TODO
  // const handleDeleteReview = async (reviewId: string) => {
  //   try {
  //     await axios.delete(`/api/reviews/${reviewId}`);
  //     setReviews(reviews.filter((r) => r.id !== reviewId));
  //   } catch (error) {
  //     console.error("Failed to delete review");
  //   }
  // };

  return (
    <div className="rounded-lg border p-6">
      <h2 className="mb-4 text-xl font-semibold">Reviews & Ratings</h2>

      {/* Review Form */}
      {/* {isPastEvent && hasJoined && !userReview && ( */}
      {user && !isOrganizer && hasJoined && !hasReviewed && (
        <div className="mb-6 space-y-4">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} onClick={() => setRating(star)}>
                <Star
                  className={`h-6 w-6 ${
                    star <= rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
          <Textarea
            placeholder="Share your experience..."
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            className="min-h-[100px]"
          />
          <Button onClick={handleSubmitReview} disabled={!newReview.trim()}>
            Submit Review
          </Button>
        </div>
      )}

      {/* Reviews List */}
      <ReviewsList event={event} />
    </div>
  );
};

export default Reviews;
