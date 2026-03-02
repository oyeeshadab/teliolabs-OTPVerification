import { getDB } from '../db';

export const WaletRepo = {
  getWalletBalance: async (): Promise<number> => {
    const db = await getDB();
    const res = await db.executeSql(`SELECT balance FROM wallet`);
    if (res[0].rows.length === 0) {
      return 0;
    }

    return res[0].rows.item(0).balance;
  },
};
