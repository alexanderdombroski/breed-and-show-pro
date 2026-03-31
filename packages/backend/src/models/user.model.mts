import mongodb from "../db/index.mts";
import type { User } from "../../../shared/js/types.ts";

export default async function getAllUsers() {
  const usersCollection = mongodb.getDb().collection<User>("users");
  return usersCollection.find().toArray();
}
