import mongodb from "../db/index.mts";
import type { Litter } from "../../../shared/js/types.ts";

const littersCollection = () => mongodb.getDb().collection<Litter>("litters");

export async function getAllLitters() {
  return littersCollection().find().toArray();
}

export async function getLitterById(id: string) {
  return littersCollection().findOne({ _id: id });
}

export async function createLitter(litter: Litter) {
  return littersCollection().insertOne(litter);
}

export async function updateLitter(id: string, update: Partial<Litter>) {
  return littersCollection().updateOne({ _id: id }, { $set: update });
}

export async function deleteLitter(id: string) {
  return littersCollection().deleteOne({ _id: id });
}
