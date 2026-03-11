export interface User {
  id?: number;
  name: string;
  email: string;
}

export interface Task {
  id?: number;
  title: string;
  completed: number; // 0 | 1
}

export interface Product {
  id?: number;
  name: string;
  price: number;
}

export interface Wallet {
  id?: number;
  balance: number;
}

export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id?: number;
  title: string;
  datetime?: string;
  amount: number;
  type: TransactionType;
  category_id?: number;
  note?: string;
  category_name?: string;
  category_icon?: string;
  category_color?: string;
}

export interface TransactionSection {
  title: string;
  data: Transaction[];
}

export interface CurrentMonthTxResponse {
  transactions: Record<string, Transaction[]>;
  summary: {
    total_income: number;
    total_expense: number;
  };
}

export interface Category {
  id: number;
  name: string;
  icon: string;
  color: string;
}
