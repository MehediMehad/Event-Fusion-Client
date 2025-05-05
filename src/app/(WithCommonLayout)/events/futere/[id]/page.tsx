'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  DollarSign,
  Lock,
  AlertCircle,
  ChevronDown,
  Heart,
  Share,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatDate, formatTime, formatCurrency } from '@/lib/format';
import { useUser } from '@/context/UserContext';
import { useToast } from '@/hooks/use-toast';
import { MOCK_EVENTS } from '@/lib/fakedata';

export default function EventPage({ params }: { params: { id: string } }) {
  const { id } = params;
  console.log({id});
  
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useUser();
    const [isJoining, setIsJoining] = useState(false);
  // In a real app, fetch event by ID from API
  const event = MOCK_EVENTS.find((e) => e.id === id);
  
  if (!event) {
    return (
      <div className="container flex min-h-[60vh] flex-col items-center justify-center px-4 py-12 text-center md:px-6">
        <AlertCircle className="mb-4 h-16 w-16 text-muted-foreground" />
        <h1 className="text-3xl font-bold">Event Not Found</h1>
        <p className="mt-2 text-muted-foreground">
          The event you're looking for doesn't exist or has been removed.
        </p>
        <Button className="mt-6" onClick={() => router.push('/events')}>
          Explore Events
        </Button>
      </div>
    );
  }

  const isOrganizer = user?.id === event.organizerId;

  const handleJoinEvent = () => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    setIsJoining(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsJoining(false);
      
      if (event.price > 0) {
        toast({
          title: 'Payment Required',
          description: `Please complete payment of ${formatCurrency(event.price)} to join this event.`,
        });
        // In a real app, redirect to payment page
      } else if (event.isPrivate) {
        toast({
          title: 'Request Submitted',
          description: 'Your request to join has been sent to the organizer.',
        });
      } else {
        toast({
          title: 'Success!',
          description: 'You have successfully joined the event.',
        });
      }
    }, 1500);
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

  return (
    <div className="pb-16">
      {/* Hero section */}
      <div className="relative h-[40vh] w-full md:h-[50vh]">
        <Image
          src={event.coverImage}
          alt={event.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Main content */}
          <div className="md:col-span-2">
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
                    {event.participantsCount} / {event.capacity} attendees
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {isOrganizer ? (
                  <>
                    <Button className="bg-chart-2 hover:bg-chart-2/90">
                      Edit Event
                    </Button>
                    <Button variant="outline">Manage Participants</Button>
                  </>
                ) : (
                  <>
                    <Button 
                      className={event.price > 0 ? "bg-chart-1 hover:bg-chart-1/90" : "bg-chart-2 hover:bg-chart-2/90"}
                      onClick={handleJoinEvent}
                      disabled={isJoining}
                    >
                      {isJoining ? 'Processing...' : getJoinButtonText()}
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

            <Tabs defaultValue="details" className="mb-8">
              <TabsList>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="participants">Participants</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="mt-6">
                <div className="prose max-w-none dark:prose-invert">
                  <h2 className="text-xl font-semibold">About this event</h2>
                  <p>{event.description}</p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    euismod, nisl nec ultricies lacinia, nunc est ultricies
                    nunc, in ultricies nunc nisl sit amet nunc. Sed euismod,
                    nisl nec ultricies lacinia, nunc est ultricies nunc, in
                    ultricies nunc nisl sit amet nunc.
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
                    entrepreneurs, and anyone interested in learning about the
                    latest trends and innovations.
                  </p>
                </div>

                <Accordion type="single" collapsible className="mt-8">
                  <AccordionItem value="faq-1">
                    <AccordionTrigger>
                      What is the refund policy?
                    </AccordionTrigger>
                    <AccordionContent>
                      Refunds are available up to 7 days before the event. After
                      that, we cannot offer refunds but you can transfer your
                      ticket to someone else.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="faq-2">
                    <AccordionTrigger>
                      Can I transfer my ticket to someone else?
                    </AccordionTrigger>
                    <AccordionContent>
                      Yes, you can transfer your ticket to someone else at any
                      time. Simply contact the organizer with the details of the
                      new attendee.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="faq-3">
                    <AccordionTrigger>
                      Will the event be recorded?
                    </AccordionTrigger>
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
                    {event.participantsCount} Participants
                  </h2>
                  <p className="mb-4 text-muted-foreground">
                    {event.isPrivate
                      ? 'This is a private event. Participants are only visible to the organizer.'
                      : 'Here are some of the attendees who have joined this event.'}
                  </p>
                  
                  {!event.isPrivate && (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="relative h-10 w-10 overflow-hidden rounded-full bg-muted">
                            <Image
                              src={`https://images.pexels.com/photos/${1000000 + i}/pexels-photo-${1000000 + i}.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2`}
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
                <div className="rounded-lg border p-6">
                  <h2 className="mb-4 text-xl font-semibold">Reviews & Ratings</h2>
                  <p className="text-muted-foreground">
                    Reviews will be available after the event has taken place.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-4 text-xl font-semibold">Organizer</h2>
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full bg-muted">
                    <Image
                      src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2"
                      alt={event.organizer}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{event.organizer}</p>
                    <p className="text-sm text-muted-foreground">
                      Event Organizer
                    </p>
                  </div>
                </div>
                <Separator className="my-4" />
                <p className="text-sm text-muted-foreground">
                  Experienced event organizer with a focus on tech and
                  professional development events.
                </p>
                <Button variant="ghost" className="mt-4 w-full">
                  Contact Organizer
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="mb-4 text-xl font-semibold">Location</h2>
                <div className="aspect-video overflow-hidden rounded-md bg-muted">
                  {/* In a real app, you'd use a map component here */}
                  <div className="flex h-full items-center justify-center">
                    <MapPin className="h-8 w-8 text-muted-foreground" />
                  </div>
                </div>
                <p className="mt-3 font-medium">{event.location}</p>
                <Button variant="outline" className="mt-4 w-full">
                  Get Directions
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="mb-4 text-xl font-semibold">Share Event</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="flex-1">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </Button>
                  <Button variant="outline" size="icon" className="flex-1">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </Button>
                  <Button variant="outline" size="icon" className="flex-1">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                    </svg>
                  </Button>
                  <Button variant="outline" size="icon" className="flex-1">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}