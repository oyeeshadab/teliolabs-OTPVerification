import { useState, useCallback, useRef } from 'react';
import { Alert } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { CategoriesRepo } from '@database/repository';

export type Category = {
  id: string;
  name: string;
  icon: string;
  color: string;
  transactionCount?: number;
};

export const useCategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const isFetchingRef = useRef(false);

  const navigation = useNavigation();

  const loadCategories = useCallback(async () => {
    if (isFetchingRef.current) {
      return;
    }

    try {
      isFetchingRef.current = true;

      setLoading(true);

      const res = await CategoriesRepo.getAllCategories();

      setCategories(res);
    } catch (error) {
      console.error('Failed to load categories:', error);
    } finally {
      setLoading(false);

      isFetchingRef.current = false;
    }
  }, []);

  const refreshCategories = useCallback(async () => {
    await loadCategories();
  }, [loadCategories]);

  const addCategory = useCallback(
    async (name: string, icon: string, color: string): Promise<boolean> => {
      if (!name.trim()) {
        Alert.alert('Error', 'Please enter a category name');

        return false;
      }

      const exists = categories.some(
        cat => cat.name.toLowerCase() === name.trim().toLowerCase(),
      );

      if (exists) {
        Alert.alert('Error', 'Category already exists');

        return false;
      }

      try {
        await CategoriesRepo.createCategory({
          id: Number(Date.now().toString()),
          name: name.trim(),
          icon,
          color,
        });

        await refreshCategories();

        return true;
      } catch (error) {
        console.error(error);

        return false;
      }
    },
    [categories, refreshCategories],
  );

  const updateCategory = useCallback(
    async (
      id: string,
      name: string,
      icon: string,
      color: string,
    ): Promise<boolean> => {
      if (!name.trim()) {
        Alert.alert('Error', 'Please enter a category name');

        return false;
      }

      const exists = categories.some(
        cat =>
          cat.id !== id && cat.name.toLowerCase() === name.trim().toLowerCase(),
      );

      if (exists) {
        Alert.alert('Error', 'Duplicate category name');

        return false;
      }

      try {
        await CategoriesRepo.updateCategory({
          id: Number(id),
          name: name.trim(),
          icon,
          color,
        });

        await refreshCategories();

        return true;
      } catch (error) {
        console.error(error);

        return false;
      }
    },
    [categories, refreshCategories],
  );

  const deleteCategory = useCallback(
    async (id: number, deleteCategoryFlag?: boolean): Promise<boolean> => {
      try {
        await CategoriesRepo.deleteCategory(id);

        await refreshCategories();

        if (deleteCategoryFlag) {
          navigation.goBack();
        }

        return true;
      } catch (error) {
        console.error(error);

        return false;
      }
    },
    [navigation, refreshCategories],
  );

  const getCategoryById = useCallback(
    (id: string) => categories.find(cat => cat.id === id),
    [categories],
  );

  useFocusEffect(
    useCallback(() => {
      loadCategories();
    }, [loadCategories]),
  );

  return {
    categories,
    loading,

    addCategory,
    updateCategory,
    deleteCategory,

    getCategoryById,

    refreshCategories,
  };
};
