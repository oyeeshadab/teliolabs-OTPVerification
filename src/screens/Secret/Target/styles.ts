import { StyleSheet, Dimensions } from 'react-native';
import { AppTheme } from '../../theme/themes';

const { width, height } = Dimensions.get('window');

export const useStyle = (theme: AppTheme) => ({
  container: {
    flex: 1,
  },

  header: {
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 20,
    backgroundColor: theme.colors.buttonDisabled,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
  },

  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F2A65A',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
  },

  listContent: {
    padding: 20,
    paddingTop: 24,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2E2E2E',
  },

  note: {
    marginBottom: 10,
    fontSize: 14,
    color: '#7A7A7A',
  },
});
