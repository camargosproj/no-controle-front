export type Expenses = {
  id: string;
  amount: string;
  description: string;
  date: string;
  categoryId: string;
  userId: string;
  sharedAccountGroupId: string;
  accountGroupId: string;
};

export type ExpensesResponse = {
  expenses: Expenses[];
  balance: {
    totalExpense: number;
    totalIncome: number;
    totalBalance: number;
  };
};
