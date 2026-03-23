import { MongoClient } from "mongodb";

let client: MongoClient;

export function getMongoClient() {
  client ??= new MongoClient(process.env.DATABASE_URL!);
  return client;
}
