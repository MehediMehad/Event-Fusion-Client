import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, Clock, CreditCard, Shield, Users } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">About Our Platform</h1>
        <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
          Connecting people through memorable events since 2023
        </p>
      </div>

      <div className="mb-20 grid gap-12 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Our Mission</h2>
          <p className="text-lg text-muted-foreground">
            We believe that great events bring people together. Our mission is to create a platform where anyone can
            organize and participate in events that matter to them, whether they're public gatherings or exclusive
            private functions.
          </p>
          <p className="text-lg text-muted-foreground">
            By providing powerful tools for event creators and a seamless experience for participants, we're building
            communities and fostering connections one event at a time.
          </p>
          <div className="pt-4">
            <Link href="/events">
              <Button>
                Explore Events <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="relative aspect-video overflow-hidden rounded-xl">
          <Image
            src="https://www.isx.ca/uploads/trip/51734467258.jpg"
            alt="People enjoying an event"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div className="mb-20">
        <h2 className="mb-10 text-center text-3xl font-bold">Key Features</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <Calendar className="h-10 w-10 text-primary" />
              <CardTitle className="mt-4">Event Management</CardTitle>
              <CardDescription>
                Create, edit, and manage your events with powerful customization options.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Users className="h-10 w-10 text-primary" />
              <CardTitle className="mt-4">Participation Control</CardTitle>
              <CardDescription>
                Approve participants, send invitations, and manage your event's audience.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CreditCard className="h-10 w-10 text-primary" />
              <CardTitle className="mt-4">Payment Integration</CardTitle>
              <CardDescription>
                Charge registration fees and manage payments seamlessly within the platform.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Shield className="h-10 w-10 text-primary" />
              <CardTitle className="mt-4">Privacy Controls</CardTitle>
              <CardDescription>
                Create public or private events with customized access requirements.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Clock className="h-10 w-10 text-primary" />
              <CardTitle className="mt-4">Real-time Updates</CardTitle>
              <CardDescription>
                Get instant notifications about event changes, approvals, and invitations.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Users className="h-10 w-10 text-primary" />
              <CardTitle className="mt-4">Community Building</CardTitle>
              <CardDescription>
                Connect with like-minded individuals through events that matter to you.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
{/* 
      <div className="mb-20">
        <h2 className="mb-10 text-center text-3xl font-bold">Our Team</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              name: "Sarah Johnson",
              role: "CEO & Founder",
              image: "/placeholder.svg?height=400&width=400",
            },
            {
              name: "Michael Chen",
              role: "CTO",
              image: "/placeholder.svg?height=400&width=400",
            },
            {
              name: "Aisha Patel",
              role: "Head of Design",
              image: "/placeholder.svg?height=400&width=400",
            },
            {
              name: "David Rodriguez",
              role: "Customer Success",
              image: "/placeholder.svg?height=400&width=400",
            },
          ].map((member, index) => (
            <div key={index} className="text-center">
              <div className="mx-auto mb-4 aspect-square w-40 overflow-hidden rounded-full">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  width={160}
                  height={160}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </div> */}

      <div className="rounded-xl bg-muted p-8 text-center">
        <h2 className="mb-4 text-2xl font-bold">Ready to get started?</h2>
        <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
          Join thousands of event organizers and participants on our platform today.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/register">
            <Button size="lg">Sign Up Now</Button>
          </Link>
          <Link href="/events">
            <Button variant="outline" size="lg">
              Browse Events
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
