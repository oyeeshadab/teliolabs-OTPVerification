import { useMemo, useCallback, useReducer, useEffect, useRef } from 'react';
import { CategoryItem } from './CategoryGrid';
import { darkenHex, lightenHex } from '@utils/color';
import { CategoriesRepo } from '@database/repository';

// Define action types
type State = {
  categoryList: CategoryItem[];
  loading: boolean;
  error: Error | null;
  selectedColor: string;
};

type Action =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: CategoryItem[] }
  | { type: 'FETCH_ERROR'; payload: Error }
  | { type: 'SET_SELECTED_COLOR'; payload: string };

const initialState: State = {
  categoryList: [],
  loading: true,
  error: null,
  selectedColor: '#000000',
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, categoryList: action.payload, loading: false };
    case 'FETCH_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_SELECTED_COLOR':
      return { ...state, selectedColor: action.payload };
    default:
      return state;
  }
};

const DEFAULT_ICON: CategoryItem = {
  id: -1,
  icon: 'Shoppping',
  iconLibrary: 'Feather',
  name: 'Create New',
  color: '#BE96FA',
};

export const useCategoryGrid = (navigation?: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const categoriesCache = useRef<CategoryItem[] | null>(null);
  const isMounted = useRef(true);
  const abortController = useRef<AbortController | null>(null);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
      // Cancel any ongoing requests
      abortController.current?.abort();
    };
  }, []);

  const getAllCategories = useCallback(async (forceRefresh = false) => {
    // Cancel previous request if exists
    abortController.current?.abort();
    abortController.current = new AbortController();

    try {
      if (!forceRefresh && categoriesCache.current) {
        if (isMounted.current) {
          dispatch({ type: 'FETCH_SUCCESS', payload: categoriesCache.current });
        }
        return;
      }

      dispatch({ type: 'FETCH_START' });

      const res = await CategoriesRepo.getAllCategories({
        signal: abortController.current.signal,
      });
      alert('dfsd');
      console.log('🚀 ~ useCategoryGrid ~ res:', res);

      if (isMounted.current) {
        categoriesCache.current = res;
        dispatch({ type: 'FETCH_SUCCESS', payload: res });
      }
    } catch (error: any) {
      if (error.name !== 'AbortError' && isMounted.current) {
        dispatch({ type: 'FETCH_ERROR', payload: error });
        console.error('Category fetch error:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Listen for focus events
    const unsubscribe = navigation.addListener('focus', () => {
      getAllCategories(true);
    });

    return unsubscribe;
  }, [getAllCategories, navigation]);

  useEffect(() => {
    getAllCategories(true);
  }, [getAllCategories]);

  const refreshCategories = useCallback(() => {
    categoriesCache.current = null;
    getAllCategories(true);
  }, [getAllCategories]);

  const setSelectedColor = useCallback((color: string) => {
    dispatch({ type: 'SET_SELECTED_COLOR', payload: color });
  }, []);

  const data = useMemo(
    () => [...state.categoryList, DEFAULT_ICON],
    [state.categoryList],
  );

  const keyExtractor = useCallback(
    (item: CategoryItem) => item.id.toString(),
    [],
  );

  const currentGradient = useMemo(
    () => [
      lightenHex(state.selectedColor),
      darkenHex(state.selectedColor),
      '#000000',
    ],
    [state.selectedColor],
  );

  return useMemo(
    () => ({
      data,
      loading: state.loading,
      error: state.error,
      keyExtractor,
      refreshCategories,
      currentGradient,
      selectedColor: state.selectedColor,
      setSelectedColor,
      isEmpty: state.categoryList.length === 0,
      categoryCount: state.categoryList.length,
    }),
    [
      data,
      state.loading,
      state.error,
      keyExtractor,
      refreshCategories,
      currentGradient,
      state.selectedColor,
      setSelectedColor,
      state.categoryList.length,
    ],
  );
};
