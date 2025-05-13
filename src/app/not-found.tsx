"use client"

import Link from "next/link"
import { ArrowLeft, Home } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="mb-6 text-8xl font-bold text-primary">404</div>

      <h1 className="mb-4 text-3xl font-bold">Page Not Found</h1>

      <p className="mb-8 max-w-md text-muted-foreground">
        Sorry, the page you are looking for exist or has been moved.
      </p>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Link href="/">
          <Button className="gap-2">
            <Home className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <Button variant="outline" onClick={() => window.history.back()} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Go Back
        </Button>
      </div>
    </div>
  )
}
