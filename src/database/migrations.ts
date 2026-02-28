import { getDBConnection } from './db';

export const createTables = async () => {
  const db = await getDBConnection();

  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE
    );
  `;

  await db.executeSql(query);
};
