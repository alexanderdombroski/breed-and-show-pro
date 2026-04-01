import {
  NoteSchema,
  ExhibitorNoteSchema,
  BreedingNoteSchema,
  HeatNoteSchema,
  FarrowingNoteSchema,
  WeaningNoteSchema,
  VaccinationNoteSchema,
  TaskNoteSchema,
} from "../../../../shared/types/schemas.ts";
import type {
  Note,
  ExhibitorNote,
  BreedingNote,
  HeatNote,
  FarrowingNote,
  WeaningNote,
  VaccinationNote,
  TaskNote,
  GenericNote,
} from "../../../../shared/types/schemas.ts";

type SharedOmitFields = "_id" | "_type" | "createdAt" | "updatedAt";

const _simpleNotes: Omit<Note, SharedOmitFields>[] = [
  {
    pigId: "0",
    eventDate: new Date("2024-12-15"),
    notes: "Ruby appears healthy and active. Eating well.",
  },
  {
    pigId: "1",
    notes: "Daisy had a slight limp, monitored over next few days.",
  },
  {
    pigId: "4",
    eventDate: new Date("2025-01-10"),
    notes: "Rosie is in excellent condition for breeding season.",
  },
];
const simpleNotes: Omit<Note, "_id">[] = _simpleNotes.map((n) => ({
  ...n,
  _type: "simple",
  createdAt: new Date(),
  updatedAt: new Date(),
}));

