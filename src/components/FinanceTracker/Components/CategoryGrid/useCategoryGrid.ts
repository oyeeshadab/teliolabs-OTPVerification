import { useMemo, useCallback, useState, useEffect } from 'react';
import { CategoryItem } from './CategoryGrid';
import { CategoriesRepo } from '@database/repository';

const DEFAULT_ICON: CategoryItem = {
  id: -1,
  icon: 'Shoppping',
  iconLibrary: 'Feather',
  name: 'Create New',
  color: '#BE96FA',
};

export const useCategoryGrid = () => {
  const [categoryList, setCategoryList] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const getAllCategories = useCallback(async () => {
    try {
      const res = await CategoriesRepo.getAllCategories();
      setCategoryList(res);
    } catch (error) {
      console.log('Category fetch error:', error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 50);
    }
  }, []);

  useEffect(() => {
    getAllCategories();
  }, [getAllCategories]);

  // Memoize merged data
  const data = useMemo(() => {
    return [...categoryList, DEFAULT_ICON];
  }, [categoryList]);

  const keyExtractor = useCallback(
    (item: CategoryItem) => item.id.toString(),
    [],
  );

  return {
    data,
    loading,
    keyExtractor,
  };
};
