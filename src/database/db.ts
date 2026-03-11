import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const DB_NAME = 'QBSecretApp.db';

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
