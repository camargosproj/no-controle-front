export type Expense = {
  id: string;
  amount: number;
  description: string;
  date: string;
  categoryId: string;
  userId: string;
  transactionGroupId: string;
  category: {
    name: string;
  };
};

export type ExpensesResponse = {
  expenses: Expense[];
  balance: {
    totalExpense: number;
    totalIncome: number;
    totalBalance: number;
  };
};
