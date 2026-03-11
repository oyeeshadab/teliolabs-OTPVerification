import { getDB } from '../db';
import { User } from '../types';

export const SecretUserRepo = {
  insert: async (user: User) => {
    const db = await getDB();
    // await db.executeSql(`INSERT INTO secretUser (name, email) VALUES (?, ?)`, [
    //   user.name,
    //   user.email,
    // ]);
  },

  update: async (keepLoggedIn: boolean) => {
    const db = await getDB();
    await db.executeSql(`UPDATE secretUser SET keepLoggedIn = ? WHERE id = 1`, [
      keepLoggedIn ? 1 : 0,
    ]);
  },

  getAll: async (): Promise<User[]> => {
    const db = await getDB();
    const res = await db.executeSql(`SELECT * FROM secretUser`);
    return res[0].rows.raw();
  },

  getKeepLoggedIn: async (): Promise<boolean> => {
    const db = await getDB();
    const res = await db.executeSql(
      `SELECT keepLoggedIn FROM secretUser WHERE id = 1`,
    );
    const row = res[0].rows.item(0);
    return row.keepLoggedIn === 1;
  },
};
