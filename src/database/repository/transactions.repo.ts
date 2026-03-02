import { CurrentMonthTxResponse, Transaction } from '@database/types';
import { getDB } from '../db';

export const TransactionRepo = {
  createTransaction: async (payload: Transaction) => {
    try {
      const db = await getDB();

      const datetime = payload.datetime || new Date().toISOString();

      const res = await db.executeSql(
        `INSERT INTO transactions
        (title,amount, type, category_id, note, datetime)
        VALUES (?, ?, ?, ?, ?,?)`,
        [
          payload.title,
          payload.amount,
          payload.type,
          payload.category_id,
          payload.note || '',
          datetime,
        ],
      );

      return {
        success: true,
        insertId: res[0].insertId,
      };
    } catch (error) {
      console.log('createTransaction error', error);

      return {
        success: false,
      };
    }
  },

  getCurrentMonthTransactions: async (): Promise<CurrentMonthTxResponse> => {
    const db = await getDB();
    const tx = await db.executeSql(`
      SELECT 
      t.*,
      c.id as category_id,
      c.name as category_name,
      c.icon as category_icon,
      c.iconLibrary as category_iconLibrary,
      c.color as category_color
    FROM transactions t
    LEFT JOIN categories c ON t.category_id = c.id
    WHERE t.datetime >= date('now','start of month')
    AND t.datetime < date('now','start of month','+1 month')
    ORDER BY t.datetime DESC
  `);

    const summary = await db.executeSql(`
    SELECT
      COALESCE(SUM(CASE WHEN type='income' THEN amount END),0) as total_income,
      COALESCE(SUM(CASE WHEN type='expense' THEN amount END),0) as total_expense
    FROM transactions
    WHERE datetime >= date('now','start of month')
    AND datetime < date('now','start of month','+1 month')
  `);

    return {
      transactions: tx[0].rows.raw(),
      summary: summary[0].rows.item(0),
    };
  },
};
