import { getDB } from '../db';
import { Product } from '../types';

export const ProductRepo = {
  insert: async (product: Product) => {
    const db = await getDB();
    await db.executeSql(`INSERT INTO products (name, price) VALUES (?, ?)`, [
      product.name,
      product.price,
    ]);
  },

  getAll: async (): Promise<Product[]> => {
    const db = await getDB();
    const res = await db.executeSql(`SELECT * FROM products`);
    return res[0].rows.raw();
  },
};
