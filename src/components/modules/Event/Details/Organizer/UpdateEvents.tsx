"use client";
import UpdateImagePreviewer from "./UpdateImagePreviewer";
import UpdateImageUploader from "./UpdateImageUploader";
import { updateSchema } from "../../CreateEvent/EventForm/eventValidation";
import { updateEvent } from "@/services/Event";
import { TEventResponse } from "@/types/event";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { DollarSign, Calendar1Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { format } from "date-fns";

export function UpdateEvents({ event }: { event: TEventResponse }) {
  const router = useRouter();
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[]>(
    event.metadata.coverPhoto ? [event.metadata.coverPhoto] : []
  );

  const form = useForm({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      title: event.metadata.title,
      description: event.metadata.description,
      time: new Date(event.metadata.date_time),
      venue: event.metadata.venue,
      location: event.metadata.location,
      is_public: event.metadata.is_public,
      is_paid: event.metadata.is_paid,
      registration_fee: event.metadata.registration_fee || "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const isPaid = form.watch("is_paid");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formattedDateTime = format(data.time, "yyyy-MM-dd HH:mm");
    const eventData = {
      event: {
        title: data.title,
        description: data.description,
        date_time: formattedDateTime,
        venue: data.venue,
        location: data.location,
        is_public: data.is_public,
        is_paid: data.is_paid,
        registration_fee: data.is_paid ? Number(data.registration_fee || 0) : 0,
        status: "UPCOMING",
      },
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(eventData));
    formData.append("file", imageFiles[0]);


    try {
      const res = await updateEvent(formData, event.metadata.id);

      if (res.success) {
        toast.success(res.message);
        router.push(`/events/${event.metadata.id}`);
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      console.error(err);
      toast.error("An error occurred while creating the event");
    }
  };

  function handleDateSelect(date: Date | undefined) {
    if (date) {
      const currentTime = form.getValues("time") || new Date();
      const newDateTime = new Date(date);
      newDateTime.setHours(
        currentTime.getHours(),
        currentTime.getMinutes(),
        currentTime.getSeconds()
      );
      form.setValue("time", newDateTime);
    }
  }

  function handleTimeChange(type: "hour" | "minute" | "ampm", value: string) {
    const currentTime = form.getValues("time") || new Date();
    const newTime = new Date(currentTime);
    if (type === "hour") {
      const hour = parseInt(value, 10);
      const isPM = newTime.getHours() >= 12;
      newTime.setHours(isPM ? hour + 12 : hour);
    } else if (type === "minute") {
      newTime.setMinutes(parseInt(value, 10));
    } else if (type === "ampm") {
      const hours = newTime.getHours();
      if (value === "AM" && hours >= 12) {
        newTime.setHours(hours - 12);
      } else if (value === "PM" && hours < 12) {
        newTime.setHours(hours + 12);
      }
    }
    form.setValue("time", newTime);
  }

  return (
    <div className="w-[800px] mx-auto p-5 border rounded-md">
      <h1 className="text-3xl font-bold">Update Event</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Image Upload Section */}
          <div className="w-full">
            <div className="flex justify-between items-center border-t border-b py-3">
              <FormLabel>Image</FormLabel>
            </div>
            <div className="flex gap-4">
              {imagePreview.length > 0 ? (
                <UpdateImagePreviewer
                  imagePreview={imagePreview}
                  setImageFiles={setImageFiles}
                  setImagePreview={setImagePreview}
                  className="mt-1 w-full"
                />
              ) : (
                <UpdateImageUploader
                  setImagePreview={setImagePreview}
                  setImageFiles={setImageFiles}
                  label="Upload Logo"
                />
              )}
            </div>
          </div>

          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter event title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date & Time Picker */}
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Enter your date & time (12h)</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "MM/dd/yyyy hh:mm aa")
                        ) : (
                          <span>MM/DD/YYYY hh:mm aa</span>
                        )}
                        <Calendar1Icon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <div className="sm:flex">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={handleDateSelect}
                        initialFocus
                      />
                      <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
                        {/* Hour Selector */}
                        <ScrollArea className="w-64 sm:w-auto">
                          <div className="flex sm:flex-col p-2">
                            {Array.from({ length: 12 }, (_, i) => i + 1)
                              .reverse()
                              .map((hour) => (
                                <Button
                                  key={hour}
                                  size="icon"
                                  variant={
                                    field.value &&
                                    field.value.getHours() % 12 === hour % 12
                                      ? "default"
                                      : "ghost"
                                  }
                                  className="sm:w-full shrink-0 aspect-square"
                                  onClick={() =>
                                    handleTimeChange("hour", hour.toString())
                                  }
                                >
                                  {hour}
                                </Button>
                              ))}
                          </div>
                          <ScrollBar
                            orientation="horizontal"
                            className="sm:hidden"
                          />
                        </ScrollArea>

                        {/* Minute Selector */}
                        <ScrollArea className="w-64 sm:w-auto">
                          <div className="flex sm:flex-col p-2">
                            {Array.from({ length: 12 }, (_, i) => i * 5).map(
                              (minute) => (
                                <Button
                                  key={minute}
                                  size="icon"
                                  variant={
                                    field.value &&
                                    field.value.getMinutes() === minute
                                      ? "default"
                                      : "ghost"
                                  }
                                  className="sm:w-full shrink-0 aspect-square"
                                  onClick={() =>
                                    handleTimeChange(
                                      "minute",
                                      minute.toString()
                                    )
                                  }
                                >
                                  {minute.toString().padStart(2, "0")}
                                </Button>
                              )
                            )}
                          </div>
                          <ScrollBar
                            orientation="horizontal"
                            className="sm:hidden"
                          />
                        </ScrollArea>

                        {/* AM/PM Selector */}
                        <ScrollArea>
                          <div className="flex sm:flex-col p-2">
                            {["AM", "PM"].map((ampm) => (
                              <Button
                                key={ampm}
                                size="icon"
                                variant={
                                  field.value &&
                                  ((ampm === "AM" &&
                                    field.value.getHours() < 12) ||
                                    (ampm === "PM" &&
                                      field.value.getHours() >= 12))
                                    ? "default"
                                    : "ghost"
                                }
                                className="sm:w-full shrink-0 aspect-square"
                                onClick={() => handleTimeChange("ampm", ampm)}
                              >
                                {ampm}
                              </Button>
                            ))}
                          </div>
                        </ScrollArea>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Select a date and time for the event.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your event..."
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Venue & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="venue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Venue</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter venue name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter location (city, country)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Toggle Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="is_public"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Public Event</FormLabel>
                    <FormDescription>
                      Make this event visible to everyone
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="is_paid"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Paid Event</FormLabel>
                    <FormDescription>
                      Charge participants to join your event
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Registration Fee (Conditional) */}
          {isPaid && (
            <FormField
              control={form.control}
              name="registration_fee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Registration Fee (BDT)</FormLabel>
                  <FormControl>
                    <div className="flex items-center">
                      <Input
                        type="number"
                        placeholder="Enter amount"
                        {...field}
                      />
                      <DollarSign className="ml-2 h-4 w-4 text-muted-foreground" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Buttons */}
          <div className="flex justify-end space-x-4 pt-4">
            <Button
              variant="outline"
              type="button"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update Event"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
