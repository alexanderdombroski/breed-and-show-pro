import { z } from "zod";

// -------------------- DATE RECORDS --------------------

// Used for future events. Events can be converted to notes
export const BaseDateRecordSchema = z.object({
  _id: z.string(),
  date: z.date(),
  isEstimated: z.boolean().default(false),
  label: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const PigDateRecordSchema = BaseDateRecordSchema.extend({
  pigId: z.string(),
  _type: z.enum(["farrow", "heat", "breed", "vaccination"]),
});
type PigDateRecord = z.infer<typeof PigDateRecordSchema>;

export const LitterDateRecordSchema = BaseDateRecordSchema.extend({
  litterId: z.string(),
  _type: z.enum(["weaning"]),
});
type LitterDateRecord = z.infer<typeof LitterDateRecordSchema>;

export type DateRecord = PigDateRecord | LitterDateRecord;

// -------------------- PIGS --------------------

export const pigSchema = z.object({
  _id: z.string(),
  userId: z.string(),
  name: z.string(),
  earNotch: z.string(),
  breed: z.string(),
  sex: z.enum(["sow", "boar", "gilt", "barrow"]),
  status: z.enum(["open", "bred", "farrowed", "active"]),
  birthDate: z.date(),
  show: z.object({
    name: z.string().optional(),
    date: z.date().optional(),
  }),
  isArchived: z.boolean().default(false),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type Pig = z.infer<typeof pigSchema>;

// -------------------- LITTER STATS --------------------
export const litterSchema = z.object({
  _id: z.string(),
  userId: z.string(),
  sowId: z.string(),
  boarId: z.string().optional(),
  totalBorn: z.number().int().nonnegative(),
  bornAlive: z.number().int().nonnegative().optional(),
  stillborn: z.number().int().nonnegative().optional(),
  pigletIds: z.array(z.string()).default([]),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type Litter = z.infer<typeof litterSchema>;

// -------------------- USERS --------------------

export const userSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.email(),
  farmName: z.string(),
});
export type User = z.infer<typeof userSchema>;

// -------------------- NOTES --------------------

export const NoteSchema = z.object({
  _id: z.string(),
  _type: z.literal("simple"),
  pigId: z.string(),
  eventDate: z
    .date()
    .optional()
    .describe("A user-inputted date associated with the note"),
  notes: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type Note = z.infer<typeof NoteSchema>;

export const ExhibitorNoteSchema = NoteSchema.extend({
  _type: z.literal("exhibitor"),
  weight: z.number().describe("weight in lbs"),
});
export type ExhibitorNote = z.infer<typeof ExhibitorNoteSchema>;

export const BreedingNoteSchema = NoteSchema.extend({
  _type: z.literal("breeding"),
  method: z.enum(["natural", "ai"]).default("natural"),
});
export type BreedingNote = z.infer<typeof BreedingNoteSchema>;

export const HeatNoteSchema = NoteSchema.extend({
  _type: z.literal("heat"),
});
export type HeatNote = z.infer<typeof HeatNoteSchema>;

export const FarrowingNoteSchema = NoteSchema.extend({
  _type: z.literal("farrowing"),
  totalBorn: z.number().int().nonnegative(),
  bornAlive: z.number().int().nonnegative(),
  stillborn: z.number().int().nonnegative().default(0),
});
export type FarrowingNote = z.infer<typeof FarrowingNoteSchema>;

export const WeaningNoteSchema = NoteSchema.extend({
  _type: z.literal("weaning"),
  pigletsWeaned: z.number().int().nonnegative(),
});
export type WeaningNote = z.infer<typeof WeaningNoteSchema>;

export const VaccinationNoteSchema = NoteSchema.extend({
  _type: z.literal("vaccination"),
  vaccineName: z.string(),
});
export type VaccinationNote = z.infer<typeof VaccinationNoteSchema>;

export const TaskNoteSchema = NoteSchema.extend({
  _type: z.literal("task"),
  title: z.string(),
  userId: z.string(),
  dueDate: z.date().optional(),
  isCompleted: z.boolean().default(false),
  completedAt: z.date().optional(),
});
export type TaskNote = z.infer<typeof TaskNoteSchema>;

export type GenericNote =
  | Note
  | ExhibitorNote
  | BreedingNote
  | HeatNote
  | FarrowingNote
  | WeaningNote
  | VaccinationNote
  | TaskNote;
export type NoteType = GenericNote["_type"];
