"use client";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const EventNotFound = () => {
  const router = useRouter();
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center px-4 py-12 text-center md:px-6 mt-28">
      <AlertCircle className="mb-4 h-16 w-16 text-muted-foreground" />
      <h1 className="text-3xl font-bold">Event Not Found</h1>
      <p className="mt-2 text-muted-foreground">
        The event you&apos;re looking for doesn&apos;t exist or has been removed.
      </p>
      <Button className="mt-6" onClick={() => router.push("/events")}>
        Explore Events
      </Button>
    </div>
  );
};

export default EventNotFound;

