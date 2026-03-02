import { getDB } from '../db';
import { User } from '../types';

export const UserRepo = {
  insert: async (user: User) => {
    const db = await getDB();
    await db.executeSql(`INSERT INTO users (name, email) VALUES (?, ?)`, [
      user.name,
      user.email,
    ]);
  },

  getAll: async (): Promise<User[]> => {
    const db = await getDB();
    const res = await db.executeSql(`SELECT * FROM users`);
    return res[0].rows.raw();
  },
};
