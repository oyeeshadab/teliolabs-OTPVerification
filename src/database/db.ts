import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const DB_NAME = 'app.db';

export const getDBConnection = async () => {
  return SQLite.openDatabase({
    name: DB_NAME,
    location: 'default',
  });
};
