import { createAdvancedQuery } from 'sqlite-simplifier';
import { getDB, getSimplifierDB } from '../db';
import { User } from '../types';

export const UserRepo = {
  insert: async (user: User): Promise<number> => {
    // const db = await getDB();
    // const result = await db.executeSql(
    //   `INSERT INTO users (name, email, is_logged_in, isFingerprintEnable) VALUES (?, ?, ?, ?)`,
    //   [user.name, user.email, 0, 0], // Default is_logged_in to 0 (false)
    // );
    // return result[0].insertId;

    const db = await getSimplifierDB();

    const insertId = await db.insert({
      table: 'users',
      data: {
        name: user.name,
        email: user.email,
        is_logged_in: 0,
        isFingerprintEnable: 0,
      },
    });

    return insertId;
  },

  getAll: async (): Promise<User[]> => {
    const db = await getDB();
    const res = await db.executeSql(`SELECT * FROM users`);
    return res[0].rows.raw();
  },

  findUserByEmail: async (email: string): Promise<User | null> => {
    try {
      const db = await getSimplifierDB();
      const query = createAdvancedQuery(db);

      const res = await query.findFirst('users', {
        where: {
          email: email,
        },
      });
      console.log('🚀 ~ res:findUserByEmail', res);
      // return res.length > 0 ? res[0] : null;
      return res;
    } catch (error) {
      return null;
      console.log('🚀 ~ error:', error);
    }

    // return res[0].rows.length > 0 ? res[0].rows.item(0) : null;
    // const db = await getDB();
    // const res = await db.executeSql(`SELECT * FROM users WHERE email = ?`, [
    //   email,
    // ]);
    // console.log('🚀 ~ res:', res);
    // return res[0].rows.length > 0 ? res[0].rows.item(0) : null;
  },

  getCurrentLoggedInUserSimp: async (): Promise<User | null> => {
    try {
      const db = await getDB();
      const res = await db.executeSql(
        `SELECT * FROM users WHERE is_logged_in = 1 LIMIT 1`,
        [],
      );
      return res[0].rows.length > 0 ? res[0].rows.item(0) : null;
    } catch (error) {
      console.error('Error fetching current logged-in user:', error);
    }
  },

  getCurrentLoggedInUser: async () => {
    const db = await getSimplifierDB();
    const query = createAdvancedQuery(db);
    const result = await query.findFirst('users', {
      where: {
        is_logged_in: 1,
      },
    });
    console.log('RESULT:users', result);
    // return result.length > 0 ? result[0] : null;
    return result;
  },

  setLoggedInUser: async (email: string): Promise<void> => {
    const db = await getSimplifierDB();

    const query = createAdvancedQuery(db);

    try {
      /**
       * Set all users logged out
       */
      const res1 = await query.update('users', {
        data: {
          is_logged_in: 0,
        },
      });
      console.log('🚀 ~ res1:', res1);

      /**
       * Set selected user logged in
       */
      const res2 = await query.update('users', {
        data: {
          is_logged_in: 1,
        },

        where: {
          email,
        },
      });
      console.log('🚀 ~ res2:', res2);
    } catch (error) {
      console.log('Login update error:', error);
      throw error;
    }
    // const db = await getDB();

    // // Start transaction
    // await db.executeSql(`BEGIN TRANSACTION;`);

    // try {
    //   // Set all users to logged out (false)
    //   await db.executeSql(`UPDATE users SET is_logged_in = 0`);

    //   // Set the specific user to logged in (true)
    //   await db.executeSql(`UPDATE users SET is_logged_in = 1 WHERE email = ?`, [
    //     email,
    //   ]);

    //   // Commit transaction
    //   await db.executeSql(`COMMIT;`);
    // } catch (error) {
    //   // Rollback on error
    //   await db.executeSql(`ROLLBACK;`);
    //   throw error;
    // }
  },

  logoutCurrentUser: async (): Promise<void> => {
    const db = await getDB();
    await db.executeSql(`UPDATE users SET is_logged_in = 0`);
  },

  updateBiometricStatus: async (
    email: string,
    isFingerprintEnable: number,
  ): Promise<void> => {
    const db = await getDB();
    await db.executeSql(
      `UPDATE users SET isFingerprintEnable = ? WHERE email = ?`,
      [isFingerprintEnable, email],
    );
  },

  getOrCreateUser: async (user: User): Promise<User> => {
    try {
      // Check if user exists
      const existingUser = await UserRepo.findUserByEmail(user.email);

      if (existingUser) {
        // User exists - set this user as logged in and others as logged out
        await UserRepo.setLoggedInUser(user.email);

        // Fetch and return the updated user with is_logged_in = 1
        const updatedUser = await UserRepo.findUserByEmail(user.email);
        return updatedUser!;
      } else {
        // User doesn't exist - insert new user
        await UserRepo.insert(user);

        // Set this new user as logged in
        await UserRepo.setLoggedInUser(user.email);

        // Return the newly created user with ID and is_logged_in = 1
        const newUser = await UserRepo.findUserByEmail(user.email);
        return newUser!;
      }
    } catch (error) {
      console.error('Error in getOrCreateUser:', error);
      throw error;
    }
  },
};
