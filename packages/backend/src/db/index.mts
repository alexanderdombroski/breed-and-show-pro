import { MongoClient, ServerApiVersion } from "mongodb";
const uri = process.env.MONGO_URI || "";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let _db: MongoClient | null = null;

const initDb = async (callback: Function) => {
  if (_db) {
    return callback(null, _db);
  }
  try {
    await client.connect();
    _db = client;
    callback(null, _db);
  } catch (err) {
    callback(err);
  }
};

const getDb = () => {
  if (!_db) {
    throw Error("Db not initialized");
  }
  return _db.db(process.env.MONGO_DATABASE);
};

const closeDb = async () => {
  if (_db) {
    try {
      await _db.close();
    } finally {
      _db = null;
    }
  }
};

export default { initDb, getDb, closeDb };
