import { getSimplifierDB } from '../db';
import {
  AdvancedQuery,
  createAdvancedQuery,
  Database,
  desc,
  groupBy,
  select,
  selectAll,
  sum,
  where,
} from 'sqlite-simplifier';

export const Simplifier = {
  getUsers: async () => {
    const db = await getSimplifierDB();
    console.log('🚀 ~ db:', db);
    return selectAll(db, 'users');
  },
  getTransactions: async () => {
    const db = await getSimplifierDB();

    const query = new AdvancedQuery(db);

    try {
      const transactions = await query.find('transactions', {
        select: ['*'],
        include: {
          categoryTest: {
            from: 'categories',
            localKey: 'category_id',
            foreignKey: 'id',
            fields: ['id', 'name', 'icon', 'iconLibrary', 'color'],
            type: 'left',
          },
          userTest: {
            from: 'users',
            localKey: 'user_id',
            foreignKey: 'id',
            fields: ['*'],
            type: 'right',
          },
        },
        dateFilter: {
          field: 'datetime',
          type: 'thisMonth',
        },
        orderBy: { field: 'datetime', direction: 'DESC' },
      });
      return transactions;
    } catch (error) {
      console.log('🚀 ~ error:', error);
    }
  },
  getTransactionCount: async () => {
    const db = await getSimplifierDB();

    const query = createAdvancedQuery(db);

    /**
     * ============================================
     * DEFINE RELATIONS
     * ============================================
     */

    query.defineRelations('transactions', {
      category: {
        table: 'categories',
        localKey: 'category_id',
        foreignKey: 'id',
        type: 'left',
      },
    });

    /**
     * ============================================
     * FILTERS
     * ============================================
     */

    const userId = 1;
    const type = 'expense';

    /**
     * ============================================
     * QUERY
     * ============================================
     */

    const result = await query.find('transactions', {
      select: {
        category_name: 'category.name',
        category_color: 'category.color',
        total_amount: sum('amount'),
      },

      include: {
        category: true,
      },

      where: {
        user_id: userId,
        type,
      },

      groupBy: 'category_id',

      orderBy: desc('total_amount'),

      limit: 5,
    });

    console.log('RESULT:', result);
  },
  // getTransactionCount: async () => {
  //   const db = await getSimplifierDB();

  //   const query = createAdvancedQuery(db);
  //   console.log('🚀 ~ query:', query);

  //   const result = await query.find('transactions', {
  //     select: {
  //       category_name: 'category.name',
  //       category_color: 'category.color',
  //       total_amount: sum('amount'),
  //     },

  //     include: {
  //       category: true,
  //     },

  //     where: {
  //       user_id: 1,
  //       type: 'expense',
  //     },

  //     groupBy: 'category_id',

  //     orderBy: desc('total_amount'),

  //     limit: 5,
  //   });

  //   console.log('RESULT:', result);
  // },
};
