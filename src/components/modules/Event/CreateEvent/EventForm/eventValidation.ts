import { z } from "zod";

// Helper function to check future date/time
const isFutureDate = (value: any) => {
  const now = new Date();
  return value >= now;
};

export const eventFormSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  date: z.date({
    required_error: "Event date is required.",
  }).refine(isFutureDate, {
    message: "Event date cannot be in the past.",
  }),
  time: z.date({
    required_error: "Event time is required.",
  }).refine(isFutureDate, {
    message: "Event time cannot be in the past.",
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

export const updateSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }).optional(),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }).optional(),
  date: z.date({
    required_error: "Event date is required.",
  }).optional().refine((value) => {
    if (!value) return true; // allow undefined in update
    return isFutureDate(value);
  }, {
    message: "Event date cannot be in the past.",
  }),
  time: z.date({
    required_error: "Event time is required.",
  }).optional().refine((value) => {
    if (!value) return true; // allow undefined in update
    return isFutureDate(value);
  }, {
    message: "Event time cannot be in the past.",
  }),
  venue: z.string().min(3, {
    message: "Venue must be at least 3 characters.",
  }).optional(),
  location: z.string().min(3, {
    message: "Location must be at least 3 characters.",
  }).optional(),
  is_public: z.boolean().default(true).optional(),
  is_paid: z.boolean().default(false).optional(),
  registration_fee: z.string().optional(),
});
