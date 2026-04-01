import { MongoClient, ServerApiVersion } from "mongodb";
import type { Collection, Document, Db } from "mongodb";

const uri = process.env.MONGO_URI as string;
const dbName = process.env.DATABASE_NAME as string;
if (!(uri && dbName)) {
  throw new Error("Database environment not fully configured!");
}

export function getMongoClient() {
  _client ??= new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  return _client;
}

let _client: MongoClient = getMongoClient();
let _connection: Promise<MongoClient> = getMongoClient().connect();

/**
 * Higher-order function to handle MongoDB connection and errors.
 * @param callback Function that performs the actual DB operation
 */
export async function withDb<T>(callback: (db: Db) => Promise<T>): Promise<T> {
  try {
    await _connection;
    const db = _client.db(dbName);

    return await callback(db);
  } catch (error) {
    console.error(`Database operation failed: ${error}`);
    throw error;
  }
}

/**
 * Higher-order function to handle MongoDB connection and errors.
 * @param callback Function that performs the actual DB operation
 */
export async function withDbCollection<D extends Document, R = unknown>(
  collectionName: string,
  callback: (collection: Collection<D>) => Promise<R>,
): Promise<R> {
  try {
    await _connection;
    const db = _client.db(dbName);
    const collection = db.collection<D>(collectionName);

    return await callback(collection);
  } catch (error) {
    console.error(`Database collection operation failed: ${error}`);
    throw error;
  }
}
