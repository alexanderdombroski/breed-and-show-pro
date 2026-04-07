import { getDb } from "../db/index.mts";
import type { User } from "../../../shared/types/schemas.ts";

export async function getUserById(id: string) {
  const db = await getDb();
  const usersCollection = db.collection<User>("user");

  const user = await usersCollection.findOne({ _id: id });

  return user;
}
