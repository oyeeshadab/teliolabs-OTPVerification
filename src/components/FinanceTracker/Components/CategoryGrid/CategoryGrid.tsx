import React, { useCallback } from 'react';
import {
  ActivityIndicator,
  FlatList,
  GestureResponderEvent,
  TouchableOpacity,
  View,
} from 'react-native';
import Text from '@components/Text/Text';
import { CategoryIcon } from '../CategoryIconComponent';
import { useCategoryGrid } from './useCategoryGrid';
import { styles } from './styles';
import LottieView from 'lottie-react-native';

export interface CategoryItem {
  id: number;
  icon: string;
  iconLibrary?: string;
  name: string;
  color: string;
}

interface Props {
  // categories: CategoryItem[];
  onSelect: (item: CategoryItem, event: GestureResponderEvent) => void;
}

export const CategoryGrid = React.memo(({ onSelect }: Props) => {
  // export const CategoryGrid = ({ onSelect }: Props) => {
  const { data, loading, keyExtractor } = useCategoryGrid();
  const renderItem = useCallback(
    ({ item }: { item: CategoryItem }) => (
      <View style={styles.itemWrapper}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={e => onSelect(item, e)}
          style={[styles.colorItem, { backgroundColor: item.color }]}
        >
          <CategoryIcon icon_name={item.icon} />
        </TouchableOpacity>

        <Text style={styles.label} numberOfLines={1} color={'#ffffff'}>
          {item.name}
        </Text>
      </View>
    ),
    [onSelect],
  );

  return (
    <View style={styles.container}>
      {!loading ? (
        <FlatList
          data={data}
          keyExtractor={keyExtractor}
          numColumns={5}
          scrollEnabled={false}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.loaderWrapper}>
          <LottieView
            source={require('@assets/JSON/Loading2.json')}
            style={styles.LottieIcon}
            autoPlay
            loop
          />
        </View>
      )}
    </View>
  );
});