const _exhibitorNotes: Omit<ExhibitorNote, SharedOmitFields>[] = [
  {
    pigId: "5",
    eventDate: new Date("2024-10-20"),
    weight: 245,
    notes: "Bacon showed at Harvest Fair - excellent condition",
  },
  {
    pigId: "8",
    eventDate: new Date("2024-11-02"),
    weight: 210,
    notes: "Patches weighed in at Big Livestock Show",
  },
  {
    pigId: "0",
    eventDate: new Date("2024-08-10"),
    weight: 520,
    notes: "Ruby's County Fair weight - healthy adult",
  },
];
const exhibitorNotes: Omit<ExhibitorNote, "_id">[] = _exhibitorNotes.map(
  (n) => ({
    ...n,
    _type: "exhibitor",
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
);

const _breedingNotes: Omit<BreedingNote, SharedOmitFields>[] = [
  {
    pigId: "1",
    eventDate: new Date("2024-11-15"),
    method: "ai",
    notes: "Daisy artificially inseminated with Titan genetics",
  },
  {
    pigId: "4",
    eventDate: new Date("2025-01-05"),
    method: "natural",
    notes: "Rosie bred naturally with Crusher",
  },
  {
    pigId: "7",
    eventDate: new Date("2024-12-20"),
    method: "ai",
    notes: "Maxine AI breeding session completed",
  },
];
const breedingNotes: Omit<BreedingNote, "_id">[] = _breedingNotes.map((n) => ({
  ...n,
  _type: "breeding",
  createdAt: new Date(),
  updatedAt: new Date(),
}));

const _heatNotes: Omit<HeatNote, SharedOmitFields>[] = [
  {
    pigId: "4",
    eventDate: new Date("2025-01-02"),
    notes: "Rosie entered heat cycle - observed standing reflex",
  },
  {
    pigId: "7",
    eventDate: new Date("2024-12-15"),
    notes: "Maxine showing clear heat signs",
  },
  {
    pigId: "8",
    eventDate: new Date("2025-01-08"),
    notes: "Patches in heat - preparing for breeding",
  },
];
const heatNotes: Omit<HeatNote, "_id">[] = _heatNotes.map((n) => ({
  ...n,
  _type: "heat",
  createdAt: new Date(),
  updatedAt: new Date(),
}));

const _farrowingNotes: Omit<FarrowingNote, SharedOmitFields>[] = [
  {
    pigId: "0",
    eventDate: new Date("2023-04-20"),
    totalBorn: 9,
    bornAlive: 8,
    stillborn: 1,
    notes: "Ruby's litter - healthy piglets",
  },
  {
    pigId: "1",
    eventDate: new Date("2023-02-15"),
    totalBorn: 3,
    bornAlive: 3,
    stillborn: 0,
    notes: "Daisy's successful farrowing",
  },
];
const farrowingNotes: Omit<FarrowingNote, "_id">[] = _farrowingNotes.map(
  (n) => ({
    ...n,
    _type: "farrowing",
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
);

const _weaningNotes: Omit<WeaningNote, SharedOmitFields>[] = [
  {
    pigId: "0",
    eventDate: new Date("2023-06-01"),
    pigletsWeaned: 8,
    notes: "Ruby's litter weaned successfully at 6 weeks",
  },
  {
    pigId: "1",
    eventDate: new Date("2023-04-01"),
    pigletsWeaned: 3,
    notes: "Daisy's piglets weaned",
  },
];
const weaningNotes: Omit<WeaningNote, "_id">[] = _weaningNotes.map((n) => ({
  ...n,
  _type: "weaning",
  createdAt: new Date(),
  updatedAt: new Date(),
}));

const _vaccinationNotes: Omit<VaccinationNote, SharedOmitFields>[] = [
  {
    pigId: "5",
    eventDate: new Date("2024-09-15"),
    vaccineName: "Porcine Circovirus Vaccine (PCV2)",
    notes: "Bacon vaccinated against PCV",
  },
  {
    pigId: "4",
    eventDate: new Date("2024-12-01"),
    vaccineName: "Pseudorabies Vaccine",
    notes: "Rosie received PR vaccine booster",
  },
  {
    pigId: "7",
    eventDate: new Date("2024-11-10"),
    vaccineName: "Erysipelothrix Vaccine",
    notes: "Maxine vaccinated against erysipelas",
  },
];
const vaccinationNotes: Omit<VaccinationNote, "_id">[] = _vaccinationNotes.map(
  (n) => ({
    ...n,
    _type: "vaccination",
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
);

const _taskNotes: Omit<TaskNote, SharedOmitFields>[] = [
  {
    pigId: "0",
    title: "Schedule health check",
    userId: "1",
    dueDate: new Date("2025-02-15"),
    isCompleted: false,
  },
  {
    pigId: "5",
    title: "Monitor weight gain",
    userId: "1",
    dueDate: new Date("2025-02-01"),
    isCompleted: true,
    completedAt: new Date("2025-01-28"),
  },
  {
    pigId: "4",
    title: "Prepare breeding records",
    userId: "1",
    dueDate: new Date("2025-01-25"),
    isCompleted: true,
    completedAt: new Date("2025-01-20"),
  },
  {
    pigId: "8",
    title: "Follow up post-vaccination",
    userId: "1",
    dueDate: new Date("2025-02-05"),
    isCompleted: false,
  },
];
const taskNotes: Omit<TaskNote, "_id">[] = _taskNotes.map((n) => ({
  ...n,
  _type: "task",
  createdAt: new Date(),
  updatedAt: new Date(),
}));

export const _notes: GenericNote[] = [
  ...simpleNotes.map((n) => NoteSchema.parse({ ...n, _id: "" })),
  ...exhibitorNotes.map((n) => ExhibitorNoteSchema.parse({ ...n, _id: "" })),
  ...breedingNotes.map((n) => BreedingNoteSchema.parse({ ...n, _id: "" })),
  ...heatNotes.map((n) => HeatNoteSchema.parse({ ...n, _id: "" })),
  ...farrowingNotes.map((n) => FarrowingNoteSchema.parse({ ...n, _id: "" })),
  ...weaningNotes.map((n) => WeaningNoteSchema.parse({ ...n, _id: "" })),
  ...vaccinationNotes.map((n) =>
    VaccinationNoteSchema.parse({ ...n, _id: "" }),
  ),
  ...taskNotes.map((n) => TaskNoteSchema.parse({ ...n, _id: "" })),
];

export const notes: GenericNote[] = _notes.map((n, i) => ({
  ...n,
  _id: String(i),
}));
