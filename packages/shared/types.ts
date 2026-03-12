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
  noteIds: z.array(z.string()),
  vaccinations: z.array(
    z.object({
      vaccine: z.string(),
      date: z.date(),
      notes: z.string(),
    }),
  ),
  photo: z.string().optional(),
  show: z.object({
    name: z.string().optional(),
    date: z.date().optional(),
  }),
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

// -------------------- NOTES --------------------

export const notesSchema = z.object({
  _id: z.string(),
  date: z.date(),
  weight: z.number().describe("weight in lbs").optional(),
  notes: z.string().optional(),
  photos: z.array(z.string().describe("url of image")),
});
