import z from "zod";

export const litterSchema = z.object({
  _id: z.string(),
  userId: z.string(),
  sowId: z.string(),
  boarId: z.string().optional(),
  totalBorn: z.number().int().nonnegative().optional(),
  bornAlive: z.number().int().nonnegative().optional(),
  stillborn: z.number().int().nonnegative().default(0),
  pigletsWeaned: z.number().int().nonnegative().optional(),
  pigletIds: z.array(z.string()).default([]),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type Litter = z.infer<typeof litterSchema>;

const _litters: Omit<Litter, "_id" | "userId" | "createdAt" | "updatedAt">[] = [
  {
    sowId: "0", // Ruby
    boarId: "2", // Titan
    totalBorn: 9,
    bornAlive: 8,
    stillborn: 1,
    pigletIds: ["4", "5", "6", "15", "16", "17"], // Rosie, Bacon, Pearl, Snorty, Mudpie, Oinker
  },
  {
    sowId: "1", // Daisy
    boarId: "3", // Crusher
    totalBorn: 3,
    bornAlive: 3,
    stillborn: 0,
    pigletIds: ["7", "8", "9"], // Maxine, Patches, Duke
  },
];

export const litters = _litters.map((pig, i) =>
  litterSchema.parse({
    ...pig,
    _id: String(i),
    userId: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
);
