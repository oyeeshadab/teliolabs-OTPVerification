import { runMigrations } from './migrations';

export const initDatabase = async () => {
  try {
    await runMigrations();
    console.log('✅ Database ready');
  } catch (e) {
    console.error('❌ DB init failed', e);
  }
};
