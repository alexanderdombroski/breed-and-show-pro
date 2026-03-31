import { MongoClient, ServerApiVersion } from "mongodb";
import * as argon2 from "argon2";

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const init = async () => {
  try {
    await client.connect();
    const db = client.db(process.env.MONGO_DATABASE);

    // Collections
    await seedUsers(db);
    await seedPigs(db);
    await seedLitters(db);
    await seedTasks(db);
    await seedNotes(db);
    await seedUpcomingDates(db);
  } catch (error) {
    console.error(error.message);
  } finally {
    await client.close();
  }
};

const resetCollection = async (db, name) => {
  try {
    await db.collection(name).drop();
  } catch (error) {
    // Ignore if the collection does not exist yet.
    if (error.codeName && error.codeName !== "NamespaceNotFound") {
      console.error(`Failed to drop collection ${name}:`, error.message);
    }
  }
  await db.createCollection(name);
};

const seedUsers = async (db) => {
  await resetCollection(db, "users");
  await db.collection("users").createIndex({ email: 1 }, { unique: true });
  await db.collection("users").createIndex({ name: 1 });

  const user = {
    _id: "user-1",
    email: "test@test.com",
    password: await argon2.hash("123456"),
    name: "Test User",
    createdAt: new Date(),
    modifiedAt: new Date(),
  };
  try {
    await db.collection("users").insertOne(user);
  } catch (error) {
    console.error(error.message);
  }
};

const seedPigs = async (db) => {
  await resetCollection(db, "pigs");
  await db.collection("pigs").createIndex({ userId: 1 });
  await db.collection("pigs").createIndex({ earNotch: 1 }, { unique: true });
  await db.collection("pigs").createIndex({ isArchived: 1 });

  const pig = {
    _id: "pig-1",
    userId: "user-1",
    earNotch: "A123",
    name: "Porky",
    description: "Demo sow for the test account.",
    childIds: [],
    birthDate: new Date("2023-01-01"),
    noteIds: ["note-1"],
    vaccinations: [
      {
        vaccine: "FMD",
        date: new Date("2024-03-01"),
        notes: "Annual booster",
      },
    ],
    photo: "",
    show: {
      name: "County Fair",
      date: new Date("2024-07-01"),
    },
    isArchived: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  try {
    await db.collection("pigs").insertOne(pig);
  } catch (error) {
    console.error(error.message);
  }
};

const seedLitters = async (db) => {
  await resetCollection(db, "litters");
  await db.collection("litters").createIndex({ userId: 1 });
  await db.collection("litters").createIndex({ sowId: 1 });
  await db.collection("litters").createIndex({ boarId: 1 });
  await db.collection("litters").createIndex({ expectedFarrowingDate: 1 });

  const litter = {
    _id: "litter-1",
    userId: "user-1",
    sowId: "pig-1",
    boarId: "boar-1",
    breedingDate: new Date("2023-03-01"),
    expectedFarrowingDate: new Date("2023-05-03"),
    actualFarrowingDate: new Date("2023-05-04"),
    totalBorn: 10,
    bornAlive: 9,
    stillborn: 1,
    weaningDate: new Date("2023-06-30"),
    pigletsWeaned: 8,
    pigletIds: ["piglet-1", "piglet-2"],
    notes: "Healthy litter with strong piglets.",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  try {
    await db.collection("litters").insertOne(litter);
  } catch (error) {
    console.error(error.message);
  }
};

const seedTasks = async (db) => {
  await resetCollection(db, "tasks");
  await db.collection("tasks").createIndex({ userId: 1 });
  await db.collection("tasks").createIndex({ dueDate: 1 });
  await db.collection("tasks").createIndex({ isCompleted: 1 });

  const task = {
    _id: "task-1",
    userId: "user-1",
    title: "Feed pigs",
    description: "Feed the herd and refresh water.",
    dueDate: new Date("2024-04-01"),
    isCompleted: false,
    completedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  try {
    await db.collection("tasks").insertOne(task);
  } catch (error) {
    console.error(error.message);
  }
};

const seedNotes = async (db) => {
  await resetCollection(db, "notes");
  await db.collection("notes").createIndex({ date: 1 });
  await db.collection("notes").createIndex({ pigId: 1 });

  const note = {
    _id: "note-1",
    date: new Date("2024-03-01"),
    weight: 250,
    notes: "Good weight measurement for demo pig.",
    photos: ["https://example.com/photo1.jpg"],
  };
  try {
    await db.collection("notes").insertOne(note);
  } catch (error) {
    console.error(error.message);
  }
};

const seedUpcomingDates = async (db) => {
  await resetCollection(db, "upcomingDates");
  await db.collection("upcomingDates").createIndex({ type: 1 });
  await db.collection("upcomingDates").createIndex({ date: 1 });
  await db.collection("upcomingDates").createIndex({ pigId: 1 });
  await db.collection("upcomingDates").createIndex({ litterId: 1 });
  await db.collection("upcomingDates").createIndex({ taskId: 1 });

  const upcomingDate = {
    type: "vaccination",
    date: new Date("2024-04-15"),
    pigId: "pig-1",
    litterId: "litter-1",
    taskId: "task-1",
    label: "Booster vaccination",
    notes: "Schedule vaccine for Porky before the show.",
  };
  try {
    await db.collection("upcomingDates").insertOne(upcomingDate);
  } catch (error) {
    console.error(error.message);
  }
};

init();
