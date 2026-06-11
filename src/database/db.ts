import SQLite from 'react-native-sqlite-storage';
import { Database } from 'sqlite-simplifier';

SQLite.enablePromise(true);
let simplifierDb: Database | null = null;

export const DB_NAME = 'QBSecretApp.db';

let dbInstance: SQLite.SQLiteDatabase | null = null;

export const getDB = async () => {
  if (dbInstance) {
    return dbInstance;
  }

  dbInstance = await SQLite.openDatabase({
    name: DB_NAME,
    location: 'default',
  });

  return dbInstance;
};

export const getSimplifierDB = async (): Promise<Database> => {
  if (!simplifierDb) {
    simplifierDb = new Database({ name: DB_NAME });
    await simplifierDb.connect();
  }
  return simplifierDb;
};

export const getSimpleDB = async () => {
  const db = new Database({ name: DB_NAME });
  await db.connect();
  return db;
};
