import { createAdvancedQuery } from 'sqlite-simplifier';
import { getDB, getSimplifierDB } from '../db';
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
    try {
      const db = await getDB();
      const res = await db.executeSql(
        `SELECT keepLoggedIn FROM secretUser WHERE id = 1`,
      );
      const row = res[0].rows.item(0);
      console.log('🚀 ~ row:', row);
      return row.keepLoggedIn === 1;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return false;
    }
  },
  getKeepLoggedInSimp: async () => {
    try {
      const db = await getSimplifierDB();
      const query = createAdvancedQuery(db);

      // const result = await query.find('users', {});
      // const row = result[0].rows.item(0);

      const result = await query.findFirst('users', {
        where: {
          is_logged_in: 1,
        },
      });
      console.log('🚀 ~ resultresultresultresultresultresult:', result);
      return true;
      // console.log('🚀 ~ row:', row);
      // return row.keepLoggedIn === 1;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return false;
    }
  },
};
