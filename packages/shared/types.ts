import { z } from "zod";

export const pigSchema = z.object({
  _id: z.string(),
  earNotch: z.string(),
  name: z.string(),
  childIds: z.array(z.string()),
  birthDate: z.date(),
  weight: z.number(),
  notes: z.string(),
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
