import { withDbCollection } from "../db/index.mts";
import type { Pig } from "../../../shared/types/schemas.ts";

export async function getAllPigs() {
  return withDbCollection<Pig, Pig[]>("pigs", (collection) =>
    collection.find().toArray(),
  );
}

export async function getPigById(id: string) {
  return withDbCollection<Pig, Pig | null>("pigs", (collection) =>
    collection.findOne({ _id: id }),
  );
}

export async function createPig(pig: Pig) {
  return withDbCollection<Pig>("pigs", (collection) =>
    collection.insertOne(pig),
  );
}

export async function updatePig(id: string, update: Partial<Pig>) {
  await withDbCollection<Pig>("pigs", (collection) =>
    collection.updateOne({ _id: id }, { $set: update }),
  );
}

export async function patchPig(id: string, update: Record<string, unknown>) {
  await withDbCollection<Pig>("pigs", (collection) =>
    collection.updateOne({ _id: id }, update),
  );
}

export async function deletePig(id: string) {
  await withDbCollection<Pig>("pigs", (collection) =>
    collection.deleteOne({ _id: id }),
  );
}
