import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const ITEM_SIZE = width / 7;

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },

  itemWrapper: {
    alignItems: 'center',
    marginVertical: 6,
  },
  loaderWrapper: {
    alignItems: 'center',
    marginVertical: 6,
    height: 190,
    justifyContent: 'center',
  },

  colorItem: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },

  label: {
    fontSize: 10,
    textAlign: 'center',
    width: ITEM_SIZE,
    marginTop: 4,
  },
  LottieIcon: {
    width: 250,
    height: 250,
  },
});
