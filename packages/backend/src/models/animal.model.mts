import mongodb from "../db/index.mts";
import type { Pig, Litter } from "../../../shared/types/schemas.ts";

const pigsCollection = () => mongodb.getDb().collection<Pig>("pigs");
const littersCollection = () => mongodb.getDb().collection<Litter>("litters");

export async function getAllPigs() {
  return pigsCollection().find().toArray();
}

export async function getPigById(id: string) {
  return pigsCollection().findOne({ _id: id });
}

export async function createPig(pig: Pig) {
  return pigsCollection().insertOne(pig);
}

export async function updatePig(id: string, update: Partial<Pig>) {
  return pigsCollection().updateOne({ _id: id }, { $set: update });
}

export async function patchPig(id: string, update: Record<string, unknown>) {
  return pigsCollection().updateOne({ _id: id }, update);
}

export async function deletePig(id: string) {
  return pigsCollection().deleteOne({ _id: id });
}

export async function getAllLitters() {
  return littersCollection().find().toArray();
}
