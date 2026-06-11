import { Category } from '@database/types';
import { getDB, getSimplifierDB } from '../db';
import { createAdvancedQuery } from 'sqlite-simplifier';

export const CategoriesRepo = {
  getAllCategories: async (): Promise<any[]> => {
    console.log('countcountcountcountcountcountcountcount');

    const db = await getSimplifierDB();
    const query = createAdvancedQuery(db);

    const result = await query.find('categories', {
      include: {
        tableName: 'transactions',
        localKey: 'id',
        foreignKey: 'category_id',
        type: 'left',
      },
      groupBy: 'categories.id',
      count: {
        column: 'transactions.id',
        as: 'transactionCount',
      },
    });

    return result;

    // query.defineRelations('categories', {
    //   transactions: {
    //     table: 'transactions',
    //     localKey: 'id',
    //     foreignKey: 'category_id',
    //     type: 'left',
    //   },
    // });

    // // Use the fluent API
    // const result = await query
    //   .query('categories')
    //   .select('id', 'name', 'icon', 'color')
    //   .leftJoin('transactions')
    //   .count('transactionCount', 'transactions.id')
    //   .groupBy('categories.id')
    //   .get();

    // console.log('🚀 ~ result:', result);
    // console.log('🚀 ~ result:', result);
    // return [];

    // const db = await getSimplifierDB();
    // const query = createAdvancedQuery(db);

    // query.defineRelations('categories', {
    //   transactions: {
    //     table: 'transactions',
    //     localKey: 'id',
    //     foreignKey: 'category_id',
    //     type: 'left',
    //   },
    // });
    // const result = await query.find('categories', {
    //   select: {
    //     id: 'id',
    //     name: 'name',
    //     icon: 'icon',
    //     color: 'color',

    //     transactionCount: `${count('transactions.id')}`,
    //   },
    //   include: {
    //     transactions: true,
    //   },
    //   groupBy: 'categories.id',
    // });
    // console.log('🚀 ~ result:', result);

    // return result;

    // const db = await getDB();

    // const res = await db.executeSql(`
    //   SELECT
    //     c.*,
    //     COUNT(t.id) as transactionCount
    //   FROM categories c
    //   LEFT JOIN transactions t
    //     ON t.category_id = c.id
    //   GROUP BY c.id
    // `);

    // console.log('🚀 ~ res:', res[0].rows.raw());
    // return res[0].rows.raw();
  },
  createCategory: async (payload: Category) => {
    try {
      const db = await getDB();

      const res = await db.executeSql(
        `INSERT OR IGNORE INTO categories (name, icon, color) VALUES (?, ?, ?)`,
        [payload?.name, payload?.icon, payload?.color],
      );

      return {
        success: true,
        insertId: res[0].insertId,
      };
    } catch (error) {
      console.log('createCategory error', error);

      return {
        success: false,
      };
    }
  },
  updateCategory: async (payload: Category) => {
    try {
      const db = await getDB();

      await db.executeSql(
        `UPDATE categories SET name = ?, icon = ?, color = ? WHERE id = ?`,
        [payload?.name, payload?.icon, payload?.color, payload?.id],
      );

      return {
        success: true,
      };
    } catch (error) {
      console.log('updateCategory error', error);

      return {
        success: false,
      };
    }
  },
  deleteCategory: async (id: number) => {
    try {
      const db = await getDB();

      await db.executeSql(`DELETE FROM categories WHERE id = ?`, [id]);

      return {
        success: true,
      };
    } catch (error) {
      console.log('deleteCategory error', error);

      return {
        success: false,
      };
    }
  },
};
