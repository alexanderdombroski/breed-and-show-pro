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

const { withDb, withDbCollection } = await import("./index.mts");

const collections = ["events", "litters", "notes", "pigs", "users"];
withDb(async (db) => {
  for (const collection of collections) {
    if (await db.listCollections({ name: collection }).hasNext()) {
      await db.dropCollection(collection);
    }
    await db.createCollection(collection);
  }
});

withDbCollection<User>("users", async (collection) => {
  await collection.createIndex({ email: 1 }, { unique: true });
  await collection.createIndex({ name: 1 });

  collection.insertMany(users);
});

withDbCollection<Litter>("litters", async (collection) => {
  await collection.createIndex({ userId: 1 });
  await collection.createIndex({ sowId: 1 });
  await collection.createIndex({ sireId: 1 });

  collection.insertMany(litters);
});

withDbCollection<Pig>("pigs", async (collection) => {
  await collection.createIndex({ userId: 1 });
  await collection.createIndex({ status: 1 });
  await collection.createIndex({ isArchived: 1 });
  await collection.createIndex({ userId: 1, status: 1 });

  collection.insertMany(pigs);
});

withDbCollection<Event>("events", async (collection) => {
  await collection.createIndex({ pigId: 1 });
  await collection.createIndex({ litterId: 1 });
  await collection.createIndex({ date: 1 });

  collection.insertMany(events);
});

withDbCollection<GenericNote>("notes", async (collection) => {
  await collection.createIndex({ pigId: 1 });
  await collection.createIndex({ eventDate: 1 });

  collection.insertMany(notes);
});
