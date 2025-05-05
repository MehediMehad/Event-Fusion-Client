"use client";

import { MdOutlineRateReview } from "react-icons/md";
import { RiShareForwardFill } from "react-icons/ri";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/context/UserContext";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency, formatDate, formatTime, formatTimeAgo } from "@/lib/format";
import {
  Calendar,
  ChevronDown,
  Clock,
  DollarSign,
  Lock,
  MapPin,
  Star,
  Trash,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MOCK_PARTICIPANTS, MOCK_REVIEWS } from "@/lib/fakedata";
import { Textarea } from "@/components/ui/textarea";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Separator } from "@radix-ui/react-select";

const MainContent = ({ event }: { event: any }) => {
  const { toast } = useToast();
  const { user } = useUser();
  const router = useRouter();
  const [isJoining, setIsJoining] = useState(false);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(5);
  const isOrganizer = user?.userId === event.organizerId;
  const isPastEvent = new Date(event.date) < new Date();
  const reviews = MOCK_REVIEWS.filter((r) => r.eventId === 1);
    // Check if user has joined the event
    const hasJoined = user && MOCK_PARTICIPANTS.some(
      (p) => p.userId === user.userId && p.eventId === 1 && p.status === 'approved'
    );

      // Check if user has already reviewed
  const userReview = user && reviews.find((r) => r.userId === user.userId);

  const handleSubmitReview = () => {
    if (!user) return;
    
    // In a real app, this would be an API call
    const review = {
      id: `review-${Date.now()}`,
      userId: user.id,
      eventId: event.id,
      user: user,
      rating,
      comment: newReview,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    // Add review to mock data
    MOCK_REVIEWS.push(review);
    
    toast({
      title: 'Review Submitted',
      description: 'Thank you for sharing your feedback!',
    });
    
    setNewReview('');
    setRating(5);
  };

  const handleDeleteReview = (reviewId: string) => {
    // In a real app, this would be an API call
    const index = MOCK_REVIEWS.findIndex((r) => r.id === reviewId);
    if (index !== -1) {
      MOCK_REVIEWS.splice(index, 1);
      toast({
        title: 'Review Deleted',
        description: 'Your review has been removed.',
      });
    }
  };

  const handleJoinEvent = () => {
    if (!user) {
      router.push("/auth/login");
      return;
    }

    setIsJoining(true);

    // Simulate API call
    setTimeout(() => {
      setIsJoining(false);

      if (event.price > 0) {
        toast({
          title: "Payment Required",
          description: `Please complete payment of ${formatCurrency(
            event.price
          )} to join this event.`,
        });
        // In a real app, redirect to payment page
      } else if (event.isPrivate) {
        toast({
          title: "Request Submitted",
          description: "Your request to join has been sent to the organizer.",
        });
      } else {
        toast({
          title: "Success!",
          description: "You have successfully joined the event.",
        });
      }
    }, 1500);
  };

  const getJoinButtonText = () => {
    if (event.isPrivate && event.price > 0) {
      return "Request & Pay";
    } else if (event.isPrivate) {
      return "Request to Join";
    } else if (event.price > 0) {
      return `Pay & Join • ${formatCurrency(event.price)}`;
    } else {
      return "Join for Free";
    }
  };
  return (
    <div className="md:col-span-2 mt">
      <div className="mb-6 rounded-lg bg-card p-6 border">
        <div className="mb-4 flex flex-wrap gap-2">
          {event.isPrivate && (
            <Badge variant="outline" className="gap-1">
              <Lock className="h-3 w-3" />
              <span>Private</span>
            </Badge>
          )}
          {event.price > 0 ? (
            <Badge variant="outline" className="gap-1">
              <DollarSign className="h-3 w-3" />
              <span>{formatCurrency(event.price)}</span>
            </Badge>
          ) : (
            <Badge variant="outline">Free</Badge>
          )}
        </div>

        <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
          {event.title}
        </h1>

        <div className="mb-6 flex flex-wrap gap-4 text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-5 w-5" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-5 w-5" />
            <span>{formatTime(event.date)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="h-5 w-5" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="h-5 w-5" />
            <span>
              {event.participantsCount} / {event.capacity} attendees
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {isOrganizer ? (
            <>
              <Button className="bg-primary hover:bg-primary/90">
                Edit Event
              </Button>
              <Button variant="outline">Manage Participants</Button>
            </>
          ) : (
            <>
              <Button
                className={
                  event.price > 0
                    ? "bg-primary hover:bg-primary/90"
                    : "bg-primary hover:bg-primary/90"
                }
                onClick={handleJoinEvent}
                disabled={isJoining}
              >
                {isJoining ? "Processing..." : getJoinButtonText()}
              </Button>
              {/* TODO */}
              {/* <Button variant="outline" size="icon">
                <Heart className="h-5 w-5" />
              </Button> */}
              <Button variant="outline" size="icon">
                <MdOutlineRateReview size={40} />
              </Button>
              <Button variant="outline" size="icon">
                <RiShareForwardFill size={40} />
              </Button>
            </>
          )}
        </div>
      </div>

      <Tabs defaultValue="participants" className="mb-8">
        <TabsList>
          {/* <TabsTrigger value="details">Details</TabsTrigger> */}
          <TabsTrigger value="participants">Participants</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        {/* <TabsContent value="details" className="mt-6">
          <div className="prose max-w-none dark:prose-invert">
            <h2 className="text-xl font-semibold">About this event</h2>
            <p>{event.description}</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              euismod, nisl nec ultricies lacinia, nunc est ultricies nunc, in
              ultricies nunc nisl sit amet nunc. Sed euismod, nisl nec ultricies
              lacinia, nunc est ultricies nunc, in ultricies nunc nisl sit amet
              nunc.
            </p>

            <h2 className="mt-8 text-xl font-semibold">What to expect</h2>
            <ul>
              <li>Interactive sessions with industry experts</li>
              <li>Networking opportunities with like-minded professionals</li>
              <li>Hands-on workshops and demonstrations</li>
              <li>Refreshments and lunch provided</li>
            </ul>

            <h2 className="mt-8 text-xl font-semibold">Who should attend</h2>
            <p>
              This event is perfect for professionals in the tech industry,
              entrepreneurs, and anyone interested in learning about the latest
              trends and innovations.
            </p>
          </div>

          <Accordion type="single" collapsible className="mt-8">
            <AccordionItem value="faq-1">
              <AccordionTrigger>What is the refund policy?</AccordionTrigger>
              <AccordionContent>
                Refunds are available up to 7 days before the event. After that,
                we cannot offer refunds but you can transfer your ticket to
                someone else.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-2">
              <AccordionTrigger>
                Can I transfer my ticket to someone else?
              </AccordionTrigger>
              <AccordionContent>
                Yes, you can transfer your ticket to someone else at any time.
                Simply contact the organizer with the details of the new
                attendee.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-3">
              <AccordionTrigger>Will the event be recorded?</AccordionTrigger>
              <AccordionContent>
                Yes, all sessions will be recorded and made available to
                attendees after the event.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent> */}
        <TabsContent value="participants" className="mt-6">
          <div className="rounded-lg border p-6">
            <h2 className="mb-4 text-xl font-semibold">
              {event.participantsCount} Participants
            </h2>
            <p className="mb-4 text-muted-foreground">
              {event.isPrivate
                ? "This is a private event. Participants are only visible to the organizer."
                : "Here are some of the attendees who have joined this event."}
            </p>

            {!event.isPrivate && (
              <div className="grid gap-4 sm:grid-cols-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full bg-muted">
                      <Image
                        src={`https://images.pexels.com/photos/${
                          1000000 + i
                        }/pexels-photo-${
                          1000000 + i
                        }.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2`}
                        alt="Participant"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">Participant {i + 1}</p>
                      <p className="text-xs text-muted-foreground">
                        Joined {i + 1} day(s) ago
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {event.participantsCount > 6 && !event.isPrivate && (
              <Button
                variant="ghost"
                className="mt-4 gap-1 w-full justify-center"
              >
                <span>Show more</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            )}
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="mt-6">
        <TabsContent value="reviews" className="mt-6">
                <div className="rounded-lg border p-6">
                  <h2 className="mb-4 text-xl font-semibold">Reviews & Ratings</h2>
                  
                  {/* {isPastEvent && hasJoined && !userReview && ( */}
                  {user&& (
                    <div className="mb-6 space-y-4">
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setRating(star)}
                            className="focus:outline-none"
                          >
                            <Star
                              className={`h-6 w-6 ${
                                star <= rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
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
                      <Button
                        onClick={handleSubmitReview}
                        disabled={!newReview.trim()}
                      >
                        Submit Review
                      </Button>
                    </div>
                  )}
                  
                  <div className="space-y-6">
                    {reviews.length > 0 ? (
                      reviews.map((review) => (
                        <div key={review.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="relative h-10 w-10 overflow-hidden rounded-full bg-muted">
                                <Image
                                  src={review.user.image || `https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg`}
                                  alt={review.user.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <p className="font-medium">{review.user.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {formatTimeAgo(review.createdAt)}
                                </p>
                              </div>
                            </div>
                            {user?.userId === review.userId && (
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
                                      Are you sure you want to delete your review? This action cannot be undone.
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
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-sm">{review.comment}</p>
                          <Separator className="my-4" />
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-muted-foreground">
                        {isPastEvent
                          ? 'No reviews yet. Be the first to share your experience!'
                          : 'Reviews will be available after the event has taken place.'}
                      </p>
                    )}
                  </div>
                </div>
              </TabsContent>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MainContent;
