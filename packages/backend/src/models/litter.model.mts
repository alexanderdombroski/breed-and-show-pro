import { withDbCollection } from "../db/index.mts";
import type { Litter } from "../../../shared/types/schemas.ts";

export async function getAllLitters() {
  return withDbCollection<Litter, Litter[]>("litters", (collection) =>
    collection.find().toArray(),
  );
}

export async function getLitterById(id: string) {
  return withDbCollection<Litter, Litter | null>("litters", (collection) =>
    collection.findOne({ _id: id }),
  );
}

export async function createLitter(litter: Litter) {
  await withDbCollection<Litter>("litters", (collection) =>
    collection.insertOne(litter),
  );
}

export async function updateLitter(id: string, update: Partial<Litter>) {
  await withDbCollection<Litter>("litters", (collection) =>
    collection.updateOne({ _id: id }, { $set: update }),
  );
}

export async function deleteLitter(id: string) {
  await withDbCollection<Litter>("litters", (collection) =>
    collection.deleteOne({ _id: id }),
  );
}
