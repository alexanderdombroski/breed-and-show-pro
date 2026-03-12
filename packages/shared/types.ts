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
  isArchived: z.boolean().default(false),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type Pig = z.infer<typeof pigSchema>;

// -------------------- LIFECYCLE EVENTS --------------------
// BREEDING
export const breedingSchema = z.object({
  breedingDate: z.date(),
  boarId: z.string().optional(),
  boarName: z.string().optional(),
  method: z.enum(["natural", "ai"]).default("natural"),
  notes: z.string().optional(),
});
export type BreedingBody = z.infer<typeof breedingSchema>;

// FARROWING
export const farrowingSchema = z.object({
  farrowingDate: z.date(),
  totalBorn: z.number().int().nonnegative(),
  bornAlive: z.number().int().nonnegative(),
  stillborn: z.number().int().nonnegative().default(0),
  notes: z.string().optional(),
});
export type FarrowingBody = z.infer<typeof farrowingSchema>;

// WEANING
export const weaningSchema = z.object({
  weaningDate: z.date(),
  pigletsWeaned: z.number().int().nonnegative(),
  notes: z.string().optional(),
});
export type WeaningBody = z.infer<typeof weaningSchema>;

// HEAT
export const heatDateSchema = z.object({
  heatDate: z.date(),
  notes: z.string().optional(),
});
export type HeatDateBody = z.infer<typeof heatDateSchema>;

// ARCHIVE
export const archivePigSchema = z.object({
  isArchived: z.boolean(),
});
export type ArchivePigBody = z.infer<typeof archivePigSchema>;

// -------------------- HEARD STATS --------------------
export const herdSummarySchema = z.object({
  total: z.number().int().nonnegative(),
  bred: z.number().int().nonnegative(),
  farrowed: z.number().int().nonnegative(),
  open: z.number().int().nonnegative(),
});
export type HerdSummary = z.infer<typeof herdSummarySchema>;

// -------------------- LITTER STATS --------------------
export const litterSchema = z.object({
  _id: z.string(),
  userId: z.string(),
  sowId: z.string(),
  boarId: z.string().optional(),
  breedingDate: z.date(),
  expectedFarrowingDate: z.date().optional(),
  actualFarrowingDate: z.date().optional(),
  totalBorn: z.number().int().nonnegative().optional(),
  bornAlive: z.number().int().nonnegative().optional(),
  stillborn: z.number().int().nonnegative().default(0),
  weaningDate: z.date().optional(),
  pigletsWeaned: z.number().int().nonnegative().optional(),
  pigletIds: z.array(z.string()).default([]),
  notes: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type Litter = z.infer<typeof litterSchema>;

// -------------------- TASKS --------------------
export const taskSchema = z.object({
  _id: z.string(),
  userId: z.string(),
  title: z.string(),
  description: z.string().optional(),
  dueDate: z.date().optional(),
  isCompleted: z.boolean().default(false),
  completedAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type Task = z.infer<typeof taskSchema>;

// -------------------- UPCOMING DATES --------------------
export const upcomingDateTypeSchema = z.enum([
  "expectedFarrowing",
  "expectedWeaning",
  "heatCheck",
  "task",
  "vaccination",
]);
export type UpcomingDateType = z.infer<typeof upcomingDateTypeSchema>;

export const upcomingDateSchema = z.object({
  type: upcomingDateTypeSchema,
  date: z.date(),
  pigId: z.string().optional(),
  litterId: z.string().optional(),
  taskId: z.string().optional(),
  label: z.string(),
  notes: z.string().optional(),
});
export type UpcomingDate = z.infer<typeof upcomingDateSchema>;

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
