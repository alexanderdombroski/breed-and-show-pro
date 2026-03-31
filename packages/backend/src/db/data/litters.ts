import { type Litter, LitterSchema } from "../../../../shared/types/schemas.ts";

const _litters: Omit<Litter, "_id" | "userId" | "createdAt" | "updatedAt">[] = [
  {
    sowId: "0", // Ruby
    sireId: "2", // Titan
    totalBorn: 9,
    bornAlive: 8,
    stillborn: 1,
    pigletIds: ["4", "5", "6", "15", "16", "17"], // Rosie, Bacon, Pearl, Snorty, Mudpie, Oinker
  },
  {
    sowId: "1", // Daisy
    sireId: "3", // Crusher
    totalBorn: 3,
    bornAlive: 3,
    stillborn: 0,
    pigletIds: ["7", "8", "9"], // Maxine, Patches, Duke
  },
];

export const litters = _litters.map((pig, i) =>
  LitterSchema.parse({
    ...pig,
    _id: String(i),
    userId: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
);
