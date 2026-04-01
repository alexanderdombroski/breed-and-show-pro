#!/usr/bin/env node
// Script to reset the database with starter test data
// node packages/backend/src/db/init-db.ts

import { loadEnvFile } from "process";
import path from "node:path";
import type {
  Litter,
  Pig,
  User,
  Event,
  GenericNote,
} from "../../../shared/types/schemas.ts";
import { users } from "./data/users.ts";
import { litters } from "./data/litters.ts";
import { pigs } from "./data/pigs.ts";
import { notes } from "./data/notes.ts";
import { events } from "./data/events.ts";

loadEnvFile(path.join(process.cwd(), "packages", "backend", ".env"));

const { withDb, withDbCollection, getMongoClient } =
  await import("./index.mts");

const collections = ["events", "litters", "notes", "pigs", "users"];
await withDb(async (db) => {
  for (const collection of collections) {
    if (await db.listCollections({ name: collection }).hasNext()) {
      await db.dropCollection(collection);
    }
    await db.createCollection(collection);
  }
});

await withDbCollection<User>("users", async (collection) => {
  await collection.createIndex({ email: 1 }, { unique: true });
  await collection.createIndex({ name: 1 });

  await collection.insertMany(users);
  console.info(`Inserted ${users.length} users into database`);
});

await withDbCollection<Litter>("litters", async (collection) => {
  await collection.createIndex({ userId: 1 });
  await collection.createIndex({ sowId: 1 });
  await collection.createIndex({ sireId: 1 });

  await collection.insertMany(litters);
  console.info(`Inserted ${litters.length} litters into database`);
});

await withDbCollection<Pig>("pigs", async (collection) => {
  await collection.createIndex({ userId: 1 });
  await collection.createIndex({ status: 1 });
  await collection.createIndex({ isArchived: 1 });
  await collection.createIndex({ userId: 1, status: 1 });

  await collection.insertMany(pigs);
  console.info(`Inserted ${pigs.length} pigs into database`);
});

await withDbCollection<Event>("events", async (collection) => {
  await collection.createIndex({ pigId: 1 });
  await collection.createIndex({ litterId: 1 });
  await collection.createIndex({ date: 1 });

  await collection.insertMany(events);
  console.info(`Inserted ${events.length} events into database`);
});

await withDbCollection<GenericNote>("notes", async (collection) => {
  await collection.createIndex({ pigId: 1 });
  await collection.createIndex({ eventDate: 1 });

  await collection.insertMany(notes);
  console.info(`Inserted ${notes.length} notes into database`);
});

await getMongoClient().close();
