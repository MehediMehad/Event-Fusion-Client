import { z } from "zod";

export const eventFormSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  date: z.date({
    required_error: "Event date is required.",
  }),
  time: z.date({
    required_error: "Event time is required.",
  }),
  venue: z.string().min(3, {
    message: "Venue must be at least 3 characters.",
  }),
  location: z.string().min(3, {
    message: "Location must be at least 3 characters.",
  }),
  is_public: z.boolean().default(true),
  is_paid: z.boolean().default(false),
  registration_fee: z.string().optional(),
});