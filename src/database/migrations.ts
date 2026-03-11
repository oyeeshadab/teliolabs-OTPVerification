import { getDB } from './db';

export const runMigrations = async () => {
  const db = await getDB();

  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE
    );
  `);

  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      completed INTEGER DEFAULT 0
    );
  `);

  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL
    );
  `);

  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS wallet (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      balance REAL NOT NULL
    );
  `);
  await db.executeSql(`
    INSERT OR IGNORE INTO wallet (id, balance)
      VALUES (1, 0);
  `);

  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      datetime TEXT NOT NULL,
      amount REAL NOT NULL,
      type TEXT NOT NULL,
      category_id INTEGER,
      note TEXT,
      FOREIGN KEY (category_id) REFERENCES categories(id)
    );
  `);

  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      icon TEXT,
      iconLibrary TEXT,
      color TEXT
    );
  `);

  const defaultCategories = [
    ['Groceries', 'Grocery', 'Ionicons', '#C4B6E9'],
    ['Shopping', 'Shopping', 'Feather', '#BE96FA'],
    ['Transit', 'Transit', 'Fontisto', '#61A5DE'],
    ['Entertainment', 'Entertainment', 'EvilIcons', '#D689B9'],
    ['Bills', 'Bills', 'Fontisto', '#73CA65'],
  ];

  for (const category of defaultCategories) {
    await db.executeSql(
      `INSERT OR IGNORE INTO categories (name, icon, iconLibrary, color) VALUES (?, ?, ?, ?)`,
      category,
    );
  }

  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS secretUser (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      keepLoggedIn INTEGER NOT NULL DEFAULT 0
    );
  `);
  await db.executeSql(`
    INSERT OR IGNORE INTO secretUser (id, keepLoggedIn)
      VALUES (1, 0);
    `);
};
