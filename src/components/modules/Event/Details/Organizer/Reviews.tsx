"use client";

import React from "react";
import { TEventResponse } from "@/types/event";
import { useUser } from "@/context/UserContext";
import { SeparatorHorizontal, Star, Trash } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { inviteUserAction } from "@/services/Invitation";
import { SendReviewAction } from "@/services/Review";
import { toast } from "sonner";

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
  const [reviews, setReviews] = React.useState<ReviewType[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  const isOrganizer = user?.userId === event.metadata.organizer.id;
  const isPastEvent = true; // new Date(event.metadata.date_time) < new Date();

  const hasJoined = event.participation.some(
    (p) => p.userId === user?.userId && p.status === PSTATUS.APPROVED
  );

  const userReview = reviews.find((r) => r.userId === user?.userId);

  // Load existing reviews from API
  React.useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(
          `/api/reviews?eventId=${event.metadata.id}`
        );
        setReviews(res.data || []);
      } catch (error) {
        console.error("Failed to fetch reviews");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [event.metadata.id]);

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );
    return `${diffInHours} hours ago`;
  };

  const handleSubmitReview = async () => {
    if (!newReview.trim() || !rating) return;

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

  if (loading) {
    return <div className="text-center py-4">Loading reviews...</div>;
  }

  return (
    <div className="rounded-lg border p-6">
      <h2 className="mb-4 text-xl font-semibold">Reviews & Ratings</h2>

      {/* Review Form */}
      {/* {isPastEvent && hasJoined && !userReview && ( */}
      {user && (
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
      <div className="space-y-6">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full bg-muted">
                    <Image
                      src={
                        review.user.image ||
                        `https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg `
                      }
                      alt={review.user.name}
                      fill
                    />
                  </div>
                  <div>
                    <p className="font-medium">{review.user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatTimeAgo(review.createdAt)}
                    </p>
                  </div>
                </div>
                {/* DODO */}
                {/* {user?.userId === review.userId && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Review</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete your review?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteReview(review.id)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )} */}
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
              <SeparatorHorizontal className="my-4" />
            </div>
          ))
        ) : (
          <p className="text-center text-muted-foreground">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default Reviews;
