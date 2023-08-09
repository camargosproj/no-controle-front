export type Expenses = {
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
  expenses: Expenses[];
  balance: {
    totalExpense: number;
    totalIncome: number;
    totalBalance: number;
  };
};
