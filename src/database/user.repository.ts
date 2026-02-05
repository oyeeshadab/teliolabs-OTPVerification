import { getDBConnection } from './db';

export const insertUser = async (name: string, email: string) => {
  const db = await getDBConnection();

  const query = `
    INSERT INTO users (name, email)
    VALUES (?, ?);
  `;

  await db.executeSql(query, [name, email]);
};

export const getUsers = async () => {
  const db = await getDBConnection();

  const results = await db.executeSql(`SELECT * FROM users;`);

  return results[0].rows.raw();
};
