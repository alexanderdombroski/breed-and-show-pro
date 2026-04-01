import { MongoClient, ServerApiVersion, type Document } from "mongodb";

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
export async function withDb<D extends Document, T>(
  collectionName: string,
  callback: (collection: any) => Promise<T>,
): Promise<T> {
  try {
    await _connection;
    const db = _client.db(dbName);
    const collection = db.collection<D>(collectionName);

    return await callback(collection);
  } catch (error) {
    console.error(`Database operation failed: ${error}`);
    throw error;
  }
}
