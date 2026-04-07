import { getDb } from "../db/index.mts";
import type { Pig } from "../../../shared/types/schemas.ts";

const pigCollection = async () => (await getDb()).collection<Pig>("pigs");

export async function getAllPigs() {
  // 1. Grab the active database connection
  const db = getDb();

  // 2. Point to the specific collection in Atlas (case-sensitive!)
  const pigsCollection = (await db).collection<Pig>("pigs");

  // 3. Find all documents and convert them from Mongo objects to a standard JavaScript array
  const allPigs = await pigsCollection.find({}).toArray();

  // 4. Return the data
  return allPigs;
}

export async function getPigById(id: string) {
  const db = await getDb();
  const pigsCollection = db.collection<Pig>("pigs");

  const pig = await pigsCollection.findOne({ _id: id } as any);

  return pig;
}

export async function createPig(pig: Pig) {
  return (await pigCollection()).insertOne(pig);
}

export async function updatePig(id: string, update: Partial<Pig>) {
  return (await pigCollection()).updateOne({ _id: id }, { $set: update });
}

export async function deletePig(id: string) {
  return (await pigCollection()).deleteOne({ _id: id });
}
