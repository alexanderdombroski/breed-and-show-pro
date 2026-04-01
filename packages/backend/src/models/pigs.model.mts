import { getDb } from "../db/index.mts";
import type { Pig } from "../../../shared/types/schemas.ts";

const pigCollection = async () => (await getDb()).collection<Pig>("pigs");

export async function getAllPigs() {
  return (await pigCollection()).find().toArray();
}

export async function getPigById(id: string) {
  return (await pigCollection()).findOne({ _id: id });
}

export async function createPig(pig: Pig) {
  await (await pigCollection()).insertOne(pig);
}

export async function updatePig(id: string, update: Partial<Pig>) {
  await (await pigCollection()).updateOne({ _id: id }, { $set: update });
}

export async function deletePig(id: string) {
  await (await pigCollection()).deleteOne({ _id: id });
}
