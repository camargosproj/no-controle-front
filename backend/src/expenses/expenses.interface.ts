export interface Expense {
  amount: number;
  description: string;
  date: Date;
  categoryId: string;
  userId: string;
  accountGroupId: string | null;
}

export interface AccountGroup {
  name: string;
  description: string;
}
