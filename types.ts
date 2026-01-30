
export type Category = string;

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'receita' | 'despesa';
  category: Category;
  date: string;
  userId: string; // "User A" or "User B"
}

export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface CoupleData {
  user1: User;
  user2: User;
  transactions: Transaction[];
}
