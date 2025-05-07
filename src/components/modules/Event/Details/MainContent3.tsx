"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  formatCurrency,
  formatDate,
  formatTime,
  formatTimeAgo,
} from "@/lib/format";
import {
  AlertCircle,
  Ban,
  Calendar,
  Check,
  Clock,
  DollarSign,
  Edit,
  Heart,
  Lock,
  MapPin,
  Share,
  Star,
  Trash,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
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
import { Separator } from "@radix-ui/react-select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import {
  MOCK_PARTICIPANTS,
  MOCK_REVIEWS,
  ParticipantType,
} from "@/lib/fakedata";
import { useUser } from "@/context/UserContext";
import { useState } from "react";
import EventNotFound from "./EventNotFound";

const MainContent3 = ({ event }: { event: any }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isJoining, setIsJoining] = useState(false);
  const { user } = useUser();
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(5);
  const [participants, setParticipants] = useState(
    MOCK_PARTICIPANTS.filter((p) => p.eventId === 1)
  );

  // In a real app, fetch event by ID from API
  const reviews = MOCK_REVIEWS.filter((r) => r.eventId === 1);

  // Check if user has joined the event
  const hasJoined =
    user &&
    participants.some(
      (p) => p.userId === user.userId && p.status === "approved"
    );

  // Check if user has already reviewed
  const userReview = user && reviews.find((r) => r.userId === user.userId);

  
  // 1 Create a new participant
  // 2 Free Public → Join
  // 3 Paid Public → Pay & Join
  // 4 Free Private → Request to Join
  // 5 Paid Private → Pay & Request
  const isOrganizer = user?.userId === event.organizerId;
  const isPastEvent = new Date(event.date) < new Date();

  const handleJoinEvent = () => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    setIsJoining(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsJoining(false);
      
      // Create a new participant
      const newParticipant: ParticipantType = {
        id: `participant-${Date.now()}`,
        userId: user.userId,
        eventId: event.id,
        user: user,
        status: event.isPrivate ? 'pending' : 'approved',
        paymentStatus: event.price > 0 ? 'pending' : undefined,
        createdAt: new Date().toISOString(),
      };
      
      if (event.price > 0) {
        toast({
          title: 'Payment Required',
          description: `Please complete payment of ${formatCurrency(event.price)} to join this event.`,
        });
        // In a real app, redirect to payment page
      } else if (event.isPrivate) {
        setParticipants([...participants, newParticipant]);
        toast({
          title: 'Request Submitted',
          description: 'Your request to join has been sent to the organizer.',
        });
      } else {
        setParticipants([...participants, newParticipant]);
        toast({
          title: 'Success!',
          description: 'You have successfully joined the event.',
        });
      }
    }, 1500);
  };

  const handleParticipantAction = (participantId: string, action: 'approve' | 'reject' | 'ban') => {
    setParticipants(participants.map(p => {
      if (p.id === participantId) {
        return {
          ...p,
          status: action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : 'banned'
        };
      }
      return p;
    }));

    toast({
      title: `Participant ${action === 'approve' ? 'Approved' : action === 'reject' ? 'Rejected' : 'Banned'}`,
      description: `The participant has been ${action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : 'banned'}.`,
    });
  };

  const handleDeleteEvent = () => {
    // In a real app, make an API call to delete the event
    toast({
      title: 'Event Deleted',
      description: 'The event has been successfully deleted.',
    });
    router.push('/dashboard/events');
  };

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

  const getJoinButtonText = () => {
    if (event.isPrivate && event.price > 0) {
      return 'Request & Pay';
    } else if (event.isPrivate) {
      return 'Request to Join';
    } else if (event.price > 0) {
      return `Pay & Join • ${formatCurrency(event.price)}`;
    } else {
      return 'Join for Free';
    }
  };

  const getPendingParticipants = () => 
    participants.filter(p => p.status === 'pending');

  const getApprovedParticipants = () =>
    participants.filter(p => p.status === 'approved');

  const getBannedParticipants = () =>
    participants.filter(p => p.status === 'banned');

  return (
    <div className="md:col-span-2">
      {/*  */}
      <div className="mb-6 mt-[-100px] rounded-lg bg-card p-6 shadow-lg">
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
              {getApprovedParticipants().length} / {event.capacity} attendees
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {isOrganizer ? (
            <>
              <Button
                className="bg-chart-2 hover:bg-chart-2/90"
                onClick={() =>
                  router.push(`/dashboard/events/${event.id}/edit`)
                }
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Event
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    <Trash className="mr-2 h-4 w-4" />
                    Delete Event
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Event</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this event? This action
                      cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteEvent}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          ) : (
            <>
              <Button
                className={
                  event.price > 0
                    ? "bg-chart-1 hover:bg-chart-1/90"
                    : "bg-chart-2 hover:bg-chart-2/90"
                }
                onClick={handleJoinEvent}
                disabled={isJoining || hasJoined}
              >
                {isJoining
                  ? "Processing..."
                  : hasJoined
                  ? "Already Joined"
                  : getJoinButtonText()}
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon">
                <Share className="h-5 w-5" />
              </Button>
            </>
          )}
        </div>
      </div>

      {/* <Tabs defaultValue="details" className="mb-8">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="participants">
            Participants
            {isOrganizer && getPendingParticipants().length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {getPendingParticipants().length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="mt-6">
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
        </TabsContent>
        <TabsContent value="participants" className="mt-6">
          <div className="rounded-lg border p-6">
            <h2 className="mb-4 text-xl font-semibold">
              {getApprovedParticipants().length} Participants
            </h2>

            {isOrganizer && getPendingParticipants().length > 0 && (
              <div className="mb-8">
                <h3 className="mb-4 font-medium">Pending Requests</h3>
                <div className="space-y-4">
                  {getPendingParticipants().map((participant) => (
                    <div
                      key={participant.id}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full bg-muted">
                          <Image
                            src={
                              participant.user.image ||
                              `https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg`
                            }
                            alt={participant.user.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{participant.user.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Requested {formatTimeAgo(participant.createdAt)}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() =>
                            handleParticipantAction(participant.id, "approve")
                          }
                        >
                          <Check className="mr-2 h-4 w-4" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            handleParticipantAction(participant.id, "reject")
                          }
                        >
                          <X className="mr-2 h-4 w-4" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4">
              {getApprovedParticipants().map((participant) => (
                <div
                  key={participant.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full bg-muted">
                      <Image
                        src={
                          participant.user.image ||
                          `https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg`
                        }
                        alt={participant.user.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{participant.user.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Joined {formatTimeAgo(participant.createdAt)}
                      </p>
                    </div>
                  </div>
                  {isOrganizer && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          •••
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() =>
                            handleParticipantAction(participant.id, "ban")
                          }
                        >
                          <Ban className="mr-2 h-4 w-4" />
                          Ban Participant
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              ))}
            </div>

            {getBannedParticipants().length > 0 && isOrganizer && (
              <div className="mt-8">
                <h3 className="mb-4 font-medium">Banned Participants</h3>
                <div className="space-y-4">
                  {getBannedParticipants().map((participant) => (
                    <div
                      key={participant.id}
                      className="flex items-center justify-between rounded-lg border border-destructive/20 bg-destructive/5 p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full bg-muted">
                          <Image
                            src={
                              participant.user.image ||
                              `https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg`
                            }
                            alt={participant.user.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{participant.user.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Banned {formatTimeAgo(participant.createdAt)}
                          </p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          handleParticipantAction(participant.id, "approve")
                        }
                      >
                        Unban
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="mt-6">
          <div className="rounded-lg border p-6">
            <h2 className="mb-4 text-xl font-semibold">Reviews & Ratings</h2>

            {isPastEvent && hasJoined && !userReview && (
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
                            src={
                              review.user.image ||
                              `https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg`
                            }
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
                                Are you sure you want to delete your review?
                                This action cannot be undone.
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
                <p className="text-center text-muted-foreground">
                  {isPastEvent
                    ? "No reviews yet. Be the first to share your experience!"
                    : "Reviews will be available after the event has taken place."}
                </p>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs> */}
    </div>
  );
};

export default MainContent3;
