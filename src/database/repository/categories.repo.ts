import { Category } from '@database/types';
import { getDB } from '../db';

export const CategoriesRepo = {
  getAllCategories: async (): Promise<Category[]> => {
    const db = await getDB();

    const res = await db.executeSql(`
      SELECT 
      *
    FROM categories
    `);

    return res[0].rows.raw();
  },
};
