import { CurrentMonthTxResponse, Transaction } from '@database/types';
import { getDB, getSimplifierDB } from '../db';
import { TransactionSMSRepo } from './transactionsSMS.repo';
import { UserRepo } from './user.repo';
import { createAdvancedQuery } from 'sqlite-simplifier';
import {
  count,
  where,
} from '../../../.yalc/sqlite-simplifier/src/advanced-queries';

export const TransactionRepo = {
  createTransaction: async (payload: Transaction) => {
    try {
      const db = await getDB();

      const datetime = payload.datetime || new Date().toISOString();

      const res = await db.executeSql(
        `INSERT INTO transactions
        (title,amount, type, category_id, note, user_id, datetime)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          payload.title,
          payload.amount,
          payload.type,
          payload.category_id,
          payload.note || '',
          payload?.user_id,
          datetime,
        ],
      );
      if (payload.smsType) {
        TransactionSMSRepo.deleteSMSTransaction(payload);
      }
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

  deleteTransaction: async (payload: Partial<Transaction>) => {
    if (!payload.id) {
      throw new Error('Transaction ID is required for update.');
    }
    try {
      const db = await getDB();
      const res = await db.executeSql(
        `DELETE from transactions
         WHERE id = ?`,
        [payload.id],
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

  getCurrentMonthTransactions: async (
    user_id: number,
  ): Promise<CurrentMonthTxResponse> => {
    const db = await getDB();

    const db2 = await getSimplifierDB();
    const query = createAdvancedQuery(db2);
    const result = await query.find('transactions', {
      // select: {
      //   id: 'id',
      //   amount: 'amount',
      //   datetime: 'datetime',
      //   type: 'type',

      //   tx_date: 'date(datetime)',

      //   category_id: 'categories.id',
      //   category_name: 'categories.name',
      //   category_icon: 'categories.icon',
      //   category_iconLibrary: 'categories.iconLibrary',
      //   category_color: 'categories.color',
      // },

      include: {
        tableName: 'categories',
        localKey: 'category_id',
        foreignKey: 'id',
        type: 'left',
      },

      where: [
        where('user_id', '=', user_id),
        where('datetime', '>=', "date('now','start of month')"),
        where('datetime', '<', "date('now','start of month','+1 month')"),
      ],

      orderBy: {
        field: 'datetime',
        direction: 'DESC',
      },
    });
    console.log(
      '🚀 ~ query.findresult:',
      result,
      ' . ',
      `SELECT 
      t.*,
      date(t.datetime) as tx_date,
      c.id as category_id,
      c.name as category_name,
      c.icon as category_icon,
      c.iconLibrary as category_iconLibrary,
      c.color as category_color
    FROM transactions t
    LEFT JOIN categories c ON t.category_id = c.id
    WHERE t.user_id = ${user_id}
    AND t.datetime >= date('now','start of month')
    AND t.datetime < date('now','start of month','+1 month')
    ORDER BY t.datetime DESC`,
    );

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
    WHERE t.user_id = ${user_id}
    AND t.datetime >= date('now','start of month')
    AND t.datetime < date('now','start of month','+1 month')
    ORDER BY t.datetime DESC
  `);

    const summary = await db.executeSql(`
    SELECT
      COALESCE(SUM(CASE WHEN type='income' THEN amount END),0) as total_income,
      COALESCE(SUM(CASE WHEN type='expense' THEN amount END),0) as total_expense
    FROM transactions
    WHERE user_id = ${user_id}
    AND datetime >= date('now','start of month')
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

  getTransactionsByPeriod: async (
    period: 'week' | 'month' | 'year',
    type?: 'income' | 'expense',
  ) => {
    const db = await getDB();
    const user = await UserRepo.getCurrentLoggedInUser();

    let dateCondition = '';
    switch (period) {
      case 'week':
        dateCondition = "datetime >= date('now', '-7 days')";
        break;
      case 'month':
        dateCondition = "datetime >= date('now', '-30 days')";
        break;
      case 'year':
        dateCondition = "datetime >= date('now', '-365 days')";
        break;
    }

    const typeCondition = type ? `AND type = '${type}'` : '';

    const result = await db.executeSql(`
    SELECT 
      t.*,
      c.name as category_name,
      c.color as category_color,
      c.icon as category_icon
    FROM transactions t
    LEFT JOIN categories c ON t.category_id = c.id
      WHERE user_id = ${user?.id}
    AND ${dateCondition}
    ${typeCondition}
    ORDER BY t.datetime DESC
  `);

    return result[0].rows.raw();
  },

  getCategoryBreakdown: async (
    period: 'week' | 'month' | 'year',
    type: 'income' | 'expense',
  ) => {
    const db = await getDB();
    const user = await UserRepo.getCurrentLoggedInUser();

    let dateCondition = '';
    switch (period) {
      case 'week':
        dateCondition = "datetime >= date('now', '-7 days')";
        break;
      case 'month':
        dateCondition = "datetime >= date('now', '-30 days')";
        break;
      case 'year':
        dateCondition = "datetime >= date('now', '-365 days')";
        break;
    }

    const result = await db.executeSql(`
    SELECT 
      c.name as category_name,
      c.color as category_color,
      SUM(t.amount) as total_amount
    FROM transactions t
    LEFT JOIN categories c ON t.category_id = c.id
    WHERE user_id = ${user?.id}
    AND ${dateCondition}
    AND t.type = '${type}'
    GROUP BY t.category_id
    ORDER BY total_amount DESC
    LIMIT 5
  `);

    return result[0].rows.raw();
  },
};
