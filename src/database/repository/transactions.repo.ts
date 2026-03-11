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

  updateTransaction: async (payload: Transaction) => {
    if (!payload.id) {
      throw new Error('Transaction ID is required for update.');
    }

    try {
      const db = await getDB();

      const datetime = payload.datetime || new Date().toISOString();

      const res = await db.executeSql(
        `UPDATE transactions
         SET title = ?,
             amount = ?,
             type = ?,
             category_id = ?,
             note = ?,
             datetime = ?
         WHERE id = ?`,
        [
          payload.title,
          payload.amount,
          payload.type,
          payload.category_id,
          payload.note || '',
          datetime,
          payload.id, // important: specify the transaction to update
        ],
      );

      return {
        success: true,
        rowsAffected: res[0].rowsAffected,
      };
    } catch (error) {
      console.log('updateTransaction error', error);

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
      date(t.datetime) as tx_date,
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

    const transactions = tx[0].rows.raw();

    // 🔥 Group by date
    const groupedByDate = transactions.reduce((acc: any, curr: any) => {
      if (!acc[curr.tx_date]) {
        acc[curr.tx_date] = [];
      }
      acc[curr.tx_date].push(curr);
      return acc;
    }, {});

    return {
      transactions: groupedByDate,
      summary: summary[0].rows.item(0),
    };
  },
};
