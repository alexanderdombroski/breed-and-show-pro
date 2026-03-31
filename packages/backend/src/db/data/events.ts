import {
  PigEventSchema,
  LitterEventSchema,
} from "../../../../shared/types/schemas.ts";
import type {
  Event,
  PigEvent,
  LitterEvent,
} from "../../../../shared/types/schemas.ts";

type SharedOmitFields = "_id" | "_type" | "createdAt" | "updatedAt";

const _pigFarrowEvents: Omit<PigEvent, SharedOmitFields>[] = [
  {
    pigId: "0", // Ruby
    date: new Date("2023-04-20"),
    isEstimated: false,
    label: "Ruby's farrowing",
  },
  {
    pigId: "1", // Daisy
    date: new Date("2023-02-15"),
    isEstimated: false,
    label: "Daisy's farrowing",
  },
  {
    pigId: "4", // Rosie
    date: new Date("2024-05-10"),
    isEstimated: false,
    label: "Rosie's farrowing",
  },
  {
    pigId: "7", // Maxine
    date: new Date("2024-06-05"),
    isEstimated: false,
    label: "Maxine's farrowing",
  },
];

const pigFarrowEvents: Omit<PigEvent, "_id">[] = _pigFarrowEvents.map((e) => ({
  ...e,
  _type: "farrow",
  createdAt: new Date(),
  updatedAt: new Date(),
}));

const _pigHeatEvents: Omit<PigEvent, SharedOmitFields>[] = [
  {
    pigId: "4", // Rosie
    date: new Date("2025-01-02"),
    isEstimated: false,
    label: "Rosie in heat",
  },
  {
    pigId: "7", // Maxine
    date: new Date("2024-12-15"),
    isEstimated: false,
    label: "Maxine in heat",
  },
  {
    pigId: "8", // Patches
    date: new Date("2025-01-08"),
    isEstimated: false,
    label: "Patches in heat",
  },
  {
    pigId: "10", // Sunny
    date: new Date("2025-02-20"),
    isEstimated: true,
    label: "Sunny expected heat",
  },
];

const pigHeatEvents: Omit<PigEvent, "_id">[] = _pigHeatEvents.map((e) => ({
  ...e,
  _type: "heat",
  createdAt: new Date(),
  updatedAt: new Date(),
}));

const _pigBreedEvents: Omit<PigEvent, SharedOmitFields>[] = [
  {
    pigId: "1", // Daisy
    date: new Date("2024-11-15"),
    isEstimated: false,
    label: "Daisy AI breeding",
  },
  {
    pigId: "4", // Rosie
    date: new Date("2025-01-05"),
    isEstimated: false,
    label: "Rosie natural breeding with Crusher",
  },
  {
    pigId: "7", // Maxine
    date: new Date("2024-12-20"),
    isEstimated: false,
    label: "Maxine AI breeding",
  },
];

const pigBreedEvents: Omit<PigEvent, "_id">[] = _pigBreedEvents.map((e) => ({
  ...e,
  _type: "breed",
  createdAt: new Date(),
  updatedAt: new Date(),
}));

const _pigVaccinationEvents: Omit<PigEvent, SharedOmitFields>[] = [
  {
    pigId: "5", // Bacon
    date: new Date("2024-09-15"),
    isEstimated: false,
    label: "Bacon - PCV2 vaccination",
  },
  {
    pigId: "4", // Rosie
    date: new Date("2024-12-01"),
    isEstimated: false,
    label: "Rosie - Pseudorabies booster",
  },
  {
    pigId: "7", // Maxine
    date: new Date("2024-11-10"),
    isEstimated: false,
    label: "Maxine - Erysipelas vaccination",
  },
  {
    pigId: "6", // Pearl
    date: new Date("2024-10-05"),
    isEstimated: false,
    label: "Pearl - routine vaccination",
  },
];

const pigVaccinationEvents: Omit<PigEvent, "_id">[] = _pigVaccinationEvents.map(
  (e) => ({
    ...e,
    _type: "vaccination",
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
);

const _litterWeaningEvents: Omit<LitterEvent, SharedOmitFields>[] = [
  {
    litterId: "0", // Ruby's litter
    date: new Date("2023-06-01"),
    isEstimated: false,
    label: "Ruby's litter weaning",
  },
  {
    litterId: "1", // Daisy's litter
    date: new Date("2023-04-01"),
    isEstimated: false,
    label: "Daisy's litter weaning",
  },
];

const litterWeaningEvents: Omit<LitterEvent, "_id">[] =
  _litterWeaningEvents.map((e) => ({
    ...e,
    _type: "weaning",
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

export const _events = [
  ...pigFarrowEvents.map((e) => PigEventSchema.parse({ ...e, _id: "" })),
  ...pigHeatEvents.map((e) => PigEventSchema.parse({ ...e, _id: "" })),
  ...pigBreedEvents.map((e) => PigEventSchema.parse({ ...e, _id: "" })),
  ...pigVaccinationEvents.map((e) => PigEventSchema.parse({ ...e, _id: "" })),
  ...litterWeaningEvents.map((e) => LitterEventSchema.parse({ ...e, _id: "" })),
];

export const events: Event[] = _events.map((n, i) => ({
  ...n,
  _id: String(i),
}));
