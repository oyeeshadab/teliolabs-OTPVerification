import { runMigrations } from './migrations';
import { SecretUserRepo } from './repository/secretLogin.repo';
export const initDatabase = async () => {
  // const isLoggedIn = await SecretUserRepo.getKeepLoggedIn();
  // const isLoggedIn2 = await SecretUserRepo.getKeepLoggedInSimp();
  // console.log('🚀 ~ initDatabase ~ isLoggedIn2:', isLoggedIn2);
  // alert('isLoggedIn:- ' + isLoggedIn + 'isLoggedIn2:- ' + isLoggedIn2);
  try {
    if (!false) {
      await runMigrations();
    }
    console.log('✅ Database ready');
  } catch (e) {
    console.error('❌ DB init failed', e);
  }
};
