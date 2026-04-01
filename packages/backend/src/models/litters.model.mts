import type { Litter } from "../../../shared/types/schemas.ts";
import { getDb } from "../db/index.mts";

const litterCollection = async () =>
  (await getDb()).collection<Litter>("litters");

export async function getAllLitters() {
  return (await litterCollection()).find().toArray();
}

export async function getLitterById(id: string) {
  return (await litterCollection()).findOne({ _id: id });
}

export async function createLitter(litter: Litter) {
  return (await litterCollection()).insertOne(litter);
}

export async function updateLitter(id: string, update: Partial<Litter>) {
  return (await litterCollection()).updateOne({ _id: id }, { $set: update });
}

export async function deleteLitter(id: string) {
  return (await litterCollection()).deleteOne({ _id: id });
}
