import { z } from "zod";

// -------------------- PIGS --------------------

export const pigSchema = z.object({
  _id: z.string(),
  userId: z.string(),
  earNotch: z.string(),
  name: z.string(),
  description: z.string(),
  childIds: z.array(z.string()),
  birthDate: z.date(),
  notes: z.array(
    z.object({
      date: z.date(),
      weight: z.number().describe("weight in lbs").optional(),
      notes: z.string().optional(),
    }),
  ),
  vaccinations: z.array(
    z.object({
      vaccine: z.string(),
      date: z.date(),
      notes: z.string(),
    }),
  ),
  showDate: z.date(),
  photos: z.array(z.string().describe("url of image")),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type Pig = z.infer<typeof pigSchema>;

// -------------------- USERS --------------------

export const userSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.email(),
});
export type User = z.infer<typeof userSchema>;
